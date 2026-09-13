import React from 'react'
import { FileDown, FileSpreadsheet } from 'lucide-react'
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from 'recharts'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import * as XLSX from 'xlsx'
import GlowCard from '../components/GlowCard.jsx'
import Chart3D from '../components/three/Chart3D.jsx'
import { revenueByMonth, admissionsByDept, invoices, currency } from '../lib/mockData.js'

const pieColors = ['#22E5C8', '#7C6CFF', '#FF6B8B', '#FFB84D', '#6FFFE9', '#5B4CDB']

function exportPDF() {
  const doc = new jsPDF()
  doc.setFontSize(16)
  doc.text('NexusCare — Billing Report', 14, 18)
  doc.setFontSize(10)
  doc.setTextColor(120)
  doc.text(new Date().toLocaleDateString(), 14, 24)
  autoTable(doc, {
    startY: 30,
    head: [['Invoice', 'Patient', 'Service', 'Date', 'Amount', 'Status']],
    body: invoices.map((i) => [i.id, i.patient, i.service, i.date, currency(i.amount), i.status])
  })
  doc.save('nexuscare-report.pdf')
}

function exportExcel() {
  const ws = XLSX.utils.json_to_sheet(invoices)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Invoices')
  XLSX.writeFile(wb, 'nexuscare-report.xlsx')
}

export default function Reports() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-ink">Reports & analytics</h1>
          <p className="mt-2 text-ink-muted">Operational and financial performance at a glance.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={exportPDF} className="focus-ring flex items-center gap-1.5 rounded-full border border-white/10 px-4 py-2.5 text-sm text-ink hover:bg-white/5">
            <FileDown size={15} /> Export PDF
          </button>
          <button onClick={exportExcel} className="focus-ring flex items-center gap-1.5 rounded-full bg-bio px-4 py-2.5 text-sm font-medium text-void shadow-glow">
            <FileSpreadsheet size={15} /> Export Excel
          </button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <GlowCard>
          <p className="font-display text-base font-semibold text-ink">Admissions by department</p>
          <p className="text-sm text-ink-muted">Animated 3D breakdown</p>
          <Chart3D data={admissionsByDept.map((d) => ({ label: d.dept, value: d.value }))} color="#22E5C8" />
        </GlowCard>

        <GlowCard accent="pulse">
          <p className="font-display text-base font-semibold text-ink">Department share</p>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={admissionsByDept} dataKey="value" nameKey="dept" innerRadius={55} outerRadius={90} paddingAngle={3}>
                  {admissionsByDept.map((_, i) => (
                    <Cell key={i} fill={pieColors[i % pieColors.length]} stroke="none" />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#0D1526', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12, color: '#8FA1B3' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </GlowCard>
      </div>

      <GlowCard className="mt-6">
        <p className="font-display text-base font-semibold text-ink">Monthly revenue</p>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {revenueByMonth.map((m) => (
            <div key={m.month} className="rounded-xl bg-white/[0.03] p-3 text-center">
              <p className="text-xs text-ink-muted">{m.month}</p>
              <p className="mt-1 text-sm font-semibold text-bio">{currency(m.revenue)}</p>
            </div>
          ))}
        </div>
      </GlowCard>
    </div>
  )
}
