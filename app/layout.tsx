import './globals.css'
import { Inter } from 'next/font/google'
import { AppProvider } from './contexts/AppContext'
import { AuthProvider } from './contexts/AuthContext'
import { Navigation } from './components/Navigation'
import { BottomNav } from './components/BottomNav'
import Script from 'next/script'
import { usePathname } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CleanTrack Pro',
  description: 'House cleaning business management app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/login'

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <AppProvider>
            <div className="flex flex-col min-h-screen">
              {!isLoginPage && (
                <header>
                  <Navigation />
                </header>
              )}
              <main className="flex-grow p-4 pb-20">
                {children}
              </main>
              {!isLoginPage && <BottomNav />}
              {!isLoginPage && (
                <footer className="bg-muted p-4 text-center">
                  <p>&copy; 2023 CleanTrack Pro</p>
                </footer>
              )}
            </div>
          </AppProvider>
        </AuthProvider>
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`}
          strategy="beforeInteractive"
        />
      </body>
    </html>
  )
}

