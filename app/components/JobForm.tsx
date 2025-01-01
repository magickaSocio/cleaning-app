'use client'

import { useState, useEffect } from 'react'
import { useAppContext } from '../contexts/AppContext'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AddressAutocomplete } from './AddressAutocomplete'

type JobFormProps = {
  job?: {
    id: number
    clientId: number
    date: string
    time: string
    hoursWorked: number
    ratePerHour: number
    notes: string
    address: string;
    status: 'Scheduled' | 'Completed'
  }
  onClose: () => void
}

export function JobForm({ job, onClose }: JobFormProps) {
  const { addJob, updateJob, clients } = useAppContext()
  const [clientId, setClientId] = useState(job?.clientId.toString() || '')
  const [date, setDate] = useState(job?.date || '')
  const [time, setTime] = useState(job?.time || '')
  const [hoursWorked, setHoursWorked] = useState(job?.hoursWorked.toString() || '')
  const [ratePerHour, setRatePerHour] = useState(job?.ratePerHour.toString() || '')
  const [notes, setNotes] = useState(job?.notes || '')
  const [status, setStatus] = useState(job?.status || 'Scheduled')
  const [address, setAddress] = useState(job?.address || '')

  useEffect(() => {
    if (clientId) {
      const selectedClient = clients.find(c => c.id === parseInt(clientId))
      if (selectedClient) {
        setAddress(selectedClient.address)
      }
    }
  }, [clientId, clients])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const jobData = {
      clientId: parseInt(clientId),
      date, // This is already in YYYY-MM-DD format from the date input
      time,
      hoursWorked: parseFloat(hoursWorked),
      ratePerHour: parseFloat(ratePerHour),
      notes,
      status: status as 'Scheduled' | 'Completed',
      address
    }
    if (job) {
      updateJob({ id: job.id, ...jobData })
    } else {
      addJob(jobData)
    }
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="client">Client</Label>
        <Select value={clientId} onValueChange={setClientId}>
          <SelectTrigger>
            <SelectValue placeholder="Select a client" />
          </SelectTrigger>
          <SelectContent>
            {clients.map((client) => (
              <SelectItem key={client.id} value={client.id.toString()}>
                {client.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="time">Time</Label>
        <Input
          id="time"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="hoursWorked">Hours Worked</Label>
        <Input
          id="hoursWorked"
          type="number"
          step="0.5"
          value={hoursWorked}
          onChange={(e) => setHoursWorked(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="ratePerHour">Rate per Hour</Label>
        <Input
          id="ratePerHour"
          type="number"
          step="0.01"
          value={ratePerHour}
          onChange={(e) => setRatePerHour(e.target.value)}
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
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="status">Status</Label>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Scheduled">Scheduled</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">
          {job ? 'Update' : 'Add'} Job
        </Button>
      </div>
    </form>
  )
}

