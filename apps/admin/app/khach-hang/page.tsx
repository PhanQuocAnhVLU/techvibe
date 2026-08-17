'use client'

import { useState } from 'react'
import { Search, Eye, Mail, Phone, MapPin, Calendar, MoreHorizontal, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'

const customers = [
  { id: 1, name: 'Nguyễn Văn A', email: 'nva@gmail.com', phone: '0912 345 678', orders: 12, totalSpent: 456000000, joinedDate: '15/01/2024', status: 'active', avatar: 'A' },
  { id: 2, name: 'Trần Thị B', email: 'ttb@yahoo.com', phone: '0934 567 890', orders: 8, totalSpent: 289000000, joinedDate: '20/02/2024', status: 'active', avatar: 'B' },
  { id: 3, name: 'Lê Văn C', email: 'lvc@email.com', phone: '0901 234 567', orders: 5, totalSpent: 156000000, joinedDate: '10/03/2024', status: 'inactive', avatar: 'C' },
  { id: 4, name: 'Phạm Thị D', email: 'ptd@email.com', phone: '0978 654 321', orders: 15, totalSpent: 678000000, joinedDate: '05/01/2024', status: 'vip', avatar: 'D' },
  { id: 5, name: 'Hoàng Văn E', email: 'hve@email.com', phone: '0945 678 901', orders: 3, totalSpent: 89000000, joinedDate: '25/04/2024', status: 'active', avatar: 'E' },
  { id: 6, name: 'Vũ Thị F', email: 'vtf@email.com', phone: '0963 258 147', orders: 2, totalSpent: 45000000, joinedDate: '12/05/2024', status: 'new', avatar: 'F' },
]

function formatPrice(price: number) {
  if (price >= 1000000000) {
    return (price / 1000000000).toFixed(1) + 'B'
  }
  return new Intl.NumberFormat('vi-VN').format(price) + 'đ'
}

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery)
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const statusConfig: Record<string, { label: string; color: string }> = {
    active: { label: 'Hoạt động', color: 'bg-green-100 text-green-800' },
    inactive: { label: 'Không hoạt động', color: 'bg-gray-100 text-gray-800' },
    vip: { label: 'VIP', color: 'bg-purple-100 text-purple-800' },
    new: { label: 'Mới', color: 'bg-blue-100 text-blue-800' },
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Khách hàng</h1>
          <p className="text-gray-500">Quản lý thông tin khách hàng</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg p-4">
          <p className="text-sm text-gray-500 mb-1">Tổng khách hàng</p>
          <p className="text-2xl font-bold text-gray-900">45,678</p>
        </div>
        <div className="bg-white rounded-lg p-4">
          <p className="text-sm text-gray-500 mb-1">Khách hàng mới (tháng)</p>
          <p className="text-2xl font-bold text-green-600">+1,234</p>
        </div>
        <div className="bg-white rounded-lg p-4">
          <p className="text-sm text-gray-500 mb-1">Khách VIP</p>
          <p className="text-2xl font-bold text-purple-600">567</p>
        </div>
        <div className="bg-white rounded-lg p-4">
          <p className="text-sm text-gray-500 mb-1">Tổng chi tiêu</p>
          <p className="text-2xl font-bold text-primary">125.8B</p>
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
                placeholder="Tìm theo tên, email, SĐT..."
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
            <option value="active">Hoạt động</option>
            <option value="inactive">Không hoạt động</option>
            <option value="vip">VIP</option>
            <option value="new">Mới</option>
          </select>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Khách hàng</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Liên hệ</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Đơn hàng</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tổng chi tiêu</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngày tham gia</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                        {customer.avatar}
                      </div>
                      <span className="font-medium text-gray-900">{customer.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        {customer.email}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        {customer.phone}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{customer.orders}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-semibold text-primary">
                    {formatPrice(customer.totalSpent)}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusConfig[customer.status].color}`}>
                      {statusConfig[customer.status].label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {customer.joinedDate}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <button className="p-2 text-gray-400 hover:text-primary hover:bg-gray-100 rounded-lg" title="Xem chi tiết">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-primary hover:bg-gray-100 rounded-lg" title="Gửi email">
                        <Mail className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCustomers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Không tìm thấy khách hàng nào</p>
          </div>
        )}

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Hiển thị 1-{filteredCustomers.length} của {customers.length} khách hàng
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>Trước</Button>
            <Button variant="outline" size="sm" className="bg-primary text-white">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <Button variant="outline" size="sm">Sau</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Users(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  )
}
