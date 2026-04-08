
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'

function Cabecalho() {
    const [query, setQuery] = useState('')
    const navigate = useNavigate()

    function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        const q = query.trim()
        if (!q) return
        // navega para uma rota de busca com query string
        navigate(`/buscar?query=${encodeURIComponent(q)}`)
    }

    function handleClockClick() {
        navigate('/timer')
    }

    return (
        <header className="cabecalho">
            <div className="cabecalho__inner">
                <a className="cabecalho__logo" href="/" aria-label="Ir para a página inicial">
                    <img src="/logo.jpg" alt="Sellerie" />
                </a>

                <form className="cabecalho__search" role="search" onSubmit={onSubmit} aria-label="Barra de busca">
                    <input
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Pesquise a sua receita aqui — ingredientes ou nome"
                        aria-label="Pesquisar por ingrediente ou nome da receita"
                    />
                    <button type="submit" aria-label="Pesquisar" className="cabecalho__search-btn">
                        &#128269;
                    </button>
                </form>

                <div className="cabecalho__actions">
                    <img 
                        className="cabecalho__relogio" 
                        src="/relogio.png" 
                        alt="Cronômetro" 
                        onClick={handleClockClick}
                        style={{ cursor: 'pointer' }}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                handleClockClick()
                            }
                        }}
                        aria-label="Abrir página de cronômetro"
                    />
                </div>
            </div>
        </header>
    )
}

export default Cabecalho