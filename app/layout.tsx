import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/lib/auth-context'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'HRIS Portal - Employee Management System',
  description: 'Premium Enterprise Human Resource Information System',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/hris.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/hris.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/hris.png',
        type: 'image/svg+xml',
      },
    ],
    apple: '/hris.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
