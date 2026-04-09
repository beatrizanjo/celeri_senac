import React, { createContext, useContext, useEffect, useState } from 'react'

type User = {
    name: string
    email?: string
}

type AuthContextType = {
    user: User | null
    login: (name: string, password: string) => Promise<{ success: boolean; message?: string }>
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        try {
            const raw = localStorage.getItem('sellerie_user')
            return raw ? JSON.parse(raw) as User : null
        } catch {
            return null
        }
    })

    useEffect(() => {
        if (user) localStorage.setItem('sellerie_user', JSON.stringify(user))
        else localStorage.removeItem('sellerie_user')
    }, [user])

    async function login(name: string, password: string) {
        // Valida se os campos estão preenchidos
        if (!name.trim()) {
            return { success: false, message: 'Informe um usuário' }
        }

        if (!password.trim()) {
            return { success: false, message: 'Informe uma senha' }
        }

        // Aceita qualquer usuário/senha que seja preenchida
        const u = { name: name.trim().charAt(0).toUpperCase() + name.trim().slice(1) }
        setUser(u)
        return { success: true }
    }

    function logout() {
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used within AuthProvider')
    return ctx
}

export default AuthContext
