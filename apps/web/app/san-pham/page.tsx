'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Filter, Grid3X3, LayoutList, ChevronDown, Star, 
  SlidersHorizontal, X, Search, ChevronRight 
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const brands = ['Apple', 'Samsung', 'Xiaomi', 'OPPO', 'vivo', 'Realme', 'Nokia', 'Tecno']
const categories = [
  { id: 'dien-thoai', name: 'Điện thoại', count: 234 },
  { id: 'laptop', name: 'Laptop', count: 156 },
  { id: 'tablet', name: 'Tablet', count: 89 },
  { id: 'phu-kien', name: 'Phụ kiện', count: 456 },
  { id: 'dong-ho', name: 'Đồng hồ thông minh', count: 123 },
]

const products = [
  { id: 1, name: 'iPhone 15 Pro Max 256GB', brand: 'Apple', price: 32990000, originalPrice: 34990000, rating: 4.8, reviews: 1245, image: '/api/placeholder/300/300', badge: 'Giảm 2TR', stock: 45 },
  { id: 2, name: 'Samsung Galaxy S24 Ultra 256GB', brand: 'Samsung', price: 28990000, originalPrice: 31990000, rating: 4.7, reviews: 892, image: '/api/placeholder/300/300', badge: 'Hot', stock: 32 },
  { id: 3, name: 'Xiaomi 14 Ultra', brand: 'Xiaomi', price: 18990000, originalPrice: 21990000, rating: 4.6, reviews: 567, image: '/api/placeholder/300/300', badge: 'New', stock: 28 },
  { id: 4, name: 'OPPO Find X7 Pro', brand: 'OPPO', price: 15990000, originalPrice: 17990000, rating: 4.5, reviews: 234, image: '/api/placeholder/300/300', badge: '', stock: 15 },
  { id: 5, name: 'iPhone 15 128GB', brand: 'Apple', price: 22990000, originalPrice: 24990000, rating: 4.8, reviews: 2103, image: '/api/placeholder/300/300', badge: 'Giảm 2TR', stock: 67 },
  { id: 6, name: 'Samsung Galaxy Z Flip5', brand: 'Samsung', price: 19990000, originalPrice: 22990000, rating: 4.6, reviews: 456, image: '/api/placeholder/300/300', badge: 'Trả góp 0%', stock: 23 },
  { id: 7, name: 'vivo X100 Pro', brand: 'vivo', price: 16990000, originalPrice: 18990000, rating: 4.7, reviews: 178, image: '/api/placeholder/300/300', badge: 'New', stock: 12 },
  { id: 8, name: 'Realme GT5 Pro', brand: 'Realme', price: 12990000, originalPrice: 14990000, rating: 4.5, reviews: 345, image: '/api/placeholder/300/300', badge: '', stock: 34 },
  { id: 9, name: 'MacBook Pro 14" M3', brand: 'Apple', price: 45990000, originalPrice: 49990000, rating: 4.9, reviews: 567, image: '/api/placeholder/300/300', badge: 'Hot', stock: 18 },
  { id: 10, name: 'iPad Pro 11" M2', brand: 'Apple', price: 27990000, originalPrice: 29990000, rating: 4.8, reviews: 789, image: '/api/placeholder/300/300', badge: 'Giảm 2TR', stock: 25 },
  { id: 11, name: 'Samsung Galaxy Tab S9 Ultra', brand: 'Samsung', price: 32990000, originalPrice: 35990000, rating: 4.7, reviews: 234, image: '/api/placeholder/300/300', badge: '', stock: 8 },
  { id: 12, name: 'AirPods Pro 2', brand: 'Apple', price: 6990000, originalPrice: 7990000, rating: 4.9, reviews: 3456, image: '/api/placeholder/300/300', badge: 'Bán chạy', stock: 89 },
]

const sortOptions = [
  { value: 'popular', label: 'Nổi bật' },
  { value: 'price-asc', label: 'Giá: Thấp đến cao' },
  { value: 'price-desc', label: 'Giá: Cao đến thấp' },
  { value: 'newest', label: 'Mới nhất' },
  { value: 'rating', label: 'Đánh giá cao nhất' },
]

const priceRanges = [
  { min: 0, max: 5000000, label: 'Dưới 5 triệu' },
  { min: 5000000, max: 10000000, label: '5 - 10 triệu' },
  { min: 10000000, max: 20000000, label: '10 - 20 triệu' },
  { min: 20000000, max: 50000000, label: '20 - 50 triệu' },
  { min: 50000000, max: Infinity, label: 'Trên 50 triệu' },
]

