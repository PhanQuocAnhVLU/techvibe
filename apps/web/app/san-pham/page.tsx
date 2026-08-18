'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Filter, Grid3X3, LayoutList, ChevronDown, Star, 
  SlidersHorizontal, X, Search, ChevronRight, Clock,
  Heart, ShoppingCart
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductMockup } from '@/components/product-mockup'

const brands = ['Apple', 'Samsung', 'Xiaomi', 'OPPO', 'vivo', 'Realme', 'Nokia', 'Tecno']
const categories = [
  { id: 'dien-thoai', name: 'Điện thoại', slug: 'dien-thoai', count: 234 },
  { id: 'laptop', name: 'Laptop', slug: 'laptop', count: 156 },
  { id: 'tablet', name: 'Tablet', slug: 'tablet', count: 89 },
  { id: 'phu-kien', name: 'Phụ kiện', slug: 'phu-kien', count: 456 },
  { id: 'dong-ho', name: 'Đồng hồ thông minh', slug: 'dong-ho', count: 123 },
  { id: 'am-thanh', name: 'Âm thanh', slug: 'am-thanh', count: 78 },
]

const products = [
  { id: 1, name: 'iPhone 15 Pro Max 256GB', brand: 'Apple', price: 32990000, originalPrice: 34990000, rating: 4.8, reviews: 1245, image: '', badge: 'Giảm 2TR', stock: 45, sold: 234 },
  { id: 2, name: 'Samsung Galaxy S24 Ultra 256GB', brand: 'Samsung', price: 28990000, originalPrice: 31990000, rating: 4.7, reviews: 892, image: '', badge: '', stock: 32, sold: 189 },
  { id: 3, name: 'Xiaomi 14 Ultra', brand: 'Xiaomi', price: 18990000, originalPrice: 21990000, rating: 4.6, reviews: 567, image: '', badge: 'Mới', stock: 28, sold: 78 },
  { id: 4, name: 'OPPO Find X7 Pro', brand: 'OPPO', price: 15990000, originalPrice: 17990000, rating: 4.5, reviews: 234, image: '', badge: '', stock: 15, sold: 45 },
  { id: 5, name: 'iPhone 15 128GB', brand: 'Apple', price: 22990000, originalPrice: 24990000, rating: 4.8, reviews: 2103, image: '', badge: '', stock: 67, sold: 567 },
  { id: 6, name: 'Samsung Galaxy Z Flip5', brand: 'Samsung', price: 19990000, originalPrice: 22990000, rating: 4.6, reviews: 456, image: '', badge: 'Trả góp 0%', stock: 23, sold: 123 },
  { id: 7, name: 'vivo X100 Pro', brand: 'vivo', price: 16990000, originalPrice: 18990000, rating: 4.7, reviews: 178, image: '', badge: 'Mới', stock: 12, sold: 34 },
  { id: 8, name: 'Realme GT5 Pro', brand: 'Realme', price: 12990000, originalPrice: 14990000, rating: 4.5, reviews: 345, image: '', badge: '', stock: 34, sold: 89 },
  { id: 9, name: 'MacBook Pro 14 inch M3', brand: 'Apple', price: 45990000, originalPrice: 49990000, rating: 4.9, reviews: 567, image: '', badge: 'Hot', stock: 18, sold: 67 },
  { id: 10, name: 'iPad Pro 11 inch M2', brand: 'Apple', price: 27990000, originalPrice: 29990000, rating: 4.8, reviews: 789, image: '', badge: 'Giảm 2TR', stock: 25, sold: 89 },
  { id: 11, name: 'Samsung Galaxy Tab S9 Ultra', brand: 'Samsung', price: 32990000, originalPrice: 35990000, rating: 4.7, reviews: 234, image: '', badge: '', stock: 8, sold: 45 },
  { id: 12, name: 'AirPods Pro 2', brand: 'Apple', price: 6990000, originalPrice: 7990000, rating: 4.9, reviews: 3456, image: '', badge: 'Bán chạy', stock: 89, sold: 456 },
]

const sortOptions = [
  { value: 'popular', label: 'Nổi bật' },
  { value: 'price-asc', label: 'Giá: Thấp đến cao' },
  { value: 'price-desc', label: 'Giá: Cao đến thấp' },
  { value: 'newest', label: 'Mới nhất' },
  { value: 'rating', label: 'Đánh giá cao nhất' },
  { value: 'best-seller', label: 'Bán chạy nhất' },
]

