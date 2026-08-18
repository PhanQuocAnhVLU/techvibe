'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ChevronRight, Package, Search, Filter, Eye, 
  Truck, Check, Clock, X, Star
} from 'lucide-react'
import { SmartImage } from '@/components/smart-image'

interface Order {
  id: string
  date: string
  total: number
  status: 'pending' | 'confirmed' | 'shipping' | 'completed' | 'cancelled'
  items: { name: string; image: string; quantity: number; price: number; brand?: string }[]
  paymentMethod: string
}

const orders: Order[] = [
  {
    id: 'TS123456', date: '17/08/2024 14:30', total: 32990000, status: 'shipping',
    items: [{ name: 'iPhone 15 Pro Max 256GB', brand: 'Apple', image: '', quantity: 1, price: 32990000 }],
    paymentMethod: 'COD',
  },
  {
    id: 'TS123455', date: '15/08/2024 10:15', total: 6990000, status: 'completed',
    items: [{ name: 'AirPods Pro 2', brand: 'Apple', image: '', quantity: 1, price: 6990000 }],
    paymentMethod: 'Visa',
  },
  {
    id: 'TS123454', date: '10/08/2024 09:45', total: 45990000, status: 'completed',
    items: [{ name: 'MacBook Pro 14 inch M3', brand: 'Apple', image: '', quantity: 1, price: 45990000 }],
    paymentMethod: 'VNPay',
  },
  {
    id: 'TS123453', date: '05/08/2024 16:20', total: 15990000, status: 'completed',
    items: [{ name: 'Samsung Galaxy S24 Ultra', brand: 'Samsung', image: '', quantity: 1, price: 15990000 }],
    paymentMethod: 'MoMo',
  },
  {
    id: 'TS123452', date: '01/08/2024 11:30', total: 2890000, status: 'cancelled',
    items: [{ name: 'Xiaomi 14 Pro', brand: 'Xiaomi', image: '', quantity: 1, price: 2890000 }],
    paymentMethod: 'COD',
  },
]

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: 'Chờ xác nhận', color: 'text-yellow-700', bg: 'bg-yellow-100' },
  confirmed: { label: 'Đã xác nhận', color: 'text-blue-700', bg: 'bg-blue-100' },
  shipping: { label: 'Đang giao', color: 'text-indigo-700', bg: 'bg-indigo-100' },
  completed: { label: 'Hoàn thành', color: 'text-green-700', bg: 'bg-green-100' },
  cancelled: { label: 'Đã hủy', color: 'text-red-700', bg: 'bg-red-100' },
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('vi-VN').format(price) + 'đ'
}

