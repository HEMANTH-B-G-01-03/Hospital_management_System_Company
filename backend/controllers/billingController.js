const asyncHandler = require('express-async-handler')
const Billing = require('../models/Billing')

// GET /api/billing
const getInvoices = asyncHandler(async (req, res) => {
  const { status, patient } = req.query
  const filter = {}
  if (status) filter.status = status
  if (patient) filter.patient = patient

  const invoices = await Billing.find(filter).populate('patient', 'name').sort({ createdAt: -1 })
  res.json(invoices)
})

// POST /api/billing
const createInvoice = asyncHandler(async (req, res) => {
  const count = await Billing.countDocuments()
  const invoiceNumber = `INV-${2000 + count + 1}`
  const invoice = await Billing.create({ ...req.body, invoiceNumber })
  res.status(201).json(invoice)
})

// PUT /api/billing/:id/pay
const markPaid = asyncHandler(async (req, res) => {
  const invoice = await Billing.findByIdAndUpdate(
    req.params.id,
    { status: 'Paid', paidAt: new Date() },
    { new: true }
  )
  if (!invoice) {
    res.status(404)
    throw new Error('Invoice not found')
  }
  res.json(invoice)
})

// GET /api/billing/summary
const getSummary = asyncHandler(async (req, res) => {
  const invoices = await Billing.find()
  const paid = invoices.filter((i) => i.status === 'Paid').reduce((s, i) => s + i.amount, 0)
  const outstanding = invoices.filter((i) => i.status !== 'Paid').reduce((s, i) => s + i.amount, 0)
  res.json({ paid, outstanding, invoiceCount: invoices.length })
})

module.exports = { getInvoices, createInvoice, markPaid, getSummary }
