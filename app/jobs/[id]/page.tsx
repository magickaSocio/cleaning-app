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
import { JobForm } from '../../components/JobForm'
import { getMapUrl } from '../../utils/mapUtils'

export default function JobDetails({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { getJobById, getClientById } = useAppContext()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const jobId = parseInt(params.id)
  const job = getJobById(jobId)
  const client = job ? getClientById(job.clientId) : null

  if (!job || !client) {
    return <div>Job not found</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Job Details</h2>
        <Button onClick={() => setIsDialogOpen(true)}>Edit Job</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Job Information</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="font-semibold">Client:</dt>
              <dd>{client.name}</dd>
            </div>
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
              <dt className="font-semibold">Date:</dt>
              <dd>{job.date}</dd>
            </div>
            <div>
              <dt className="font-semibold">Time:</dt>
              <dd>{job.time}</dd>
            </div>
            <div>
              <dt className="font-semibold">Hours Worked:</dt>
              <dd>{job.hoursWorked}</dd>
            </div>
            <div>
              <dt className="font-semibold">Rate per Hour:</dt>
              <dd>${job.ratePerHour}</dd>
            </div>
            <div>
              <dt className="font-semibold">Status:</dt>
              <dd>
                <Badge variant={job.status === "Completed" ? "success" : "default"}>
                  {job.status}
                </Badge>
              </dd>
            </div>
            <div className="col-span-2">
              <dt className="font-semibold">Notes:</dt>
              <dd>{job.notes}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Job</DialogTitle>
          </DialogHeader>
          <JobForm
            job={job}
            onClose={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

