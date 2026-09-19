const express = require('express')
const { getReports } = require('../controllers/reportController')
const { protect, authorize } = require('../middleware/auth')

const router = express.Router()

router.get('/', protect, authorize('admin'), getReports)

module.exports = router