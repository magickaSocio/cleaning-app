'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAppContext } from '../../contexts/AppContext'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { InvoiceForm } from '../../components/InvoiceForm'

export default function InvoiceDetails({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { getInvoiceById, getJobById, getClientById } = useAppContext()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const invoiceId = parseInt(params.id)
  const invoice = getInvoiceById(invoiceId)
  const job = invoice ? getJobById(invoice.jobId) : null
  const client = job ? getClientById(job.clientId) : null

  if (!invoice || !job || !client) {
    return <div>Invoice not found</div>
  }

  const calculateTotal = () => {
    return job.hoursWorked * job.ratePerHour
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Invoice Details</h2>
        <Button onClick={() => setIsDialogOpen(true)}>Edit Invoice</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Invoice INV-{invoice.id}</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="font-semibold">Client:</dt>
              <dd>{client.name}</dd>
            </div>
            <div>
              <dt className="font-semibold">Job Date:</dt>
              <dd>{job.date}</dd>
            </div>
            <div>
              <dt className="font-semibold">Job Time:</dt>
              <dd>{job.time}</dd>
            </div>
            <div>
              <dt className="font-semibold">Hours Worked:</dt>
              <dd>{job.hoursWorked}</dd>
            </div>
            <div>
              <dt className="font-semibold">Rate per Hour:</dt>
              <dd>${job.ratePerHour.toFixed(2)}</dd>
            </div>
            <div>
              <dt className="font-semibold">Total Amount:</dt>
              <dd>${calculateTotal().toFixed(2)}</dd>
            </div>
            <div>
              <dt className="font-semibold">Status:</dt>
              <dd>
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
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>
      {job.notes && (
        <Card>
          <CardHeader>
            <CardTitle>Job Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{job.notes}</p>
          </CardContent>
        </Card>
      )}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Invoice</DialogTitle>
          </DialogHeader>
          <InvoiceForm
            invoice={invoice}
            onClose={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

