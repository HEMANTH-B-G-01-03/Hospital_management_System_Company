const express = require('express')
const { getInvoices, createInvoice, markPaid, getSummary } = require('../controllers/billingController')
const { protect, authorize } = require('../middleware/auth')

const router = express.Router()

router.get('/', protect, getInvoices)
router.get('/summary', protect, authorize('admin'), getSummary)
router.post('/', protect, authorize('admin'), createInvoice)
router.put('/:id/pay', protect, markPaid)

module.exports = router
