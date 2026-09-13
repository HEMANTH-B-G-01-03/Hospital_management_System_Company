require('dotenv').config()
const mongoose = require('mongoose')
const connectDB = require('./config/db')
const User = require('./models/User')
const Doctor = require('./models/Doctor')
const Patient = require('./models/Patient')
const Appointment = require('./models/Appointment')
const Billing = require('./models/Billing')

const doctorSeed = [
  { name: 'Dr. Amara Osei', specialty: 'Cardiology', rating: 4.9, patientCount: 812, experienceYears: 12, bio: 'Interventional cardiologist focused on minimally invasive procedures.' },
  { name: 'Dr. Kenji Watanabe', specialty: 'Neurology', rating: 4.8, patientCount: 634, experienceYears: 9, bio: 'Specialist in movement disorders and neurodegenerative disease.' },
  { name: 'Dr. Priya Nair', specialty: 'Pediatrics', rating: 5.0, patientCount: 1023, experienceYears: 15, bio: 'Two decades of pediatric primary care and vaccination programs.' },
  { name: 'Dr. Lucas Ferreira', specialty: 'Orthopedics', rating: 4.7, patientCount: 540, experienceYears: 8, bio: 'Sports medicine and joint reconstruction specialist.' },
  { name: 'Dr. Sofia Marin', specialty: 'Dermatology', rating: 4.9, patientCount: 702, experienceYears: 11, bio: 'Medical and cosmetic dermatology with a focus on early detection.' }
]

async function seed() {
  await connectDB()
  console.log('Clearing existing collections…')
  await Promise.all([
    User.deleteMany({}),
    Doctor.deleteMany({}),
    Patient.deleteMany({}),
    Appointment.deleteMany({}),
    Billing.deleteMany({})
  ])

  console.log('Seeding admin account…')
  await User.create({ name: 'Admin User', email: 'admin@nexuscare.dev', password: 'password123', role: 'admin' })

  console.log('Seeding doctors…')
  const doctors = await Doctor.insertMany(doctorSeed)

  console.log('Seeding patients…')
  const patients = await Patient.insertMany([
    { name: 'Ethan Wright', age: 34, gender: 'Male', bloodType: 'O+', condition: 'Hypertension', status: 'Stable', primaryDoctor: doctors[0]._id, lastVisit: new Date('2026-08-14') },
    { name: 'Maria Chen', age: 27, gender: 'Female', bloodType: 'A-', condition: 'Migraine', status: 'Improving', primaryDoctor: doctors[1]._id, lastVisit: new Date('2026-09-01') },
    { name: 'Aiden Kim', age: 6, gender: 'Male', bloodType: 'B+', condition: 'Routine Checkup', status: 'Stable', primaryDoctor: doctors[2]._id, lastVisit: new Date('2026-08-28') },
    { name: 'Fatima Zahra', age: 52, gender: 'Female', bloodType: 'AB+', condition: 'Knee Replacement Recovery', status: 'Monitoring', primaryDoctor: doctors[3]._id, lastVisit: new Date('2026-09-05') }
  ])

  console.log('Seeding appointments…')
  await Appointment.insertMany([
    { patient: patients[0]._id, doctor: doctors[0]._id, date: new Date('2026-09-15'), time: '09:00', type: 'Follow-up', status: 'Confirmed' },
    { patient: patients[1]._id, doctor: doctors[1]._id, date: new Date('2026-09-15'), time: '10:30', type: 'Consultation', status: 'Confirmed' },
    { patient: patients[2]._id, doctor: doctors[2]._id, date: new Date('2026-09-16'), time: '13:00', type: 'Checkup', status: 'Pending' }
  ])

  console.log('Seeding invoices…')
  await Billing.insertMany([
    { invoiceNumber: 'INV-2041', patient: patients[0]._id, service: 'Cardiac Consultation', amount: 240, status: 'Paid' },
    { invoiceNumber: 'INV-2042', patient: patients[1]._id, service: 'Neurology Scan', amount: 480, status: 'Paid' },
    { invoiceNumber: 'INV-2043', patient: patients[3]._id, service: 'Physiotherapy Session', amount: 120, status: 'Pending' }
  ])

  console.log('Seed complete. Admin login: admin@nexuscare.dev / password123')
  await mongoose.disconnect()
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
