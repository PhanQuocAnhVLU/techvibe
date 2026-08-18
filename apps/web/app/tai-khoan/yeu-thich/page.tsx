'use client'

import Link from 'next/link'
import { ChevronRight, Heart, Trash2, ShoppingCart } from 'lucide-react'
import { ProductMockup } from '@/components/product-mockup'

const wishlistProducts = [
  { id: 1, name: 'iPhone 15 Pro Max 256GB', brand: 'Apple', price: 32990000, originalPrice: 34990000, image: '' },
  { id: 2, name: 'Samsung Galaxy S24 Ultra', brand: 'Samsung', price: 28990000, originalPrice: 31990000, image: '' },
  { id: 3, name: 'MacBook Pro 14 inch M3', brand: 'Apple', price: 45990000, originalPrice: 49990000, image: '' },
  { id: 4, name: 'AirPods Pro 2', brand: 'Apple', price: 6990000, originalPrice: 7990000, image: '' },
]

function formatPrice(price: number) {
  return new Intl.NumberFormat('vi-VN').format(price) + 'đ'
}

export default function WishlistPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Top Bar */}
      <div className="bg-[#ca3838] text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link href="#" className="hover:opacity-80">Hồ Chí Minh</Link>
              <Link href="tel:18002000" className="hidden sm:flex items-center gap-1 hover:opacity-80">1800.2000</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-11 h-11 bg-[#ca3838] rounded-lg flex items-center justify-center">
              <span className="font-bold text-white text-2xl">T</span>
            </div>
            <div>
              <span className="font-bold text-xl text-[#363636]">Tech</span>
              <span className="font-bold text-xl text-[#ca3838]">Store</span>
            </div>
          </Link>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-[#ca3838]">Trang chủ</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/tai-khoan" className="text-gray-500 hover:text-[#ca3838]">Tài khoản</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-[#363636]">Yêu thích</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-[#363636]">Sản phẩm yêu thích ({wishlistProducts.length})</h1>
          <button className="text-sm text-[#ca3838] hover:underline">Xóa tất cả</button>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="bg-white rounded-lg p-16 text-center">
            <Heart className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#363636] mb-2">Chưa có sản phẩm yêu thích</h3>
            <p className="text-gray-500 mb-6">Hãy thêm sản phẩm bạn yêu thích vào danh sách</p>
            <Link href="/san-pham">
              <button className="bg-[#ca3838] text-white px-6 py-3 rounded-md font-medium hover:bg-[#b32f2f]">
                Khám phá sản phẩm
              </button>
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {wishlistProducts.map(product => {
                const discount = Math.round((1 - product.price / product.originalPrice) * 100)
                return (
                  <div key={product.id} className="bg-white rounded-lg overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow group">
                    <Link href={`/san-pham/${product.id}`}>
                      <div className="relative aspect-square bg-gray-50">
                        <ProductMockup name={product.name} brand={product.brand} className="w-full h-full" />
                        {discount > 0 && (
                          <span className="absolute top-2 left-2 px-2 py-0.5 text-xs font-bold bg-[#ca3838] text-white rounded">
                            -{discount}%
                          </span>
                        )}
                      </div>
                    </Link>
                    <div className="p-3">
                      <Link href={`/san-pham/${product.id}`}>
                        <h3 className="font-medium text-sm line-clamp-2 min-h-[40px] group-hover:text-[#ca3838] transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      <div className="mt-2">
                        <span className="text-base font-bold text-[#ca3838]">{formatPrice(product.price)}</span>
                        {discount > 0 && (
                          <span className="text-xs text-gray-400 line-through ml-1">{formatPrice(product.originalPrice)}</span>
                        )}
                      </div>
                      <div className="flex gap-2 mt-3">
                        <button className="flex-1 bg-[#ca3838] text-white py-2 rounded-md text-xs font-medium hover:bg-[#b32f2f]">
                          <ShoppingCart className="w-3 h-3 inline mr-1" />
                          Thêm vào giỏ
                        </button>
                        <button className="px-3 border border-gray-300 rounded-md hover:bg-gray-50">
                          <Trash2 className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
