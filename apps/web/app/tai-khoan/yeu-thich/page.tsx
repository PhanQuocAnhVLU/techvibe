'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Heart, Trash2, ShoppingCart, Share2 } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { MobileBottomNav } from '@/components/layout/mobile-bottom-nav'
import { ProductCard } from '@/components/product/product-card'
import { Button } from '@/components/ui/button'
import { products } from '@/lib/data'
import { useWishlistStore } from '@/stores/cart-store'

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore()
  const [isGrid, setIsGrid] = useState(true)

  // Use mock data if store is empty
  const displayProducts = items.length > 0 ? items : products.slice(0, 4)

  return (
    <div className="min-h-screen flex flex-col bg-background pb-20 md:pb-0">
      <Header />

      <main className="flex-1">
        {/* Header */}
        <div className="bg-white border-b border-border sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/tai-khoan" className="text-primary">
                  <ArrowLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-xl font-bold">Yêu thích</h1>
                <span className="text-gray-500">({displayProducts.length})</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-4">
          {displayProducts.length > 0 ? (
            <>
              {/* Actions Bar */}
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-500">
                  {displayProducts.length} sản phẩm
                </p>
                <Button variant="outline" size="sm" className="gap-2">
                  <Share2 className="w-4 h-4" />
                  Chia sẻ danh sách
                </Button>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {displayProducts.map((product) => (
                  <div key={product.id} className="relative">
                    <ProductCard product={product} />
                    <div className="absolute top-2 right-2 flex flex-col gap-2">
                      <button
                        onClick={() => removeItem(product.id)}
                        className="w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:bg-red-50 text-gray-500 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add All to Cart */}
              <div className="mt-6 p-4 bg-white rounded-lg">
                <Button className="w-full gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Thêm tất cả vào giỏ hàng
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <Heart className="w-24 h-24 text-gray-200 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Chưa có sản phẩm yêu thích</h3>
              <p className="text-gray-500 mb-4">
                Hãy thêm sản phẩm bạn thích vào danh sách yêu thích
              </p>
              <Link href="/">
                <Button>Khám phá sản phẩm</Button>
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  )
}
