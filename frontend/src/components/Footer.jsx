import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-void/40">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5">
              <img src={logo} alt="" className="h-8 w-8" />
              <span className="font-display text-base font-semibold text-ink">NexusCare</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              Care coordination software for hospitals that want their technology to feel as advanced as their medicine.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <p className="text-sm font-medium text-ink">Platform</p>
              <ul className="mt-3 space-y-2 text-sm text-ink-muted">
                <li><Link to="/doctors" className="hover:text-bio">Doctors</Link></li>
                <li><Link to="/appointments" className="hover:text-bio">Appointments</Link></li>
                <li><Link to="/reports" className="hover:text-bio">Reports</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-medium text-ink">Account</p>
              <ul className="mt-3 space-y-2 text-sm text-ink-muted">
                <li><Link to="/login" className="hover:text-bio">Log in</Link></li>
                <li><Link to="/signup" className="hover:text-bio">Create account</Link></li>
                <li><Link to="/settings" className="hover:text-bio">Settings</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-medium text-ink">Company</p>
              <ul className="mt-3 space-y-2 text-sm text-ink-muted">
                <li className="text-ink-faint">Privacy</li>
                <li className="text-ink-faint">Terms</li>
                <li className="text-ink-faint">Contact</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-white/5 pt-6 text-xs text-ink-faint sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} NexusCare. All demo data.</span>
          <span>Built with React, Tailwind, and React Three Fiber.</span>
        </div>
      </div>
    </footer>
  )
}