export default function OrdersPage() {
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Top Bar */}
      <div className="bg-[#ca3838] text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link href="#" className="hover:opacity-80">Hồ Chí Minh</Link>
              <Link href="tel:18002000" className="hidden sm:flex items-center gap-1 hover:opacity-80">1800.2000</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-11 h-11 bg-[#ca3838] rounded-lg flex items-center justify-center">
              <span className="font-bold text-white text-2xl">T</span>
            </div>
            <div>
              <span className="font-bold text-xl text-[#363636]">Tech</span>
              <span className="font-bold text-xl text-[#ca3838]">Store</span>
            </div>
          </Link>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-[#ca3838]">Trang chủ</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/tai-khoan" className="text-gray-500 hover:text-[#ca3838]">Tài khoản</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-[#363636]">Đơn hàng của tôi</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar - Mini version */}
          <aside className="lg:col-span-1">
            <div className="bg-gradient-to-br from-[#ca3838] to-[#ff6b35] rounded-lg p-6 text-white mb-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-xl font-bold">
                  N
                </div>
                <div>
                  <p className="font-semibold">Nguyễn Văn A</p>
                  <p className="text-xs text-white/80">0912 345 678</p>
                </div>
              </div>
            </div>
            <nav className="bg-white rounded-lg overflow-hidden">
              <Link href="/tai-khoan" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-sm">Thông tin cá nhân</span>
              </Link>
              <Link href="/tai-khoan/don-hang" className="flex items-center gap-3 px-4 py-3 bg-[#fef6f6] text-[#ca3838] font-medium border-l-4 border-[#ca3838]">
                <Package className="w-5 h-5" />
                <span className="text-sm">Đơn hàng của tôi</span>
              </Link>
              <Link href="/tai-khoan/yeu-thich" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="text-sm">Yêu thích</span>
              </Link>
            </nav>
          </aside>

          {/* Main */}
          <main className="lg:col-span-3 space-y-4">
            <div className="bg-white rounded-lg p-6">
              <h1 className="text-2xl font-bold text-[#363636] mb-2">Đơn hàng của tôi</h1>
              <p className="text-gray-500 mb-6">Theo dõi và quản lý đơn hàng của bạn</p>

              {/* Search */}
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Tìm theo mã đơn hàng..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#ca3838]"
                  />
                </div>
              </div>

              {/* Status Tabs */}
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {[
                  { value: 'all', label: 'Tất cả', count: orders.length },
                  { value: 'pending', label: 'Chờ xác nhận', count: orders.filter(o => o.status === 'pending').length },
                  { value: 'shipping', label: 'Đang giao', count: orders.filter(o => o.status === 'shipping').length },
                  { value: 'completed', label: 'Hoàn thành', count: orders.filter(o => o.status === 'completed').length },
                  { value: 'cancelled', label: 'Đã hủy', count: orders.filter(o => o.status === 'cancelled').length },
                ].map(tab => (
                  <button
                    key={tab.value}
                    onClick={() => setStatusFilter(tab.value)}
                    className={`px-4 py-2 rounded-md whitespace-nowrap text-sm font-medium transition-colors ${
                      statusFilter === tab.value
                        ? 'bg-[#ca3838] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {tab.label} ({tab.count})
                  </button>
                ))}
              </div>

              {/* Orders List */}
              <div className="space-y-4">
                {filteredOrders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-[#363636] mb-2">Chưa có đơn hàng nào</h3>
                    <p className="text-gray-500 mb-4">Hãy mua sắm để có đơn hàng đầu tiên</p>
                    <Link href="/san-pham">
                      <button className="bg-[#ca3838] text-white px-6 py-2 rounded-md font-medium hover:bg-[#b32f2f]">
                        Mua sắm ngay
                      </button>
                    </Link>
                  </div>
                ) : (
                  filteredOrders.map(order => {
                    const status = statusConfig[order.status]
                    return (
                      <div key={order.id} className="border border-gray-200 rounded-lg overflow-hidden hover:border-[#ca3838] transition-colors">
                        {/* Header */}
                        <div className="bg-gray-50 px-4 py-3 flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-4">
                            <span className="font-semibold text-[#363636]">#{order.id}</span>
                            <span className="text-sm text-gray-500">{order.date}</span>
                          </div>
                          <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${status.bg} ${status.color}`}>
                            {status.label}
                          </span>
                        </div>

                        {/* Items */}
                        <div className="p-4 space-y-3">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex gap-4">
                              <SmartImage name={item.name} brand={item.brand} className="w-16 h-16 rounded-lg" />
                              <div className="flex-1">
                                <p className="font-medium text-[#363636]">{item.name}</p>
                                <p className="text-sm text-gray-500">Số lượng: {item.quantity}</p>
                              </div>
                              <span className="font-medium text-[#ca3838]">{formatPrice(item.price)}</span>
                            </div>
                          ))}
                        </div>

                        {/* Footer */}
                        <div className="border-t border-gray-200 px-4 py-3 flex items-center justify-between flex-wrap gap-3">
                          <div>
                            <p className="text-sm text-gray-500">Tổng tiền: <span className="font-bold text-[#ca3838] text-lg ml-1">{formatPrice(order.total)}</span></p>
                            <p className="text-xs text-gray-400 mt-0.5">Thanh toán: {order.paymentMethod}</p>
                          </div>
                          <div className="flex gap-2">
                            {order.status === 'shipping' && (
                              <button className="px-4 py-2 border border-[#ca3838] text-[#ca3838] rounded-md text-sm font-medium hover:bg-[#fef6f6]">
                                <Truck className="w-4 h-4 inline mr-1" />
                                Theo dõi đơn
                              </button>
                            )}
                            {order.status === 'completed' && (
                              <button className="px-4 py-2 border border-[#ca3838] text-[#ca3838] rounded-md text-sm font-medium hover:bg-[#fef6f6]">
                                <Star className="w-4 h-4 inline mr-1" />
                                Đánh giá
                              </button>
                            )}
                            <Link href={`/tai-khoan/don-hang/${order.id}`}>
                              <button className="px-4 py-2 bg-[#ca3838] text-white rounded-md text-sm font-medium hover:bg-[#b32f2f]">
                                Xem chi tiết
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
