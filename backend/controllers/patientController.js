const asyncHandler = require('express-async-handler')
const Patient = require('../models/Patient')

// GET /api/patients
const getPatients = asyncHandler(async (req, res) => {
  const { search } = req.query
  const filter = {}
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { condition: { $regex: search, $options: 'i' } }
    ]
  }
  const patients = await Patient.find(filter).populate('primaryDoctor', 'name specialty').sort({ updatedAt: -1 })
  res.json(patients)
})

// GET /api/patients/:id
const getPatientById = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id).populate('primaryDoctor', 'name specialty')
  if (!patient) {
    res.status(404)
    throw new Error('Patient not found')
  }
  res.json(patient)
})

// POST /api/patients
const createPatient = asyncHandler(async (req, res) => {
  const patient = await Patient.create(req.body)
  res.status(201).json(patient)
})

// PUT /api/patients/:id
const updatePatient = asyncHandler(async (req, res) => {
  const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
  if (!patient) {
    res.status(404)
    throw new Error('Patient not found')
  }
  res.json(patient)
})

// POST /api/patients/:id/history
const addHistoryNote = asyncHandler(async (req, res) => {
  const { note, author } = req.body
  const patient = await Patient.findById(req.params.id)
  if (!patient) {
    res.status(404)
    throw new Error('Patient not found')
  }
  patient.history.push({ note, author })
  await patient.save()
  res.status(201).json(patient)
})

// DELETE /api/patients/:id
const deletePatient = asyncHandler(async (req, res) => {
  const patient = await Patient.findByIdAndDelete(req.params.id)
  if (!patient) {
    res.status(404)
    throw new Error('Patient not found')
  }
  res.json({ message: 'Patient record removed' })
})

module.exports = { getPatients, getPatientById, createPatient, updatePatient, addHistoryNote, deletePatient }
