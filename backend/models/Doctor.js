const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    specialty: { type: String, required: true },
    bio: { type: String, default: '' },
    experienceYears: { type: Number, default: 0 },
    rating: { type: Number, default: 4.5, min: 0, max: 5 },
    patientCount: { type: Number, default: 0 },
    available: { type: Boolean, default: true },
    weeklyAvailability: [
      {
        day: { type: String, enum: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
        slots: [String]
      }
    ]
  },
  { timestamps: true }
)

module.exports = mongoose.model('Doctor', doctorSchema)
