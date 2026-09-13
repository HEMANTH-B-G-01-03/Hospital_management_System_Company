const express = require('express')
const {
  getAppointments,
  createAppointment,
  updateAppointment,
  cancelAppointment
} = require('../controllers/appointmentController')
const { protect } = require('../middleware/auth')

const router = express.Router()

router.get('/', protect, getAppointments)
router.post('/', protect, createAppointment)
router.put('/:id', protect, updateAppointment)
router.delete('/:id', protect, cancelAppointment)

module.exports = router
