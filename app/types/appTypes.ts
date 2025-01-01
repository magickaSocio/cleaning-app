export type Client = {
  id: number
  name: string
  address: string
  phone: string
  email: string
  jobType: 'Regular Clean' | 'One Time Clean' | 'Deep Clean' | 'Custom Clean'
  notes: string
}

export type Job = {
  id: number
  clientId: number
  date: string
  time: string
  hoursWorked: number
  ratePerHour: number
  notes: string
  status: 'Scheduled' | 'Completed'
  address: string
}

export type Invoice = {
  id: number
  jobId: number
  status: 'Paid' | 'Pending' | 'Overdue'
}

export type InventoryItem = {
  id: number
  name: string
  amount: number
  minimumAmount: number
  notes: string
}

