'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAppContext } from '../../contexts/AppContext'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
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
import { ClientForm } from '../../components/ClientForm'
import { getMapUrl } from '../../utils/mapUtils'

export default function ClientDetails({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { getClientById, getJobsByClientId } = useAppContext()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const clientId = parseInt(params.id)
  const client = getClientById(clientId)
  const clientJobs = getJobsByClientId(clientId)

  if (!client) {
    return <div>Client not found</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{client.name}</h2>
        <Button onClick={() => setIsDialogOpen(true)}>Edit Client</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Client Information</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="font-semibold">Address:</dt>
              <dd>{client.address}</dd>
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => window.open(getMapUrl(client.address), '_blank')}
              >
                Get Directions
              </Button>
            </div>
            <div>
              <dt className="font-semibold">Phone:</dt>
              <dd>{client.phone}</dd>
            </div>
            <div>
              <dt className="font-semibold">Email:</dt>
              <dd>{client.email}</dd>
            </div>
            <div>
              <dt className="font-semibold">Job Type:</dt>
              <dd>{client.jobType}</dd>
            </div>
            <div className="col-span-2">
              <dt className="font-semibold">Notes:</dt>
              <dd>{client.notes}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Client Jobs</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientJobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>
                    <Link href={`/jobs/${job.id}`} className="text-blue-600 hover:underline">
                      {job.date}
                    </Link>
                  </TableCell>
                  <TableCell>{job.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Client</DialogTitle>
          </DialogHeader>
          <ClientForm
            client={client}
            onClose={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

