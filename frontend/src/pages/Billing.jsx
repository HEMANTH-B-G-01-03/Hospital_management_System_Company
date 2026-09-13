import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CreditCard, Download, ShieldCheck } from 'lucide-react'
import GlowCard from '../components/GlowCard.jsx'
import PaymentCard3D from '../components/three/PaymentCard3D.jsx'
import { invoices, currency } from '../lib/mockData.js'

const statusStyle = {
  Paid: 'bg-bio/15 text-bio',
  Pending: 'bg-vital-amber/15 text-vital-amber',
  Overdue: 'bg-vital-rose/15 text-vital-rose'
}

export default function Billing() {
  const [hovered, setHovered] = useState(false)
  const outstanding = invoices.filter((i) => i.status !== 'Paid').reduce((s, i) => s + i.amount, 0)

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="font-display text-3xl font-semibold text-ink">Billing & payments</h1>
      <p className="mt-2 text-ink-muted">Track balances and settle invoices without leaving the dashboard.</p>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-5">
        <GlowCard className="lg:col-span-2" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
          <p className="font-display text-base font-semibold text-ink">Payment method</p>
          <PaymentCard3D hovered={hovered} />
          <div className="mt-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs text-ink-muted">
              <ShieldCheck size={13} className="text-bio" /> PCI-compliant processing
            </span>
            <button className="focus-ring flex items-center gap-1.5 rounded-full bg-white/5 px-3.5 py-2 text-xs text-ink hover:bg-white/10">
              <CreditCard size={13} /> Update card
            </button>
          </div>
        </GlowCard>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-3 lg:grid-rows-2">
          <GlowCard className="flex flex-col justify-between">
            <p className="text-sm text-ink-muted">Outstanding balance</p>
            <p className="font-display text-3xl font-semibold text-vital-rose">{currency(outstanding)}</p>
            <p className="text-xs text-ink-faint">Across {invoices.filter((i) => i.status !== 'Paid').length} invoices</p>
          </GlowCard>
          <GlowCard accent="pulse" className="flex flex-col justify-between">
            <p className="text-sm text-ink-muted">Paid this month</p>
            <p className="font-display text-3xl font-semibold text-bio">
              {currency(invoices.filter((i) => i.status === 'Paid').reduce((s, i) => s + i.amount, 0))}
            </p>
            <p className="text-xs text-ink-faint">{invoices.filter((i) => i.status === 'Paid').length} settled invoices</p>
          </GlowCard>
          <GlowCard className="sm:col-span-2 flex items-center justify-between">
            <div>
              <p className="text-sm text-ink-muted">Need a statement?</p>
              <p className="text-xs text-ink-faint">Export the current invoice list as PDF or Excel.</p>
            </div>
            <button className="focus-ring flex items-center gap-1.5 rounded-full bg-bio px-4 py-2.5 text-sm font-medium text-void shadow-glow">
              <Download size={14} /> Export
            </button>
          </GlowCard>
        </div>
      </div>

      <GlowCard className="mt-6">
        <p className="font-display text-base font-semibold text-ink">Invoices</p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="text-xs text-ink-muted">
                <th className="pb-3 font-normal">Invoice</th>
                <th className="pb-3 font-normal">Patient</th>
                <th className="pb-3 font-normal">Service</th>
                <th className="pb-3 font-normal">Date</th>
                <th className="pb-3 font-normal">Amount</th>
                <th className="pb-3 font-normal">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {invoices.map((inv, i) => (
                <motion.tr key={inv.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}>
                  <td className="py-3 font-mono text-xs text-ink-muted">{inv.id}</td>
                  <td className="py-3 text-ink">{inv.patient}</td>
                  <td className="py-3 text-ink-muted">{inv.service}</td>
                  <td className="py-3 text-ink-muted">{inv.date}</td>
                  <td className="py-3 text-ink">{currency(inv.amount)}</td>
                  <td className="py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs ${statusStyle[inv.status]}`}>{inv.status}</span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlowCard>
    </div>
  )
}