function formatPrice(price: number) {
  return new Intl.NumberFormat('vi-VN').format(price) + 'đ'
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
    brand: true,
    price: true,
    category: true,
  })

  const productsPerPage = 12

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
    <div className="border-b border-gray-100 pb-4">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="flex items-center justify-between w-full py-2 font-semibold text-gray-900"
      >
        {title}
        <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections[sectionKey] ? 'rotate-180' : ''}`} />
      </button>
      {expandedSections[sectionKey] && <div className="mt-2">{children}</div>}
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Top bar */}
          <div className="flex items-center justify-between py-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="font-bold text-white text-xl">T</span>
              </div>
              <span className="font-bold text-xl">
                <span className="text-secondary">Tech</span>
                <span className="text-primary">Store</span>
              </span>
            </Link>

            {/* Search */}
            <div className="flex-1 max-w-xl mx-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Link href="/gio-hang" className="relative p-2 hover:bg-gray-100 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
              </Link>
              <Link href="/auth/login" className="text-sm text-gray-600 hover:text-primary">Đăng nhập</Link>
            </div>
          </div>

          {/* Categories nav */}
          <nav className="flex items-center gap-6 py-2 overflow-x-auto">
            {categories.map(cat => (
              <Link 
                key={cat.id} 
                href={`/san-pham?danh-muc=${cat.id}`}
                className="text-sm text-gray-600 hover:text-primary whitespace-nowrap"
              >
                {cat.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-primary">Trang chủ</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900">Tất cả sản phẩm</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Lọc
            </button>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600"
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
                className="appearance-none px-4 py-2 pr-10 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 cursor-pointer"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
            </div>

            {/* View Mode */}
            <div className="hidden sm:flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
              >
                <LayoutList className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Filters Sidebar */}
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
                        checked={selectedCategories.includes(cat.id)}
                        onChange={() => toggleCategory(cat.id)}
                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-gray-600 group-hover:text-gray-900">
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
                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-gray-600 group-hover:text-gray-900">{brand}</span>
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
                        className="w-4 h-4 border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-gray-600 group-hover:text-gray-900">{range.label}</span>
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

          {/* Products Grid */}
          <div className="flex-1">
            {paginatedProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Không tìm thấy sản phẩm</h3>
                <p className="text-gray-500 mb-4">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                <Button onClick={clearFilters}>Xóa bộ lọc</Button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {paginatedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {paginatedProducts.map(product => (
                  <ProductListCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg ${
                      currentPage === page
                        ? 'bg-primary text-white'
                        : 'border hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
      className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200"
    >
      {/* Image */}
      <div className="relative aspect-square bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {product.badge && (
          <span className={`absolute top-2 left-2 px-2 py-1 text-xs font-semibold rounded ${
            product.badge === 'Hot' ? 'bg-red-500 text-white' :
            product.badge === 'New' ? 'bg-blue-500 text-white' :
            'bg-orange-500 text-white'
          }`}>
            {product.badge}
          </span>
        )}
        {discount > 0 && (
          <span className="absolute top-2 right-2 px-2 py-1 text-xs font-semibold bg-primary text-white rounded">
            -{discount}%
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        <span className="text-xs text-gray-500">{product.brand}</span>
        <h3 className="font-medium text-gray-900 line-clamp-2 mt-1 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-sm font-medium">{product.rating}</span>
          <span className="text-sm text-gray-400">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="mt-2">
          <span className="text-lg font-bold text-primary">{formatPrice(product.price)}</span>
          {discount > 0 && (
            <span className="text-sm text-gray-400 line-through ml-2">{formatPrice(product.originalPrice)}</span>
          )}
        </div>

        {/* Stock */}
        <div className="mt-2">
          {product.stock > 10 ? (
            <span className="text-xs text-green-600">Còn hàng</span>
          ) : product.stock > 0 ? (
            <span className="text-xs text-orange-500">Chỉ còn {product.stock} sản phẩm</span>
          ) : (
            <span className="text-xs text-red-500">Hết hàng</span>
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
      className="group flex gap-4 bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all p-4"
    >
      {/* Image */}
      <div className="relative w-32 h-32 shrink-0 bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {product.badge && (
          <span className="absolute top-1 left-1 px-1.5 py-0.5 text-[10px] font-semibold bg-orange-500 text-white rounded">
            {product.badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <span className="text-sm text-gray-500">{product.brand}</span>
        <h3 className="font-medium text-gray-900 mt-1 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mt-1">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-sm font-medium">{product.rating}</span>
          <span className="text-sm text-gray-400">({product.reviews} đánh giá)</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3 mt-2">
          <span className="text-xl font-bold text-primary">{formatPrice(product.price)}</span>
          {discount > 0 && (
            <>
              <span className="text-sm text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
              <span className="text-sm font-medium text-orange-500">-{discount}%</span>
            </>
          )}
        </div>
      </div>

      {/* Stock */}
      <div className="flex items-center">
        {product.stock > 10 ? (
          <span className="text-sm text-green-600">Còn hàng</span>
        ) : product.stock > 0 ? (
          <span className="text-sm text-orange-500">Chỉ còn {product.stock}</span>
        ) : (
          <span className="text-sm text-red-500">Hết hàng</span>
        )}
      </div>
    </Link>
  )
}
