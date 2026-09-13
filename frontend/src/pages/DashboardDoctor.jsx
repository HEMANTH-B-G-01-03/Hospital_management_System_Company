import React from 'react'
import { CalendarClock, Users, Star, ClipboardList } from 'lucide-react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import StatCard from '../components/StatCard.jsx'
import GlowCard from '../components/GlowCard.jsx'
import { appointments, patients, vitalsTrend } from '../lib/mockData.js'
import { useAuth } from '../context/AuthContext.jsx'

export default function DashboardDoctor() {
  const { user } = useAuth()
  const myAppointments = appointments.slice(0, 4)

  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={CalendarClock} label="Today's appointments" value={myAppointments.length} accent="bio" delta="+1" />
        <StatCard icon={Users} label="Patients under care" value={patients.length * 6} accent="pulse" delta="+4" />
        <StatCard icon={Star} label="Patient rating" value={4.9} format={(v) => v.toFixed(1)} accent="rose" />
        <StatCard icon={ClipboardList} label="Pending charts" value={5} accent="bio" delta="-2" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <GlowCard className="lg:col-span-2">
          <p className="font-display text-base font-semibold text-ink">Today's schedule</p>
          <div className="mt-4 space-y-3">
            {myAppointments.map((a) => (
              <div key={a.id} className="flex items-center justify-between rounded-xl bg-white/[0.03] px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-14 flex-col items-center justify-center rounded-lg bg-bio/10 text-bio">
                    <span className="text-sm font-semibold">{a.time}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-ink">{a.patient}</p>
                    <p className="text-xs text-ink-muted">{a.type}</p>
                  </div>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs ${a.status === 'Confirmed' ? 'bg-bio/15 text-bio' : 'bg-vital-amber/15 text-vital-amber'}`}>
                  {a.status}
                </span>
              </div>
            ))}
          </div>
        </GlowCard>

        <GlowCard accent="pulse">
          <p className="font-display text-base font-semibold text-ink">Patient vitals trend</p>
          <p className="text-sm text-ink-muted">Ward average, last 7 days</p>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={vitalsTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="day" stroke="#4C5A6E" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#4C5A6E" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: '#0D1526', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12 }} />
                <Line type="monotone" dataKey="heartRate" stroke="#FF6B8B" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="spo2" stroke="#22E5C8" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlowCard>
      </div>

      <GlowCard>
        <p className="font-display text-base font-semibold text-ink">Recently seen patients</p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="text-xs text-ink-muted">
                <th className="pb-3 font-normal">Patient</th>
                <th className="pb-3 font-normal">Condition</th>
                <th className="pb-3 font-normal">Last visit</th>
                <th className="pb-3 font-normal">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {patients.slice(0, 5).map((p) => (
                <tr key={p.id}>
                  <td className="py-3 text-ink">{p.name}</td>
                  <td className="py-3 text-ink-muted">{p.condition}</td>
                  <td className="py-3 text-ink-muted">{p.lastVisit}</td>
                  <td className="py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs ${
                        p.status === 'Critical' ? 'bg-vital-rose/15 text-vital-rose' : p.status === 'Monitoring' ? 'bg-vital-amber/15 text-vital-amber' : 'bg-bio/15 text-bio'
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlowCard>
    </div>
  )
}
