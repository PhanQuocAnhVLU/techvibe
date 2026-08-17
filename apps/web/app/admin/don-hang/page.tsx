'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Package, Search, Filter, ChevronDown, Eye, Truck, 
  Check, X, Clock, AlertCircle, Download, MoreHorizontal,
  Phone, MapPin, ChevronRight, RefreshCw, User, ShoppingBag
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Order {
  id: string
  customer: {
    name: string
    phone: string
    email: string
  }
  items: {
    name: string
    quantity: number
    price: number
  }[]
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  paymentMethod: 'cod' | 'card' | 'momo' | 'vnpay'
  paymentStatus: 'pending' | 'paid' | 'failed'
  address: string
  createdAt: string
  note?: string
}

const orders: Order[] = [
  {
    id: 'TS123456',
    customer: { name: 'Nguyễn Văn A', phone: '0912 345 678', email: 'nva@gmail.com' },
    items: [
      { name: 'iPhone 15 Pro Max 256GB', quantity: 1, price: 32990000 },
      { name: 'AirPods Pro 2', quantity: 1, price: 6990000 },
    ],
    total: 39980000,
    status: 'pending',
    paymentMethod: 'cod',
    paymentStatus: 'pending',
    address: '123 Nguyễn Trãi, Q.1, TP.HCM',
    createdAt: '17/08/2024 14:30',
    note: 'Giao giờ hành chính'
  },
  {
    id: 'TS123455',
    customer: { name: 'Trần Thị B', phone: '0934 567 890', email: 'ttb@yahoo.com' },
    items: [
      { name: 'Samsung Galaxy S24 Ultra', quantity: 1, price: 28990000 },
    ],
    total: 28990000,
    status: 'processing',
    paymentMethod: 'card',
    paymentStatus: 'paid',
    address: '456 Lê Văn Việt, Q.9, TP.HCM',
    createdAt: '17/08/2024 12:15',
  },
  {
    id: 'TS123454',
    customer: { name: 'Lê Văn C', phone: '0901 234 567', email: 'lvc@email.com' },
    items: [
      { name: 'MacBook Pro 14" M3', quantity: 1, price: 45990000 },
      { name: 'Magic Mouse', quantity: 1, price: 2990000 },
    ],
    total: 48980000,
    status: 'shipped',
    paymentMethod: 'momo',
    paymentStatus: 'paid',
    address: '789 Trần Hưng Đạo, Q.5, TP.HCM',
    createdAt: '16/08/2024 09:45',
  },
  {
    id: 'TS123453',
    customer: { name: 'Phạm Thị D', phone: '0978 654 321', email: 'ptd@email.com' },
    items: [
      { name: 'iPad Pro 11" M2', quantity: 1, price: 27990000 },
    ],
    total: 27990000,
    status: 'delivered',
    paymentMethod: 'vnpay',
    paymentStatus: 'paid',
    address: '321 Võ Văn Ngân, Thủ Đức, TP.HCM',
    createdAt: '15/08/2024 16:20',
  },
  {
    id: 'TS123452',
    customer: { name: 'Hoàng Văn E', phone: '0945 678 901', email: 'hve@email.com' },
    items: [
      { name: 'Xiaomi 14 Pro', quantity: 1, price: 18990000 },
    ],
    total: 18990000,
    status: 'cancelled',
    paymentMethod: 'cod',
    paymentStatus: 'failed',
    address: '654 Nguyễn Oanh, Gò Vấp, TP.HCM',
    createdAt: '14/08/2024 11:30',
    note: 'Khách hủy'
  },
]

