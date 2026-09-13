export const doctors = [
  { id: 'd1', name: 'Dr. Amara Osei', specialty: 'Cardiology', rating: 4.9, patients: 812, exp: 12, avatarSeed: 'amara', available: true, bio: 'Interventional cardiologist focused on minimally invasive procedures.' },
  { id: 'd2', name: 'Dr. Kenji Watanabe', specialty: 'Neurology', rating: 4.8, patients: 634, exp: 9, avatarSeed: 'kenji', available: true, bio: 'Specialist in movement disorders and neurodegenerative disease.' },
  { id: 'd3', name: 'Dr. Priya Nair', specialty: 'Pediatrics', rating: 5.0, patients: 1023, exp: 15, avatarSeed: 'priya', available: false, bio: 'Two decades of pediatric primary care and vaccination programs.' },
  { id: 'd4', name: 'Dr. Lucas Ferreira', specialty: 'Orthopedics', rating: 4.7, patients: 540, exp: 8, avatarSeed: 'lucas', available: true, bio: 'Sports medicine and joint reconstruction specialist.' },
  { id: 'd5', name: 'Dr. Sofia Marin', specialty: 'Dermatology', rating: 4.9, patients: 702, exp: 11, avatarSeed: 'sofia', available: true, bio: 'Medical and cosmetic dermatology with a focus on early detection.' },
  { id: 'd6', name: 'Dr. Ibrahim Al-Farsi', specialty: 'Oncology', rating: 4.8, patients: 388, exp: 14, avatarSeed: 'ibrahim', available: false, bio: 'Precision oncology and clinical trial lead.' },
  { id: 'd7', name: 'Dr. Hana Kobayashi', specialty: 'Psychiatry', rating: 4.9, patients: 455, exp: 10, avatarSeed: 'hana', available: true, bio: 'Adult psychiatry with a focus on anxiety and mood disorders.' },
  { id: 'd8', name: 'Dr. Noah Bergström', specialty: 'General Surgery', rating: 4.6, patients: 610, exp: 13, avatarSeed: 'noah', available: true, bio: 'Laparoscopic and robotic-assisted general surgery.' }
]

export const specialties = [...new Set(doctors.map((d) => d.specialty))]

export const patients = [
  { id: 'p1', name: 'Ethan Wright', age: 34, gender: 'Male', condition: 'Hypertension', lastVisit: '2026-08-14', doctor: 'Dr. Amara Osei', bloodType: 'O+', status: 'Stable' },
  { id: 'p2', name: 'Maria Chen', age: 27, gender: 'Female', condition: 'Migraine', lastVisit: '2026-09-01', doctor: 'Dr. Kenji Watanabe', bloodType: 'A-', status: 'Improving' },
  { id: 'p3', name: 'Aiden Kim', age: 6, gender: 'Male', condition: 'Routine Checkup', lastVisit: '2026-08-28', doctor: 'Dr. Priya Nair', bloodType: 'B+', status: 'Stable' },
  { id: 'p4', name: 'Fatima Zahra', age: 52, gender: 'Female', condition: 'Knee Replacement Recovery', lastVisit: '2026-09-05', doctor: 'Dr. Lucas Ferreira', bloodType: 'AB+', status: 'Monitoring' },
  { id: 'p5', name: 'Daniel Osei', age: 41, gender: 'Male', condition: 'Skin Biopsy Follow-up', lastVisit: '2026-08-22', doctor: 'Dr. Sofia Marin', bloodType: 'O-', status: 'Stable' },
  { id: 'p6', name: 'Grace Liu', age: 63, gender: 'Female', condition: 'Chemotherapy Cycle 4', lastVisit: '2026-09-08', doctor: 'Dr. Ibrahim Al-Farsi', bloodType: 'A+', status: 'Critical' },
  { id: 'p7', name: 'Omar Haddad', age: 30, gender: 'Male', condition: 'Anxiety Management', lastVisit: '2026-09-10', doctor: 'Dr. Hana Kobayashi', bloodType: 'B-', status: 'Improving' }
]

export const appointments = [
  { id: 'a1', patient: 'Ethan Wright', doctor: 'Dr. Amara Osei', date: '2026-09-15', time: '09:00', type: 'Follow-up', status: 'Confirmed' },
  { id: 'a2', patient: 'Maria Chen', doctor: 'Dr. Kenji Watanabe', date: '2026-09-15', time: '10:30', type: 'Consultation', status: 'Confirmed' },
  { id: 'a3', patient: 'Aiden Kim', doctor: 'Dr. Priya Nair', date: '2026-09-16', time: '13:00', type: 'Checkup', status: 'Pending' },
  { id: 'a4', patient: 'Fatima Zahra', doctor: 'Dr. Lucas Ferreira', date: '2026-09-17', time: '11:15', type: 'Physiotherapy', status: 'Confirmed' },
  { id: 'a5', patient: 'Grace Liu', doctor: 'Dr. Ibrahim Al-Farsi', date: '2026-09-18', time: '08:45', type: 'Treatment', status: 'Confirmed' },
  { id: 'a6', patient: 'Omar Haddad', doctor: 'Dr. Hana Kobayashi', date: '2026-09-19', time: '15:30', type: 'Therapy', status: 'Pending' }
]

export const invoices = [
  { id: 'INV-2041', patient: 'Ethan Wright', service: 'Cardiac Consultation', amount: 240, status: 'Paid', date: '2026-08-14' },
  { id: 'INV-2042', patient: 'Maria Chen', service: 'Neurology Scan', amount: 480, status: 'Paid', date: '2026-09-01' },
  { id: 'INV-2043', patient: 'Fatima Zahra', service: 'Physiotherapy Session', amount: 120, status: 'Pending', date: '2026-09-05' },
  { id: 'INV-2044', patient: 'Grace Liu', service: 'Chemotherapy Cycle', amount: 1850, status: 'Pending', date: '2026-09-08' },
  { id: 'INV-2045', patient: 'Omar Haddad', service: 'Psychiatry Session', amount: 160, status: 'Overdue', date: '2026-08-20' },
  { id: 'INV-2046', patient: 'Aiden Kim', service: 'Pediatric Checkup', amount: 90, status: 'Paid', date: '2026-08-28' }
]

export const revenueByMonth = [
  { month: 'Mar', revenue: 42000, expenses: 28000 },
  { month: 'Apr', revenue: 45500, expenses: 29500 },
  { month: 'May', revenue: 48200, expenses: 30800 },
  { month: 'Jun', revenue: 51000, expenses: 31200 },
  { month: 'Jul', revenue: 49800, expenses: 32000 },
  { month: 'Aug', revenue: 56400, expenses: 33500 },
  { month: 'Sep', revenue: 61200, expenses: 34100 }
]

export const admissionsByDept = [
  { dept: 'Cardiology', value: 186 },
  { dept: 'Neurology', value: 142 },
  { dept: 'Pediatrics', value: 231 },
  { dept: 'Orthopedics', value: 128 },
  { dept: 'Oncology', value: 94 },
  { dept: 'Psychiatry', value: 103 }
]

export const vitalsTrend = [
  { day: 'Mon', heartRate: 72, spo2: 98 },
  { day: 'Tue', heartRate: 75, spo2: 97 },
  { day: 'Wed', heartRate: 70, spo2: 98 },
  { day: 'Thu', heartRate: 78, spo2: 96 },
  { day: 'Fri', heartRate: 74, spo2: 98 },
  { day: 'Sat', heartRate: 71, spo2: 99 },
  { day: 'Sun', heartRate: 73, spo2: 98 }
]

export function currency(n) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}
