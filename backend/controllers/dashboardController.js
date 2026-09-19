const asyncHandler = require('express-async-handler')
const Patient = require('../models/Patient')
const Doctor = require('../models/Doctor')
const Appointment = require('../models/Appointment')
const Billing = require('../models/Billing')

// GET /api/dashboard
const getDashboard = asyncHandler(async (req, res) => {
  // 1. Active patients
  const activePatients = await Patient.countDocuments()

  // 2. Doctors currently available
  const onDutySpecialists = await Doctor.countDocuments({
    available: true
  })

  // 3. Monthly revenue
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)

  const monthlyRevenueResult = await Billing.aggregate([
    {
      $match: {
        status: 'Paid',
        $or: [
          {
            paidAt: {
              $gte: startOfMonth,
              $lt: startOfNextMonth
            }
          },
          {
            paidAt: null,
            createdAt: {
              $gte: startOfMonth,
              $lt: startOfNextMonth
            }
          }
        ]
      }
    },
    {
      $group: {
        _id: null,
        total: { $sum: '$amount' }
      }
    }
  ])

  const monthlyRevenue = monthlyRevenueResult[0]?.total || 0

  // 4. Revenue for last 7 months
  const sevenMonthsAgo = new Date(
    now.getFullYear(),
    now.getMonth() - 6,
    1
  )

  const revenueData = await Billing.aggregate([
    {
      $match: {
        status: 'Paid',
        $or: [
          {
            paidAt: {
              $gte: sevenMonthsAgo
            }
          },
          {
            paidAt: null,
            createdAt: {
              $gte: sevenMonthsAgo
            }
          }
        ]
      }
    },
    {
      $project: {
        amount: 1,
        date: {
          $ifNull: ['$paidAt', '$createdAt']
        }
      }
    },
    {
      $group: {
        _id: {
          year: { $year: '$date' },
          month: { $month: '$date' }
        },
        revenue: { $sum: '$amount' }
      }
    },
    {
      $sort: {
        '_id.year': 1,
        '_id.month': 1
      }
    }
  ])

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]

  const revenueByMonth = revenueData.map((item) => ({
    month: `${monthNames[item._id.month - 1]} ${item._id.year}`,
    revenue: item.revenue,
    expenses: 0
  }))

  // 5. Admissions / appointments by department
  const departmentData = await Appointment.aggregate([
    {
      $match: {
        status: {
          $ne: 'Cancelled'
        }
      }
    },
    {
      $lookup: {
        from: 'doctors',
        localField: 'doctor',
        foreignField: '_id',
        as: 'doctorData'
      }
    },
    {
      $unwind: '$doctorData'
    },
    {
      $group: {
        _id: '$doctorData.specialty',
        value: { $sum: 1 }
      }
    },
    {
      $sort: {
        value: -1
      }
    }
  ])

  const admissionsByDept = departmentData.map((item) => ({
    dept: item._id || 'Unknown',
    value: item.value
  }))

  // 6. Recent activity
  const recentAppointments = await Appointment.find()
    .populate('doctor', 'name')
    .populate('patient', 'name')
    .sort({ createdAt: -1 })
    .limit(4)

  const recentActivity = recentAppointments.map((appointment) => ({
    text: `${appointment.doctor?.name || 'Doctor'} has an appointment with ${appointment.patient?.name || 'patient'}`,
    time: new Date(appointment.createdAt).toLocaleString()
  }))

  res.json({
    activePatients,
    onDutySpecialists,
    monthlyRevenue,
    bedOccupancy: null,
    revenueByMonth,
    admissionsByDept,
    recentActivity
  })
})

module.exports = {
  getDashboard
}