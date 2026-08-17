import type { Metadata } from 'next'
import './globals.css'
import { AdminSidebar } from '@/components/admin-sidebar'

export const metadata: Metadata = {
  title: 'TechStore Admin',
  description: 'Quản trị hệ thống TechStore',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <div className="flex min-h-screen bg-gray-100">
          <AdminSidebar />
          <main className="flex-1 ml-64 p-6 transition-all duration-300">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
