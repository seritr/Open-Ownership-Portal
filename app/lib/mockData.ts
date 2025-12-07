// lib/mockData.ts
export const mockApplications = [
  {
    id: 'APP-2024-001',
    type: 'Trading License',
    status: 'pending',
    submittedBy: 'Chanda Mwansa',
    date: '2024-12-05',
    amount: 350,
    priority: 'high',
    daysInProcess: 2,
    nextAction: 'Council inspection',
    assignedTo: 'Lusaka City Council'
  },
  {
    id: 'APP-2024-002',
    type: 'Business Name Registration',
    status: 'approved',
    submittedBy: 'Thandiwe Zulu',
    date: '2024-12-04',
    amount: 416,
    priority: 'medium',
    daysInProcess: 8,
    nextAction: 'Certificate ready for download',
    assignedTo: 'PACRA'
  },
  {
    id: 'APP-2024-003',
    type: 'Health Permit',
    status: 'review',
    submittedBy: 'Lackson Phiri',
    date: '2024-12-03',
    amount: 120,
    priority: 'low',
    daysInProcess: 4,
    nextAction: 'Health inspection scheduling',
    assignedTo: 'Public Health Dept.'
  },
  {
    id: 'APP-2024-004',
    type: 'Liquor License',
    status: 'rejected',
    submittedBy: 'Mutinta Mweemba',
    date: '2024-12-02',
    amount: 600,
    priority: 'medium',
    daysInProcess: 10,
    nextAction: 'Appeal or resubmit',
    assignedTo: 'Liquor Licensing Committee'
  },
  {
    id: 'APP-2024-005',
    type: 'Fire Safety Certificate',
    status: 'pending',
    submittedBy: 'Benny Banda',
    date: '2024-12-01',
    amount: 250,
    priority: 'high',
    daysInProcess: 6,
    nextAction: 'Station Commander approval',
    assignedTo: 'Zambia Fire Brigade'
  },
  {
    id: 'APP-2024-006',
    type: 'Environmental Clearance',
    status: 'review',
    submittedBy: 'Mwape Chileshe',
    date: '2024-11-30',
    amount: 800,
    priority: 'high',
    daysInProcess: 7,
    nextAction: 'ZEMA environmental screening',
    assignedTo: 'ZEMA'
  },
];

export const mockPayments = [
  {
    id: 'PAY-001',
    application: 'APP-2024-001',
    appType: 'Trading License',
    amount: 350,
    dueDate: '2024-12-10',
    status: 'pending',
    daysUntilDue: 3
  },
  {
    id: 'PAY-002',
    application: 'APP-2024-005',
    appType: 'Fire Safety Certificate',
    amount: 250,
    dueDate: '2024-12-08',
    status: 'overdue',
    daysUntilDue: -1
  },
  {
    id: 'PAY-003',
    application: 'APP-2024-003',
    appType: 'Health Permit',
    amount: 120,
    dueDate: '2024-12-15',
    status: 'pending',
    daysUntilDue: 8
  },
];

export type Application = typeof mockApplications[0];
export type Payment = typeof mockPayments[0];
