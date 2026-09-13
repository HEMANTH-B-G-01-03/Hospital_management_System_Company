import React from 'react'
import { motion } from 'framer-motion'

export default function Loader({ label = 'Loading' }) {
  return (
    <div className="flex h-full min-h-[240px] w-full flex-col items-center justify-center gap-4">
      <div className="relative h-12 w-12">
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-bio/20 border-t-bio"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        />
        <motion.span
          className="absolute inset-2 rounded-full border-2 border-pulse/20 border-b-pulse"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 1.4, ease: 'linear' }}
        />
      </div>
      <p className="font-mono text-xs text-ink-muted">{label}…</p>
    </div>
  )
}
