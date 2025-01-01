'use client'

import { useState } from 'react'
import { useAppContext } from '../contexts/AppContext'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type InvoiceFormProps = {
  invoice: {
    id: number
    jobId: number
    status: 'Paid' | 'Pending' | 'Overdue'
  }
  onClose: () => void
}

export function InvoiceForm({ invoice, onClose }: InvoiceFormProps) {
  const { updateInvoice } = useAppContext()
  const [status, setStatus] = useState(invoice.status)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateInvoice({ ...invoice, status })
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="status">Status</Label>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Paid">Paid</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">
          Update Invoice
        </Button>
      </div>
    </form>
  )
}

