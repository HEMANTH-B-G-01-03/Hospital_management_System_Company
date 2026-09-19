const path = require('path')
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const connectDB = require('./config/db')
const { notFound, errorHandler } = require('./middleware/errorHandler')

const authRoutes = require('./routes/auth')
const doctorRoutes = require('./routes/doctors')
const patientRoutes = require('./routes/patients')
const appointmentRoutes = require('./routes/appointments')
const billingRoutes = require('./routes/billing')
const reportRoutes = require('./routes/reports')
const dashboardRoutes = require('./routes/dashboard')
const app = express()

app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173', credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'))

app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'nexuscare-api', time: new Date().toISOString() }))

app.use('/api/auth', authRoutes)
app.use('/api/doctors', doctorRoutes)
app.use('/api/patients', patientRoutes)
app.use('/api/appointments', appointmentRoutes)
app.use('/api/billing', billingRoutes)

app.use('/api/reports', reportRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 5000

async function start() {
  await connectDB()
  app.listen(PORT, () => console.log(`NexusCare API listening on http://localhost:${PORT}`))
}

start()

module.exports = app
