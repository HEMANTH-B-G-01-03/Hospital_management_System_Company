const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/User')
const Patient = require('../models/Patient')
const Doctor = require('../models/Doctor')

function signToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  })
}

function sanitize(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatarColor: user.avatarColor
  }
}

// POST /api/auth/register
const register = asyncHandler(async (req, res) => {
  const { name, email, password, role = 'patient', age, gender, bloodType, specialty } = req.body

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Name, email, and password are required')
  }

  const existing = await User.findOne({ email: email.toLowerCase() })
  if (existing) {
    res.status(409)
    throw new Error('An account with this email already exists')
  }

  const user = await User.create({ name, email, password, role })

  if (role === 'patient') {
    const patient = await Patient.create({
      user: user._id,
      name,
      age: age || 30,
      gender: gender || 'Other',
      bloodType: bloodType || 'O+',
      condition: 'General wellness'
    })
    user.patientProfile = patient._id
    await user.save()
  }

  if (role === 'doctor') {
    const doctor = await Doctor.create({
      user: user._id,
      name,
      specialty: specialty || 'General Medicine'
    })
    user.doctorProfile = doctor._id
    await user.save()
  }

  res.status(201).json({ user: sanitize(user), token: signToken(user._id) })
})

// POST /api/auth/login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400)
    throw new Error('Email and password are required')
  }

  const user = await User.findOne({ email: email.toLowerCase() }).select('+password')
  if (!user || !(await user.comparePassword(password))) {
    res.status(401)
    throw new Error('Invalid email or password')
  }

  res.json({ user: sanitize(user), token: signToken(user._id) })
})

// GET /api/auth/me
const getMe = asyncHandler(async (req, res) => {
  res.json({ user: sanitize(req.user) })
})

module.exports = { register, login, getMe }
