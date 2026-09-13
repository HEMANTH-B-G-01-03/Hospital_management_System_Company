import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Moon, Sun, LogOut, Activity } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'
import logo from '../assets/logo.svg'

const publicLinks = [
  { to: '/', label: 'Home' },
  { to: '/doctors', label: 'Doctors' }
]

const authedLinks = {
  admin: [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/appointments', label: 'Appointments' },
    { to: '/records', label: 'Records' },
    { to: '/billing', label: 'Billing' },
    { to: '/doctors', label: 'Doctors' },
    { to: '/reports', label: 'Reports' }
  ],
  doctor: [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/appointments', label: 'Appointments' },
    { to: '/records', label: 'Records' },
    { to: '/reports', label: 'Reports' }
  ],
  patient: [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/appointments', label: 'Appointments' },
    { to: '/billing', label: 'Billing' },
    { to: '/doctors', label: 'Doctors' }
  ]
}

export default function Navbar() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const links = user ? authedLinks[user.role] || authedLinks.patient : publicLinks

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-void/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={logo} alt="" className="h-9 w-9" />
          <span className="font-display text-lg font-semibold tracking-tight text-ink">NexusCare</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `focus-ring rounded-full px-4 py-2 text-sm transition-colors ${
                  isActive ? 'bg-white/8 text-ink' : 'text-ink-muted hover:text-ink'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            className="focus-ring flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-white/5 hover:text-bio"
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              <Link to="/settings" className="flex items-center gap-2 rounded-full bg-white/5 py-1.5 pl-1.5 pr-3.5 text-sm text-ink hover:bg-white/10">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-bio to-pulse text-[11px] font-semibold text-void">
                  {user.name?.[0]?.toUpperCase() || 'U'}
                </span>
                {user.name}
              </Link>
              <button
                onClick={handleLogout}
                className="focus-ring flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-white/5 hover:text-vital-rose"
                aria-label="Log out"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="focus-ring rounded-full px-4 py-2 text-sm text-ink-muted hover:text-ink">
                Log in
              </Link>
              <Link
                to="/signup"
                className="focus-ring flex items-center gap-1.5 rounded-full bg-bio px-4 py-2 text-sm font-medium text-void shadow-glow transition-transform hover:scale-[1.03]"
              >
                <Activity size={15} />
                Get started
              </Link>
            </>
          )}
        </div>

        <button className="text-ink md:hidden" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/5 md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-2.5 text-sm ${isActive ? 'bg-white/8 text-ink' : 'text-ink-muted'}`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <div className="mt-2 flex gap-2">
                {user ? (
                  <button onClick={handleLogout} className="flex-1 rounded-lg bg-white/5 py-2.5 text-sm text-ink">
                    Log out
                  </button>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setOpen(false)} className="flex-1 rounded-lg bg-white/5 py-2.5 text-center text-sm text-ink">
                      Log in
                    </Link>
                    <Link to="/signup" onClick={() => setOpen(false)} className="flex-1 rounded-lg bg-bio py-2.5 text-center text-sm font-medium text-void">
                      Get started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
