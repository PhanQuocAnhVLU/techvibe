import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TechStore - Hệ thống bán lẻ điện tử hàng đầu Việt Nam',
  description: 'Mua sắm điện thoại, laptop, tablet, phụ kiện chính hãng với giá tốt nhất. Giao hàng nhanh, bảo hành chính hãng.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className="min-h-screen bg-background">
        {children}
      </body>
    </html>
  )
}