const statusConfig = {
  pending: { label: 'Chờ xác nhận', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
  processing: { label: 'Đang xử lý', color: 'bg-blue-100 text-blue-700', icon: Package },
  shipped: { label: 'Đang giao', color: 'bg-purple-100 text-purple-700', icon: Truck },
  delivered: { label: 'Đã giao', color: 'bg-green-100 text-green-700', icon: Check },
  cancelled: { label: 'Đã hủy', color: 'bg-red-100 text-red-700', icon: X },
}

const paymentStatusConfig = {
  pending: { label: 'Chưa thanh toán', color: 'text-yellow-600' },
  paid: { label: 'Đã thanh toán', color: 'text-green-600' },
  failed: { label: 'Thanh toán thất bại', color: 'text-red-600' },
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('vi-VN').format(price) + 'đ'
}

export default function AdminOrdersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const [showOrderDetail, setShowOrderDetail] = useState<Order | null>(null)

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

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <span className="font-bold text-white text-xl">T</span>
                </div>
                <span className="font-bold text-xl">
                  <span className="text-secondary">Tech</span>
                  <span className="text-primary">Store</span>
                </span>
              </Link>
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                Admin
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">admin@techstore.com</span>
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Admin Nav */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-6 py-3">
            <Link href="/admin" className="text-gray-500 hover:text-primary flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              Dashboard
            </Link>
            <Link href="/admin/don-hang" className="text-primary font-semibold flex items-center gap-2">
              <Package className="w-4 h-4" />
              Đơn hàng
            </Link>
            <Link href="/admin/san-pham" className="text-gray-500 hover:text-primary">
              Sản phẩm
            </Link>
            <Link href="/admin/khach-hang" className="text-gray-500 hover:text-primary">
              Khách hàng
            </Link>
            <Link href="/admin/khuyen-mai" className="text-gray-500 hover:text-primary">
              Khuyến mãi
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Quản lý đơn hàng</h1>
            <p className="text-gray-500 mt-1">Có {filteredOrders.length} đơn hàng</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Làm mới
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
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

            {/* Status Filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none px-4 py-2 pr-10 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 cursor-pointer"
              >
                <option value="all">Tất cả trạng thái</option>
                {Object.entries(statusConfig).map(([key, config]) => (
                  <option key={key} value={key}>{config.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedOrders.length > 0 && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-center justify-between">
              <span className="text-sm text-blue-700">
                Đã chọn {selectedOrders.length} đơn hàng
              </span>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="text-green-600 border-green-600">
                  <Check className="w-4 h-4 mr-1" />
                  Xác nhận
                </Button>
                <Button size="sm" variant="outline" className="text-red-600 border-red-600">
                  <X className="w-4 h-4 mr-1" />
                  Hủy
                </Button>
              </div>
            </div>
          )}
        </div>

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
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Mã đơn</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Khách hàng</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Sản phẩm</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Tổng tiền</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Trạng thái</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Thanh toán</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Ngày đặt</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredOrders.map(order => {
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
                        <span className="font-semibold text-primary cursor-pointer hover:underline">
                          #{order.id}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium">{order.customer.name}</p>
                          <p className="text-sm text-gray-500">{order.customer.phone}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm line-clamp-1">{order.items[0].name}</p>
                        {order.items.length > 1 && (
                          <p className="text-xs text-gray-500">+{order.items.length - 1} sản phẩm</p>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-semibold">{formatPrice(order.total)}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig[order.status].color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {statusConfig[order.status].label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <p className={`text-sm font-medium ${paymentStatusConfig[order.paymentStatus].color}`}>
                          {paymentStatusConfig[order.paymentStatus].label}
                        </p>
                        <p className="text-xs text-gray-500 uppercase">{order.paymentMethod}</p>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {order.createdAt}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => setShowOrderDetail(order)}
                            className="p-2 text-gray-400 hover:text-primary hover:bg-gray-100 rounded-lg"
                            title="Xem chi tiết"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
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
                          {order.status === 'processing' && (
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
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
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

      {/* Order Detail Modal */}
      {showOrderDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowOrderDetail(null)}
          />
          <div className="relative bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">Chi tiết đơn hàng #{showOrderDetail.id}</h2>
              <button
                onClick={() => setShowOrderDetail(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Status */}
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium ${statusConfig[showOrderDetail.status].color}`}>
                  {(() => {
                    const Icon = statusConfig[showOrderDetail.status].icon
                    return <Icon className="w-4 h-4" />
                  })()}
                  {statusConfig[showOrderDetail.status].label}
                </span>
                <span className="text-sm text-gray-500">{showOrderDetail.createdAt}</span>
              </div>

              {/* Customer Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold mb-3">Thông tin khách hàng</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span>{showOrderDetail.customer.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{showOrderDetail.customer.phone}</span>
                  </div>
                </div>
                <div className="mt-2 flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                  <span>{showOrderDetail.address}</span>
                </div>
              </div>

              {/* Items */}
              <div>
                <h3 className="font-semibold mb-3">Sản phẩm</h3>
                <div className="space-y-3">
                  {showOrderDetail.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg" />
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">x{item.quantity}</p>
                      </div>
                      <span className="font-semibold">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-500">Tạm tính</span>
                  <span>{formatPrice(showOrderDetail.total - 30000)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-500">Phí vận chuyển</span>
                  <span>{formatPrice(30000)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                  <span>Tổng cộng</span>
                  <span className="text-primary">{formatPrice(showOrderDetail.total)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                {showOrderDetail.status === 'pending' && (
                  <>
                    <Button className="flex-1 bg-green-600 hover:bg-green-700">
                      <Check className="w-4 h-4 mr-2" />
                      Xác nhận đơn
                    </Button>
                    <Button variant="outline" className="flex-1 text-red-600 border-red-600">
                      <X className="w-4 h-4 mr-2" />
                      Hủy đơn
                    </Button>
                  </>
                )}
                {showOrderDetail.status === 'processing' && (
                  <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                    <Truck className="w-4 h-4 mr-2" />
                    Giao hàng
                  </Button>
                )}
                {showOrderDetail.status === 'shipped' && (
                  <Button className="flex-1 bg-green-600 hover:bg-green-700">
                    <Check className="w-4 h-4 mr-2" />
                    Xác nhận đã giao
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
