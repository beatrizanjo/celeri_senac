import React, { useState } from 'react'
import './addRecipe.css'
import { useAuth } from '../../context/auth'

interface Props {
    open: boolean
    onClose: () => void
    onAdded?: () => void
}

export default function AddRecipeForm({ open, onClose, onAdded }: Props) {
    const { user } = useAuth()
    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('carnes')
    const [ingredients, setIngredients] = useState('')
    const [modo, setModo] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    if (!open) return null

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError(null)
        if (!title.trim()) return setError('Informe um título')
        setLoading(true)
        const payload = {
            receita: title,
            ingredientes: ingredients.split(',').map(s => s.trim()),
            modo_preparo: modo,
            link_imagem: image,
            tipo: category,
            autor: user?.name || 'anônimo'
        }

        try {
            const res = await fetch('https://api-receitas-pi.vercel.app/receitas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })

            if (res.ok) {
                onAdded && onAdded()
                onClose()
                return
            }

            const local = JSON.parse(localStorage.getItem('sellerie_userRecipes') || '[]')
            local.unshift({ id: Date.now().toString(), receita: title, ingredientes: payload.ingredientes, modo_preparo: modo, link_imagem: image, tipo: category })
            localStorage.setItem('sellerie_userRecipes', JSON.stringify(local))
            onAdded && onAdded()
            onClose()
        } catch (err) {
            console.error(err)
            setError('Falha ao enviar. Receita salva localmente.')
            const local = JSON.parse(localStorage.getItem('sellerie_userRecipes') || '[]')
            local.unshift({ id: Date.now().toString(), receita: title, ingredientes: payload.ingredientes, modo_preparo: modo, link_imagem: image, tipo: category })
            localStorage.setItem('sellerie_userRecipes', JSON.stringify(local))
            onAdded && onAdded()
            onClose()
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="add-modal-overlay" onClick={onClose}>
            <div className="add-modal" onClick={e => e.stopPropagation()}>
                <button className="add-close" onClick={onClose}>✕</button>
                <h2>Adicionar Receita</h2>
                <form onSubmit={handleSubmit} className="add-form">
                    <select value={category} onChange={e => setCategory(e.target.value)}>
                        <option value="carnes">Carnes</option>
                        <option value="vegano">Veganos</option>
                        <option value="vegetariano">Vegetarianos</option>
                        <option value="doces">Doces</option>
                        <option value="massas">Massas</option>
                        <option value="salada">Saladas</option>
                        <option value="lanches">Lanches</option>
                        <option value="bebidas">Bebidas</option>
                    </select>
                    <input placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} />
                    <input placeholder="Link da imagem (opcional)" value={image} onChange={e => setImage(e.target.value)} />
                    <input placeholder="Ingredientes (separados por vírgula)" value={ingredients} onChange={e => setIngredients(e.target.value)} />
                    <textarea placeholder="Modo de preparo" value={modo} onChange={e => setModo(e.target.value)} />
                    {error && <div className="add-error">{error}</div>}
                    <button type="submit" disabled={loading}>{loading ? 'Enviando...' : 'Adicionar'}</button>
                </form>
            </div>
        </div>
    )
}
