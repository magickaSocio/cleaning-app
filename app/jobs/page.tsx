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
import { JobForm } from '../components/JobForm'

export default function Jobs() {
  const { jobs, clients } = useAppContext()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedJob, setSelectedJob] = useState<any>(null)

  const handleAddJob = () => {
    setSelectedJob(null)
    setIsDialogOpen(true)
  }

  const handleEditJob = (job: any) => {
    setSelectedJob(job)
    setIsDialogOpen(true)
  }

  const getClientName = (clientId: number) => {
    const client = clients.find(c => c.id === clientId)
    return client ? client.name : 'Unknown Client'
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Jobs</h2>
        <Button onClick={handleAddJob}>Schedule New Job</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Hours</TableHead>
            <TableHead>Rate</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job) => (
            <TableRow key={job.id}>
              <TableCell>
                <Link href={`/jobs/${job.id}`} className="text-blue-600 hover:underline">
                  {getClientName(job.clientId)}
                </Link>
              </TableCell>
              <TableCell>{job.date}</TableCell>
              <TableCell>{job.time}</TableCell>
              <TableCell>{job.hoursWorked}</TableCell>
              <TableCell>${job.ratePerHour}/hr</TableCell>
              <TableCell>
                <Badge variant={job.status === "Completed" ? "success" : "default"}>
                  {job.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Button variant="outline" size="sm" onClick={() => handleEditJob(job)}>
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
            <DialogTitle>{selectedJob ? 'Edit Job' : 'Schedule New Job'}</DialogTitle>
          </DialogHeader>
          <JobForm
            job={selectedJob}
            onClose={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

