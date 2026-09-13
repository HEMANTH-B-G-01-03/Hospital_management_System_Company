import React from 'react'
import { Link } from 'react-router-dom'
import { Activity } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-72px)] flex-col items-center justify-center gap-4 px-6 text-center">
      <Activity size={32} className="text-bio" />
      <h1 className="font-display text-4xl font-semibold text-ink">Page not found</h1>
      <p className="max-w-sm text-ink-muted">The page you're looking for was moved, renamed, or never existed.</p>
      <Link to="/" className="focus-ring mt-2 rounded-full bg-bio px-6 py-3 text-sm font-medium text-void shadow-glow">
        Back to home
      </Link>
    </div>
  )
}
