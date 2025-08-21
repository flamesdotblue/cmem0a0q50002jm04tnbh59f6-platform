import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI HR & Operations Manager',
  description: 'AI-powered task distribution, work assignments, and scheduling',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
