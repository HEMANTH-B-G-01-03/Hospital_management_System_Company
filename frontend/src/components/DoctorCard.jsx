import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Users, CalendarCheck, ArrowUpRight } from 'lucide-react'

function initialsAvatar(seed) {
  const colors = ['#22E5C8', '#7C6CFF', '#FF6B8B', '#FFB84D', '#6FFFE9']
  const hash = [...seed].reduce((a, c) => a + c.charCodeAt(0), 0)
  return colors[hash % colors.length]
}

export default function DoctorCard({ doctor, onBook }) {
  const [flipped, setFlipped] = useState(false)
  const color = initialsAvatar(doctor.avatarSeed)
  const initials = doctor.name
    .replace('Dr. ', '')
    .split(' ')
    .map((w) => w[0])
    .join('')

  return (
    <div className="group [perspective:1400px]" onMouseEnter={() => setFlipped(true)} onMouseLeave={() => setFlipped(false)}>
      <motion.div
        className="relative h-72 w-full [transform-style:preserve-3d]"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Front */}
        <div className="glass absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl p-6 [backface-visibility:hidden]">
          <span
            className="flex h-20 w-20 items-center justify-center rounded-full text-2xl font-semibold text-void"
            style={{ background: `linear-gradient(135deg, ${color}, #0D1526)` }}
          >
            {initials}
          </span>
          <div className="text-center">
            <p className="font-display text-base font-semibold text-ink">{doctor.name}</p>
            <p className="text-sm text-ink-muted">{doctor.specialty}</p>
          </div>
          <div className="flex items-center gap-1 text-sm text-vital-amber">
            <Star size={14} fill="currentColor" /> {doctor.rating}
          </div>
          <span className={`rounded-full px-3 py-1 text-xs ${doctor.available ? 'bg-bio/15 text-bio' : 'bg-white/5 text-ink-faint'}`}>
            {doctor.available ? 'Available today' : 'Fully booked'}
          </span>
        </div>

        {/* Back */}
        <div
          className="glass absolute inset-0 flex flex-col justify-between rounded-2xl p-6 [backface-visibility:hidden]"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div>
            <p className="font-display text-base font-semibold text-ink">{doctor.name}</p>
            <p className="text-sm text-pulse">{doctor.specialty}</p>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">{doctor.bio}</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-ink-muted">
              <span className="flex items-center gap-1.5"><Users size={14} /> Patients</span>
              <span className="text-ink">{doctor.patients}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-ink-muted">
              <span className="flex items-center gap-1.5"><CalendarCheck size={14} /> Experience</span>
              <span className="text-ink">{doctor.exp} yrs</span>
            </div>
            <button
              onClick={() => onBook?.(doctor)}
              className="focus-ring mt-2 flex w-full items-center justify-center gap-1.5 rounded-xl bg-bio py-2.5 text-sm font-medium text-void transition-transform hover:scale-[1.02]"
            >
              Book appointment <ArrowUpRight size={15} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
