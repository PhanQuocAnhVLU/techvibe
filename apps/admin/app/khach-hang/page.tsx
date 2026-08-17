'use client'

import { useState } from 'react'
import { Search, Filter, Eye, Ban, CheckCircle, Mail, Phone, MapPin, Calendar, DollarSign, ShoppingCart, Star } from 'lucide-react'

const customers = [
  { id: 1, name: 'Nguyễn Văn A', email: 'nguyenvana@email.com', phone: '0912345678', city: 'TP.HCM', orders: 12, spent: 245000000, status: 'active', avatar: 'N', joinDate: '01/01/2023' },
  { id: 2, name: 'Trần Thị B', email: 'tranthib@email.com', phone: '0923456789', city: 'Hà Nội', orders: 8, spent: 124500000, status: 'active', avatar: 'T', joinDate: '15/03/2023' },
  { id: 3, name: 'Lê Văn C', email: 'levanc@email.com', phone: '0934567890', city: 'Đà Nẵng', orders: 5, spent: 67900000, status: 'active', avatar: 'L', joinDate: '22/06/2023' },
  { id: 4, name: 'Phạm Thị D', email: 'phamthid@email.com', phone: '0945678901', city: 'TP.HCM', orders: 23, spent: 456000000, status: 'vip', avatar: 'P', joinDate: '10/01/2022' },
  { id: 5, name: 'Hoàng Văn E', email: 'hoangvane@email.com', phone: '0956789012', city: 'Cần Thơ', orders: 3, spent: 23900000, status: 'active', avatar: 'H', joinDate: '05/08/2024' },
  { id: 6, name: 'Vũ Thị F', email: 'vuthif@email.com', phone: '0967890123', city: 'Hải Phòng', orders: 0, spent: 0, status: 'banned', avatar: 'V', joinDate: '12/07/2024' },
]

function formatPrice(price: number) { return new Intl.NumberFormat('vi-VN').format(price) + 'đ' }

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  active: { label: 'Hoạt động', color: 'text-green-700', bg: 'bg-green-100' },
  vip: { label: 'VIP', color: 'text-yellow-700', bg: 'bg-yellow-100' },
  banned: { label: 'Bị khóa', color: 'text-red-700', bg: 'bg-red-100' },
}

export default function AdminCustomersPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filtered = customers.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#363636]">Quản lý khách hàng</h1>
          <p className="text-gray-500">Danh sách khách hàng và thông tin chi tiết</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-xs text-gray-500">Tổng khách hàng</p>
          <p className="text-2xl font-bold text-[#363636] mt-1">{customers.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-xs text-gray-500">Khách VIP</p>
          <p className="text-2xl font-bold text-yellow-600 mt-1">{customers.filter(c => c.status === 'vip').length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-xs text-gray-500">Hoạt động</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{customers.filter(c => c.status === 'active').length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <p className="text-xs text-gray-500">Tổng doanh thu</p>
          <p className="text-xl font-bold text-[#ca3838] mt-1">917.3M</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-4 mb-6 border">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tìm theo tên, email..." className="w-full pl-10 pr-4 py-2.5 border rounded-md" />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2.5 border rounded-md">
            <option value="all">Tất cả</option>
            <option value="active">Hoạt động</option>
            <option value="vip">VIP</option>
            <option value="banned">Bị khóa</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg overflow-hidden border">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Khách hàng</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Liên hệ</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Đơn hàng</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Tổng chi</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Trạng thái</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.map(customer => {
              const status = statusConfig[customer.status]
              return (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#ca3838] to-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {customer.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{customer.name}</p>
                        <p className="text-xs text-gray-500">{customer.city}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <p className="text-gray-600 text-xs">{customer.email}</p>
                    <p className="text-gray-500 text-xs">{customer.phone}</p>
                  </td>
                  <td className="px-4 py-3 text-sm">{customer.orders}</td>
                  <td className="px-4 py-3 font-semibold text-[#363636]">{formatPrice(customer.spent)}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-0.5 text-xs font-semibold rounded-full ${status.bg} ${status.color}`}>
                      {status.label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded" title="Xem">
                        <Eye className="w-4 h-4" />
                      </button>
                      {customer.status !== 'banned' ? (
                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded" title="Khóa">
                          <Ban className="w-4 h-4" />
                        </button>
                      ) : (
                        <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded" title="Mở khóa">
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <div className="px-6 py-3 border-t flex items-center justify-between">
          <p className="text-sm text-gray-500">Hiển thị 1-{filtered.length} của {customers.length}</p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 border rounded-md text-sm" disabled>Trước</button>
            <button className="w-8 h-8 bg-[#ca3838] text-white rounded-md text-sm">1</button>
            <button className="px-3 py-1.5 border rounded-md text-sm">Sau</button>
          </div>
        </div>
      </div>
    </div>
  )
}