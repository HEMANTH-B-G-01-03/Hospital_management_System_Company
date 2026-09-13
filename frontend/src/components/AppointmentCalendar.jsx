import React, { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Check } from 'lucide-react'

const slots = ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00']

function buildWeek(startOffset) {
  const today = new Date()
  today.setDate(today.getDate() + startOffset)
  const monday = new Date(today)
  monday.setDate(today.getDate() - ((today.getDay() + 6) % 7))
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    return d
  })
}

export default function AppointmentCalendar({ bookedSlots = [], onBook }) {
  const [weekOffset, setWeekOffset] = useState(0)
  const [selectedDay, setSelectedDay] = useState(0)
  const [confirmed, setConfirmed] = useState(null)

  const week = useMemo(() => buildWeek(weekOffset * 7), [weekOffset])
  const activeDate = week[selectedDay]
  const key = (d, t) => `${d.toISOString().slice(0, 10)}_${t}`

  const handleSelect = (time) => {
    setConfirmed(time)
    onBook?.({ date: activeDate, time })
    setTimeout(() => setConfirmed(null), 1800)
  }

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center justify-between">
        <p className="font-display text-lg font-semibold text-ink">
          {activeDate.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
        </p>
        <div className="flex gap-1">
          <button
            onClick={() => setWeekOffset((w) => w - 1)}
            className="focus-ring flex h-8 w-8 items-center justify-center rounded-full text-ink-muted hover:bg-white/5 hover:text-ink"
            aria-label="Previous week"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => setWeekOffset((w) => w + 1)}
            className="focus-ring flex h-8 w-8 items-center justify-center rounded-full text-ink-muted hover:bg-white/5 hover:text-ink"
            aria-label="Next week"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-7 gap-1.5">
        {week.map((d, i) => {
          const isToday = d.toDateString() === new Date().toDateString()
          return (
            <button
              key={i}
              onClick={() => setSelectedDay(i)}
              className={`focus-ring flex flex-col items-center gap-1 rounded-xl py-2.5 transition-colors ${
                selectedDay === i ? 'bg-bio text-void' : 'text-ink-muted hover:bg-white/5'
              }`}
            >
              <span className="text-[11px]">{d.toLocaleDateString(undefined, { weekday: 'short' })}</span>
              <span className={`text-sm font-medium ${selectedDay === i ? '' : isToday ? 'text-bio' : 'text-ink'}`}>
                {d.getDate()}
              </span>
            </button>
          )
        })}
      </div>

      <div className="mt-6 grid grid-cols-3 gap-2.5 sm:grid-cols-3">
        {slots.map((time) => {
          const isBooked = bookedSlots.includes(key(activeDate, time))
          const isConfirmed = confirmed === time
          return (
            <motion.button
              key={time}
              disabled={isBooked}
              whileHover={!isBooked ? { y: -3, scale: 1.02 } : {}}
              whileTap={!isBooked ? { scale: 0.97 } : {}}
              onClick={() => !isBooked && handleSelect(time)}
              className={`focus-ring relative overflow-hidden rounded-xl border py-3 text-sm transition-colors ${
                isBooked
                  ? 'cursor-not-allowed border-white/5 bg-white/[0.02] text-ink-faint line-through'
                  : isConfirmed
                  ? 'border-bio bg-bio/15 text-bio'
                  : 'border-white/8 bg-white/[0.03] text-ink hover:border-bio/40 hover:bg-bio/5'
              }`}
            >
              <AnimatePresence mode="wait">
                {isConfirmed ? (
                  <motion.span
                    key="confirmed"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center justify-center gap-1.5"
                  >
                    <Check size={14} /> Booked
                  </motion.span>
                ) : (
                  <motion.span key="time" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {time}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
