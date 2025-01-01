'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Users, Briefcase, FileText, Package, Home } from 'lucide-react'

const navItems = [
  { href: '/clients', icon: Users, label: 'Clients' },
  { href: '/jobs', icon: Briefcase, label: 'Jobs' },
  { href: '/', icon: Home, label: 'Dashboard' },
  { href: '/invoices', icon: FileText, label: 'Invoices' },
  { href: '/inventory', icon: Package, label: 'Inventory' },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
      <div className="flex justify-around items-center h-16">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href
          const isDashboard = label === 'Dashboard'
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center justify-center w-full h-full text-sm ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              } ${isDashboard ? 'relative -top-4' : ''}`}
            >
              <div className={`${isDashboard ? 'bg-primary text-primary-foreground p-3 rounded-full shadow-lg' : ''}`}>
                <Icon className={`h-6 w-6 ${isDashboard ? 'h-8 w-8' : ''}`} />
              </div>
              <span className={`mt-1 ${isDashboard ? 'mt-2' : ''}`}>{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

