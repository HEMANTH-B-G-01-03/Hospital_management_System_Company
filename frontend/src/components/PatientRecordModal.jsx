// import React from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { X, Droplet, Stethoscope, Calendar, Activity } from 'lucide-react'

// export default function PatientRecordModal({ patient, onClose }) {
//   return (
//     <AnimatePresence>
//       {patient && (
//         <motion.div
//           className="fixed inset-0 z-[100] flex items-center justify-center p-4"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           style={{ perspective: 1600 }}
//         >
//           <motion.div
//             className="absolute inset-0 bg-black/70 backdrop-blur-sm"
//             onClick={onClose}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           />

//           <motion.div
//             className="glass relative w-full max-w-lg origin-top rounded-2xl p-7 shadow-card"
//             initial={{ rotateX: -90, y: -40, opacity: 0 }}
//             animate={{ rotateX: 0, y: 0, opacity: 1 }}
//             exit={{ rotateX: -70, y: -20, opacity: 0 }}
//             transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
//           >
//             <button
//               onClick={onClose}
//               className="focus-ring absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-ink-muted hover:bg-white/5 hover:text-ink"
//               aria-label="Close record"
//             >
//               <X size={16} />
//             </button>

//             <div className="flex items-center gap-4">
//               <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-bio to-pulse text-lg font-semibold text-void">
//                 {patient.name.split(' ').map((w) => w[0]).join('')}
//               </span>
//               <div>
//                 <p className="font-display text-lg font-semibold text-ink">{patient.name}</p>
//                 <p className="text-sm text-ink-muted">{patient.age} yrs · {patient.gender}</p>
//               </div>
//               <span
//                 className={`ml-auto rounded-full px-3 py-1 text-xs ${
//                   patient.status === 'Critical'
//                     ? 'bg-vital-rose/15 text-vital-rose'
//                     : patient.status === 'Monitoring'
//                     ? 'bg-vital-amber/15 text-vital-amber'
//                     : 'bg-bio/15 text-bio'
//                 }`}
//               >
//                 {patient.status}
//               </span>
//             </div>

//             <div className="mt-6 grid grid-cols-2 gap-4">
//               <div className="rounded-xl bg-white/[0.03] p-4">
//                 <p className="flex items-center gap-1.5 text-xs text-ink-muted"><Stethoscope size={13}/> Condition</p>
//                 <p className="mt-1 text-sm text-ink">{patient.condition}</p>
//               </div>
//               <div className="rounded-xl bg-white/[0.03] p-4">
//                 <p className="flex items-center gap-1.5 text-xs text-ink-muted"><Activity size={13}/> Attending physician</p>
//                 <p className="mt-1 text-sm text-ink">{patient.doctor}</p>
//               </div>
//               <div className="rounded-xl bg-white/[0.03] p-4">
//                 <p className="flex items-center gap-1.5 text-xs text-ink-muted"><Droplet size={13}/> Blood type</p>
//                 <p className="mt-1 text-sm text-ink">{patient.bloodType}</p>
//               </div>
//               <div className="rounded-xl bg-white/[0.03] p-4">
//                 <p className="flex items-center gap-1.5 text-xs text-ink-muted"><Calendar size={13}/> Last visit</p>
//                 <p className="mt-1 text-sm text-ink">{patient.lastVisit}</p>
//               </div>
//             </div>

//             <div className="mt-6 flex gap-3">
//               <button className="focus-ring flex-1 rounded-xl bg-bio py-2.5 text-sm font-medium text-void">
//                 Update record
//               </button>
//               <button className="focus-ring flex-1 rounded-xl border border-white/10 py-2.5 text-sm text-ink hover:bg-white/5">
//                 View history
//               </button>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   )
// }

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Droplet,
  Stethoscope,
  Calendar,
  Activity,
  History,
  Save,
  ArrowLeft,
  Plus
} from 'lucide-react'

const API_URL = 'http://localhost:5000/api'

