import { useState } from 'react'
import { useAuth } from '../context/auth'
import LoginModal from '../componentes/login/LoginModal'
import './protectedRoute.css'

interface Props {
    children: React.ReactElement
}

export default function ProtectedRoute({ children }: Props) {
    const { user } = useAuth()
    const [loginOpen, setLoginOpen] = useState(false)

    if (!user) {
        return (
            <div className="protected-content">
                <div className="login-required-message">
                    <h2>Acesso Restrito</h2>
                    <p>Para acessar este conteúdo, você precisa fazer login primeiro.</p>
                    <button
                        className="btn-login-redirect"
                        onClick={() => setLoginOpen(true)}
                    >
                        Fazer Login
                    </button>
                </div>
                <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
            </div>
        )
    }

    return children
}
