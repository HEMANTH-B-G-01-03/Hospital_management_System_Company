import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import GlowCard from './GlowCard.jsx'

function Counter({ value, format }) {
  const [display, setDisplay] = useState(0)
  const mv = useMotionValue(0)

  useEffect(() => {
    const controls = animate(mv, value, { duration: 1.2, ease: 'easeOut' })
    const unsub = mv.on('change', (v) => setDisplay(v))
    return () => {
      controls.stop()
      unsub()
    }
  }, [value])

  return <span>{format ? format(display) : Math.round(display)}</span>
}

export default function StatCard({ icon: Icon, label, value, format, delta, accent = 'bio' }) {
  const accentColor = accent === 'pulse' ? 'text-pulse' : accent === 'rose' ? 'text-vital-rose' : 'text-bio'
  return (
    <GlowCard accent={accent} className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-ink-muted">{label}</span>
        {Icon && (
          <span className={`flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 ${accentColor}`}>
            <Icon size={18} />
          </span>
        )}
      </div>
      <div className="font-display text-3xl font-semibold text-ink">
        <Counter value={value} format={format} />
      </div>
      {delta && (
        <div className={`text-xs ${delta.startsWith('-') ? 'text-vital-rose' : 'text-bio'}`}>
          {delta} from last month
        </div>
      )}
    </GlowCard>
  )
}
