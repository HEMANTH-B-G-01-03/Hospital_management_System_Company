const asyncHandler = require('express-async-handler')
const Appointment = require('../models/Appointment')

// GET /api/appointments
const getAppointments = asyncHandler(async (req, res) => {
  const { doctor, patient, date } = req.query
  const filter = {}
  if (doctor) filter.doctor = doctor
  if (patient) filter.patient = patient
  if (date) filter.date = new Date(date)

  const appointments = await Appointment.find(filter)
    .populate('doctor', 'name specialty')
    .populate('patient', 'name')
    .sort({ date: 1, time: 1 })
  res.json(appointments)
})

// POST /api/appointments
const createAppointment = asyncHandler(async (req, res) => {
  const { patient, doctor, date, time, type, notes } = req.body

  const conflict = await Appointment.findOne({ doctor, date, time, status: { $ne: 'Cancelled' } })
  if (conflict) {
    res.status(409)
    throw new Error('That time slot was just taken — pick another one')
  }

  const appointment = await Appointment.create({ patient, doctor, date, time, type, notes })
  res.status(201).json(appointment)
})

// PUT /api/appointments/:id
const updateAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
  if (!appointment) {
    res.status(404)
    throw new Error('Appointment not found')
  }
  res.json(appointment)
})

// DELETE /api/appointments/:id
const cancelAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findByIdAndUpdate(req.params.id, { status: 'Cancelled' }, { new: true })
  if (!appointment) {
    res.status(404)
    throw new Error('Appointment not found')
  }
  res.json(appointment)
})

module.exports = { getAppointments, createAppointment, updateAppointment, cancelAppointment }
