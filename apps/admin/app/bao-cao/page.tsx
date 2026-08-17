'use client'

import { useState } from 'react'
import { BarChart3, TrendingUp, DollarSign, ShoppingBag, Users, Package, Calendar, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

const timeRanges = [
  { value: '7d', label: '7 ngày' },
  { value: '30d', label: '30 ngày' },
  { value: '90d', label: '90 ngày' },
  { value: '1y', label: '1 năm' },
]

export default function ReportsPage() {
  const [selectedRange, setSelectedRange] = useState('30d')

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Báo cáo</h1>
          <p className="text-gray-500">Thống kê doanh thu và hoạt động</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {timeRanges.map(range => (
              <button
                key={range.value}
                onClick={() => setSelectedRange(range.value)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  selectedRange === range.value
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <span className="flex items-center text-sm font-medium text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              +12.5%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">12.5B</h3>
          <p className="text-gray-500 text-sm">Doanh thu tháng này</p>
        </div>
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <ShoppingBag className="w-6 h-6 text-blue-600" />
            </div>
            <span className="flex items-center text-sm font-medium text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              +8.2%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">1,234</h3>
          <p className="text-gray-500 text-sm">Đơn hàng tháng này</p>
        </div>
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <span className="flex items-center text-sm font-medium text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              +15.3%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">567</h3>
          <p className="text-gray-500 text-sm">Khách hàng mới</p>
        </div>
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Package className="w-6 h-6 text-orange-600" />
            </div>
            <span className="flex items-center text-sm font-medium text-red-600">
              -3.2%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">45.2%</h3>
          <p className="text-gray-500 text-sm">Tỷ lệ chuyển đổi</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Revenue Chart Placeholder */}
        <div className="bg-white rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4">Doanh thu theo ngày</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">Biểu đồ doanh thu</p>
              <p className="text-sm text-gray-400">(Cần integrate chart library)</p>
            </div>
          </div>
        </div>

        {/* Orders Chart Placeholder */}
        <div className="bg-white rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4">Đơn hàng theo ngày</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">Biểu đồ đơn hàng</p>
              <p className="text-sm text-gray-400">(Cần integrate chart library)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-lg p-6">
        <h3 className="text-lg font-bold mb-4">Top sản phẩm bán chạy</h3>
        <div className="space-y-4">
          {[
            { name: 'iPhone 15 Pro Max 256GB', sold: 234, revenue: '7.7B' },
            { name: 'Samsung Galaxy S24 Ultra', sold: 189, revenue: '5.3B' },
            { name: 'MacBook Pro 14" M3', sold: 67, revenue: '3.3B' },
            { name: 'AirPods Pro 2', sold: 456, revenue: '2.3B' },
            { name: 'iPad Air M2', sold: 89, revenue: '2.1B' },
          ].map((product, index) => (
            <div key={index} className="flex items-center gap-4">
              <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-bold text-primary">
                {index + 1}
              </span>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{product.name}</p>
                <p className="text-sm text-gray-500">{product.sold} đã bán</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary">{product.revenue}đ</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
