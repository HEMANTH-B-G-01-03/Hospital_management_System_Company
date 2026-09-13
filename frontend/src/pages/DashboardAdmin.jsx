import React from 'react'
import { motion } from 'framer-motion'
import { Users, Stethoscope, BedDouble, Wallet } from 'lucide-react'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import StatCard from '../components/StatCard.jsx'
import GlowCard from '../components/GlowCard.jsx'
import Chart3D from '../components/three/Chart3D.jsx'
import { revenueByMonth, admissionsByDept, currency, doctors, patients } from '../lib/mockData.js'

export default function DashboardAdmin() {
  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} label="Active patients" value={patients.length * 187} accent="bio" delta="+8.2%" />
        <StatCard icon={Stethoscope} label="On-duty specialists" value={doctors.filter((d) => d.available).length} accent="pulse" delta="+2" />
        <StatCard icon={BedDouble} label="Bed occupancy" value={78} format={(v) => `${Math.round(v)}%`} accent="rose" delta="-3.1%" />
        <StatCard icon={Wallet} label="Monthly revenue" value={61200} format={currency} accent="bio" delta="+9.4%" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <GlowCard className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-display text-base font-semibold text-ink">Revenue vs. expenses</p>
              <p className="text-sm text-ink-muted">Last 7 months</p>
            </div>
          </div>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueByMonth}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22E5C8" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#22E5C8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="exp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7C6CFF" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#7C6CFF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="month" stroke="#4C5A6E" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#4C5A6E" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip
                  contentStyle={{ background: '#0D1526', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12 }}
                  labelStyle={{ color: '#8FA1B3' }}
                  formatter={(v) => currency(v)}
                />
                <Area type="monotone" dataKey="revenue" stroke="#22E5C8" fill="url(#rev)" strokeWidth={2.5} />
                <Area type="monotone" dataKey="expenses" stroke="#7C6CFF" fill="url(#exp)" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlowCard>

        <GlowCard accent="pulse">
          <p className="font-display text-base font-semibold text-ink">Admissions by department</p>
          <p className="text-sm text-ink-muted">This quarter</p>
          <Chart3D data={admissionsByDept.map((d) => ({ label: d.dept, value: d.value }))} color="#7C6CFF" />
          <div className="grid grid-cols-3 gap-2 text-center">
            {admissionsByDept.slice(0, 3).map((d) => (
              <div key={d.dept}>
                <p className="text-xs text-ink-muted">{d.dept}</p>
                <p className="text-sm font-medium text-ink">{d.value}</p>
              </div>
            ))}
          </div>
        </GlowCard>
      </div>

      <GlowCard>
        <p className="font-display text-base font-semibold text-ink">Recent activity</p>
        <div className="mt-4 divide-y divide-white/5">
          {[
            { text: 'Dr. Amara Osei confirmed 4 appointments for tomorrow', time: '12 min ago' },
            { text: 'Invoice INV-2044 marked pending — Grace Liu', time: '1 hr ago' },
            { text: 'New patient record created for Omar Haddad', time: '3 hr ago' },
            { text: 'Bed occupancy in Oncology crossed 85%', time: '5 hr ago' }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between py-3 text-sm"
            >
              <span className="text-ink-muted">{item.text}</span>
              <span className="whitespace-nowrap text-xs text-ink-faint">{item.time}</span>
            </motion.div>
          ))}
        </div>
      </GlowCard>
    </div>
  )
}
