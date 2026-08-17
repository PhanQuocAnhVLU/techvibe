'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Filter, Eye, Truck, Check, X, Clock, Package, ChevronDown, Phone, MapPin, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'

const orders = [
  { id: 'ORD20260817001', customer: { name: 'Nguyễn Văn A', phone: '0912 345 678', email: 'nva@gmail.com' }, items: 2, total: 39980000, status: 'pending', payment: 'cod', date: '17/08/2024 14:30' },
  { id: 'ORD20260817002', customer: { name: 'Trần Thị B', phone: '0934 567 890', email: 'ttb@yahoo.com' }, items: 1, total: 28990000, status: 'confirmed', payment: 'card', date: '17/08/2024 12:15' },
  { id: 'ORD20260817003', customer: { name: 'Lê Văn C', phone: '0901 234 567', email: 'lvc@email.com' }, items: 2, total: 48980000, status: 'processing', payment: 'momo', date: '16/08/2024 09:45' },
  { id: 'ORD20260817004', customer: { name: 'Phạm Thị D', phone: '0978 654 321', email: 'ptd@email.com' }, items: 1, total: 27990000, status: 'shipping', payment: 'vnpay', date: '15/08/2024 16:20' },
  { id: 'ORD20260817005', customer: { name: 'Hoàng Văn E', phone: '0945 678 901', email: 'hve@email.com' }, items: 1, total: 18990000, status: 'completed', payment: 'cod', date: '14/08/2024 11:30' },
  { id: 'ORD20260817006', customer: { name: 'Vũ Thị F', phone: '0963 258 147', email: 'vtf@email.com' }, items: 3, total: 89500000, status: 'cancelled', payment: 'card', date: '13/08/2024 15:00' },
]

function formatPrice(price: number) {
  return new Intl.NumberFormat('vi-VN').format(price) + 'đ'
}

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.phone.includes(searchQuery)
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const toggleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([])
    } else {
      setSelectedOrders(filteredOrders.map(o => o.id))
    }
  }

  const toggleSelect = (id: string) => {
    setSelectedOrders(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
    pending: { label: 'Chờ xác nhận', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    confirmed: { label: 'Đã xác nhận', color: 'bg-blue-100 text-blue-800', icon: Check },
    processing: { label: 'Đang xử lý', color: 'bg-purple-100 text-purple-800', icon: Package },
    shipping: { label: 'Đang giao', color: 'bg-indigo-100 text-indigo-800', icon: Truck },
    completed: { label: 'Hoàn thành', color: 'bg-green-100 text-green-800', icon: Check },
    cancelled: { label: 'Đã hủy', color: 'bg-red-100 text-red-800', icon: X },
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Đơn hàng</h1>
          <p className="text-gray-500">Quản lý tất cả đơn hàng</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm theo mã đơn, tên khách, SĐT..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
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

      {/* Bulk Actions */}
      {selectedOrders.length > 0 && (
        <div className="mb-4 p-3 bg-primary/10 rounded-lg flex items-center justify-between">
          <span className="text-sm text-primary font-medium">
            Đã chọn {selectedOrders.length} đơn hàng
          </span>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
              <Check className="w-4 h-4 mr-1" />
              Xác nhận
            </Button>
            <Button size="sm" variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
              <X className="w-4 h-4 mr-1" />
              Hủy
            </Button>
          </div>
        </div>
      )}

      {/* Orders Table */}
      <div className="bg-white rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mã đơn</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Khách hàng</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sản phẩm</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tổng tiền</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thanh toán</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngày đặt</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map((order) => {
                const StatusIcon = statusConfig[order.status].icon
                return (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(order.id)}
                        onChange={() => toggleSelect(order.id)}
                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-semibold text-primary cursor-pointer hover:underline">#{order.id}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-gray-900">{order.customer.name}</p>
                        <p className="text-sm text-gray-500">{order.customer.phone}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{order.items} sản phẩm</td>
                    <td className="px-4 py-3 font-semibold">{formatPrice(order.total)}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${statusConfig[order.status].color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {statusConfig[order.status].label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-medium text-gray-600 uppercase">{order.payment}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{order.date}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
                        <Link href={`/don-hang/${order.id}`}>
                          <button className="p-2 text-gray-400 hover:text-primary hover:bg-gray-100 rounded-lg" title="Xem chi tiết">
                            <Eye className="w-4 h-4" />
                          </button>
                        </Link>
                        {order.status === 'pending' && (
                          <>
                            <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg" title="Xác nhận">
                              <Check className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg" title="Hủy">
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        {order.status === 'confirmed' && (
                          <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg" title="Giao hàng">
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
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Không tìm thấy đơn hàng nào</p>
          </div>
        )}

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Hiển thị 1-{filteredOrders.length} của {orders.length} đơn hàng
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Trước
            </Button>
            <Button variant="outline" size="sm" className="bg-primary text-white">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <Button variant="outline" size="sm">
              Sau
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
