'use client'

import { AppProvider } from '@/lib/app-context'
import { ToastContainer } from '@/lib/app-context'

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      {children}
      <ToastContainer />
    </AppProvider>
  )
}