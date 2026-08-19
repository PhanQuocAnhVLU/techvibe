'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  Grid3X3, LayoutList, ChevronDown, Star,
  SlidersHorizontal, X, Search, ChevronRight,
  Heart, Package
} from 'lucide-react'

interface ProductsListingProps {
  title: string
  categories: { name: string; slug: string; icon: any; href: string }[]
  brands: string[]
  priceRanges: { min: number; max: number | null; label: string }[]
  sortOptions: { value: string; label: string }[]
  products: any[]
  total: number
  page: number
  totalPages: number
  currentCategorySlug: string
  currentBrand?: string
  currentSort: string
  currentPriceIdx: number | null
  currentSearch?: string
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('vi-VN').format(price)
}

export function ProductsListing({
  title, categories, brands, priceRanges, sortOptions,
  products, total, page, totalPages,
  currentCategorySlug, currentBrand, currentSort, currentPriceIdx, currentSearch,
}: ProductsListingProps) {
  const router = useRouter()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [searchInput, setSearchInput] = useState(currentSearch || '')

  const updateParams = (key: string, value: string | null) => {
    const params = new URLSearchParams()
    if (key !== 'danh-muc' && currentCategorySlug) params.set('danh-muc', currentCategorySlug)
    if (key !== 'hang' && currentBrand) params.set('hang', currentBrand)
    if (key !== 'sort' && currentSort && currentSort !== 'popular') params.set('sort', currentSort)
    if (key !== 'gia' && currentPriceIdx !== null) params.set('gia', String(currentPriceIdx))
    if (key !== 'q' && currentSearch) params.set('q', currentSearch)
    if (key !== 'page' && page > 1) params.set('page', String(page))

    if (value) params.set(key, value)
    router.push(`/danh-muc?${params.toString()}`)
  }

  const toggleBrand = (brand: string) => {
    updateParams('hang', currentBrand === brand ? null : brand.toLowerCase())
  }

  const handleSearch = () => {
    updateParams('q', searchInput || null)
  }

  const clearFilters = () => {
    router.push(`/danh-muc?danh-muc=${currentCategorySlug}`)
  }

  const hasActiveFilters = currentBrand || currentPriceIdx !== null || currentSearch
  const cat = categories.find(c => c.slug === currentCategorySlug)
  const CatIcon = cat?.icon || Package

  return (
    <>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header title */}
        <div className="flex items-center gap-3 mb-4 bg-white rounded-lg p-4">
          <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
            <CatIcon className="w-5 h-5 text-[#ca3838]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#363636]">{title}</h1>
            <p className="text-sm text-gray-500">{total} sản phẩm</p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-4 bg-white rounded-lg p-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm"
            >
              <SlidersHorizontal className="w-4 h-4" /> Lọc
            </button>

            {hasActiveFilters && (
              <button onClick={clearFilters} className="flex items-center gap-1 text-sm text-[#ca3838] hover:underline">
                <X className="w-4 h-4" /> Xóa bộ lọc
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="hidden md:flex items-center">
              <input
                type="text"
                placeholder="Tìm sản phẩm..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-[#ca3838] text-sm"
              />
              <button onClick={handleSearch} className="px-3 py-2 bg-[#ca3838] text-white rounded-r-md hover:bg-[#b32f2f]">
                <Search className="w-4 h-4" />
              </button>
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={currentSort}
                onChange={(e) => updateParams('sort', e.target.value === 'popular' ? null : e.target.value)}
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
              <button onClick={() => setViewMode('grid')} className={`p-2 ${viewMode === 'grid' ? 'bg-[#ca3838] text-white' : 'hover:bg-gray-100'}`}>
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button onClick={() => setViewMode('list')} className={`p-2 ${viewMode === 'list' ? 'bg-[#ca3838] text-white' : 'hover:bg-gray-100'}`}>
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
              <div className="flex items-center justify-between mb-6 lg:hidden">
                <h2 className="text-lg font-bold">Bộ lọc</h2>
                <button onClick={() => setShowFilters(false)}><X className="w-6 h-6" /></button>
              </div>

              {/* Categories */}
              <div className="border-b border-gray-200 pb-4 mb-4">
                <h3 className="font-semibold text-[#363636] text-sm mb-2">Danh mục</h3>
                <div className="space-y-2">
                  {categories.map((c: any) => (
                    <Link
                      key={c.slug}
                      href={`/danh-muc?danh-muc=${c.slug}`}
                      className={`flex items-center gap-2 text-sm py-1 px-2 rounded ${
                        c.slug === currentCategorySlug ? 'bg-red-50 text-[#ca3838] font-semibold' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <c.icon className="w-4 h-4" />
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div className="border-b border-gray-200 pb-4 mb-4">
                <h3 className="font-semibold text-[#363636] text-sm mb-2">Thương hiệu</h3>
                <div className="space-y-2">
                  {brands.map(brand => (
                    <label key={brand} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={currentBrand === brand.toLowerCase()}
                        onChange={() => toggleBrand(brand)}
                        className="w-4 h-4 rounded border-gray-300 text-[#ca3838] focus:ring-[#ca3838]"
                      />
                      <span className="text-sm text-gray-600 group-hover:text-[#363636]">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="pb-4">
                <h3 className="font-semibold text-[#363636] text-sm mb-2">Mức giá</h3>
                <div className="space-y-2">
                  {priceRanges.map((range, index) => (
                    <label key={index} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="price"
                        checked={currentPriceIdx === index}
                        onChange={() => updateParams('gia', currentPriceIdx === index ? null : String(index))}
                        className="w-4 h-4 border-gray-300 text-[#ca3838] focus:ring-[#ca3838]"
                      />
                      <span className="text-sm text-gray-600 group-hover:text-[#363636]">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {showFilters && (
            <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setShowFilters(false)} />
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {products.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-lg">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-[#363636] mb-2">Không tìm thấy sản phẩm</h3>
                <p className="text-gray-500 mb-4">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
                <button onClick={clearFilters} className="px-4 py-2 bg-[#ca3838] text-white rounded-md">Xóa bộ lọc</button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {products.map(product => <ProductCard key={product.id} product={product} />)}
              </div>
            ) : (
              <div className="space-y-3">
                {products.map(product => <ProductListCard key={product.id} product={product} />)}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8 bg-white rounded-lg p-3">
                <button
                  onClick={() => updateParams('page', String(Math.max(1, page - 1)))}
                  disabled={page === 1}
                  className="px-3 py-2 border rounded-md hover:bg-gray-50 disabled:opacity-50 text-sm"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                </button>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let p = i + 1
                  if (totalPages > 5 && page > 3) {
                    p = page - 2 + i
                    if (p > totalPages) p = totalPages - 4 + i
                  }
                  return (
                    <button
                      key={p}
                      onClick={() => updateParams('page', String(p))}
                      className={`w-10 h-10 rounded-md text-sm ${
                        page === p ? 'bg-[#ca3838] text-white' : 'border hover:bg-gray-50'
                      }`}
                    >
                      {p}
                    </button>
                  )
                })}

                <button
                  onClick={() => updateParams('page', String(Math.min(totalPages, page + 1)))}
                  disabled={page === totalPages}
                  className="px-3 py-2 border rounded-md hover:bg-gray-50 disabled:opacity-50 text-sm"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

function ProductCard({ product }: { product: any }) {
  const discount = product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0

  return (
    <Link href={`/san-pham/${product.slug || product.id}`} className="group bg-white rounded-lg overflow-hidden border border-gray-100 hover:shadow-lg transition-all">
      <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100">
        <img
          src={product.images?.[0] || `https://placehold.co/500x500/png?text=${encodeURIComponent(product.name)}`}
          alt={product.name}
          className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        {product.badge && (
          <span className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold rounded bg-[#ca3838] text-white">
            {product.badge}
          </span>
        )}
        {discount > 0 && (
          <span className="absolute top-2 right-2 px-2 py-0.5 text-[10px] font-bold bg-[#ca3838] text-white rounded">
            -{discount}%
          </span>
        )}
        <button className="absolute bottom-2 right-2 p-1.5 bg-white rounded-full shadow opacity-0 group-hover:opacity-100" onClick={(e) => e.preventDefault()}>
          <Heart className="w-4 h-4 text-gray-400 hover:text-red-500" />
        </button>
      </div>

      <div className="p-3">
        <span className="text-[10px] text-gray-500">{product.brand}</span>
        <h3 className="font-medium text-[#363636] text-sm line-clamp-2 mt-1 group-hover:text-[#ca3838] transition-colors min-h-[40px]">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 mt-2">
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          <span className="text-xs font-medium">{product.rating}</span>
          <span className="text-xs text-gray-400">({product.reviewCount})</span>
        </div>
        <div className="mt-2">
          <span className="text-base font-bold text-[#ca3838]">{formatPrice(product.price)}đ</span>
          {discount > 0 && (
            <span className="text-xs text-gray-400 line-through ml-1">{formatPrice(product.originalPrice)}đ</span>
          )}
        </div>
        <p className="text-[10px] text-gray-500 mt-1">Trả góp {formatPrice(Math.round(product.price / 24))}đ/tháng</p>
        <div className="mt-2">
          {product.stockQuantity > 10 ? (
            <span className="text-[10px] text-green-600">✓ Còn hàng</span>
          ) : product.stockQuantity > 0 ? (
            <span className="text-[10px] text-orange-500">Chỉ còn {product.stockQuantity} sản phẩm</span>
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
    <Link href={`/san-pham/${product.slug || product.id}`} className="group flex gap-4 bg-white rounded-lg overflow-hidden border border-gray-100 hover:shadow-md transition-all p-4">
      <div className="relative w-28 h-28 shrink-0 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden">
        <img
          src={product.images?.[0] || `https://placehold.co/200x200/png?text=${encodeURIComponent(product.name)}`}
          alt={product.name}
          className="w-full h-full object-contain p-2"
          loading="lazy"
        />
      </div>

      <div className="flex-1 min-w-0 py-1">
        <span className="text-xs text-gray-500">{product.brand}</span>
        <h3 className="font-medium text-[#363636] mt-1 group-hover:text-[#ca3838] transition-colors">{product.name}</h3>
        <div className="flex items-center gap-1 mt-1">
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          <span className="text-xs font-medium">{product.rating}</span>
          <span className="text-xs text-gray-400">({product.reviewCount} đánh giá)</span>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <span className="text-lg font-bold text-[#ca3838]">{formatPrice(product.price)}đ</span>
          {discount > 0 && (
            <>
              <span className="text-sm text-gray-400 line-through">{formatPrice(product.originalPrice)}đ</span>
              <span className="text-xs font-medium text-[#ca3838]">-{discount}%</span>
            </>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-1">Trả góp {formatPrice(Math.round(product.price / 24))}đ/tháng</p>
      </div>

      <div className="flex items-center">
        {product.stockQuantity > 10 ? (
          <span className="text-sm text-green-600">✓ Còn hàng</span>
        ) : product.stockQuantity > 0 ? (
          <span className="text-sm text-orange-500">Chỉ còn {product.stockQuantity}</span>
        ) : (
          <span className="text-sm text-red-500">Hết hàng</span>
        )}
      </div>
    </Link>
  )
}