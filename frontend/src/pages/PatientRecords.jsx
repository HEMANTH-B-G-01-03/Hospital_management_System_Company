import React, { useMemo, useState } from 'react'
import { Search, FolderOpen } from 'lucide-react'
import GlowCard from '../components/GlowCard.jsx'
import PatientRecordModal from '../components/PatientRecordModal.jsx'
import { patients } from '../lib/mockData.js'

export default function PatientRecords() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)

  const filtered = useMemo(
    () => patients.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()) || p.condition.toLowerCase().includes(query.toLowerCase())),
    [query]
  )

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="font-display text-3xl font-semibold text-ink">Patient records</h1>
      <p className="mt-2 text-ink-muted">Every file, cross-referenced and one click from opening.</p>

      <div className="mt-6 flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 sm:max-w-md">
        <Search size={16} className="text-ink-faint" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or condition"
          className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-faint"
        />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <button key={p.id} onClick={() => setSelected(p)} className="text-left">
            <GlowCard className="flex h-full flex-col gap-3" hover>
              <div className="flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-bio to-pulse text-sm font-semibold text-void">
                  {p.name.split(' ').map((w) => w[0]).join('')}
                </span>
                <FolderOpen size={16} className="text-ink-faint" />
              </div>
              <div>
                <p className="text-sm font-medium text-ink">{p.name}</p>
                <p className="text-xs text-ink-muted">{p.condition}</p>
              </div>
              <div className="mt-auto flex items-center justify-between text-xs text-ink-faint">
                <span>Last visit {p.lastVisit}</span>
                <span
                  className={`rounded-full px-2 py-0.5 ${
                    p.status === 'Critical' ? 'bg-vital-rose/15 text-vital-rose' : p.status === 'Monitoring' ? 'bg-vital-amber/15 text-vital-amber' : 'bg-bio/15 text-bio'
                  }`}
                >
                  {p.status}
                </span>
              </div>
            </GlowCard>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-sm text-ink-muted">No records match "{query}".</p>
      )}

      <PatientRecordModal patient={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
