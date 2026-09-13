import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, XCircle, Clock } from 'lucide-react'
import AppointmentCalendar from '../components/AppointmentCalendar.jsx'
import GlowCard from '../components/GlowCard.jsx'
import { appointments as seedAppointments } from '../lib/mockData.js'

const statusStyle = {
  Confirmed: 'bg-bio/15 text-bio',
  Pending: 'bg-vital-amber/15 text-vital-amber',
  Cancelled: 'bg-vital-rose/15 text-vital-rose'
}

export default function Appointments() {
  const [appointments, setAppointments] = useState(seedAppointments)
  const [toast, setToast] = useState(null)

  const handleBook = ({ date, time }) => {
    setToast(`Appointment requested for ${date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} at ${time}`)
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="font-display text-3xl font-semibold text-ink">Appointments</h1>
      <p className="mt-2 text-ink-muted">Book a new slot, or review what's already on the calendar.</p>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <AppointmentCalendar
            bookedSlots={['2026-09-15_09:00', '2026-09-15_10:30']}
            onBook={handleBook}
          />
        </div>

        <div className="lg:col-span-2">
          <GlowCard>
            <p className="font-display text-base font-semibold text-ink">Upcoming</p>
            <div className="mt-4 space-y-3">
              {appointments.map((a) => (
                <div key={a.id} className="flex items-center justify-between rounded-xl bg-white/[0.03] px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-ink">{a.patient}</p>
                    <p className="text-xs text-ink-muted">{a.doctor} · {a.type}</p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-ink-faint">
                      <Clock size={11} /> {a.date} at {a.time}
                    </p>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-xs ${statusStyle[a.status] || 'bg-white/5 text-ink-muted'}`}>
                    {a.status}
                  </span>
                </div>
              ))}
            </div>
          </GlowCard>
        </div>
      </div>

      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-void-raised px-5 py-3 text-sm text-ink shadow-card glass"
        >
          <CheckCircle2 size={16} className="text-bio" /> {toast}
        </motion.div>
      )}
    </div>
  )
}
