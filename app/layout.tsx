import type { Metadata } from 'next'
import React from 'react'
import './globals.css'
import { ThemeProvider } from './components/ThemeProvider'
import { ClientWrapper } from './components/ClientWrapper'

export const metadata: Metadata = {
  title: 'Michael Keller',
  description: 'Personal portfolio website of Michael Keller',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <ClientWrapper>
            {children}
          </ClientWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}