'use client'

import { useState } from 'react'
import { Warehouse, Package, AlertTriangle, Check, Search, TrendingDown, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

const inventory = [
  { id: 1, sku: 'IP15PM256', name: 'iPhone 15 Pro Max 256GB', category: 'Điện thoại', stock: 45, sold: 234, lowStock: 10 },
  { id: 2, sku: 'SG24U256', name: 'Samsung Galaxy S24 Ultra', category: 'Điện thoại', stock: 32, sold: 189, lowStock: 10 },
  { id: 3, sku: 'MBA14M3', name: 'MacBook Pro 14" M3', category: 'Laptop', stock: 18, sold: 67, lowStock: 5 },
  { id: 4, sku: 'APP2USB', name: 'AirPods Pro 2 USB-C', category: 'Phụ kiện', stock: 89, sold: 456, lowStock: 20 },
  { id: 5, sku: 'IP15P256', name: 'iPhone 15 Pro 256GB', category: 'Điện thoại', stock: 8, sold: 156, lowStock: 10 },
  { id: 6, sku: 'XM14P', name: 'Xiaomi 14 Pro', category: 'Điện thoại', stock: 5, sold: 78, lowStock: 10 },
  { id: 7, sku: 'OPF7P', name: 'OPPO Find X7 Pro', category: 'Điện thoại', stock: 0, sold: 45, lowStock: 10 },
  { id: 8, sku: 'SGW6', name: 'Samsung Galaxy Watch 6', category: 'Đồng hồ', stock: 34, sold: 123, lowStock: 10 },
]

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [stockFilter, setStockFilter] = useState('all')

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.sku.toLowerCase().includes(searchQuery.toLowerCase())
    if (stockFilter === 'all') return matchesSearch
    if (stockFilter === 'low') return matchesSearch && item.stock <= item.lowStock && item.stock > 0
    if (stockFilter === 'out') return matchesSearch && item.stock === 0
    return matchesSearch
  })

  const lowStockItems = inventory.filter(i => i.stock <= i.lowStock && i.stock > 0)
  const outOfStockItems = inventory.filter(i => i.stock === 0)

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kho hàng</h1>
          <p className="text-gray-500">Quản lý số lượng tồn kho</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Tổng sản phẩm</p>
              <p className="text-2xl font-bold">{inventory.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Còn hàng</p>
              <p className="text-2xl font-bold text-green-600">{inventory.filter(i => i.stock > i.lowStock).length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 rounded-lg">
              <TrendingDown className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Sắp hết hàng</p>
              <p className="text-2xl font-bold text-orange-600">{lowStockItems.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Hết hàng</p>
              <p className="text-2xl font-bold text-red-600">{outOfStockItems.length}</p>
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
                placeholder="Tìm theo tên, SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
          </div>
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
          >
            <option value="all">Tất cả</option>
            <option value="low">Sắp hết hàng</option>
            <option value="out">Hết hàng</option>
          </select>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">SKU</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sản phẩm</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Danh mục</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tồn kho</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Đã bán</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredInventory.map((item) => {
                const isLowStock = item.stock <= item.lowStock && item.stock > 0
                const isOutOfStock = item.stock === 0
                return (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{item.sku}</code>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">{item.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{item.category}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold ${isOutOfStock ? 'text-red-600' : isLowStock ? 'text-orange-600' : 'text-gray-900'}`}>
                          {item.stock}
                        </span>
                        <span className="text-xs text-gray-400">/ {item.lowStock} tối thiểu</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{item.sold}</td>
                    <td className="px-4 py-3">
                      {isOutOfStock ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                          <AlertTriangle className="w-3 h-3" />
                          Hết hàng
                        </span>
                      ) : isLowStock ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">
                          <TrendingDown className="w-3 h-3" />
                          Sắp hết
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          <Check className="w-3 h-3" />
                          Còn hàng
                        </span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {filteredInventory.length === 0 && (
          <div className="text-center py-12">
            <Warehouse className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Không tìm thấy sản phẩm nào</p>
          </div>
        )}
      </div>
    </div>
  )
}
