import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react'
import DNAHelix from '../components/three/DNAHelix.jsx'
import { useAuth } from '../context/AuthContext.jsx'

const roles = [
  { id: 'patient', label: 'Patient' },
  { id: 'doctor', label: 'Doctor' },
  { id: 'admin', label: 'Admin' }
]

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [role, setRole] = useState('patient')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Enter your email and password to continue.')
      return
    }
    setError('')
    setLoading(true)
    try {
      await login({ email, password, role })
      navigate(location.state?.from || '/dashboard')
    } catch {
      setError('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-[calc(100vh-72px)] items-center justify-center overflow-hidden px-6 py-12">
      <DNAHelix className="pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-void via-void/70 to-void" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="glass relative z-10 w-full max-w-md rounded-2xl p-8 shadow-card"
      >
        <div className="flex items-center gap-2 text-bio">
          <ShieldCheck size={18} />
          <span className="text-xs text-ink-muted">Secure sign-in</span>
        </div>
        <h1 className="mt-3 font-display text-2xl font-semibold text-ink">Welcome back</h1>
        <p className="mt-1 text-sm text-ink-muted">Sign in to reach your dashboard.</p>

        <div className="mt-6 grid grid-cols-3 gap-2">
          {roles.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setRole(r.id)}
              className={`focus-ring rounded-xl border py-2 text-sm transition-colors ${
                role === r.id ? 'border-bio bg-bio/10 text-bio' : 'border-white/8 text-ink-muted hover:text-ink'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-xs text-ink-muted">Email</span>
            <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3 transition-colors focus-within:border-bio focus-within:shadow-glow">
              <Mail size={16} className="text-ink-faint" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@hospital.org"
                className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-faint"
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs text-ink-muted">Password</span>
            <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3 transition-colors focus-within:border-bio focus-within:shadow-glow">
              <Lock size={16} className="text-ink-faint" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-faint"
              />
            </div>
          </label>

          {error && <p className="text-sm text-vital-rose">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="focus-ring flex w-full items-center justify-center gap-2 rounded-xl bg-bio py-3 text-sm font-medium text-void shadow-glow transition-transform hover:scale-[1.01] disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign in'}
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-muted">
          Don't have an account? <Link to="/signup" className="text-bio hover:underline">Create one</Link>
        </p>
        <p className="mt-2 text-center text-xs text-ink-faint">Demo mode — any email and password will sign you in.</p>
      </motion.div>
    </div>
  )
}
