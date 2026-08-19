'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronRight, Heart } from 'lucide-react'
import { ProductCard } from '@/components/cellphones/product-card'
import { useWishlist } from '@/hooks/use-wishlist'

interface Props {
  initialProducts: any[]
  userId: string
}

export function WishlistClient({ initialProducts }: Props) {
  const router = useRouter()
  const { items, toggle, isWishlisted } = useWishlist()
  const [products, setProducts] = useState(initialProducts)

  const mappedProducts = products.map(p => ({
    id: p.id,
    name: p.name,
    brand: p.brand?.name,
    price: p.price,
    originalPrice: p.original_price,
    rating: p.rating,
    reviews: p.reviews_count,
    sold: p.sold_count,
    slug: p.slug,
  }))

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
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
        <div className="flex items-center gap-3 mb-4">
          <Heart className="w-6 h-6 text-cps-red fill-cps-red" />
          <div>
            <h1 className="text-2xl font-bold text-[#363636]">Sản phẩm yêu thích</h1>
            <p className="text-sm text-gray-500">{products.length} sản phẩm</p>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#363636] mb-2">Chưa có sản phẩm yêu thích</h3>
            <p className="text-gray-500 mb-4">Hãy khám phá và thêm sản phẩm bạn yêu thích</p>
            <Link href="/danh-muc?danh-muc=dien-thoai" className="inline-block px-6 py-3 bg-[#ca3838] text-white rounded-md hover:bg-[#b32f2f]">
              Khám phá ngay
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {mappedProducts.map(p => (
              <ProductCard key={p.id} product={{ ...p, badge: isWishlisted(p.id) ? 'Yêu thích' : undefined }} showWishlist showRating />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}