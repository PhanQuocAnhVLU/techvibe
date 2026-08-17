'use client'

import { useState } from 'react'
import { Tag, Plus, Copy, Edit, Trash2, Clock, Gift, Percent, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

const vouchers = [
  { id: 1, code: 'TECHSTORE50', name: 'Giảm 50K cho đơn 500K', discount: 50000, minAmount: 500000, used: 234, total: 500, startDate: '01/08/2024', endDate: '31/08/2024', status: 'active' },
  { id: 2, code: 'NEWUSER100', name: 'Giảm 100K cho user mới', discount: 100000, minAmount: 1000000, used: 156, total: 1000, startDate: '01/08/2024', endDate: '31/12/2024', status: 'active' },
  { id: 3, code: 'FLASH20', name: 'Flash sale giảm 20K', discount: 20000, minAmount: 200000, used: 500, total: 500, startDate: '15/08/2024', endDate: '18/08/2024', status: 'expired' },
  { id: 4, code: 'SUMMER30', name: 'Mùa hè giảm 30%', discount: 30, minAmount: 2000000, used: 0, total: 200, startDate: '20/08/2024', endDate: '30/09/2024', status: 'scheduled' },
]

function formatPrice(price: number) {
  return new Intl.NumberFormat('vi-VN').format(price) + 'đ'
}

export default function PromotionsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredVouchers = vouchers.filter(voucher => {
    const matchesSearch = voucher.code.toLowerCase().includes(searchQuery.toLowerCase()) || voucher.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || voucher.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const statusConfig: Record<string, { label: string; color: string }> = {
    active: { label: 'Hoạt động', color: 'bg-green-100 text-green-800' },
    expired: { label: 'Hết hạn', color: 'bg-red-100 text-red-800' },
    scheduled: { label: 'Sắp diễn ra', color: 'bg-blue-100 text-blue-800' },
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Khuyến mãi</h1>
          <p className="text-gray-500">Quản lý voucher và mã giảm giá</p>
        </div>
        <Button size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Tạo voucher
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <Tag className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Đang hoạt động</p>
              <p className="text-2xl font-bold">{vouchers.filter(v => v.status === 'active').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Sắp diễn ra</p>
              <p className="text-2xl font-bold">{vouchers.filter(v => v.status === 'scheduled').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 rounded-lg">
              <Percent className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Đã hết hạn</p>
              <p className="text-2xl font-bold">{vouchers.filter(v => v.status === 'expired').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Gift className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Tổng lượt sử dụng</p>
              <p className="text-2xl font-bold">{vouchers.reduce((sum, v) => sum + v.used, 0)}</p>
            </div>
          </div>
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
                placeholder="Tìm kiếm voucher..."
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
            <option value="scheduled">Sắp diễn ra</option>
            <option value="expired">Hết hạn</option>
          </select>
        </div>
      </div>

      {/* Vouchers Table */}
      <div className="bg-white rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mã voucher</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tên chương trình</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Giảm giá</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Đơn tối thiểu</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lượt sử dụng</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thời hạn</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredVouchers.map((voucher) => {
                const usagePercent = Math.round((voucher.used / voucher.total) * 100)
                return (
                  <tr key={voucher.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <code className="px-2 py-1 bg-gray-100 rounded font-mono font-semibold text-primary">{voucher.code}</code>
                        <button className="p-1 hover:bg-gray-200 rounded" title="Copy">
                          <Copy className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">{voucher.name}</td>
                    <td className="px-4 py-3 font-semibold text-green-600">
                      {voucher.discount >= 100 ? formatPrice(voucher.discount) : `${voucher.discount}%`}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{formatPrice(voucher.minAmount)}</td>
                    <td className="px-4 py-3">
                      <div className="w-32">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">{voucher.used}/{voucher.total}</span>
                          <span className="text-gray-500">{usagePercent}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${usagePercent}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {voucher.startDate} - {voucher.endDate}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusConfig[voucher.status].color}`}>
                        {statusConfig[voucher.status].label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-gray-100 rounded-lg" title="Sửa">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded-lg" title="Xóa">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
