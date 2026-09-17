import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Appointments from './pages/Appointments.jsx'
import PatientRecords from './pages/PatientRecords.jsx'
import Billing from './pages/Billing.jsx'
import Doctors from './pages/Doctors.jsx'
import Reports from './pages/Reports.jsx'
import Settings from './pages/Settings.jsx'
import NotFound from './pages/NotFound.jsx'

import AddDoctor from './pages/AddDoctor.jsx'

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Landing /></PageTransition>} />
            <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
            <Route path="/signup" element={<PageTransition><Signup /></PageTransition>} />
            <Route path="/doctors" element={<PageTransition><Doctors /></PageTransition>} />

            <Route path="/dashboard" element={<ProtectedRoute><PageTransition><Dashboard /></PageTransition></ProtectedRoute>} />
            <Route path="/appointments" element={<ProtectedRoute><PageTransition><Appointments /></PageTransition></ProtectedRoute>} />
            <Route path="/records" element={<ProtectedRoute><PageTransition><PatientRecords /></PageTransition></ProtectedRoute>} />
            <Route path="/billing" element={<ProtectedRoute><PageTransition><Billing /></PageTransition></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute><PageTransition><Reports /></PageTransition></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><PageTransition><Settings /></PageTransition></ProtectedRoute>} />

            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />

            <Route
  path="/doctors/add"
  element={
    <ProtectedRoute>
      <PageTransition>
        <AddDoctor />
      </PageTransition>
    </ProtectedRoute>
  }
/>


<Route path="/doctors" element={<PageTransition><Doctors /></PageTransition>} />

<Route
  path="/doctors/add"
  element={
    <ProtectedRoute>
      <PageTransition>
        <AddDoctor />
      </PageTransition>
    </ProtectedRoute>
  }
/>
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}
