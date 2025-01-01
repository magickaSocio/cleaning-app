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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ClientForm } from '../components/ClientForm'

export default function Clients() {
  const { clients } = useAppContext()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState<any>(null)

  const handleAddClient = () => {
    setSelectedClient(null)
    setIsDialogOpen(true)
  }

  const handleEditClient = (client: any) => {
    setSelectedClient(client)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Clients</h2>
        <Button onClick={handleAddClient}>Add New Client</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Job Type</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell>
                <Link href={`/clients/${client.id}`} className="text-blue-600 hover:underline">
                  {client.name}
                </Link>
              </TableCell>
              <TableCell>{client.phone}</TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>{client.jobType}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" onClick={() => handleEditClient(client)}>
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
            <DialogTitle>{selectedClient ? 'Edit Client' : 'Add New Client'}</DialogTitle>
          </DialogHeader>
          <ClientForm
            client={selectedClient}
            onClose={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

