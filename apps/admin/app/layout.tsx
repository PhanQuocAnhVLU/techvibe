import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TechStore Admin',
  description: 'Quản trị hệ thống TechStore',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  )
}
