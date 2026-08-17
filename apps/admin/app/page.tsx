'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Package, ShoppingCart, Users, DollarSign, TrendingUp, TrendingDown, Bell, Eye, Plus, ChevronRight } from 'lucide-react'

const stats = [
  { label: 'Doanh thu hôm nay', value: '325.5M', change: '+12.5%', up: true, icon: DollarSign },
  { label: 'Đơn hàng mới', value: '156', change: '+8.2%', up: true, icon: ShoppingCart },
  { label: 'Sản phẩm', value: '1,234', change: '+23', up: true, icon: Package },
  { label: 'Khách hàng', value: '45,678', change: '+156', up: true, icon: Users },
]

const recentOrders = [
  { id: 1, code: 'ORD20260817001', customer: 'Nguyễn Văn A', total: '32.990.000đ', status: 'pending' },
  { id: 2, code: 'ORD20260817002', customer: 'Trần Thị B', total: '15.990.000đ', status: 'confirmed' },
  { id: 3, code: 'ORD20260817003', customer: 'Lê Văn C', total: '89.990.000đ', status: 'processing' },
  { id: 4, code: 'ORD20260817004', customer: 'Phạm Thị D', total: '28.990.000đ', status: 'shipping' },
  { id: 5, code: 'ORD20260817005', customer: 'Hoàng Văn E', total: '42.990.000đ', status: 'completed' },
]

const topProducts = [
  { id: 1, name: 'iPhone 15 Pro Max 256GB', sold: 234, revenue: '7.7B' },
  { id: 2, name: 'Samsung Galaxy S24 Ultra', sold: 189, revenue: '5.3B' },
  { id: 3, name: 'MacBook Pro 14" M3', sold: 67, revenue: '3.3B' },
  { id: 4, name: 'AirPods Pro 2', sold: 456, revenue: '2.3B' },
  { id: 5, name: 'iPad Air M2', sold: 89, revenue: '2.1B' },
]

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: 'Chờ xác nhận', color: 'text-yellow-700', bg: 'bg-yellow-100' },
  confirmed: { label: 'Đã xác nhận', color: 'text-blue-700', bg: 'bg-blue-100' },
  processing: { label: 'Đang xử lý', color: 'text-purple-700', bg: 'bg-purple-100' },
  shipping: { label: 'Đang giao', color: 'text-indigo-700', bg: 'bg-indigo-100' },
  completed: { label: 'Hoàn thành', color: 'text-green-700', bg: 'bg-green-100' },
}

export default function AdminDashboard() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#363636]">Dashboard</h1>
          <p className="text-gray-500">Chào mừng đến TechStore Admin</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/san-pham/them">
            <button className="bg-[#ca3838] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#b32f2f] flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Thêm sản ph�m
            </button>
          </Link>
          <button className="relative p-2 bg-white border border-gray-200 rounded-md hover:bg-gray-50">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-[#fef6f6] rounded-lg">
                <stat.icon className="w-6 h-6 text-[#ca3838]" />
              </div>
              <span className={`flex items-center text-sm font-medium ${stat.up ? 'text-green-600' : 'text-red-600'}`}>
                {stat.up ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-[#363636] mb-1">{stat.value}</h3>
            <p className="text-gray-500 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#363636]">�ơn hàng gần đây</h2>
              <Link href="/don-hang" className="text-sm text-[#ca3838] hover:underline">Xem tất cả</Link>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Mã đơn</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Khách</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Tổng</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentOrders.map((order) => {
                  const status = statusConfig[order.status]
                  return (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-semibold text-[#ca3838]">#{order.code}</td>
                      <td className="px-4 py-3 text-sm text-[#363636]">{order.customer}</td>
                      <td className="px-4 py-3 text-sm font-medium">{order.total}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-0.5 text-xs font-semibold rounded-full ${status.bg} ${status.color}`}>
                          {status.label}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#363636]">Sản phẩm bán chạy</h2>
              <Link href="/san-pham" className="text-sm text-[#ca3838] hover:underline">Xem tất cả</Link>
            </div>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <Link 
                  key={product.id} 
                  href={`/san-pham/${product.id}`}
                  className="flex items-center gap-4 hover:bg-gray-50 -mx-2 px-2 py-2 rounded-lg transition-colors"
                >
                  <span className="w-8 h-8 bg-[#fef6f6] text-[#ca3838] rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[#363636] truncate">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.sold} đã bán</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#ca3838]">{product.revenue}đ</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Cảnh báo kho</h3>
          <p className="text-sm text-yellow-700">3 sản phẩm sắp hết hàng</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="font-semibold text-red-800 mb-2">🚨 Đơn chờ xử lý</h3>
          <p className="text-sm text-red-700">12 đơn chờ xác nhận quá 1 giờ</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">📝 Review mới</h3>
          <p className="text-sm text-blue-700">5 đánh giá 1-2 sao cần xử lý</p>
        </div>
      </div>
    </div>
  )
}
