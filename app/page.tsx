'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from './contexts/AuthContext'
import { useAppContext } from './contexts/AppContext'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, AlertTriangle } from 'lucide-react'
import { getMapUrl } from './utils/mapUtils'

export default function Home() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const { jobs, invoices, inventory } = useAppContext()
  const [showOverview, setShowOverview] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    const storedOverviewState = localStorage.getItem('showOverview')
    if (storedOverviewState !== null) {
      setShowOverview(JSON.parse(storedOverviewState))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('showOverview', JSON.stringify(showOverview))
  }, [showOverview])

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (!user) {
    return null
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0) // Reset time to start of day
  const todayString = today.toISOString().split('T')[0] // YYYY-MM-DD format

  const dayOfWeek = today.getDay()
  const startOfWeek = new Date(today)
  startOfWeek.setDate(today.getDate() - dayOfWeek) // Set to previous Sunday
  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(startOfWeek.getDate() + 6) // Set to next Saturday

  const todaysJobs = jobs.filter(job => job.date === todayString)

  const weekJobs = jobs.filter(job => {
    const jobDate = new Date(job.date)
    return jobDate >= startOfWeek && jobDate <= endOfWeek
  })

  const moneyMadeThisWeek = weekJobs.reduce((total, job) => {
    const invoice = invoices.find(inv => inv.jobId === job.id)
    if (job.status === 'Completed' && invoice && invoice.status === 'Paid') {
      return total + (job.hoursWorked * job.ratePerHour)
    }
    return total
  }, 0)

  const moneyMadeToday = todaysJobs.reduce((total, job) => {
    const invoice = invoices.find(inv => inv.jobId === job.id)
    if (job.status === 'Completed' && invoice && invoice.status === 'Paid') {
      return total + (job.hoursWorked * job.ratePerHour)
    }
    return total
  }, 0)

  const potentialEarnings = weekJobs.reduce((total, job) => {
    return total + (job.hoursWorked * job.ratePerHour)
  }, 0)

  const inventoryAlerts = inventory.filter(item => item.amount <= item.minimumAmount)

  const handleCloseOverview = () => {
    setShowOverview(false)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Dashboard</h2>

      {showOverview && (
        <Card className="relative">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-2 right-2"
            onClick={handleCloseOverview}
          >
            <X className="h-4 w-4" />
          </Button>
          <CardHeader>
            <CardTitle>Quick Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Welcome to CleanTrack Pro, your all-in-one solution for managing your house cleaning business.</p>
            <ul className="list-disc list-inside mt-2">
              <li>Manage your clients</li>
              <li>Schedule and track jobs</li>
              <li>Handle invoices</li>
              <li>Keep track of your inventory</li>
            </ul>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Financial Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt>Money made this week:</dt>
                <dd className="font-semibold">${moneyMadeThisWeek.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Money made today:</dt>
                <dd className="font-semibold">${moneyMadeToday.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Potential earnings this week:</dt>
                <dd className="font-semibold">${potentialEarnings.toFixed(2)}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Today's Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            {todaysJobs.length > 0 ? (
              <ul className="space-y-2">
                {todaysJobs.map(job => (
                  <li key={job.id} className="flex justify-between items-center">
                    <span>{job.time} - Client #{job.clientId}</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(getMapUrl(job.address), '_blank')}
                    >
                      Get Directions
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No jobs scheduled for today.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inventory Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            {inventoryAlerts.length > 0 ? (
              <ul className="space-y-2">
                {inventoryAlerts.map(item => (
                  <li key={item.id} className="flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
                    <span>{item.name} - Low Stock ({item.amount} left)</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No inventory alerts at this time.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

