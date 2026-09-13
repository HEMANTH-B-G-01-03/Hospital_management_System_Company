const mongoose = require('mongoose')

const billingSchema = new mongoose.Schema(
  {
    invoiceNumber: { type: String, required: true, unique: true },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    service: { type: String, required: true },
    amount: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ['Paid', 'Pending', 'Overdue'], default: 'Pending' },
    dueDate: { type: Date },
    paidAt: { type: Date },
    paymentMethod: { type: String, default: 'card' }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Billing', billingSchema)
