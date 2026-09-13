import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Droplet, Stethoscope, Calendar, Activity } from 'lucide-react'

export default function PatientRecordModal({ patient, onClose }) {
  return (
    <AnimatePresence>
      {patient && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ perspective: 1600 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="glass relative w-full max-w-lg origin-top rounded-2xl p-7 shadow-card"
            initial={{ rotateX: -90, y: -40, opacity: 0 }}
            animate={{ rotateX: 0, y: 0, opacity: 1 }}
            exit={{ rotateX: -70, y: -20, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={onClose}
              className="focus-ring absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-ink-muted hover:bg-white/5 hover:text-ink"
              aria-label="Close record"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-bio to-pulse text-lg font-semibold text-void">
                {patient.name.split(' ').map((w) => w[0]).join('')}
              </span>
              <div>
                <p className="font-display text-lg font-semibold text-ink">{patient.name}</p>
                <p className="text-sm text-ink-muted">{patient.age} yrs · {patient.gender}</p>
              </div>
              <span
                className={`ml-auto rounded-full px-3 py-1 text-xs ${
                  patient.status === 'Critical'
                    ? 'bg-vital-rose/15 text-vital-rose'
                    : patient.status === 'Monitoring'
                    ? 'bg-vital-amber/15 text-vital-amber'
                    : 'bg-bio/15 text-bio'
                }`}
              >
                {patient.status}
              </span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-white/[0.03] p-4">
                <p className="flex items-center gap-1.5 text-xs text-ink-muted"><Stethoscope size={13}/> Condition</p>
                <p className="mt-1 text-sm text-ink">{patient.condition}</p>
              </div>
              <div className="rounded-xl bg-white/[0.03] p-4">
                <p className="flex items-center gap-1.5 text-xs text-ink-muted"><Activity size={13}/> Attending physician</p>
                <p className="mt-1 text-sm text-ink">{patient.doctor}</p>
              </div>
              <div className="rounded-xl bg-white/[0.03] p-4">
                <p className="flex items-center gap-1.5 text-xs text-ink-muted"><Droplet size={13}/> Blood type</p>
                <p className="mt-1 text-sm text-ink">{patient.bloodType}</p>
              </div>
              <div className="rounded-xl bg-white/[0.03] p-4">
                <p className="flex items-center gap-1.5 text-xs text-ink-muted"><Calendar size={13}/> Last visit</p>
                <p className="mt-1 text-sm text-ink">{patient.lastVisit}</p>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button className="focus-ring flex-1 rounded-xl bg-bio py-2.5 text-sm font-medium text-void">
                Update record
              </button>
              <button className="focus-ring flex-1 rounded-xl border border-white/10 py-2.5 text-sm text-ink hover:bg-white/5">
                View history
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
