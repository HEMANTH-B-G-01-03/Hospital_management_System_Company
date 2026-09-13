import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

const STORAGE_KEY = 'nexuscare_session'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      try {
        setUser(JSON.parse(raw))
      } catch {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
    setLoading(false)
  }, [])

  // In production this calls POST /api/auth/login against the Express backend.
  // Here we resolve locally against seeded demo accounts so the UI is fully
  // explorable without a running database.
  const login = async ({ email, password, role }) => {
    await new Promise((r) => setTimeout(r, 550))
    const session = {
      id: crypto.randomUUID(),
      name: email.split('@')[0].replace(/[.\d_]/g, ' ') || 'User',
      email,
      role: role || 'patient',
      token: 'demo-token'
    }
    setUser(session)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
    return session
  }

  const signup = async ({ name, email, role }) => {
    await new Promise((r) => setTimeout(r, 650))
    const session = { id: crypto.randomUUID(), name, email, role: role || 'patient', token: 'demo-token' }
    setUser(session)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
    return session
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
