import React, { createContext, useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '@/api/axios'

interface User {
  id: string
  email: string
  role: string
}

interface AuthContextData {
  user: User | null
  isAuthenticated: boolean
  login: (credentials: object) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Verifica se existe um token salvo ao carregar o app
    const recoveredUser = localStorage.getItem('user')
    const token = localStorage.getItem('token')

    if (recoveredUser && token) {
      setUser(JSON.parse(recoveredUser))
    }
    setLoading(false)
  }, [])

  const login = async (credentials: object) => {
    try {
      // Endpoint que você criará no FastAPI
      const response = await api.post('/auth/login', credentials)

      const { access_token, user: userData } = response.data

      localStorage.setItem('token', access_token)
      localStorage.setItem('user', JSON.stringify(userData))

      setUser(userData)
      navigate('/dashboard')
    } catch (error) {
      console.error('Erro no login:', error)
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    navigate('/login')
  }

  return <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, logout, loading }}>{children}</AuthContext.Provider>
}

// Hook personalizado para facilitar o uso nos componentes
export const useAuth = () => useContext(AuthContext)
