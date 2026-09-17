// const asyncHandler = require('express-async-handler')
// const Doctor = require('../models/Doctor')

// // GET /api/doctors
// const getDoctors = asyncHandler(async (req, res) => {
//   const { specialty, search } = req.query
//   const filter = {}
//   if (specialty && specialty !== 'All') filter.specialty = specialty
//   if (search) filter.name = { $regex: search, $options: 'i' }

//   const doctors = await Doctor.find(filter).sort({ rating: -1 })
//   res.json(doctors)
// })

// // GET /api/doctors/:id
// const getDoctorById = asyncHandler(async (req, res) => {
//   const doctor = await Doctor.findById(req.params.id)
//   if (!doctor) {
//     res.status(404)
//     throw new Error('Doctor not found')
//   }
//   res.json(doctor)
// })

// // POST /api/doctors
// const createDoctor = asyncHandler(async (req, res) => {
//   const doctor = await Doctor.create(req.body)
//   res.status(201).json(doctor)
// })

// // PUT /api/doctors/:id
// const updateDoctor = asyncHandler(async (req, res) => {
//   const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
//   if (!doctor) {
//     res.status(404)
//     throw new Error('Doctor not found')
//   }
//   res.json(doctor)
// })

// // DELETE /api/doctors/:id
// const deleteDoctor = asyncHandler(async (req, res) => {
//   const doctor = await Doctor.findByIdAndDelete(req.params.id)
//   if (!doctor) {
//     res.status(404)
//     throw new Error('Doctor not found')
//   }
//   res.json({ message: 'Doctor removed' })
// })

// module.exports = { getDoctors, getDoctorById, createDoctor, updateDoctor, deleteDoctor }






const asyncHandler = require('express-async-handler')
const Doctor = require('../models/Doctor')

// GET /api/doctors
const getDoctors = asyncHandler(async (req, res) => {
  const { specialty, search } = req.query
  const filter = {}

  if (specialty && specialty !== 'All') {
    filter.specialty = specialty
  }

  if (search) {
    filter.name = { $regex: search, $options: 'i' }
  }

  const doctors = await Doctor.find(filter).sort({ rating: -1 })

  res.json(doctors)
})

// GET /api/doctors/:id
const getDoctorById = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id)

  if (!doctor) {
    res.status(404)
    throw new Error('Doctor not found')
  }

  res.json(doctor)
})

// POST /api/doctors
const createDoctor = asyncHandler(async (req, res) => {
  const {
    name,
    specialty,
    bio,
    experienceYears,
    rating,
    patientCount,
    available,
    weeklyAvailability
  } = req.body

  if (!name || !name.trim()) {
    res.status(400)
    throw new Error('Doctor name is required')
  }

  if (!specialty || !specialty.trim()) {
    res.status(400)
    throw new Error('Specialty is required')
  }

  const doctor = await Doctor.create({
    name: name.trim(),
    specialty: specialty.trim(),
    bio: bio || '',
    experienceYears: Number(experienceYears) || 0,
    rating:
      rating !== undefined && rating !== ''
        ? Number(rating)
        : 4.5,
    patientCount:
      patientCount !== undefined && patientCount !== ''
        ? Number(patientCount)
        : 0,
    available:
      available !== undefined
        ? Boolean(available)
        : true,
    weeklyAvailability: weeklyAvailability || []
  })

  res.status(201).json(doctor)
})

// PUT /api/doctors/:id
const updateDoctor = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  )

  if (!doctor) {
    res.status(404)
    throw new Error('Doctor not found')
  }

  res.json(doctor)
})

// DELETE /api/doctors/:id
const deleteDoctor = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findByIdAndDelete(req.params.id)

  if (!doctor) {
    res.status(404)
    throw new Error('Doctor not found')
  }

  res.json({ message: 'Doctor removed' })
})

module.exports = {
  getDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor
}