'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Client, Job, Invoice, InventoryItem } from '../types/appTypes'
import { generateDummyData } from '../utils/dummyData'

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [clients, setClients] = useState<Client[]>([])
  const [jobs, setJobs] = useState<Job[]>([])
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [inventory, setInventory] = useState<InventoryItem[]>([])

  useEffect(() => {
    // Load initial data from localStorage or use dummy data
    const storedClients = localStorage.getItem('clients')
    const storedJobs = localStorage.getItem('jobs')
    const storedInvoices = localStorage.getItem('invoices')
    const storedInventory = localStorage.getItem('inventory')

    if (storedClients && storedJobs && storedInvoices && storedInventory) {
      setClients(JSON.parse(storedClients))
      setJobs(JSON.parse(storedJobs))
      setInvoices(JSON.parse(storedInvoices))
      setInventory(JSON.parse(storedInventory))
    } else {
      const { clients, jobs, invoices, inventory } = generateDummyData()
      setClients(clients)
      setJobs(jobs)
      setInvoices(invoices)
      setInventory(inventory)
    }
  }, [])

  useEffect(() => {
    // Save data to localStorage whenever it changes
    localStorage.setItem('clients', JSON.stringify(clients))
    localStorage.setItem('jobs', JSON.stringify(jobs))
    localStorage.setItem('invoices', JSON.stringify(invoices))
    localStorage.setItem('inventory', JSON.stringify(inventory))
  }, [clients, jobs, invoices, inventory])

  const addClient = (client: Omit<Client, 'id'>) => {
    const newClient = { ...client, id: Date.now() }
    setClients([...clients, newClient])
  }

  const updateClient = (updatedClient: Client) => {
    setClients(clients.map(client => client.id === updatedClient.id ? updatedClient : client))
  }

  const getClientById = (id: number) => {
    return clients.find(client => client.id === id)
  }

  const addJob = (job: Omit<Job, 'id'>) => {
    const client = getClientById(job.clientId)
    const newJob = { ...job, id: Date.now(), address: client?.address || '' }
    setJobs([...jobs, newJob])
    
    // Automatically create an invoice for the new job
    const newInvoice: Invoice = {
      id: Date.now(),
      jobId: newJob.id,
      status: 'Pending'
    }
    setInvoices([...invoices, newInvoice])
  }

  const updateJob = (updatedJob: Job) => {
    setJobs(jobs.map(job => job.id === updatedJob.id ? updatedJob : job))
  }

  const getJobById = (id: number) => {
    return jobs.find(job => job.id === id)
  }

  const getJobsByClientId = (clientId: number) => {
    return jobs.filter(job => job.clientId === clientId)
  }

  const updateInvoice = (updatedInvoice: Invoice) => {
    setInvoices(invoices.map(invoice => invoice.id === updatedInvoice.id ? updatedInvoice : invoice))
  }

  const getInvoiceById = (id: number) => {
    return invoices.find(invoice => invoice.id === id)
  }

  const getInvoicesByClientId = (clientId: number) => {
    return invoices.filter(invoice => {
      const job = jobs.find(job => job.id === invoice.jobId)
      return job && job.clientId === clientId
    })
  }

  const addInventoryItem = (item: Omit<InventoryItem, 'id'>) => {
    const newItem = { ...item, id: Date.now() }
    setInventory([...inventory, newItem])
  }

  const updateInventoryItem = (updatedItem: InventoryItem) => {
    setInventory(inventory.map(item => item.id === updatedItem.id ? updatedItem : item))
  }

  const getInventoryItemById = (id: number) => {
    return inventory.find(item => item.id === id)
  }

  return (
    <AppContext.Provider value={{
      clients,
      jobs,
      invoices,
      inventory,
      addClient,
      updateClient,
      getClientById,
      addJob,
      updateJob,
      getJobById,
      getJobsByClientId,
      updateInvoice,
      getInvoiceById,
      getInvoicesByClientId,
      addInventoryItem,
      updateInventoryItem,
      getInventoryItemById
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}

type AppContextType = {
  clients: Client[]
  jobs: Job[]
  invoices: Invoice[]
  inventory: InventoryItem[]
  addClient: (client: Omit<Client, 'id'>) => void
  updateClient: (client: Client) => void
  getClientById: (id: number) => Client | undefined
  addJob: (job: Omit<Job, 'id'>) => void
  updateJob: (job: Job) => void
  getJobById: (id: number) => Job | undefined
  getJobsByClientId: (clientId: number) => Job[]
  updateInvoice: (invoice: Invoice) => void
  getInvoiceById: (id: number) => Invoice | undefined
  getInvoicesByClientId: (clientId: number) => Invoice[]
  addInventoryItem: (item: Omit<InventoryItem, 'id'>) => void
  updateInventoryItem: (item: InventoryItem) => void
  getInventoryItemById: (id: number) => InventoryItem | undefined
}

