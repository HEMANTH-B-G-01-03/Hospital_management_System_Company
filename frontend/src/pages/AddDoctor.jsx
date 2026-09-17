import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, UserPlus, CheckCircle2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import GlowCard from '../components/GlowCard.jsx'

const API_URL = 'http://localhost:5000/api'

const specialties = [
  'Cardiology',
  'Dermatology',
  'General Medicine',
  'Gynecology',
  'Neurology',
  'Orthopedics',
  'Pediatrics',
  'Psychiatry'
]

export default function AddDoctor() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    specialty: 'General Medicine',
    experienceYears: '',
    rating: '4.5',
    patientCount: '0',
    available: true,
    bio: ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target

    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setError('')
    setSuccess('')

    if (!user?.token) {
      setError('You must be logged in as an admin.')
      return
    }

    if (!form.name.trim()) {
      setError('Doctor name is required.')
      return
    }

    if (!form.specialty) {
      setError('Please select a specialty.')
      return
    }

    if (Number(form.experienceYears) < 0) {
      setError('Experience cannot be negative.')
      return
    }

    if (Number(form.rating) < 0 || Number(form.rating) > 5) {
      setError('Rating must be between 0 and 5.')
      return
    }

    if (Number(form.patientCount) < 0) {
      setError('Patient count cannot be negative.')
      return
    }

    try {
      setLoading(true)

      const response = await fetch(`${API_URL}/doctors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({
          name: form.name.trim(),
          specialty: form.specialty,
          experienceYears: Number(form.experienceYears) || 0,
          rating: Number(form.rating),
          patientCount: Number(form.patientCount) || 0,
          available: form.available,
          bio: form.bio.trim()
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to add doctor')
      }

      setSuccess(`${data.name} was added successfully.`)

      setForm({
        name: '',
        specialty: 'General Medicine',
        experienceYears: '',
        rating: '4.5',
        patientCount: '0',
        available: true,
        bio: ''
      })

      setTimeout(() => {
        navigate('/doctors')
      }, 1200)
    } catch (err) {
      console.error('Error adding doctor:', err)
      setError(err.message || 'Unable to add doctor.')
    } finally {
      setLoading(false)
    }
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16">
        <GlowCard>
          <h1 className="font-display text-2xl font-semibold text-ink">
            Access denied
          </h1>

          <p className="mt-2 text-sm text-ink-muted">
            Only administrators can add doctors.
          </p>

          <button
            onClick={() => navigate('/doctors')}
            className="focus-ring mt-6 rounded-full bg-bio px-4 py-2 text-sm font-medium text-void shadow-glow"
          >
            Back to doctors
          </button>
        </GlowCard>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <button
        onClick={() => navigate('/doctors')}
        className="focus-ring mb-6 flex items-center gap-2 text-sm text-ink-muted transition hover:text-ink"
      >
        <ArrowLeft size={16} />
        Back to doctors
      </button>

      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-bio/10 text-bio">
            <UserPlus size={21} />
          </div>

          <div>
            <h1 className="font-display text-3xl font-semibold text-ink">
              Add Doctor
            </h1>

            <p className="mt-1 text-sm text-ink-muted">
              Add a new doctor to the NexusCare medical team.
            </p>
          </div>
        </div>
      </div>

      <GlowCard>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-ink-muted">
                Doctor name
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Dr. Anil Kumar"
                className="focus-ring w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-ink outline-none placeholder:text-ink-faint"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-ink-muted">
                Specialty
              </label>

              <select
                name="specialty"
                value={form.specialty}
                onChange={handleChange}
                className="focus-ring w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-ink outline-none"
              >
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-ink-muted">
                Experience (years)
              </label>

              <input
                type="number"
                name="experienceYears"
                min="0"
                value={form.experienceYears}
                onChange={handleChange}
                placeholder="e.g. 10"
                className="focus-ring w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-ink outline-none placeholder:text-ink-faint"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-ink-muted">
                Rating
              </label>

              <input
                type="number"
                name="rating"
                min="0"
                max="5"
                step="0.1"
                value={form.rating}
                onChange={handleChange}
                className="focus-ring w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-ink outline-none"
              />

              <p className="mt-1 text-xs text-ink-faint">
                Value between 0 and 5
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm text-ink-muted">
                Patient count
              </label>

              <input
                type="number"
                name="patientCount"
                min="0"
                value={form.patientCount}
                onChange={handleChange}
                placeholder="e.g. 120"
                className="focus-ring w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-ink outline-none placeholder:text-ink-faint"
              />
            </div>

            <div className="flex items-center">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  name="available"
                  checked={form.available}
                  onChange={handleChange}
                  className="h-4 w-4 accent-bio"
                />

                <span>
                  <span className="block text-sm text-ink">
                    Currently available
                  </span>

                  <span className="block text-xs text-ink-faint">
                    Show this doctor as available for appointments
                  </span>
                </span>
              </label>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-ink-muted">
              Doctor bio
            </label>

            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows="5"
              placeholder="Enter a short professional biography..."
              className="focus-ring w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-ink outline-none placeholder:text-ink-faint"
            />
          </div>

          {error && (
            <div className="rounded-xl border border-vital-rose/20 bg-vital-rose/10 px-4 py-3 text-sm text-vital-rose">
              {error}
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 rounded-xl border border-bio/20 bg-bio/10 px-4 py-3 text-sm text-bio">
              <CheckCircle2 size={17} />
              {success}
            </div>
          )}

          <div className="flex justify-end gap-3 border-t border-white/5 pt-5">
            <button
              type="button"
              onClick={() => navigate('/doctors')}
              className="focus-ring rounded-full bg-white/5 px-5 py-2.5 text-sm text-ink-muted hover:bg-white/10 hover:text-ink"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="focus-ring flex items-center gap-2 rounded-full bg-bio px-5 py-2.5 text-sm font-medium text-void shadow-glow disabled:cursor-not-allowed disabled:opacity-60"
            >
              <UserPlus size={16} />

              {loading ? 'Adding doctor...' : 'Add doctor'}
            </button>
          </div>
        </form>
      </GlowCard>
    </div>
  )
}