// import React, { useMemo, useState } from 'react'
// import { Search, FolderOpen } from 'lucide-react'
// import GlowCard from '../components/GlowCard.jsx'
// import PatientRecordModal from '../components/PatientRecordModal.jsx'
// import { patients } from '../lib/mockData.js'

// export default function PatientRecords() {
//   const [query, setQuery] = useState('')
//   const [selected, setSelected] = useState(null)

//   const filtered = useMemo(
//     () => patients.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()) || p.condition.toLowerCase().includes(query.toLowerCase())),
//     [query]
//   )

//   return (
//     <div className="mx-auto max-w-7xl px-6 py-10">
//       <h1 className="font-display text-3xl font-semibold text-ink">Patient records</h1>
//       <p className="mt-2 text-ink-muted">Every file, cross-referenced and one click from opening.</p>

//       <div className="mt-6 flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 sm:max-w-md">
//         <Search size={16} className="text-ink-faint" />
//         <input
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Search by name or condition"
//           className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-faint"
//         />
//       </div>

//       <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
//         {filtered.map((p) => (
//           <button key={p.id} onClick={() => setSelected(p)} className="text-left">
//             <GlowCard className="flex h-full flex-col gap-3" hover>
//               <div className="flex items-start justify-between">
//                 <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-bio to-pulse text-sm font-semibold text-void">
//                   {p.name.split(' ').map((w) => w[0]).join('')}
//                 </span>
//                 <FolderOpen size={16} className="text-ink-faint" />
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-ink">{p.name}</p>
//                 <p className="text-xs text-ink-muted">{p.condition}</p>
//               </div>
//               <div className="mt-auto flex items-center justify-between text-xs text-ink-faint">
//                 <span>Last visit {p.lastVisit}</span>
//                 <span
//                   className={`rounded-full px-2 py-0.5 ${
//                     p.status === 'Critical' ? 'bg-vital-rose/15 text-vital-rose' : p.status === 'Monitoring' ? 'bg-vital-amber/15 text-vital-amber' : 'bg-bio/15 text-bio'
//                   }`}
//                 >
//                   {p.status}
//                 </span>
//               </div>
//             </GlowCard>
//           </button>
//         ))}
//       </div>

//       {filtered.length === 0 && (
//         <p className="mt-16 text-center text-sm text-ink-muted">No records match "{query}".</p>
//       )}

//       <PatientRecordModal patient={selected} onClose={() => setSelected(null)} />
//     </div>
//   )
// }









import React, { useEffect, useMemo, useState } from 'react'
import { Search, FolderOpen } from 'lucide-react'
import GlowCard from '../components/GlowCard.jsx'
import PatientRecordModal from '../components/PatientRecordModal.jsx'
import { useAuth } from '../context/AuthContext.jsx'

const API_URL = 'http://localhost:5000/api'

export default function PatientRecords() {
  const { user } = useAuth()

  const [patients, setPatients] = useState([])
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true)
        setError('')

        if (!user?.token) {
          throw new Error('You must be logged in to view patient records.')
        }

        const response = await fetch(`${API_URL}/patients`, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch patients')
        }

        const formattedPatients = data.map((patient) => ({
          id: patient._id,
          name: patient.name,
          age: patient.age,
          gender: patient.gender,
          bloodType: patient.bloodType,
          condition: patient.condition || 'General wellness',
          status: patient.status || 'Stable',
          doctor: patient.primaryDoctor?.name || 'Not assigned',
          lastVisit: patient.lastVisit
            ? new Date(patient.lastVisit).toLocaleDateString()
            : 'No visit recorded',
          history: patient.history || []
        }))

        setPatients(formattedPatients)
      } catch (err) {
        console.error('Error fetching patients:', err)
        setError(err.message || 'Unable to load patient records.')
      } finally {
        setLoading(false)
      }
    }

    fetchPatients()
  }, [user])

  const filtered = useMemo(
    () =>
      patients.filter(
        (patient) =>
          patient.name.toLowerCase().includes(query.toLowerCase()) ||
          patient.condition.toLowerCase().includes(query.toLowerCase())
      ),
    [patients, query]
  )

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="font-display text-3xl font-semibold text-ink">
        Patient records
      </h1>

      <p className="mt-2 text-ink-muted">
        Every file, cross-referenced and one click from opening.
      </p>

      <div className="mt-6 flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 sm:max-w-md">
        <Search size={16} className="text-ink-faint" />

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or condition"
          className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-faint"
        />
      </div>

      {loading && (
        <p className="mt-16 text-center text-sm text-ink-muted">
          Loading patient records...
        </p>
      )}

      {error && (
        <p className="mt-16 text-center text-sm text-vital-rose">
          {error}
        </p>
      )}

      {!loading && !error && (
        <>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((patient) => (
              <button
                key={patient.id}
                onClick={() => setSelected(patient)}
                className="text-left"
              >
                <GlowCard className="flex h-full flex-col gap-3" hover>
                  <div className="flex items-start justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-bio to-pulse text-sm font-semibold text-void">
                      {patient.name
                        .split(' ')
                        .map((word) => word[0])
                        .join('')}
                    </span>

                    <FolderOpen size={16} className="text-ink-faint" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-ink">
                      {patient.name}
                    </p>

                    <p className="text-xs text-ink-muted">
                      {patient.condition}
                    </p>
                  </div>

                  <div className="mt-auto flex items-center justify-between text-xs text-ink-faint">
                    <span>Last visit {patient.lastVisit}</span>

                    <span
                      className={`rounded-full px-2 py-0.5 ${
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
                </GlowCard>
              </button>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="mt-16 text-center text-sm text-ink-muted">
              No records match "{query}".
            </p>
          )}
        </>
      )}

      <PatientRecordModal
        patient={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  )
}