export default function PatientRecordModal({
  patient,
  onClose,
  token,
  onPatientUpdated
}) {
  const [mode, setMode] = useState('view')

  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: 'Male',
    bloodType: '',
    condition: '',
    status: 'Stable'
  })

  const [historyNote, setHistoryNote] = useState('')
  const [historyAuthor, setHistoryAuthor] = useState('')

  const [saving, setSaving] = useState(false)
  const [savingHistory, setSavingHistory] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (!patient) return

    setMode('view')

    setForm({
      name: patient.name || '',
      age: patient.age || '',
      gender: patient.gender || 'Male',
      bloodType: patient.bloodType || '',
      condition: patient.condition || '',
      status: patient.status || 'Stable'
    })

    setHistoryNote('')
    setError('')
    setSuccess('')
  }, [patient])

  const handleChange = (e) => {
    const { name, value } = e.target

    setForm((current) => ({
      ...current,
      [name]: value
    }))
  }

  const handleUpdate = async (e) => {
    e.preventDefault()

    try {
      setSaving(true)
      setError('')
      setSuccess('')

      if (!token) {
        throw new Error('You must be logged in.')
      }

      const response = await fetch(
        `${API_URL}/patients/${patient.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            name: form.name,
            age: Number(form.age),
            gender: form.gender,
            bloodType: form.bloodType,
            condition: form.condition,
            status: form.status
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || 'Failed to update patient record'
        )
      }

      setSuccess('Patient record updated successfully.')

      if (onPatientUpdated) {
        onPatientUpdated(data)
      }

      setTimeout(() => {
        setMode('view')
        setSuccess('')
      }, 700)
    } catch (err) {
      console.error('Update patient error:', err)
      setError(err.message || 'Unable to update patient record.')
    } finally {
      setSaving(false)
    }
  }

  const handleAddHistory = async (e) => {
    e.preventDefault()

    if (!historyNote.trim()) {
      setError('Please enter a history note.')
      return
    }

    try {
      setSavingHistory(true)
      setError('')
      setSuccess('')

      if (!token) {
        throw new Error('You must be logged in.')
      }

      const response = await fetch(
        `${API_URL}/patients/${patient.id}/history`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            note: historyNote.trim(),
            author: historyAuthor.trim() || 'Admin'
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || 'Failed to add history note'
        )
      }

      setHistoryNote('')
      setSuccess('History note added successfully.')

      if (onPatientUpdated) {
        onPatientUpdated(data)
      }

      setTimeout(() => {
        setSuccess('')
      }, 1200)
    } catch (err) {
      console.error('Add history error:', err)
      setError(err.message || 'Unable to add history note.')
    } finally {
      setSavingHistory(false)
    }
  }

  const handleClose = () => {
    setMode('view')
    setError('')
    setSuccess('')
    onClose()
  }

  if (!patient) {
    return null
  }

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
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="glass relative w-full max-w-lg origin-top rounded-2xl p-7 shadow-card"
            initial={{
              rotateX: -90,
              y: -40,
              opacity: 0
            }}
            animate={{
              rotateX: 0,
              y: 0,
              opacity: 1
            }}
            exit={{
              rotateX: -70,
              y: -20,
              opacity: 0
            }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="focus-ring absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full text-ink-muted hover:bg-white/5 hover:text-ink"
              aria-label="Close record"
            >
              <X size={16} />
            </button>

            {/* VIEW MODE */}
            {mode === 'view' && (
              <>
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-bio to-pulse text-lg font-semibold text-void">
                    {patient.name
                      .split(' ')
                      .map((word) => word[0])
                      .join('')}
                  </span>

                  <div>
                    <p className="font-display text-lg font-semibold text-ink">
                      {patient.name}
                    </p>

                    <p className="text-sm text-ink-muted">
                      {patient.age} yrs · {patient.gender}
                    </p>
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
                    <p className="flex items-center gap-1.5 text-xs text-ink-muted">
                      <Stethoscope size={13} />
                      Condition
                    </p>

                    <p className="mt-1 text-sm text-ink">
                      {patient.condition}
                    </p>
                  </div>

                  <div className="rounded-xl bg-white/[0.03] p-4">
                    <p className="flex items-center gap-1.5 text-xs text-ink-muted">
                      <Activity size={13} />
                      Attending physician
                    </p>

                    <p className="mt-1 text-sm text-ink">
                      {patient.doctor}
                    </p>
                  </div>

                  <div className="rounded-xl bg-white/[0.03] p-4">
                    <p className="flex items-center gap-1.5 text-xs text-ink-muted">
                      <Droplet size={13} />
                      Blood type
                    </p>

                    <p className="mt-1 text-sm text-ink">
                      {patient.bloodType}
                    </p>
                  </div>

                  <div className="rounded-xl bg-white/[0.03] p-4">
                    <p className="flex items-center gap-1.5 text-xs text-ink-muted">
                      <Calendar size={13} />
                      Last visit
                    </p>

                    <p className="mt-1 text-sm text-ink">
                      {patient.lastVisit}
                    </p>
                  </div>
                </div>

                {error && (
                  <p className="mt-4 rounded-lg bg-vital-rose/10 px-3 py-2 text-sm text-vital-rose">
                    {error}
                  </p>
                )}

                {success && (
                  <p className="mt-4 rounded-lg bg-bio/10 px-3 py-2 text-sm text-bio">
                    {success}
                  </p>
                )}

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => {
                      setMode('edit')
                      setError('')
                      setSuccess('')
                    }}
                    className="focus-ring flex-1 rounded-xl bg-bio py-2.5 text-sm font-medium text-void transition hover:opacity-90"
                  >
                    Update record
                  </button>

                  <button
                    onClick={() => {
                      setMode('history')
                      setError('')
                      setSuccess('')
                    }}
                    className="focus-ring flex-1 rounded-xl border border-white/10 py-2.5 text-sm text-ink transition hover:bg-white/5"
                  >
                    View history
                  </button>
                </div>
              </>
            )}

            {/* EDIT MODE */}
            {mode === 'edit' && (
              <form onSubmit={handleUpdate}>
                <div className="mb-6 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setMode('view')
                      setError('')
                    }}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-ink-muted hover:bg-white/5 hover:text-ink"
                  >
                    <ArrowLeft size={16} />
                  </button>

                  <div>
                    <p className="font-display text-lg font-semibold text-ink">
                      Update patient record
                    </p>

                    <p className="text-xs text-ink-muted">
                      Edit patient information
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-xs text-ink-muted">
                      Patient name
                    </label>

                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-ink outline-none focus:border-bio/50"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1.5 block text-xs text-ink-muted">
                        Age
                      </label>

                      <input
                        name="age"
                        type="number"
                        min="0"
                        max="150"
                        value={form.age}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-ink outline-none focus:border-bio/50"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs text-ink-muted">
                        Gender
                      </label>

                      <select
                        name="gender"
                        value={form.gender}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-white/10 bg-[#10151c] px-4 py-3 text-sm text-ink outline-none focus:border-bio/50"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1.5 block text-xs text-ink-muted">
                        Blood type
                      </label>

                      <input
                        name="bloodType"
                        value={form.bloodType}
                        onChange={handleChange}
                        required
                        placeholder="e.g. O+"
                        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-ink outline-none focus:border-bio/50"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs text-ink-muted">
                        Status
                      </label>

                      <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-white/10 bg-[#10151c] px-4 py-3 text-sm text-ink outline-none focus:border-bio/50"
                      >
                        <option value="Stable">Stable</option>
                        <option value="Improving">Improving</option>
                        <option value="Monitoring">Monitoring</option>
                        <option value="Critical">Critical</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs text-ink-muted">
                      Condition
                    </label>

                    <input
                      name="condition"
                      value={form.condition}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-ink outline-none focus:border-bio/50"
                    />
                  </div>
                </div>

                {error && (
                  <p className="mt-4 rounded-lg bg-vital-rose/10 px-3 py-2 text-sm text-vital-rose">
                    {error}
                  </p>
                )}

                {success && (
                  <p className="mt-4 rounded-lg bg-bio/10 px-3 py-2 text-sm text-bio">
                    {success}
                  </p>
                )}

                <div className="mt-6 flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setMode('view')
                      setError('')
                    }}
                    className="flex-1 rounded-xl border border-white/10 py-2.5 text-sm text-ink hover:bg-white/5"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-bio py-2.5 text-sm font-medium text-void disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Save size={16} />

                    {saving ? 'Saving...' : 'Save changes'}
                  </button>
                </div>
              </form>
            )}

            {/* HISTORY MODE */}
            {mode === 'history' && (
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setMode('view')
                      setError('')
                    }}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-ink-muted hover:bg-white/5 hover:text-ink"
                  >
                    <ArrowLeft size={16} />
                  </button>

                  <div>
                    <p className="font-display text-lg font-semibold text-ink">
                      Patient history
                    </p>

                    <p className="text-xs text-ink-muted">
                      {patient.name}
                    </p>
                  </div>
                </div>

                <div className="max-h-64 space-y-3 overflow-y-auto pr-1">
                  {patient.history && patient.history.length > 0 ? (
                    patient.history
                      .slice()
                      .reverse()
                      .map((entry, index) => (
                        <div
                          key={entry._id || index}
                          className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-sm font-medium text-ink">
                                {entry.note}
                              </p>

                              <p className="mt-2 text-xs text-ink-muted">
                                By {entry.author || 'Unknown'}
                              </p>
                            </div>

                            <History
                              size={15}
                              className="shrink-0 text-bio"
                            />
                          </div>

                          {entry.createdAt && (
                            <p className="mt-2 text-xs text-ink-faint">
                              {new Date(
                                entry.createdAt
                              ).toLocaleString()}
                            </p>
                          )}
                        </div>
                      ))
                  ) : (
                    <div className="rounded-xl border border-dashed border-white/10 p-6 text-center">
                      <History
                        size={24}
                        className="mx-auto text-ink-faint"
                      />

                      <p className="mt-2 text-sm text-ink-muted">
                        No history entries yet.
                      </p>
                    </div>
                  )}
                </div>

                <form
                  onSubmit={handleAddHistory}
                  className="mt-5 border-t border-white/10 pt-5"
                >
                  <label className="mb-1.5 block text-xs text-ink-muted">
                    Add history note
                  </label>

                  <textarea
                    value={historyNote}
                    onChange={(e) => setHistoryNote(e.target.value)}
                    placeholder="Enter treatment, diagnosis, observation, or visit note..."
                    rows={3}
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-ink outline-none placeholder:text-ink-faint focus:border-bio/50"
                  />

                  <input
                    value={historyAuthor}
                    onChange={(e) => setHistoryAuthor(e.target.value)}
                    placeholder="Author name (optional)"
                    className="mt-3 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-ink outline-none placeholder:text-ink-faint focus:border-bio/50"
                  />

                  {error && (
                    <p className="mt-3 rounded-lg bg-vital-rose/10 px-3 py-2 text-sm text-vital-rose">
                      {error}
                    </p>
                  )}

                  {success && (
                    <p className="mt-3 rounded-lg bg-bio/10 px-3 py-2 text-sm text-bio">
                      {success}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={savingHistory}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-bio py-2.5 text-sm font-medium text-void disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Plus size={16} />

                    {savingHistory
                      ? 'Adding note...'
                      : 'Add history note'}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}