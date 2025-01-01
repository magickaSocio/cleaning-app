'use client'

import Link from 'next/link'
import { useAuth } from '../contexts/AuthContext'
import { Button } from "@/components/ui/button"

export function Navigation() {
  const { user, logout } = useAuth()

  return (
    <nav className="bg-primary text-primary-foreground p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          CleanTrack Pro
        </Link>
        <div>
          {user ? (
            <div className="flex items-center gap-4">
              <span>Welcome, {user.username}</span>
              <Button onClick={logout} variant="outline">
                Logout
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

