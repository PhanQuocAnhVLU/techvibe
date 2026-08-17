'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Filter, Plus, Eye, Edit, Trash2, ChevronDown, MoreHorizontal, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const products = [
  { id: 1, name: 'iPhone 15 Pro Max 256GB', brand: 'Apple', category: 'Điện thoại', price: 32990000, originalPrice: 34990000, stock: 45, sold: 234, status: 'active', image: '/api/placeholder/80/80' },
  { id: 2, name: 'Samsung Galaxy S24 Ultra', brand: 'Samsung', category: 'Điện thoại', price: 28990000, originalPrice: 31990000, stock: 32, sold: 189, status: 'active', image: '/api/placeholder/80/80' },
  { id: 3, name: 'MacBook Pro 14" M3', brand: 'Apple', category: 'Laptop', price: 45990000, originalPrice: 49990000, stock: 18, sold: 67, status: 'active', image: '/api/placeholder/80/80' },
  { id: 4, name: 'AirPods Pro 2', brand: 'Apple', category: 'Phụ kiện', price: 6990000, originalPrice: 7990000, stock: 89, sold: 456, status: 'active', image: '/api/placeholder/80/80' },
  { id: 5, name: 'iPad Pro 11" M2', brand: 'Apple', category: 'Tablet', price: 27990000, originalPrice: 29990000, stock: 25, sold: 89, status: 'active', image: '/api/placeholder/80/80' },
  { id: 6, name: 'Xiaomi 14 Pro', brand: 'Xiaomi', category: 'Điện thoại', price: 18990000, originalPrice: 21990000, stock: 5, sold: 78, status: 'low_stock', image: '/api/placeholder/80/80' },
  { id: 7, name: 'OPPO Find X7 Pro', brand: 'OPPO', category: 'Điện thoại', price: 15990000, originalPrice: 17990000, stock: 0, sold: 45, status: 'out_of_stock', image: '/api/placeholder/80/80' },
  { id: 8, name: 'Samsung Galaxy Watch 6', brand: 'Samsung', category: 'Đồng hồ', price: 8990000, originalPrice: 11990000, stock: 34, sold: 123, status: 'draft', image: '/api/placeholder/80/80' },
]

function formatPrice(price: number) {
  return new Intl.NumberFormat('vi-VN').format(price) + 'đ'
}

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.brand.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  const toggleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(filteredProducts.map(p => p.id))
    }
  }

  const toggleSelect = (id: number) => {
    setSelectedProducts(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const statusConfig = {
    active: { label: 'Hoạt động', color: 'bg-green-100 text-green-800' },
    draft: { label: 'Nháp', color: 'bg-gray-100 text-gray-800' },
    low_stock: { label: 'Sắp hết', color: 'bg-orange-100 text-orange-800' },
    out_of_stock: { label: 'Hết hàng', color: 'bg-red-100 text-red-800' },
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sản phẩm</h1>
          <p className="text-gray-500">Quản lý danh sách sản phẩm</p>
        </div>
        <Link href="/san-pham/them">
          <Button size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            Thêm sản phẩm
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
          >
            <option value="all">Tất cả danh mục</option>
            <option value="Điện thoại">Điện thoại</option>
            <option value="Laptop">Laptop</option>
            <option value="Tablet">Tablet</option>
            <option value="Phụ kiện">Phụ kiện</option>
            <option value="Đồng hồ">Đồng hồ</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Hoạt động</option>
            <option value="draft">Nháp</option>
            <option value="low_stock">Sắp hết hàng</option>
            <option value="out_of_stock">Hết hàng</option>
          </select>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedProducts.length > 0 && (
        <div className="mb-4 p-3 bg-primary/10 rounded-lg flex items-center justify-between">
          <span className="text-sm text-primary font-medium">
            Đã chọn {selectedProducts.length} sản phẩm
          </span>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
              <Check className="w-4 h-4 mr-1" />
              Kích hoạt
            </Button>
            <Button size="sm" variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
              <X className="w-4 h-4 mr-1" />
              Vô hiệu hóa
            </Button>
            <Button size="sm" variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
              <Trash2 className="w-4 h-4 mr-1" />
              Xóa
            </Button>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sản phẩm</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Danh mục</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Giá</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kho</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Đã bán</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => toggleSelect(product.id)}
                      className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                        <Image src={product.image} alt={product.name} width={48} height={48} className="object-cover" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{product.category}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-primary">{formatPrice(product.price)}</p>
                    {product.originalPrice > product.price && (
                      <p className="text-xs text-gray-400 line-through">{formatPrice(product.originalPrice)}</p>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`font-medium ${product.stock <= 5 ? 'text-red-600' : 'text-gray-900'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{product.sold}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusConfig[product.status as keyof typeof statusConfig].color}`}>
                      {statusConfig[product.status as keyof typeof statusConfig].label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <Link href={`/san-pham/${product.id}`}>
                        <button className="p-2 text-gray-400 hover:text-primary hover:bg-gray-100 rounded-lg" title="Xem">
                          <Eye className="w-4 h-4" />
                        </button>
                      </Link>
                      <Link href={`/san-pham/${product.id}/sua`}>
                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-gray-100 rounded-lg" title="Sửa">
                          <Edit className="w-4 h-4" />
                        </button>
                      </Link>
                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded-lg" title="Xóa">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Không tìm thấy sản phẩm nào</p>
          </div>
        )}

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Hiển thị 1-{filteredProducts.length} của {products.length} sản phẩm
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
    </div>
  )
}

function Package(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16.5 9.4 7.55 4.24"/>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      <polyline points="3.29 7 12 12 20.71 7"/>
      <line x1="12" x2="12" y1="22" y2="12"/>
    </svg>
  )
}
