import React, { useState } from 'react'
import './login.css'
import { useAuth } from '../../context/auth'

interface Props {
  open: boolean
  onClose: () => void
}

export default function LoginModal({ open, onClose }: Props) {
  const { login } = useAuth()
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!open) return null

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!name.trim()) return setError('Informe um nome para entrar')
    if (!password.trim()) return setError('Informe uma senha')
    setLoading(true)
    try {
      const result = await login(name.trim(), password.trim())
      if (result.success) {
        setName('')
        setPassword('')
        onClose()
      } else {
        setError(result.message || 'Falha ao autenticar')
      }
    } catch (err) {
      setError('Falha ao autenticar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-modal-overlay" onClick={onClose}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="login-close" onClick={onClose}>✕</button>
        <h2>Entrar</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <label>
            Usuário
            <input 
              type="text"
              value={name} 
              onChange={(e) => setName(e.target.value)}
              placeholder="Informe seu usuário"
              disabled={loading}
            />
          </label>
          <label>
            Senha
            <input 
              type="password"
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Informe sua senha"
              disabled={loading}
            />
          </label>
          {error && <div className="login-error">{error}</div>}
          <button type="submit" disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</button>
        </form>
      </div>
    </div>
  )
}
