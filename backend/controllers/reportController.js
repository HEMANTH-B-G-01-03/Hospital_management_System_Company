const asyncHandler = require('express-async-handler')
const Billing = require('../models/Billing')
const Appointment = require('../models/Appointment')

// GET /api/reports
const getReports = asyncHandler(async (req, res) => {
  // --------------------------------------------------
  // 1. MONTHLY REVENUE
  // --------------------------------------------------

  const revenueData = await Billing.aggregate([
    {
      $match: {
        status: 'Paid'
      }
    },
    {
      $group: {
        _id: {
          year: {
            $year: {
              $ifNull: ['$paidAt', '$createdAt']
            }
          },
          month: {
            $month: {
              $ifNull: ['$paidAt', '$createdAt']
            }
          }
        },
        revenue: {
          $sum: '$amount'
        }
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
    revenue: item.revenue
  }))

  // --------------------------------------------------
  // 2. ADMISSIONS / APPOINTMENTS BY DEPARTMENT
  // --------------------------------------------------

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
        value: {
          $sum: 1
        }
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

  // --------------------------------------------------
  // 3. INVOICES
  // --------------------------------------------------

  const invoices = await Billing.find()
    .populate('patient', 'name')
    .sort({ createdAt: -1 })

  const formattedInvoices = invoices.map((invoice) => ({
    id: invoice.invoiceNumber,
    patient: invoice.patient?.name || 'Unknown',
    service: invoice.service,
    date: invoice.dueDate
      ? invoice.dueDate.toISOString().split('T')[0]
      : invoice.createdAt.toISOString().split('T')[0],
    amount: invoice.amount,
    status: invoice.status
  }))

  // --------------------------------------------------
  // RESPONSE
  // --------------------------------------------------

  res.json({
    revenueByMonth,
    admissionsByDept,
    invoices: formattedInvoices
  })
})

module.exports = {
  getReports
}