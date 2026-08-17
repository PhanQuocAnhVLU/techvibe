'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { Filter, Grid, List, ChevronDown, X, Search, SlidersHorizontal } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ProductCard } from '@/components/product/product-card'
import { Button } from '@/components/ui/button'
import { products, categories, brands } from '@/lib/data'
import { Product } from '@/lib/types'
import { cn } from '@/lib/utils'

const priceRanges = [
  { label: 'Dưới 5 triệu', min: 0, max: 5000000 },
  { label: '5 - 10 triệu', min: 5000000, max: 10000000 },
  { label: '10 - 20 triệu', min: 10000000, max: 20000000 },
  { label: '20 - 30 triệu', min: 20000000, max: 30000000 },
  { label: 'Trên 30 triệu', min: 30000000, max: Infinity },
]

const sortOptions = [
  { value: 'default', label: 'Mặc định' },
  { value: 'price-asc', label: 'Giá: Thấp đến cao' },
  { value: 'price-desc', label: 'Giá: Cao đến thấp' },
  { value: 'newest', label: 'Mới nhất' },
  { value: 'bestseller', label: 'Bán chạy nhất' },
  { value: 'rating', label: 'Đánh giá cao nhất' },
]

export default function ProductListingPage() {
  const params = useParams()
  const categorySlug = params.category as string
  const category = categories.find(c => c.slug === categorySlug)

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('default')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedPrices, setSelectedPrices] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRatings, setSelectedRatings] = useState<number[]>([])
  const [inStockOnly, setInStockOnly] = useState(false)
  const [openFilterGroups, setOpenFilterGroups] = useState<string[]>(['brand', 'price'])

  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Filter by category
    if (categorySlug && categorySlug !== 'all') {
      result = result.filter(p => p.categorySlug === categorySlug)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.sku.toLowerCase().includes(query)
      )
    }

    // Filter by brands
    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brand))
    }

    // Filter by price range
    if (selectedPrices.length > 0) {
      result = result.filter(p => {
        return selectedPrices.some(range => {
          const priceRange = priceRanges.find(pr => pr.label === range)
          if (priceRange) {
            return p.price >= priceRange.min && p.price < priceRange.max
          }
          return false
        })
      })
    }

    // Filter by rating
    if (selectedRatings.length > 0) {
      result = result.filter(p => {
        return selectedRatings.some(rating => p.rating >= rating)
      })
    }

    // Filter by stock
    if (inStockOnly) {
      result = result.filter(p => p.inStock)
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      case 'bestseller':
        result.sort((a, b) => b.soldCount - a.soldCount)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
    }

    return result
  }, [categorySlug, searchQuery, selectedBrands, selectedPrices, selectedRatings, inStockOnly, sortBy])

  const toggleFilterGroup = (group: string) => {
    setOpenFilterGroups(prev =>
      prev.includes(group)
        ? prev.filter(g => g !== group)
        : [...prev, group]
    )
  }

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    )
  }

  const togglePrice = (price: string) => {
    setSelectedPrices(prev =>
      prev.includes(price)
        ? prev.filter(p => p !== price)
        : [...prev, price]
    )
  }

  const toggleRating = (rating: number) => {
    setSelectedRatings(prev =>
      prev.includes(rating)
        ? prev.filter(r => r !== rating)
        : [...prev, rating]
    )
  }

  const clearAllFilters = () => {
    setSelectedBrands([])
    setSelectedPrices([])
    setSelectedRatings([])
    setInStockOnly(false)
    setSearchQuery('')
  }

  const hasActiveFilters = selectedBrands.length > 0 || selectedPrices.length > 0 || selectedRatings.length > 0 || inStockOnly

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-border">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-primary transition-colors">
                Trang chủ
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-primary font-medium">
                {category?.name || 'Tất cả sản phẩm'}
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex gap-6">
            {/* Filter Sidebar - Desktop */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="bg-white rounded-lg p-4 sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Bộ lọc
                  </h2>
                  {hasActiveFilters && (
                    <button
                      onClick={clearAllFilters}
                      className="text-xs text-primary hover:underline"
                    >
                      Xóa tất cả
                    </button>
                  )}
                </div>

                {/* Search */}
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Tìm sản phẩm..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-border rounded-md focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                {/* Brand Filter */}
                <div className="border-b border-border pb-4 mb-4">
                  <button
                    onClick={() => toggleFilterGroup('brand')}
                    className="flex items-center justify-between w-full font-medium mb-2"
                  >
                    <span>Thương hiệu</span>
                    <ChevronDown className={cn(
                      'w-4 h-4 transition-transform',
                      openFilterGroups.includes('brand') && 'rotate-180'
                    )} />
                  </button>
                  {openFilterGroups.includes('brand') && (
                    <div className="space-y-2">
                      {brands.slice(0, 8).map((brand) => (
                        <label key={brand.id} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedBrands.includes(brand.name)}
                            onChange={() => toggleBrand(brand.name)}
                            className="w-4 h-4 accent-primary"
                          />
                          <span className="text-sm text-gray-700">{brand.name}</span>
                          <span className="text-xs text-gray-400 ml-auto">({brand.productCount})</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Price Filter */}
                <div className="border-b border-border pb-4 mb-4">
                  <button
                    onClick={() => toggleFilterGroup('price')}
                    className="flex items-center justify-between w-full font-medium mb-2"
                  >
                    <span>Khoảng giá</span>
                    <ChevronDown className={cn(
                      'w-4 h-4 transition-transform',
                      openFilterGroups.includes('price') && 'rotate-180'
                    )} />
                  </button>
                  {openFilterGroups.includes('price') && (
                    <div className="space-y-2">
                      {priceRanges.map((range) => (
                        <label key={range.label} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedPrices.includes(range.label)}
                            onChange={() => togglePrice(range.label)}
                            className="w-4 h-4 accent-primary"
                          />
                          <span className="text-sm text-gray-700">{range.label}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Rating Filter */}
                <div className="border-b border-border pb-4 mb-4">
                  <button
                    onClick={() => toggleFilterGroup('rating')}
                    className="flex items-center justify-between w-full font-medium mb-2"
                  >
                    <span>Đánh giá</span>
                    <ChevronDown className={cn(
                      'w-4 h-4 transition-transform',
                      openFilterGroups.includes('rating') && 'rotate-180'
                    )} />
                  </button>
                  {openFilterGroups.includes('rating') && (
                    <div className="space-y-2">
                      {[4, 3, 2, 1].map((rating) => (
                        <label key={rating} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedRatings.includes(rating)}
                            onChange={() => toggleRating(rating)}
                            className="w-4 h-4 accent-primary"
                          />
                          <div className="flex text-accent text-sm">
                            {[...Array(rating)].map((_, i) => (
                              <span key={i}>★</span>
                            ))}
                            {[...Array(5 - rating)].map((_, i) => (
                              <span key={i} className="text-gray-300">★</span>
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">trở lên</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Stock Filter */}
                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="w-4 h-4 accent-primary"
                    />
                    <span className="text-sm text-gray-700">Chỉ hiển thị sản phẩm còn hàng</span>
                  </label>
                </div>
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              {/* Top Bar */}
              <div className="bg-white rounded-lg p-4 mb-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-xl font-bold text-secondary">
                      {category?.name || 'Tất cả sản phẩm'}
                    </h1>
                    <p className="text-sm text-gray-500">
                      Có {filteredProducts.length} sản phẩm
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Mobile Filter Button */}
                    <button
                      onClick={() => setShowFilters(true)}
                      className="lg:hidden flex items-center gap-2 px-4 py-2 border border-border rounded-md hover:bg-gray-50"
                    >
                      <SlidersHorizontal className="w-4 h-4" />
                      <span>Bộ lọc</span>
                      {hasActiveFilters && (
                        <span className="w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                          {selectedBrands.length + selectedPrices.length}
                        </span>
                      )}
                    </button>

                    {/* Sort */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500 hidden sm:inline">Sắp xếp:</span>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:border-primary"
                      >
                        {sortOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* View Mode */}
                    <div className="hidden md:flex items-center border border-border rounded-md">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={cn(
                          'p-2 transition-colors',
                          viewMode === 'grid' ? 'bg-primary text-white' : 'hover:bg-gray-50'
                        )}
                      >
                        <Grid className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={cn(
                          'p-2 transition-colors',
                          viewMode === 'list' ? 'bg-primary text-white' : 'hover:bg-gray-50'
                        )}
                      >
                        <List className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Active Filters */}
                {hasActiveFilters && (
                  <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-border">
                    <span className="text-sm text-gray-500">Lọc theo:</span>
                    {selectedBrands.map((brand) => (
                      <button
                        key={brand}
                        onClick={() => toggleBrand(brand)}
                        className="flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-sm rounded hover:bg-primary/20"
                      >
                        {brand}
                        <X className="w-3 h-3" />
                      </button>
                    ))}
                    {selectedPrices.map((price) => (
                      <button
                        key={price}
                        onClick={() => togglePrice(price)}
                        className="flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-sm rounded hover:bg-primary/20"
                      >
                        {price}
                        <X className="w-3 h-3" />
                      </button>
                    ))}
                    {selectedRatings.map((rating) => (
                      <button
                        key={rating}
                        onClick={() => toggleRating(rating)}
                        className="flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-sm rounded hover:bg-primary/20"
                      >
                        {rating}★
                        <X className="w-3 h-3" />
                      </button>
                    ))}
                    {inStockOnly && (
                      <button
                        onClick={() => setInStockOnly(false)}
                        className="flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-sm rounded hover:bg-primary/20"
                      >
                        Còn hàng
                        <X className="w-3 h-3" />
                      </button>
                    )}
                    <button
                      onClick={clearAllFilters}
                      className="text-sm text-primary hover:underline ml-2"
                    >
                      Xóa tất cả
                    </button>
                  </div>
                )}
              </div>

              {/* Products */}
              {filteredProducts.length > 0 ? (
                <div className={cn(
                  'grid gap-4',
                  viewMode === 'grid'
                    ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                    : 'grid-cols-1'
                )}>
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      className={viewMode === 'list' ? 'flex' : ''}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg p-12 text-center">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-lg font-semibold mb-2">Không tìm thấy sản phẩm</h3>
                  <p className="text-gray-500 mb-4">
                    Không có sản phẩm nào phù hợp với bộ lọc của bạn
                  </p>
                  <Button onClick={clearAllFilters}>Xóa bộ lọc</Button>
                </div>
              )}

              {/* Pagination */}
              {filteredProducts.length > 0 && (
                <div className="mt-6 flex justify-center">
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-2 border border-border rounded-md hover:bg-gray-50 disabled:opacity-50" disabled>
                      ‹
                    </button>
                    <button className="px-3 py-2 bg-primary text-white rounded-md">1</button>
                    <button className="px-3 py-2 border border-border rounded-md hover:bg-gray-50">2</button>
                    <button className="px-3 py-2 border border-border rounded-md hover:bg-gray-50">3</button>
                    <span className="px-2">...</span>
                    <button className="px-3 py-2 border border-border rounded-md hover:bg-gray-50">10</button>
                    <button className="px-3 py-2 border border-border rounded-md hover:bg-gray-50">
                      ›
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Filter Modal */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilters(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 max-w-full bg-white overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b border-border flex items-center justify-between">
              <h2 className="font-semibold">Bộ lọc</h2>
              <button onClick={() => setShowFilters(false)} className="p-2 hover:bg-gray-100 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              {/* Same filters as desktop */}
              <div className="space-y-4">
                {priceRanges.map((range) => (
                  <label key={range.label} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedPrices.includes(range.label)}
                      onChange={() => togglePrice(range.label)}
                      className="w-4 h-4 accent-primary"
                    />
                    <span className="text-sm">{range.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="sticky bottom-0 p-4 border-t border-border flex gap-2">
              <Button variant="outline" className="flex-1" onClick={clearAllFilters}>
                Xóa tất cả
              </Button>
              <Button className="flex-1" onClick={() => setShowFilters(false)}>
                Áp dụng
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
