const express = require('express')
const {
  getPatients,
  getPatientById,
  createPatient,
  updatePatient,
  addHistoryNote,
  deletePatient
} = require('../controllers/patientController')
const { protect, authorize } = require('../middleware/auth')

const router = express.Router()

router.get('/', protect, authorize('admin', 'doctor'), getPatients)
router.get('/:id', protect, getPatientById)
router.post('/', protect, authorize('admin', 'doctor'), createPatient)
router.put('/:id', protect, authorize('admin', 'doctor'), updatePatient)
router.post('/:id/history', protect, authorize('admin', 'doctor'), addHistoryNote)
router.delete('/:id', protect, authorize('admin'), deletePatient)

module.exports = router
