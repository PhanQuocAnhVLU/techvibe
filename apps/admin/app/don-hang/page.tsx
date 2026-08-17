'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  LayoutDashboard, Package, ShoppingCart, Users, Tag, 
  BarChart3, Settings, Bell, Warehouse, FileText, LogOut, Menu, X,
  ChevronDown, ChevronRight, Plus, Search, Filter, Eye, Check, Truck
} from 'lucide-react'

const orders = [
  { id: 'ORD20260817001', customer: 'Nguy�n Văn A', total: 32990000, status: 'pending', items: 2, date: '17/08/2024 14:30' },
  { id: 'ORD20260817002', customer: 'Trần Thị B', total: 15990000, status: 'confirmed', items: 1, date: '17/08/2024 12:15' },
  { id: 'ORD20260817003', customer: 'Lê Văn C', total: 89990000, status: 'processing', items: 2, date: '16/08/2024 09:45' },
  { id: 'ORD20260817004', customer: 'Phạm Thị D', total: 28990000, status: 'shipping', items: 1, date: '15/08/2024 16:20' },
  { id: 'ORD20260817005', customer: 'Hoàng Văn E', total: 42990000, status: 'completed', items: 1, date: '14/08/2024 11:30' },
  { id: 'ORD20260817006', customer: 'Vũ Thị F', total: 6990000, status: 'cancelled', items: 1, date: '13/08/2024 15:00' },
]

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: 'Chờ xác nhận', color: 'text-yellow-700', bg: 'bg-yellow-100' },
  confirmed: { label: 'Đã xác nhận', color: 'text-blue-700', bg: 'bg-blue-100' },
  processing: { label: 'Đang xử lý', color: 'text-purple-700', bg: 'bg-purple-100' },
  shipping: { label: 'Đang giao', color: 'text-indigo-700', bg: 'bg-indigo-100' },
  completed: { label: 'Hoàn thành', color: 'text-green-700', bg: 'bg-green-100' },
  cancelled: { label: '�ã hủy', color: 'text-red-700', bg: 'bg-red-100' },
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('vi-VN').format(price) + 'đ'
}

export default function AdminOrdersPage() {
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#363636]">Quản lý đơn hàng</h1>
          <p className="text-gray-500">Theo dõi và xử lý đơn hàng từ khách hàng</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {[
          { label: 'Tất cả', value: orders.length, color: 'bg-blue-100 text-blue-700' },
          { label: 'Chờ xác nhận', value: orders.filter(o => o.status === 'pending').length, color: 'bg-yellow-100 text-yellow-700' },
          { label: 'Đang xử lý', value: orders.filter(o => o.status === 'processing' || o.status === 'confirmed').length, color: 'bg-purple-100 text-purple-700' },
          { label: 'Đang giao', value: orders.filter(o => o.status === 'shipping').length, color: 'bg-indigo-100 text-indigo-700' },
          { label: 'Hoàn thành', value: orders.filter(o => o.status === 'completed').length, color: 'bg-green-100 text-green-700' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white rounded-lg p-4 border border-gray-200">
            <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color.split(' ')[1]}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm theo mã đơn, tên khách..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:border-[#ca3838]"
              />
            </div>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:border-[#ca3838]"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="pending">Chờ xác nhận</option>
            <option value="confirmed">Đã xác nhận</option>
            <option value="processing">Đang xử lý</option>
            <option value="shipping">Đang giao</option>
            <option value="completed">Hoàn thành</option>
            <option value="cancelled">Đã hủy</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Mã đơn</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Khách hàng</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">SP</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Tổng tiền</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Trạng thái</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Ngày đặt</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map(order => {
                const status = statusConfig[order.status]
                return (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <Link href={`/don-hang/${order.id}`} className="font-semibold text-[#ca3838] hover:underline">
                        #{order.id}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-sm text-[#363636]">{order.customer}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{order.items}</td>
                    <td className="px-4 py-3 font-semibold text-[#363636]">{formatPrice(order.total)}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${status.bg} ${status.color}`}>
                        {status.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{order.date}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
                        <Link href={`/don-hang/${order.id}`}>
                          <button className="p-2 text-gray-400 hover:text-[#ca3838] hover:bg-gray-100 rounded-md" title="Xem">
                            <Eye className="w-4 h-4" />
                          </button>
                        </Link>
                        {order.status === 'pending' && (
                          <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-md" title="Xác nhận">
                            <Check className="w-4 h-4" />
                          </button>
                        )}
                        {order.status === 'confirmed' && (
                          <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md" title="Giao hàng">
                            <Truck className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Không tìm thấy đơn hàng nào</p>
          </div>
        )}

        {/* Pagination */}
        <div className="px-6 py-3 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Hiển thị 1-{filteredOrders.length} của {orders.length} đơn hàng
          </p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 border rounded-md hover:bg-gray-50 disabled:opacity-50 text-sm" disabled>
              Trước
            </button>
            <button className="w-8 h-8 bg-[#ca3838] text-white rounded-md text-sm">1</button>
            <button className="w-8 h-8 border rounded-md hover:bg-gray-50 text-sm">2</button>
            <button className="px-3 py-1.5 border rounded-md hover:bg-gray-50 text-sm">Sau</button>
          </div>
        </div>
      </div>
    </div>
  )
}
