import React from 'react'
import { Link } from 'react-router-dom'
import { HeartPulse, CalendarClock, FileText, Wallet, ArrowUpRight } from 'lucide-react'
import { ResponsiveContainer, LineChart, Line, XAxis, Tooltip } from 'recharts'
import StatCard from '../components/StatCard.jsx'
import GlowCard from '../components/GlowCard.jsx'
import { vitalsTrend, invoices } from '../lib/mockData.js'
import { useAuth } from '../context/AuthContext.jsx'

export default function DashboardPatient() {
  const { user } = useAuth()
  const myInvoice = invoices.find((i) => i.status !== 'Paid') || invoices[0]

  return (
    <div className="grid grid-cols-1 gap-6">
      <GlowCard className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-ink-muted">Welcome back</p>
          <h1 className="font-display text-2xl font-semibold text-ink">{user?.name || 'Patient'}</h1>
          <p className="mt-1 text-sm text-ink-muted">Your next appointment is Tuesday at 10:30 with Dr. Kenji Watanabe.</p>
        </div>
        <Link to="/appointments" className="focus-ring flex items-center gap-1.5 whitespace-nowrap rounded-full bg-bio px-5 py-2.5 text-sm font-medium text-void shadow-glow">
          Book a visit <ArrowUpRight size={15} />
        </Link>
      </GlowCard>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <StatCard icon={HeartPulse} label="Resting heart rate" value={73} format={(v) => `${Math.round(v)} bpm`} accent="rose" />
        <StatCard icon={CalendarClock} label="Upcoming visits" value={2} accent="bio" />
        <StatCard icon={Wallet} label="Balance due" value={myInvoice.amount} format={(v) => `$${Math.round(v)}`} accent="pulse" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <GlowCard className="lg:col-span-2">
          <p className="font-display text-base font-semibold text-ink">Your vitals this week</p>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={vitalsTrend}>
                <XAxis dataKey="day" stroke="#4C5A6E" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: '#0D1526', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12 }} />
                <Line type="monotone" dataKey="heartRate" stroke="#FF6B8B" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlowCard>

        <GlowCard accent="pulse">
          <p className="font-display text-base font-semibold text-ink">Recent records</p>
          <div className="mt-4 space-y-3">
            {[
              { label: 'Blood panel results', date: 'Sep 8' },
              { label: 'Cardiology consult notes', date: 'Aug 24' },
              { label: 'Prescription renewal', date: 'Aug 14' }
            ].map((r) => (
              <div key={r.label} className="flex items-center justify-between rounded-xl bg-white/[0.03] px-4 py-3">
                <span className="flex items-center gap-2 text-sm text-ink">
                  <FileText size={15} className="text-pulse" /> {r.label}
                </span>
                <span className="text-xs text-ink-faint">{r.date}</span>
              </div>
            ))}
          </div>
        </GlowCard>
      </div>
    </div>
  )
}
