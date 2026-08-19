'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, Star, GitCompare, Eye } from 'lucide-react'
import { ProductImage } from './product-image'

interface Product {
  id: number | string
  name: string
  brand?: string
  price: number
  originalPrice?: number
  image?: string
  rating?: number
  reviews?: number
  sold?: number
  badge?: string
  slug?: string
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('vi-VN').format(price) + 'đ'
}

interface ProductCardProps {
  product: Product
  showSold?: boolean
  showWishlist?: boolean
  showRating?: boolean
  showCompare?: boolean
  onQuickView?: (p: Product) => void
}

export function ProductCard({
  product,
  showSold = false,
  showWishlist = true,
  showRating = true,
  showCompare = true,
  onQuickView,
}: ProductCardProps) {
  const [adding, setAdding] = useState(false)
  const discount = product.originalPrice && product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0
  const soldPercent = product.sold ? Math.min(95, Math.round((product.sold / 500) * 100)) : 0

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setAdding(true)
    setTimeout(() => setAdding(false), 1000)
  }

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      const raw = localStorage.getItem('techvibe-compare')
      const list = raw ? JSON.parse(raw) : []
      const exists = list.find((i: any) => i.id === product.id)
      if (exists) {
        localStorage.setItem('techvibe-compare', JSON.stringify(list.filter((i: any) => i.id !== product.id)))
      } else if (list.length < 4) {
        list.push({ id: product.id, name: product.name, price: product.price })
        localStorage.setItem('techvibe-compare', JSON.stringify(list))
      }
      window.dispatchEvent(new Event('compare-updated'))
    } catch {}
  }

  return (
    <Link
      href={`/san-pham/${product.slug || product.id}`}
      className="shine-card group relative bg-white rounded-lg overflow-hidden hover:shadow-card-hover transition-all hover:-translate-y-1 flex flex-col h-full border border-neutral-100"
    >
      {/* Image container */}
      <div className="relative aspect-square bg-white overflow-hidden">
        <ProductImage name={product.name} />

        {/* Discount badge */}
        {discount > 0 && (
          <span className="absolute top-2 left-2 px-1.5 py-0.5 bg-cps-red text-white text-[10px] font-bold rounded shadow-md">
            -{discount}%
          </span>
        )}

        {/* Custom badge */}
        {product.badge && (
          <span className="absolute top-2 right-2 px-1.5 py-0.5 bg-yellow-400 text-cps-red text-[10px] font-bold rounded shadow-md">
            {product.badge}
          </span>
        )}

        {/* Bottom hover actions */}
        <div className="absolute bottom-0 inset-x-0 flex items-center justify-center gap-1.5 p-1.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-white/95 to-white/0">
          {onQuickView && (
            <button
              onClick={(e) => { e.preventDefault(); onQuickView(product) }}
              className="w-7 h-7 bg-white rounded-full shadow hover:scale-110 transition-transform flex items-center justify-center"
              title="Xem nhanh"
            >
              <Eye className="w-3.5 h-3.5 text-neutral-600" />
            </button>
          )}
          {showCompare && (
            <button
              onClick={handleCompare}
              className="w-7 h-7 bg-white rounded-full shadow hover:scale-110 transition-transform flex items-center justify-center"
              title="So sánh"
            >
              <GitCompare className="w-3.5 h-3.5 text-neutral-600" />
            </button>
          )}
          {showWishlist && (
            <button
              onClick={handleWishlist}
              className="w-7 h-7 bg-white rounded-full shadow hover:scale-110 transition-transform flex items-center justify-center"
              title="Yêu thích"
            >
              <Heart className={`w-3.5 h-3.5 transition-colors ${adding ? 'fill-cps-red text-cps-red' : 'text-neutral-600'}`} />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-2.5 flex flex-col flex-1">
        <h3 className="text-xs text-neutral-700 line-clamp-2 mb-1.5 group-hover:text-cps-red transition-colors min-h-[32px]" style={{ wordSpacing: 'normal', whiteSpace: 'normal' }}>
          {product.name}
        </h3>

        {showRating && product.rating && (
          <div className="flex items-center gap-1 mb-1">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            <span className="text-[10px] text-neutral-500">{product.rating}</span>
            {product.reviews && <span className="text-[10px] text-neutral-400">({product.reviews})</span>}
          </div>
        )}

        <div className="flex items-baseline gap-1.5 mt-auto">
          <span className="text-sm font-bold text-cps-red">{formatPrice(product.price)}</span>
          {discount > 0 && product.originalPrice && (
            <span className="text-[10px] text-neutral-400 line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>

        {showSold && product.sold && (
          <div className="mt-2">
            <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cps-red to-cps-red-light rounded-full transition-all"
                style={{ width: `${soldPercent}%` }}
              />
            </div>
            <p className="text-[10px] text-neutral-500 mt-1">Đã bán {product.sold}</p>
          </div>
        )}
      </div>
    </Link>
  )
}