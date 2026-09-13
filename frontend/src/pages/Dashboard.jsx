import React from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import DashboardAdmin from './DashboardAdmin.jsx'
import DashboardDoctor from './DashboardDoctor.jsx'
import DashboardPatient from './DashboardPatient.jsx'

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm capitalize text-ink-muted">{user?.role} console</p>
          <h1 className="font-display text-3xl font-semibold text-ink">Dashboard</h1>
        </div>
      </div>

      {user?.role === 'admin' && <DashboardAdmin />}
      {user?.role === 'doctor' && <DashboardDoctor />}
      {(!user?.role || user?.role === 'patient') && <DashboardPatient />}
    </div>
  )
}
