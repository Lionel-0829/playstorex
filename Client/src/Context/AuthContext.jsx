import { createContext, useState, useEffect } from 'react'

// Crear el contexto
export const AuthContext = createContext()

// Proveedor del contexto
export function AuthProvider({ children }) {
  const [usuarioActual, setUsuarioActual] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  // Inicializar desde sessionStorage
  useEffect(() => {
    const usuario = sessionStorage.getItem('usuarioActual')
    if (usuario) {
      setUsuarioActual(usuario)
      setIsAdmin(usuario === 'admin')
    }
    setLoading(false)
  }, [])

  // Función para iniciar sesión
  const login = (usuario) => {
    sessionStorage.setItem('usuarioActual', usuario)
    setUsuarioActual(usuario)
    setIsAdmin(usuario === 'admin')
  }

  // Función para cerrar sesión
  const logout = () => {
    sessionStorage.removeItem('usuarioActual')
    setUsuarioActual(null)
    setIsAdmin(false)
  }

  return (
    <AuthContext.Provider value={{ usuarioActual, isAdmin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
