'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAppContext } from '../contexts/AppContext'
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { InvoiceForm } from '../components/InvoiceForm'

export default function Invoices() {
  const { invoices, jobs, clients } = useAppContext()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null)

  const handleEditInvoice = (invoice: any) => {
    setSelectedInvoice(invoice)
    setIsDialogOpen(true)
  }

  const getClientName = (jobId: number) => {
    const job = jobs.find(j => j.id === jobId)
    if (!job) return 'Unknown Client'
    const client = clients.find(c => c.id === job.clientId)
    return client ? client.name : 'Unknown Client'
  }

  const getJobDate = (jobId: number) => {
    const job = jobs.find(j => j.id === jobId)
    return job ? job.date : 'Unknown Date'
  }

  const calculateTotal = (jobId: number) => {
    const job = jobs.find(j => j.id === jobId)
    return job ? job.hoursWorked * job.ratePerHour : 0
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Invoices</h2>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice #</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Job Date</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>
                <Link href={`/invoices/${invoice.id}`} className="text-blue-600 hover:underline">
                  INV-{invoice.id}
                </Link>
              </TableCell>
              <TableCell>{getClientName(invoice.jobId)}</TableCell>
              <TableCell>{getJobDate(invoice.jobId)}</TableCell>
              <TableCell>${calculateTotal(invoice.jobId).toFixed(2)}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    invoice.status === 'Paid'
                      ? 'success'
                      : invoice.status === 'Overdue'
                      ? 'destructive'
                      : 'default'
                  }
                >
                  {invoice.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Button variant="outline" size="sm" onClick={() => handleEditInvoice(invoice)}>
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Invoice</DialogTitle>
          </DialogHeader>
          <InvoiceForm
            invoice={selectedInvoice}
            onClose={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

