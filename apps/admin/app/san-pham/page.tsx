'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Package, Search, Filter, Eye, Edit, Trash2, Plus,
  ChevronLeft, ChevronRight, Star, CheckCircle, XCircle,
  TrendingUp, DollarSign, Box, AlertTriangle
} from 'lucide-react'

const products = [
  { id: 1, name: 'iPhone 15 Pro Max 256GB', sku: 'IP15PM-256-NAT', brand: 'Apple', category: 'Điện thoại', price: 32990000, stock: 45, sold: 234, status: 'active', image: '/api/placeholder/50/50' },
  { id: 2, name: 'Samsung Galaxy S24 Ultra', sku: 'SGS24U-256-BLK', brand: 'Samsung', category: 'Điện thoại', price: 28990000, stock: 32, sold: 189, status: 'active', image: '/api/placeholder/50/50' },
  { id: 3, name: 'MacBook Pro 14" M3', sku: 'MBP14-M3-512', brand: 'Apple', category: 'Laptop', price: 45990000, stock: 18, sold: 67, status: 'active', image: '/api/placeholder/50/50' },
  { id: 4, name: 'AirPods Pro 2', sku: 'APP2-USBC', brand: 'Apple', category: 'Phụ kiện', price: 6990000, stock: 89, sold: 456, status: 'active', image: '/api/placeholder/50/50' },
  { id: 5, name: 'Xiaomi 14 Pro', sku: 'XM14P-256', brand: 'Xiaomi', category: 'Điện thoại', price: 18990000, stock: 3, sold: 78, status: 'low_stock', image: '/api/placeholder/50/50' },
  { id: 6, name: 'iPad Pro 11" M2', sku: 'IPP11-M2-128', brand: 'Apple', category: 'Tablet', price: 27990000, stock: 0, sold: 89, status: 'out_of_stock', image: '/api/placeholder/50/50' },
  { id: 7, name: 'Samsung Galaxy Watch 6', sku: 'SGW6-44', brand: 'Samsung', category: 'Đồng hồ', price: 8990000, stock: 25, sold: 123, status: 'active', image: '/api/placeholder/50/50' },
  { id: 8, name: 'OPPO Find X7 Pro', sku: 'OFX7P-256', brand: 'OPPO', category: 'Điện thoại', price: 15990000, stock: 15, sold: 45, status: 'active', image: '/api/placeholder/50/50' },
]

function formatPrice(price: number) { return new Intl.NumberFormat('vi-VN').format(price) + 'đ' }

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  active: { label: 'Đang bán', color: 'text-green-700', bg: 'bg-green-100' },
  low_stock: { label: 'Sắp hết', color: 'text-yellow-700', bg: 'bg-yellow-100' },
  out_of_stock: { label: 'Hết hàng', color: 'text-red-700', bg: 'bg-red-100' },
}

export default function AdminProductsPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filtered = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#363636]">Quản lý sản phẩm</h1>
          <p className="text-gray-500">Quản lý kho và thông tin sản phẩm</p>
        </div>
        <Link href="/san-pham/them">
          <button className="bg-[#ca3838] text-white px-4 py-2 rounded-md font-medium hover:bg-[#b32f2f] flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Thêm sản phẩm
          </button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Tổng sản phẩm</p>
              <p className="text-2xl font-bold text-[#363636]">{products.length}</p>
            </div>
            <Package className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Đang bán</p>
              <p className="text-2xl font-bold text-green-600">{products.filter(p => p.status === 'active').length}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Sắp hết</p>
              <p className="text-2xl font-bold text-yellow-600">{products.filter(p => p.status === 'low_stock').length}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Hết hàng</p>
              <p className="text-2xl font-bold text-red-600">{products.filter(p => p.status === 'out_of_stock').length}</p>
            </div>
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm theo tên hoặc mã SKU..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:border-[#ca3838]"
            />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2.5 border rounded-md">
            <option value="all">Tất cả</option>
            <option value="active">Đang bán</option>
            <option value="low_stock">Sắp hết</option>
            <option value="out_of_stock">Hết hàng</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Sản phẩm</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">SKU</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Thương hiệu</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Giá</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Tồn kho</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Đã bán</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Trạng thái</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(product => {
                const status = statusConfig[product.status]
                return (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={product.image} alt="" className="w-10 h-10 object-cover rounded" />
                        <div>
                          <p className="font-medium text-sm text-[#363636]">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs font-mono text-gray-600">{product.sku}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{product.brand}</td>
                    <td className="px-4 py-3 font-semibold text-[#363636]">{formatPrice(product.price)}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${
                        product.stock === 0 ? 'bg-red-100 text-red-700' :
                        product.stock < 10 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-sm">{product.sold}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-0.5 text-xs font-semibold rounded-full ${status.bg} ${status.color}`}>
                        {status.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md" title="Xem">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-[#ca3838] hover:bg-red-50 rounded-md" title="Sửa">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md" title="Xóa">
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

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Không tìm thấy sản phẩm nào</p>
          </div>
        )}

        <div className="px-6 py-3 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-500">Hiển thị 1-{filtered.length} của {products.length}</p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 border rounded-md hover:bg-gray-50 text-sm" disabled>Trước</button>
            <button className="w-8 h-8 bg-[#ca3838] text-white rounded-md text-sm">1</button>
            <button className="w-8 h-8 border rounded-md hover:bg-gray-50 text-sm">2</button>
            <button className="px-3 py-1.5 border rounded-md hover:bg-gray-50 text-sm">Sau</button>
          </div>
        </div>
      </div>
    </div>
  )
}