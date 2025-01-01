'use client'

import { useState } from 'react'
import { useAppContext } from '../contexts/AppContext'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AddressAutocomplete } from './AddressAutocomplete'

type ClientFormProps = {
  client?: {
    id: number
    name: string
    address: string
    phone: string
    email: string
    jobType: 'Regular Clean' | 'One Time Clean' | 'Deep Clean' | 'Custom Clean'
    notes: string
  }
  onClose: () => void
}

export function ClientForm({ client, onClose }: ClientFormProps) {
  const { addClient, updateClient } = useAppContext()
  const [name, setName] = useState(client?.name || '')
  const [address, setAddress] = useState(client?.address || '')
  const [phone, setPhone] = useState(client?.phone || '')
  const [email, setEmail] = useState(client?.email || '')
  const [jobType, setJobType] = useState(client?.jobType || 'Regular Clean')
  const [notes, setNotes] = useState(client?.notes || '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const clientData = { name, address, phone, email, jobType, notes }
    if (client) {
      updateClient({ id: client.id, ...clientData })
    } else {
      addClient(clientData)
    }
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="address">Address</Label>
        <AddressAutocomplete
          value={address}
          onChange={setAddress}
        />
      </div>
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="jobType">Job Type</Label>
        <Select value={jobType} onValueChange={setJobType}>
          <SelectTrigger>
            <SelectValue placeholder="Select job type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Regular Clean">Regular Clean</SelectItem>
            <SelectItem value="One Time Clean">One Time Clean</SelectItem>
            <SelectItem value="Deep Clean">Deep Clean</SelectItem>
            <SelectItem value="Custom Clean">Custom Clean</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">
          {client ? 'Update' : 'Add'} Client
        </Button>
      </div>
    </form>
  )
}

