import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowUpRight, HeartPulse, CalendarClock, ShieldCheck, LineChart,
  Stethoscope, Users, Sparkles
} from 'lucide-react'
import HospitalScene from '../components/three/HospitalScene.jsx'
import GlowCard from '../components/GlowCard.jsx'
import { doctors } from '../lib/mockData.js'

const features = [
  {
    icon: HeartPulse,
    title: 'Live vitals, not stale charts',
    body: 'Patient telemetry streams into every dashboard in real time, so a change in condition is visible the moment it happens.'
  },
  {
    icon: CalendarClock,
    title: 'Scheduling that fills itself in',
    body: 'Doctors publish availability once; patients book in seconds and no-shows drop with automatic reminders.'
  },
  {
    icon: ShieldCheck,
    title: 'Records built for audits',
    body: 'Every read and edit to a patient file is logged, versioned, and reversible — compliance without the paperwork.'
  },
  {
    icon: LineChart,
    title: 'Finance that explains itself',
    body: 'Revenue, claims, and outstanding balances roll up into reports your board will actually read.'
  }
]

const stats = [
  { value: '48k+', label: 'Patients coordinated' },
  { value: '312', label: 'Specialists on platform' },
  { value: '99.98%', label: 'Uptime last 12 months' },
  { value: '3.2 min', label: 'Average time to book' }
]

export default function Landing() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 pb-16 pt-14 lg:grid-cols-2 lg:pt-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] bg-grid-glow" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs text-ink-muted">
            <Sparkles size={13} className="text-bio" /> Now with predictive bed capacity
          </span>
          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Hospital operations that move at the speed of care.
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-muted">
            NexusCare brings scheduling, records, billing, and analytics into one console —
            fast enough for a night-shift nurse, deep enough for a hospital administrator.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/signup"
              className="focus-ring group flex items-center gap-2 rounded-full bg-bio px-6 py-3.5 text-sm font-medium text-void shadow-glow transition-transform hover:scale-[1.03]"
            >
              Start free trial
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              to="/doctors"
              className="focus-ring rounded-full border border-white/10 px-6 py-3.5 text-sm text-ink transition-colors hover:bg-white/5"
            >
              Browse our specialists
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display text-2xl font-semibold text-ink">{s.value}</p>
                <p className="mt-1 text-xs leading-snug text-ink-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          <HospitalScene />
        </motion.div>
      </section>

      {/* Feature grid */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl font-semibold text-ink">Everything a hospital runs on, in one place.</h2>
          <p className="mt-3 text-ink-muted">Four systems that usually live in four different tools, now sharing one source of truth.</p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <GlowCard key={f.title} className="flex flex-col gap-4" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ delay: i * 0.06, duration: 0.5 }}>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-bio/10 text-bio">
                <f.icon size={19} />
              </span>
              <p className="font-display text-base font-semibold text-ink">{f.title}</p>
              <p className="text-sm leading-relaxed text-ink-muted">{f.body}</p>
            </GlowCard>
          ))}
        </div>
      </section>

      {/* Specialists preview */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-semibold text-ink">Specialists ready today</h2>
            <p className="mt-2 text-ink-muted">A sample of the physicians coordinating care on NexusCare.</p>
          </div>
          <Link to="/doctors" className="focus-ring flex items-center gap-1.5 text-sm text-bio hover:underline">
            View full directory <ArrowUpRight size={14} />
          </Link>
        </div>
        <div className="mt-8 flex gap-5 overflow-x-auto pb-4">
          {doctors.slice(0, 5).map((d) => (
            <div key={d.id} className="glass min-w-[220px] rounded-2xl p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-pulse to-bio text-sm font-semibold text-void">
                  {d.name.replace('Dr. ', '').split(' ').map((w) => w[0]).join('')}
                </span>
                <div>
                  <p className="text-sm font-medium text-ink">{d.name}</p>
                  <p className="text-xs text-ink-muted">{d.specialty}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <GlowCard className="flex flex-col items-center gap-6 py-14 text-center" accent="pulse">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pulse/15 text-pulse">
            <Stethoscope size={22} />
          </span>
          <h2 className="max-w-xl font-display text-3xl font-semibold text-ink">
            Give your care teams a console worth logging into.
          </h2>
          <p className="max-w-md text-ink-muted">Set up takes an afternoon. Your staff will notice the difference by the first shift change.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/signup" className="focus-ring rounded-full bg-bio px-6 py-3 text-sm font-medium text-void shadow-glow">
              Create your workspace
            </Link>
            <Link to="/login" className="focus-ring flex items-center gap-1.5 rounded-full border border-white/10 px-6 py-3 text-sm text-ink hover:bg-white/5">
              <Users size={15} /> I already have an account
            </Link>
          </div>
        </GlowCard>
      </section>
    </div>
  )
}
