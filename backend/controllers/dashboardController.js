// const asyncHandler = require('express-async-handler')
// const Patient = require('../models/Patient')
// const Doctor = require('../models/Doctor')
// const Appointment = require('../models/Appointment')
// const Billing = require('../models/Billing')

// // GET /api/dashboard
// const getDashboard = asyncHandler(async (req, res) => {
//   // 1. Active patients
//   const activePatients = await Patient.countDocuments()

//   // 2. Doctors currently available
//   const onDutySpecialists = await Doctor.countDocuments({
//     available: true
//   })

//   // 3. Monthly revenue
//   const now = new Date()
//   const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
//   const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)

//   const monthlyRevenueResult = await Billing.aggregate([
//     {
//       $match: {
//         status: 'Paid',
//         $or: [
//           {
//             paidAt: {
//               $gte: startOfMonth,
//               $lt: startOfNextMonth
//             }
//           },
//           {
//             paidAt: null,
//             createdAt: {
//               $gte: startOfMonth,
//               $lt: startOfNextMonth
//             }
//           }
//         ]
//       }
//     },
//     {
//       $group: {
//         _id: null,
//         total: { $sum: '$amount' }
//       }
//     }
//   ])

//   const monthlyRevenue = monthlyRevenueResult[0]?.total || 0

//   // 4. Revenue for last 7 months
//   const sevenMonthsAgo = new Date(
//     now.getFullYear(),
//     now.getMonth() - 6,
//     1
//   )

//   const revenueData = await Billing.aggregate([
//     {
//       $match: {
//         status: 'Paid',
//         $or: [
//           {
//             paidAt: {
//               $gte: sevenMonthsAgo
//             }
//           },
//           {
//             paidAt: null,
//             createdAt: {
//               $gte: sevenMonthsAgo
//             }
//           }
//         ]
//       }
//     },
//     {
//       $project: {
//         amount: 1,
//         date: {
//           $ifNull: ['$paidAt', '$createdAt']
//         }
//       }
//     },
//     {
//       $group: {
//         _id: {
//           year: { $year: '$date' },
//           month: { $month: '$date' }
//         },
//         revenue: { $sum: '$amount' }
//       }
//     },
//     {
//       $sort: {
//         '_id.year': 1,
//         '_id.month': 1
//       }
//     }
//   ])

//   const monthNames = [
//     'Jan',
//     'Feb',
//     'Mar',
//     'Apr',
//     'May',
//     'Jun',
//     'Jul',
//     'Aug',
//     'Sep',
//     'Oct',
//     'Nov',
//     'Dec'
//   ]

//   const revenueByMonth = revenueData.map((item) => ({
//     month: `${monthNames[item._id.month - 1]} ${item._id.year}`,
//     revenue: item.revenue,
//     expenses: 0
//   }))

//   // 5. Admissions / appointments by department
//   const departmentData = await Appointment.aggregate([
//     {
//       $match: {
//         status: {
//           $ne: 'Cancelled'
//         }
//       }
//     },
//     {
//       $lookup: {
//         from: 'doctors',
//         localField: 'doctor',
//         foreignField: '_id',
//         as: 'doctorData'
//       }
//     },
//     {
//       $unwind: '$doctorData'
//     },
//     {
//       $group: {
//         _id: '$doctorData.specialty',
//         value: { $sum: 1 }
//       }
//     },
//     {
//       $sort: {
//         value: -1
//       }
//     }
//   ])

//   const admissionsByDept = departmentData.map((item) => ({
//     dept: item._id || 'Unknown',
//     value: item.value
//   }))

//   // 6. Recent activity
//   const recentAppointments = await Appointment.find()
//     .populate('doctor', 'name')
//     .populate('patient', 'name')
//     .sort({ createdAt: -1 })
//     .limit(4)

//   const recentActivity = recentAppointments.map((appointment) => ({
//     text: `${appointment.doctor?.name || 'Doctor'} has an appointment with ${appointment.patient?.name || 'patient'}`,
//     time: new Date(appointment.createdAt).toLocaleString()
//   }))

//   res.json({
//     activePatients,
//     onDutySpecialists,
//     monthlyRevenue,
//     bedOccupancy: null,
//     revenueByMonth,
//     admissionsByDept,
//     recentActivity
//   })
// })

// module.exports = {
//   getDashboard
// }



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

  // Current date
  const now = new Date()

  // 3. Revenue for last 7 months
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

  // 4. Monthly revenue
  // Prefer the current month's revenue.
  // If current month has no revenue, use the latest month
  // that has paid revenue so the dashboard does not show 0
  // when historical revenue is available.

  const currentMonthRevenue = revenueData.find(
    (item) =>
      item._id.year === now.getFullYear() &&
      item._id.month === now.getMonth() + 1
  )

  const latestRevenue =
    revenueData.length > 0
      ? revenueData[revenueData.length - 1].revenue
      : 0

  const monthlyRevenue =
    currentMonthRevenue?.revenue ?? latestRevenue

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
  // Use appointment date + time because some manually inserted
  // appointments may not have a valid createdAt value.
  const recentAppointments = await Appointment.find()
    .populate('doctor', 'name')
    .populate('patient', 'name')
    .sort({ date: -1 })
    .limit(4)

  const recentActivity = recentAppointments.map((appointment) => {
    let activityDate = null

    if (appointment.date) {
      const datePart = new Date(appointment.date)

      if (!Number.isNaN(datePart.getTime())) {
        const year = datePart.getFullYear()
        const month = String(datePart.getMonth() + 1).padStart(2, '0')
        const day = String(datePart.getDate()).padStart(2, '0')

        const timePart = appointment.time || '00:00'

        const combinedDate = new Date(
          `${year}-${month}-${day}T${timePart}:00`
        )

        if (!Number.isNaN(combinedDate.getTime())) {
          activityDate = combinedDate
        }
      }
    }

    const formattedTime = activityDate
      ? activityDate.toLocaleString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        })
      : 'Date unavailable'

    return {
      text: `${appointment.doctor?.name || 'Doctor'} has an appointment with ${
        appointment.patient?.name || 'patient'
      }`,
      time: formattedTime
    }
  })

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