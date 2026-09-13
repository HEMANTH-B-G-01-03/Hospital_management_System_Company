import React from 'react'
import clsx from 'clsx'
import { motion } from 'framer-motion'

export default function GlowCard({ children, className = '', accent = 'bio', hover = true, as: Comp = 'div', ...props }) {
  const accentShadow = accent === 'pulse' ? 'hover:shadow-glow-violet' : 'hover:shadow-glow'
  const MotionComp = motion(Comp)
  return (
    <MotionComp
      className={clsx(
        'glass rounded-2xl p-6 shadow-card transition-shadow duration-500',
        hover && accentShadow,
        className
      )}
      {...props}
    >
      {children}
    </MotionComp>
  )
}
