// import React, { useMemo, useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { Search, CheckCircle2 } from 'lucide-react'
// import DoctorCard from '../components/DoctorCard.jsx'
// import { doctors, specialties } from '../lib/mockData.js'

// export default function Doctors() {
//   const [query, setQuery] = useState('')
//   const [specialty, setSpecialty] = useState('All')
//   const [toast, setToast] = useState(null)

//   const filtered = useMemo(
//     () =>
//       doctors.filter(
//         (d) =>
//           (specialty === 'All' || d.specialty === specialty) &&
//           d.name.toLowerCase().includes(query.toLowerCase())
//       ),
//     [query, specialty]
//   )

//   const handleBook = (doctor) => {
//     setToast(`Request sent to ${doctor.name}`)
//     setTimeout(() => setToast(null), 2400)
//   }

//   return (
//     <div className="mx-auto max-w-7xl px-6 py-10">
//       <h1 className="font-display text-3xl font-semibold text-ink">Doctor directory</h1>
//       <p className="mt-2 text-ink-muted">Hover a card to see availability and book directly.</p>

//       <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
//         <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 sm:max-w-xs">
//           <Search size={16} className="text-ink-faint" />
//           <input
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             placeholder="Search by name"
//             className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-faint"
//           />
//         </div>
//         <div className="flex flex-wrap gap-2">
//           {['All', ...specialties].map((s) => (
//             <button
//               key={s}
//               onClick={() => setSpecialty(s)}
//               className={`focus-ring rounded-full border px-3.5 py-2 text-xs transition-colors ${
//                 specialty === s ? 'border-bio bg-bio/10 text-bio' : 'border-white/8 text-ink-muted hover:text-ink'
//               }`}
//             >
//               {s}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
//         {filtered.map((d) => (
//           <DoctorCard key={d.id} doctor={d} onBook={handleBook} />
//         ))}
//       </div>

//       {filtered.length === 0 && <p className="mt-16 text-center text-sm text-ink-muted">No doctors match your filters.</p>}

//       <AnimatePresence>
//         {toast && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 20 }}
//             className="glass fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full px-5 py-3 text-sm text-ink shadow-card"
//           >
//             <CheckCircle2 size={16} className="text-bio" /> {toast}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }




// import React, { useEffect, useMemo, useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { Search, CheckCircle2 } from 'lucide-react'
// import DoctorCard from '../components/DoctorCard.jsx'

// export default function Doctors() {
//   const [doctors, setDoctors] = useState([])
//   const [query, setQuery] = useState('')
//   const [specialty, setSpecialty] = useState('All')
//   const [toast, setToast] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         setLoading(true)
//         setError('')

//         const response = await fetch('http://localhost:5000/api/doctors')

//         if (!response.ok) {
//           throw new Error('Failed to fetch doctors')
//         }

//         const data = await response.json()

//         const formattedDoctors = data.map((doctor) => ({
//           id: doctor._id,
//           name: doctor.name,
//           specialty: doctor.specialty,
//           bio: doctor.bio || '',
//           rating: doctor.rating ?? 4.5,
//           patients: doctor.patientCount ?? 0,
//           exp: doctor.experienceYears ?? 0,
//           available: doctor.available ?? true,
//           avatarSeed: doctor.name,
//         }))

//         setDoctors(formattedDoctors)
//       } catch (err) {
//         console.error('Error fetching doctors:', err)
//         setError('Unable to load doctors. Please make sure the backend is running.')
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchDoctors()
//   }, [])

//   const specialties = useMemo(
//     () => [...new Set(doctors.map((doctor) => doctor.specialty))],
//     [doctors]
//   )

//   const filtered = useMemo(
//     () =>
//       doctors.filter(
//         (doctor) =>
//           (specialty === 'All' || doctor.specialty === specialty) &&
//           doctor.name.toLowerCase().includes(query.toLowerCase())
//       ),
//     [doctors, query, specialty]
//   )

//   const handleBook = (doctor) => {
//     setToast(`Request sent to ${doctor.name}`)
//     setTimeout(() => setToast(null), 2400)
//   }

//   return (
//     <div className="mx-auto max-w-7xl px-6 py-10">
//       <h1 className="font-display text-3xl font-semibold text-ink">
//         Doctor directory
//       </h1>

//       <p className="mt-2 text-ink-muted">
//         Hover a card to see availability and book directly.
//       </p>

//       <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
//         <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 sm:max-w-xs">
//           <Search size={16} className="text-ink-faint" />

//           <input
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             placeholder="Search by name"
//             className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-faint"
//           />
//         </div>