const priceRanges = [
  { min: 0, max: 5000000, label: 'Dưới 5 triệu' },
  { min: 5000000, max: 10000000, label: '5 - 10 triệu' },
  { min: 10000000, max: 20000000, label: '10 - 20 triệu' },
  { min: 20000000, max: 50000000, label: '20 - 50 triệu' },
  { min: 50000000, max: Infinity, label: 'Trên 50 triệu' },
]

function formatPrice(price: number) {
  return new Intl.NumberFormat('vi-VN').format(price)
}

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState('popular')
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    category: true,
    brand: true,
    price: true,
  })

  const productsPerPage = 16

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    )
  }

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    )
  }

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const clearFilters = () => {
    setSelectedBrands([])
    setSelectedCategories([])
    setSelectedPriceRange(null)
    setSearchQuery('')
  }

  const hasActiveFilters = selectedBrands.length > 0 || selectedCategories.length > 0 || selectedPriceRange !== null || searchQuery

  // Filter products
  let filteredProducts = [...products]

  if (searchQuery) {
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  if (selectedBrands.length > 0) {
    filteredProducts = filteredProducts.filter(p => selectedBrands.includes(p.brand))
  }

  if (selectedPriceRange !== null) {
    const range = priceRanges[selectedPriceRange]
    filteredProducts = filteredProducts.filter(p => p.price >= range.min && p.price <= range.max)
  }

  // Sort products
  switch (sortBy) {
    case 'price-asc':
      filteredProducts.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      filteredProducts.sort((a, b) => b.price - a.price)
      break
    case 'rating':
      filteredProducts.sort((a, b) => b.rating - a.rating)
      break
    case 'best-seller':
      filteredProducts.sort((a, b) => b.sold - a.sold)
      break
    case 'newest':
      filteredProducts.reverse()
      break
  }

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  )

  const FilterSection = ({ title, sectionKey, children }: { title: string; sectionKey: string; children: React.ReactNode }) => (
    <div className="border-b border-gray-200 pb-4">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="flex items-center justify-between w-full py-2 font-semibold text-[#363636] text-sm"
      >
        {title}
        <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections[sectionKey] ? 'rotate-180' : ''}`} />
      </button>
      {expandedSections[sectionKey] && <div className="mt-2">{children}</div>}
    </div>
  )

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Top Bar */}
      <div className="bg-[#ca3838] text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link href="#" className="flex items-center gap-1 hover:opacity-80">
                Hồ Chí Minh
              </Link>
              <Link href="tel:18002000" className="hidden sm:flex items-center gap-1 hover:opacity-80">
                1800.2000
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/tra-cuu-don-hang" className="hover:opacity-80">Tra cứu đơn hàng</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="w-11 h-11 bg-[#ca3838] rounded-lg flex items-center justify-center">
                <span className="font-bold text-white text-2xl">T</span>
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-2xl text-[#363636]">Tech</span>
                <span className="font-bold text-2xl text-[#ca3838]">Store</span>
              </div>
            </Link>

            {/* Search */}
            <div className="flex-1 max-w-xl">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Bạn tìm gì hôm nay?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-2.5 border-2 border-[#ca3838] border-r-0 rounded-l-md focus:outline-none text-sm"
                />
                <button className="px-6 bg-[#ca3838] text-white rounded-r-md hover:bg-[#b32f2f] transition-colors">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <Link href="/tai-khoan" className="hidden md:flex flex-col items-center px-3 py-1 hover:text-[#ca3838] text-[#363636]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-[10px]">Tài khoản</span>
              </Link>
              <Link href="/gio-hang" className="relative flex flex-col items-center px-3 py-1 hover:text-[#ca3838] text-[#363636]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-[10px]">Giỏ hàng</span>
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#ca3838] text-white text-[10px] rounded-full flex items-center justify-center">3</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Category Nav */}
        <div className="bg-[#363636] hidden md:block">
          <div className="max-w-7xl mx-auto px-4">
            <ul className="flex items-center">
              {categories.map((cat, idx) => (
                <li key={cat.id}>
                  <Link
                    href={`/san-pham?danh-muc=${cat.slug}`}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium text-white hover:bg-[#ca3838] transition-colors ${idx === 0 ? 'bg-[#ca3838]' : ''}`}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/khuyen-mai"
                  className="flex items-center gap-1 px-4 py-3 text-sm font-bold text-yellow-400 hover:bg-[#ca3838] transition-colors"
                >
                  🔥 Khuyến mãi
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-[#ca3838]">Trang chủ</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-[#363636]">Tất cả sản phẩm</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Toolbar - Style TGDĐ */}
        <div className="flex items-center justify-between mb-4 bg-white rounded-lg p-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Lọc
            </button>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-sm text-[#ca3838] hover:underline"
              >
                <X className="w-4 h-4" />
                Xóa bộ lọc
              </button>
            )}

            <span className="text-sm text-gray-500">
              Có <strong>{filteredProducts.length}</strong> sản phẩm
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none px-4 py-2 pr-10 border border-gray-300 rounded-md bg-white hover:bg-gray-50 cursor-pointer text-sm focus:outline-none focus:border-[#ca3838]"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-gray-400" />
            </div>

            {/* View Mode */}
            <div className="hidden sm:flex border border-gray-300 rounded-md overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-[#ca3838] text-white' : 'hover:bg-gray-100'}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-[#ca3838] text-white' : 'hover:bg-gray-100'}`}
              >
                <LayoutList className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Filters Sidebar - Style TGDĐ */}
          <aside className={`
            fixed lg:static inset-0 z-40 bg-white lg:bg-transparent transform transition-transform lg:transform-none
            ${showFilters ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            w-80 lg:w-64 shrink-0 overflow-y-auto lg:block
          `}>
            <div className="lg:block p-6 lg:p-0">
              {/* Mobile close button */}
              <div className="flex items-center justify-between mb-6 lg:hidden">
                <h2 className="text-lg font-bold">Bộ lọc</h2>
                <button onClick={() => setShowFilters(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Categories */}
              <FilterSection title="Danh mục" sectionKey="category">
                <div className="space-y-2">
                  {categories.map(cat => (
                    <label key={cat.id} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat.slug)}
                        onChange={() => toggleCategory(cat.slug)}
                        className="w-4 h-4 rounded border-gray-300 text-[#ca3838] focus:ring-[#ca3838]"
                      />
                      <span className="text-sm text-gray-600 group-hover:text-[#363636]">
                        {cat.name}
                      </span>
                      <span className="text-xs text-gray-400">({cat.count})</span>
                    </label>
                  ))}
                </div>
              </FilterSection>

              {/* Brands */}
              <FilterSection title="Thương hiệu" sectionKey="brand">
                <div className="space-y-2">
                  {brands.map(brand => (
                    <label key={brand} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="w-4 h-4 rounded border-gray-300 text-[#ca3838] focus:ring-[#ca3838]"
                      />
                      <span className="text-sm text-gray-600 group-hover:text-[#363636]">{brand}</span>
                    </label>
                  ))}
                </div>
              </FilterSection>

              {/* Price Range */}
              <FilterSection title="Mức giá" sectionKey="price">
                <div className="space-y-2">
                  {priceRanges.map((range, index) => (
                    <label key={index} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="price"
                        checked={selectedPriceRange === index}
                        onChange={() => setSelectedPriceRange(selectedPriceRange === index ? null : index)}
                        className="w-4 h-4 border-gray-300 text-[#ca3838] focus:ring-[#ca3838]"
                      />
                      <span className="text-sm text-gray-600 group-hover:text-[#363636]">{range.label}</span>
                    </label>
                  ))}
                </div>
              </FilterSection>
            </div>
          </aside>

          {/* Overlay for mobile */}
          {showFilters && (
            <div 
              className="fixed inset-0 bg-black/50 z-30 lg:hidden"
              onClick={() => setShowFilters(false)}
            />
          )}

          {/* Products Grid - Style TGDĐ */}
          <div className="flex-1">
            {paginatedProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-lg">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-[#363636] mb-2">Không tìm thấy sản phẩm</h3>
                <p className="text-gray-500 mb-4">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                <Button onClick={clearFilters}>Xóa bộ lọc</Button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {paginatedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {paginatedProducts.map(product => (
                  <ProductListCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination - Style TGDĐ */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8 bg-white rounded-lg p-3">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 border rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                </button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let page = i + 1
                  if (totalPages > 5) {
                    if (currentPage > 3) {
                      page = currentPage - 2 + i
                      if (page > totalPages) page = totalPages - 4 + i
                    }
                  }
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-md ${
                        currentPage === page
                          ? 'bg-[#ca3838] text-white'
                          : 'border hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  )
                })}

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 border rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProductCard({ product }: { product: any }) {
  const discount = product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0

  return (
    <Link 
      href={`/san-pham/${product.id}`}
      className="group bg-white rounded-lg overflow-hidden border border-gray-100 hover:shadow-lg transition-all"
    >
      {/* Image */}
      <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100">
        <ProductMockup
          name={product.name}
          brand={product.brand}
          className="w-full h-full"
        />
        {product.badge && (
          <span className={`absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold rounded ${
            product.badge === 'Hot' ? 'bg-[#ca3838] text-white' :
            product.badge === 'Mới' ? 'bg-[#2563eb] text-white' :
            product.badge === 'Bán chạy' ? 'bg-[#16a34a] text-white' :
            'bg-[#f97316] text-white'
          }`}>
            {product.badge}
          </span>
        )}
        {discount > 0 && (
          <span className="absolute top-2 right-2 px-2 py-0.5 text-[10px] font-bold bg-[#ca3838] text-white rounded">
            -{discount}%
          </span>
        )}
        <button 
          className="absolute bottom-2 right-2 p-1.5 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50"
          onClick={(e) => { e.preventDefault(); }}
        >
          <Heart className="w-4 h-4 text-gray-400 hover:text-red-500" />
        </button>
      </div>

      {/* Content - Style TGDĐ */}
      <div className="p-3">
        <span className="text-[10px] text-gray-500">{product.brand}</span>
        <h3 className="font-medium text-[#363636] text-sm line-clamp-2 mt-1 group-hover:text-[#ca3838] transition-colors min-h-[40px]">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          <span className="text-xs font-medium">{product.rating}</span>
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>

        {/* Price - Style TGDĐ */}
        <div className="mt-2">
          <span className="text-base font-bold text-[#ca3838]">{formatPrice(product.price)}đ</span>
          {discount > 0 && (
            <span className="text-xs text-gray-400 line-through ml-1">{formatPrice(product.originalPrice)}đ</span>
          )}
        </div>

        {/* Installment */}
        <p className="text-[10px] text-gray-500 mt-1">
          Trả góp {formatPrice(Math.round(product.price / 24))}đ/tháng
        </p>

        {/* Stock */}
        <div className="mt-2">
          {product.stock > 10 ? (
            <span className="text-[10px] text-green-600">✓ Còn hàng</span>
          ) : product.stock > 0 ? (
            <span className="text-[10px] text-orange-500">Chỉ còn {product.stock} sản phẩm</span>
          ) : (
            <span className="text-[10px] text-red-500">Hết hàng</span>
          )}
        </div>
      </div>
    </Link>
  )
}

function ProductListCard({ product }: { product: any }) {
  const discount = product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0

  return (
    <Link 
      href={`/san-pham/${product.id}`}
      className="group flex gap-4 bg-white rounded-lg overflow-hidden border border-gray-100 hover:shadow-md transition-all p-4"
    >
      {/* Image */}
      <div className="relative w-28 h-28 shrink-0 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden">
        <ProductMockup
          name={product.name}
          brand={product.brand}
          className="w-full h-full"
        />
        {product.badge && (
          <span className="absolute top-1 left-1 px-1.5 py-0.5 text-[10px] font-bold bg-[#ca3838] text-white rounded">
            {product.badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 py-1">
        <span className="text-xs text-gray-500">{product.brand}</span>
        <h3 className="font-medium text-[#363636] mt-1 group-hover:text-[#ca3838] transition-colors">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mt-1">
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          <span className="text-xs font-medium">{product.rating}</span>
          <span className="text-xs text-gray-400">({product.reviews} đánh giá)</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3 mt-2">
          <span className="text-lg font-bold text-[#ca3838]">{formatPrice(product.price)}đ</span>
          {discount > 0 && (
            <>
              <span className="text-sm text-gray-400 line-through">{formatPrice(product.originalPrice)}đ</span>
              <span className="text-xs font-medium text-[#ca3838]">-{discount}%</span>
            </>
          )}
        </div>

        {/* Installment */}
        <p className="text-xs text-gray-500 mt-1">
          Trả góp {formatPrice(Math.round(product.price / 24))}đ/tháng
        </p>
      </div>

      {/* Stock */}
      <div className="flex items-center">
        {product.stock > 10 ? (
          <span className="text-sm text-green-600">✓ Còn hàng</span>
        ) : product.stock > 0 ? (
          <span className="text-sm text-orange-500">Chỉ còn {product.stock}</span>
        ) : (
          <span className="text-sm text-red-500">Hết hàng</span>
        )}
      </div>
    </Link>
  )
}
