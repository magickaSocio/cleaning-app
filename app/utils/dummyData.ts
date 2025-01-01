import { Client, Job, Invoice, InventoryItem } from '../types/appTypes'

export function generateDummyData() {
  const clients: Client[] = [
    {
      id: 1,
      name: "Alice Johnson",
      address: "123 Main St, Anytown, USA",
      phone: "555-1234",
      email: "alice@example.com",
      jobType: "Regular Clean",
      notes: "Allergic to strong fragrances"
    },
    {
      id: 2,
      name: "Bob Smith",
      address: "456 Elm St, Somewhere, USA",
      phone: "555-5678",
      email: "bob@example.com",
      jobType: "Deep Clean",
      notes: "Has two large dogs"
    },
    {
      id: 3,
      name: "Carol Davis",
      address: "789 Oak St, Elsewhere, USA",
      phone: "555-9012",
      email: "carol@example.com",
      jobType: "One Time Clean",
      notes: "Prefers eco-friendly products"
    }
  ]

  const jobs: Job[] = [
    {
      id: 1,
      clientId: 1,
      date: "2023-06-15",
      time: "09:00",
      hoursWorked: 2,
      ratePerHour: 30,
      notes: "Focus on kitchen and bathrooms",
      status: "Completed",
      address: "123 Main St, Anytown, USA"
    },
    {
      id: 2,
      clientId: 2,
      date: "2023-06-16",
      time: "13:00",
      hoursWorked: 4,
      ratePerHour: 35,
      notes: "Deep clean carpets",
      status: "Scheduled",
      address: "456 Elm St, Somewhere, USA"
    },
    {
      id: 3,
      clientId: 3,
      date: "2023-06-17",
      time: "10:00",
      hoursWorked: 3,
      ratePerHour: 40,
      notes: "Use only eco-friendly products",
      status: "Scheduled",
      address: "789 Oak St, Elsewhere, USA"
    }
  ]

  const invoices: Invoice[] = [
    {
      id: 1,
      jobId: 1,
      status: "Paid"
    },
    {
      id: 2,
      jobId: 2,
      status: "Pending"
    },
    {
      id: 3,
      jobId: 3,
      status: "Pending"
    }
  ]

  const inventory: InventoryItem[] = [
    {
      id: 1,
      name: "All-Purpose Cleaner",
      amount: 5,
      minimumAmount: 3,
      notes: "Eco-friendly brand"
    },
    {
      id: 2,
      name: "Microfiber Cloths",
      amount: 20,
      minimumAmount: 10,
      notes: "Need to order more soon"
    },
    {
      id: 3,
      name: "Vacuum Cleaner Bags",
      amount: 2,
      minimumAmount: 5,
      notes: "Running low, order ASAP"
    }
  ]

  return { clients, jobs, invoices, inventory }
}

