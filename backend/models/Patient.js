const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    bloodType: { type: String, required: true },
    condition: { type: String, default: '' },
    status: { type: String, enum: ['Stable', 'Improving', 'Monitoring', 'Critical'], default: 'Stable' },
    primaryDoctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
    lastVisit: { type: Date },
    history: [
      {
        note: String,
        author: String,
        createdAt: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
)

module.exports = mongoose.model('Patient', patientSchema)