//         <div className="flex flex-wrap gap-2">
//           {['All', ...specialties].map((s) => (
//             <button
//               key={s}
//               onClick={() => setSpecialty(s)}
//               className={`focus-ring rounded-full border px-3.5 py-2 text-xs transition-colors ${
//                 specialty === s
//                   ? 'border-bio bg-bio/10 text-bio'
//                   : 'border-white/8 text-ink-muted hover:text-ink'
//               }`}
//             >
//               {s}
//             </button>
//           ))}
//         </div>
//       </div>

//       {loading && (
//         <p className="mt-16 text-center text-sm text-ink-muted">
//           Loading doctors...
//         </p>
//       )}

//       {error && (
//         <p className="mt-16 text-center text-sm text-red-400">
//           {error}
//         </p>
//       )}

//       {!loading && !error && (
//         <>
//           <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
//             {filtered.map((doctor) => (
//               <DoctorCard
//                 key={doctor.id}
//                 doctor={doctor}
//                 onBook={handleBook}
//               />
//             ))}
//           </div>

//           {filtered.length === 0 && (
//             <p className="mt-16 text-center text-sm text-ink-muted">
//               No doctors match your filters.
//             </p>
//           )}
//         </>
//       )}

//       <AnimatePresence>
//         {toast && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 20 }}
//             className="glass fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full px-5 py-3 text-sm text-ink shadow-card"
//           >
//             <CheckCircle2 size={16} className="text-bio" />
//             {toast}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }






// 3rd change 


import React, { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, CheckCircle2, UserPlus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import DoctorCard from '../components/DoctorCard.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function Doctors() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [doctors, setDoctors] = useState([])
  const [query, setQuery] = useState('')
  const [specialty, setSpecialty] = useState('All')
  const [toast, setToast] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true)
        setError('')

        const response = await fetch('http://localhost:5000/api/doctors')

        if (!response.ok) {
          throw new Error('Failed to fetch doctors')
        }

        const data = await response.json()

        const formattedDoctors = data.map((doctor) => ({
          id: doctor._id,
          name: doctor.name,
          specialty: doctor.specialty,
          bio: doctor.bio || '',
          rating: doctor.rating ?? 4.5,
          patients: doctor.patientCount ?? 0,
          exp: doctor.experienceYears ?? 0,
          available: doctor.available ?? true,
          avatarSeed: doctor.name
        }))

        setDoctors(formattedDoctors)
      } catch (err) {
        console.error('Error fetching doctors:', err)
        setError(
          'Unable to load doctors. Please make sure the backend is running.'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchDoctors()
  }, [])

  const specialties = useMemo(
    () => [...new Set(doctors.map((doctor) => doctor.specialty))],
    [doctors]
  )

  const filtered = useMemo(
    () =>
      doctors.filter(
        (doctor) =>
          (specialty === 'All' || doctor.specialty === specialty) &&
          doctor.name.toLowerCase().includes(query.toLowerCase())
      ),
    [doctors, query, specialty]
  )

  const handleBook = (doctor) => {
    setToast(`Request sent to ${doctor.name}`)

    setTimeout(() => {
      setToast(null)
    }, 2400)
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold text-ink">
            Doctor directory
          </h1>

          <p className="mt-2 text-ink-muted">
            Hover a card to see availability and book directly.
          </p>
        </div>

        {/* Admin-only Add Doctor button */}
        {user?.role === 'admin' && (
          <button
            onClick={() => navigate('/doctors/add')}
            className="focus-ring flex items-center justify-center gap-2 rounded-full bg-bio px-4 py-2.5 text-sm font-medium text-void shadow-glow transition hover:opacity-90"
          >
            <UserPlus size={16} />
            Add Doctor
          </button>
        )}
      </div>

      {/* Search and filters */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 sm:max-w-xs">
          <Search size={16} className="text-ink-faint" />

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name"
            className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-faint"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {['All', ...specialties].map((s) => (
            <button
              key={s}
              onClick={() => setSpecialty(s)}
              className={`focus-ring rounded-full border px-3.5 py-2 text-xs transition-colors ${
                specialty === s
                  ? 'border-bio bg-bio/10 text-bio'
                  : 'border-white/8 text-ink-muted hover:text-ink'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <p className="mt-16 text-center text-sm text-ink-muted">
          Loading doctors...
        </p>
      )}

      {/* Error state */}
      {error && (
        <p className="mt-16 text-center text-sm text-red-400">
          {error}
        </p>
      )}

      {/* Doctor cards */}
      {!loading && !error && (
        <>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                onBook={handleBook}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="mt-16 text-center text-sm text-ink-muted">
              No doctors match your filters.
            </p>
          )}
        </>
      )}

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="glass fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full px-5 py-3 text-sm text-ink shadow-card"
          >
            <CheckCircle2 size={16} className="text-bio" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}