'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ChevronRight, Search, Filter } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { MobileBottomNav } from '@/components/layout/mobile-bottom-nav'
import { Button } from '@/components/ui/button'
import { products } from '@/lib/data'
import { formatPrice } from '@/lib/utils'
import { cn } from '@/lib/utils'

const tabs = [
  { id: 'all', label: 'Tất cả' },
  { id: 'pending', label: 'Chờ xác nhận' },
  { id: 'confirmed', label: 'Đã xác nhận' },
  { id: 'shipping', label: 'Đang giao' },
  { id: 'completed', label: 'Hoàn thành' },
  { id: 'cancelled', label: 'Đã hủy' },
]

const orders = [
  {
    id: 'ORD20260817001',
    date: '17/08/2026',
    status: 'pending',
    items: [
      { product: products[0], quantity: 1 },
      { product: products[1], quantity: 1 },
    ],
    total: products[0].price + products[1].price,
  },
  {
    id: 'ORD20260816005',
    date: '16/08/2026',
    status: 'shipping',
    items: [{ product: products[2], quantity: 1 }],
    total: products[2].price,
  },
  {
    id: 'ORD20260815003',
    date: '15/08/2026',
    status: 'completed',
    items: [{ product: products[4], quantity: 1 }],
    total: products[4].price,
  },
]

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: 'Chờ xác nhận', color: 'text-yellow-700', bg: 'bg-yellow-100' },
  confirmed: { label: 'Đã xác nhận', color: 'text-blue-700', bg: 'bg-blue-100' },
  processing: { label: 'Đang xử lý', color: 'text-purple-700', bg: 'bg-purple-100' },
  shipping: { label: 'Đang giao hàng', color: 'text-indigo-700', bg: 'bg-indigo-100' },
  completed: { label: 'Hoàn thành', color: 'text-green-700', bg: 'bg-green-100' },
  cancelled: { label: 'Đã hủy', color: 'text-red-700', bg: 'bg-red-100' },
}

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredOrders = orders.filter((order) => {
    if (activeTab !== 'all' && order.status !== activeTab) return false
    if (searchQuery && !order.id.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <div className="min-h-screen flex flex-col bg-background pb-20 md:pb-0">
      <Header />

      <main className="flex-1">
        {/* Header */}
        <div className="bg-white border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4 mb-4">
              <Link href="/tai-khoan" className="text-primary">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <h1 className="text-xl font-bold">Đơn hàng của tôi</h1>
            </div>

            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm theo mã đơn hàng..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
                    activeTab === tab.id
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="container mx-auto px-4 py-4">
          {filteredOrders.length > 0 ? (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <Link
                  key={order.id}
                  href={`/tai-khoan/don-hang/${order.id}`}
                  className="block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Order Header */}
                  <div className="flex items-center justify-between p-4 border-b border-border">
                    <div>
                      <p className="font-semibold text-primary">{order.id}</p>
                      <p className="text-sm text-gray-500">Ngày đặt: {order.date}</p>
                    </div>
                    <span className={cn(
                      'px-3 py-1 rounded-full text-sm font-medium',
                      statusConfig[order.status].bg,
                      statusConfig[order.status].color
                    )}>
                      {statusConfig[order.status].label}
                    </span>
                  </div>

                  {/* Order Items */}
                  <div className="p-4">
                    <div className="flex gap-3">
                      {order.items.map((item, index) => (
                        <div key={index} className="relative w-20 h-20 bg-gray-50 rounded-lg overflow-hidden">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                          {item.quantity > 1 && (
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-gray-500 text-white text-xs rounded-full flex items-center justify-center">
                              {item.quantity}
                            </span>
                          )}
                        </div>
                      ))}
                      {order.items.length === 1 && (
                        <div className="flex-1 flex items-center">
                          <p className="text-sm text-gray-600 line-clamp-2 ml-2">
                            {order.items[0].product.name}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Order Footer */}
                  <div className="flex items-center justify-between p-4 bg-gray-50">
                    <p className="text-sm text-gray-500">
                      {order.items.reduce((sum, i) => sum + i.quantity, 0)} sản phẩm
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">Tổng cộng:</span>
                      <span className="text-lg font-bold text-primary">{formatPrice(order.total)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-lg font-semibold mb-2">Không có đơn hàng nào</h3>
              <p className="text-gray-500 mb-4">
                {activeTab === 'all' 
                  ? 'Bạn chưa có đơn hàng nào'
                  : 'Không có đơn hàng nào trong mục này'}
              </p>
              <Link href="/">
                <Button>Bắt đầu mua sắm</Button>
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  )
}
