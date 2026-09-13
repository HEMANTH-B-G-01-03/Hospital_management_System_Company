import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Moon, Sun, Bell, Shield, Check } from 'lucide-react'
import GlowCard from '../components/GlowCard.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'

const avatarColors = ['#22E5C8', '#7C6CFF', '#FF6B8B', '#FFB84D', '#6FFFE9', '#5B4CDB']

export default function Settings() {
  const { user } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [avatarColor, setAvatarColor] = useState(avatarColors[0])
  const [notifications, setNotifications] = useState({ email: true, sms: false, push: true })
  const [saved, setSaved] = useState(false)

  const toggleNotif = (key) => setNotifications((n) => ({ ...n, [key]: !n[key] }))

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="font-display text-3xl font-semibold text-ink">Settings</h1>
      <p className="mt-2 text-ink-muted">Personalize your workspace.</p>

      <div className="mt-8 grid grid-cols-1 gap-6">
        <GlowCard>
          <p className="font-display text-base font-semibold text-ink">Profile</p>
          <div className="mt-5 flex items-center gap-5">
            <motion.span
              key={avatarColor}
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              className="flex h-20 w-20 items-center justify-center rounded-full text-2xl font-semibold text-void"
              style={{ background: `linear-gradient(135deg, ${avatarColor}, #0D1526)` }}
            >
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </motion.span>
            <div>
              <p className="text-sm font-medium text-ink">{user?.name}</p>
              <p className="text-sm text-ink-muted">{user?.email}</p>
              <p className="mt-1 text-xs capitalize text-bio">{user?.role} account</p>
            </div>
          </div>
          <p className="mt-5 text-xs text-ink-muted">Avatar accent</p>
          <div className="mt-2 flex gap-2.5">
            {avatarColors.map((c) => (
              <button
                key={c}
                onClick={() => setAvatarColor(c)}
                className="focus-ring h-8 w-8 rounded-full border-2 transition-transform hover:scale-110"
                style={{ backgroundColor: c, borderColor: avatarColor === c ? '#E8F0F5' : 'transparent' }}
                aria-label={`Choose accent ${c}`}
              />
            ))}
          </div>
        </GlowCard>

        <GlowCard accent="pulse">
          <p className="font-display text-base font-semibold text-ink">Appearance</p>
          <div className="mt-4 flex items-center justify-between rounded-xl bg-white/[0.03] px-4 py-3.5">
            <span className="flex items-center gap-2.5 text-sm text-ink">
              {theme === 'dark' ? <Moon size={16} className="text-pulse" /> : <Sun size={16} className="text-vital-amber" />}
              {theme === 'dark' ? 'Dark mode' : 'Light mode'}
            </span>
            <button
              onClick={toggleTheme}
              className={`focus-ring relative h-7 w-12 rounded-full transition-colors ${theme === 'dark' ? 'bg-pulse/40' : 'bg-white/10'}`}
            >
              <motion.span
                layout
                className="absolute top-1 h-5 w-5 rounded-full bg-white"
                animate={{ left: theme === 'dark' ? 26 : 4 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
          </div>
        </GlowCard>

        <GlowCard>
          <p className="font-display text-base font-semibold text-ink">Notifications</p>
          <div className="mt-4 space-y-3">
            {[
              { key: 'email', label: 'Email reminders', icon: Bell },
              { key: 'sms', label: 'SMS alerts', icon: Bell },
              { key: 'push', label: 'Push notifications', icon: Bell }
            ].map(({ key, label, icon: Icon }) => (
              <div key={key} className="flex items-center justify-between rounded-xl bg-white/[0.03] px-4 py-3.5">
                <span className="flex items-center gap-2.5 text-sm text-ink">
                  <Icon size={15} className="text-ink-faint" /> {label}
                </span>
                <button
                  onClick={() => toggleNotif(key)}
                  className={`focus-ring relative h-6 w-11 rounded-full transition-colors ${notifications[key] ? 'bg-bio/50' : 'bg-white/10'}`}
                >
                  <motion.span
                    className="absolute top-0.5 h-5 w-5 rounded-full bg-white"
                    animate={{ left: notifications[key] ? 22 : 3 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>
            ))}
          </div>
        </GlowCard>

        <GlowCard className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm text-ink-muted">
            <Shield size={15} className="text-bio" /> Two-factor authentication is enabled
          </span>
          <button
            onClick={handleSave}
            className="focus-ring flex items-center gap-1.5 rounded-full bg-bio px-5 py-2.5 text-sm font-medium text-void shadow-glow"
          >
            {saved ? <Check size={15} /> : null}
            {saved ? 'Saved' : 'Save changes'}
          </button>
        </GlowCard>
      </div>
    </div>
  )
}
