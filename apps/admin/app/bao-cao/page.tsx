'use client'

import { useState } from 'react'
import { TrendingUp, DollarSign, ShoppingCart, Users, Package, Download, Calendar } from 'lucide-react'

const monthlyRevenue = [
  { month: 'T1', revenue: 125000000, orders: 234 },
  { month: 'T2', revenue: 156000000, orders: 289 },
  { month: 'T3', revenue: 189000000, orders: 345 },
  { month: 'T4', revenue: 167000000, orders: 312 },
  { month: 'T5', revenue: 198000000, orders: 378 },
  { month: 'T6', revenue: 234000000, orders: 423 },
  { month: 'T7', revenue: 256000000, orders: 467 },
  { month: 'T8', revenue: 289000000, orders: 523 },
]

const topProducts = [
  { name: 'iPhone 15 Pro Max 256GB', sold: 234, revenue: 7716666000 },
  { name: 'Samsung Galaxy S24 Ultra', sold: 189, revenue: 5478210000 },
  { name: 'MacBook Pro 14" M3', sold: 67, revenue: 3081330000 },
  { name: 'AirPods Pro 2', sold: 456, revenue: 3187440000 },
  { name: 'Xiaomi 14 Pro', sold: 78, revenue: 1481220000 },
]

function formatPrice(price: number) {
  if (price >= 1000000000) return (price / 1000000000).toFixed(1) + 'B'
  if (price >= 1000000) return (price / 1000000).toFixed(0) + 'M'
  return new Intl.NumberFormat('vi-VN').format(price) + 'đ'
}

export default function AdminReportsPage() {
  const [period, setPeriod] = useState('month')
  const maxRevenue = Math.max(...monthlyRevenue.map(m => m.revenue))

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#363636]">Báo cáo & Thống kê</h1>
          <p className="text-gray-500">Tổng quan về doanh thu và hoạt động kinh doanh</p>
        </div>
        <div className="flex items-center gap-2">
          <select value={period} onChange={(e) => setPeriod(e.target.value)} className="px-4 py-2 border rounded-md text-sm">
            <option value="week">7 ngày qua</option>
            <option value="month">30 ngày qua</option>
            <option value="quarter">Quý này</option>
            <option value="year">Năm nay</option>
          </select>
          <button className="bg-[#ca3838] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#b32f2f] flex items-center gap-2">
            <Download className="w-4 h-4" />
            Xuất báo cáo
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-5 rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-8 h-8 text-green-500" />
            <span className="text-xs text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded">+12.5%</span>
          </div>
          <p className="text-2xl font-bold text-[#363636]">{formatPrice(monthlyRevenue[7].revenue)}</p>
          <p className="text-xs text-gray-500 mt-1">Doanh thu tháng này</p>
        </div>
        <div className="bg-white p-5 rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <ShoppingCart className="w-8 h-8 text-blue-500" />
            <span className="text-xs text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded">+8.2%</span>
          </div>
          <p className="text-2xl font-bold text-[#363636]">{monthlyRevenue[7].orders}</p>
          <p className="text-xs text-gray-500 mt-1">Đơn hàng</p>
        </div>
        <div className="bg-white p-5 rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-8 h-8 text-purple-500" />
            <span className="text-xs text-purple-600 font-semibold bg-purple-50 px-2 py-0.5 rounded">+156</span>
          </div>
          <p className="text-2xl font-bold text-[#363636]">2,847</p>
          <p className="text-xs text-gray-500 mt-1">Khách hàng mới</p>
        </div>
        <div className="bg-white p-5 rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <Package className="w-8 h-8 text-orange-500" />
            <span className="text-xs text-orange-600 font-semibold bg-orange-50 px-2 py-0.5 rounded">+23</span>
          </div>
          <p className="text-2xl font-bold text-[#363636]">156</p>
          <p className="text-xs text-gray-500 mt-1">Sản phẩm mới</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg border p-6">
          <h2 className="text-lg font-bold text-[#363636] mb-4">Doanh thu theo tháng</h2>
          <div className="space-y-4">
            {monthlyRevenue.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="w-12 text-sm text-gray-600">{item.month}</span>
                <div className="flex-1 bg-gray-100 rounded-full h-8 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#ca3838] to-orange-500 rounded-full flex items-center justify-end px-3 text-white text-xs font-semibold"
                    style={{ width: `${(item.revenue / maxRevenue) * 100}%` }}
                  >
                    {formatPrice(item.revenue)}
                  </div>
                </div>
                <span className="w-16 text-right text-sm text-gray-600">{item.orders} đơn</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-lg font-bold text-[#363636] mb-4">Top sản phẩm</h2>
          <div className="space-y-3">
            {topProducts.map((product, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="w-7 h-7 bg-[#fef6f6] text-[#ca3838] rounded-full flex items-center justify-center text-sm font-bold shrink-0">
                  {idx + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{product.name}</p>
                  <p className="text-xs text-gray-500">{product.sold} đã bán</p>
                </div>
                <span className="text-sm font-semibold text-[#ca3838]">{formatPrice(product.revenue)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}