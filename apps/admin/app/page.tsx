'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Package, ShoppingCart, Users, DollarSign, TrendingUp, TrendingDown, Bell, Eye, Plus, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const stats = [
  { label: 'Doanh thu hôm nay', value: '325.5M', change: '+12.5%', up: true, icon: DollarSign },
  { label: 'Đơn hàng mới', value: '156', change: '+8.2%', up: true, icon: ShoppingCart },
  { label: 'Sản phẩm', value: '1,234', change: '+23', up: true, icon: Package },
  { label: 'Khách hàng', value: '45,678', change: '+156', up: true, icon: Users },
]

const recentOrders = [
  { id: 'ORD20260817001', customer: 'Nguyễn Văn A', total: '32.990.000đ', status: 'pending', time: '5 phút trước' },
  { id: 'ORD20260817002', customer: 'Trần Thị B', total: '15.990.000đ', status: 'confirmed', time: '12 phút trước' },
  { id: 'ORD20260817003', customer: 'Lê Văn C', total: '89.990.000đ', status: 'processing', time: '25 phút trước' },
  { id: 'ORD20260817004', customer: 'Phạm Thị D', total: '28.990.000đ', status: 'shipping', time: '1 giờ trước' },
  { id: 'ORD20260817005', customer: 'Hoàng Văn E', total: '42.990.000đ', status: 'completed', time: '2 giờ trước' },
]

const topProducts = [
  { id: 1, name: 'iPhone 15 Pro Max 256GB', sold: 234, revenue: '7.7B' },
  { id: 2, name: 'Samsung Galaxy S24 Ultra', sold: 189, revenue: '5.3B' },
  { id: 3, name: 'MacBook Pro 14" M3', sold: 67, revenue: '3.3B' },
  { id: 4, name: 'AirPods Pro 2', sold: 456, revenue: '2.3B' },
  { id: 5, name: 'iPad Air M2', sold: 89, revenue: '2.1B' },
]

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  processing: 'bg-purple-100 text-purple-800',
  shipping: 'bg-indigo-100 text-indigo-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
}

const statusLabels: Record<string, string> = {
  pending: 'Chờ xác nhận',
  confirmed: 'Đã xác nhận',
  processing: 'Đang xử lý',
  shipping: 'Đang giao',
  completed: 'Hoàn thành',
  cancelled: 'Đã hủy',
}

export default function AdminDashboard() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Chào mừng đến TechStore Admin</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/san-pham/them">
            <Button size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Thêm sản phẩm
            </Button>
          </Link>
          <button className="relative p-2 bg-white rounded-lg shadow hover:bg-gray-50">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <span className={`flex items-center text-sm font-medium ${stat.up ? 'text-green-600' : 'text-red-600'}`}>
                {stat.up ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-gray-500 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Đơn hàng gần đây</h2>
              <Link href="/don-hang" className="text-sm text-primary hover:underline">Xem tất cả</Link>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Mã đơn</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Khách hàng</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Tổng tiền</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentOrders.map((order, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-primary">{order.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{order.customer}</td>
                    <td className="px-6 py-4 text-sm font-medium">{order.total}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[order.status]}`}>
                        {statusLabels[order.status]}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/don-hang/${order.id}`}>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Eye className="w-4 h-4 text-gray-500" />
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Sản phẩm bán chạy</h2>
              <Link href="/san-pham" className="text-sm text-primary hover:underline">Xem tất cả</Link>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <Link 
                  key={product.id} 
                  href={`/san-pham/${product.id}`}
                  className="flex items-center gap-4 hover:bg-gray-50 -mx-4 px-4 py-2 rounded-lg transition-colors"
                >
                  <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-bold text-primary">
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.sold} đã bán</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">{product.revenue}đ</p>
                    <p className="text-xs text-gray-500">doanh thu</p>
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
