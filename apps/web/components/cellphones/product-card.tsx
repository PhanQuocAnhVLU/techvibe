'use client'

import Link from 'next/link'
import { Heart, Star, Eye, GitCompare } from 'lucide-react'

interface Product {
  id: number
  name: string
  brand?: string
  price: number
  originalPrice?: number
  image?: string
  rating?: number
  reviews?: number
  sold?: number
  badge?: string
}

const PRODUCT_IMAGES: Record<string, string> = {
  'iphone-15-pro-max': 'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/iphone-15-pro-max_3.png',
  'iphone-15-pro-max-256gb': 'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/iphone-15-pro-max_3.png',
  'iphone-15-plus': 'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/iphone-15-plus_1.png',
  'iphone-15-plus-128gb': 'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/iphone-15-plus_1.png',
  'iphone-15': 'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/iphone-15_2.png',
  'iphone-15-128gb': 'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/iphone-15_2.png',
  'iphone-14': 'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/iphone-14_1.png',
  'iphone-14-128gb': 'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/iphone-14_1.png',
  'samsung-galaxy-s24-ultra': 'https://cdn2.cellphones.com.vn/x/media/catalog/product/s/a/samsung-galaxy-s24-ultra_2.png',
  'samsung-galaxy-watch-6': 'https://cdn2.cellphones.com.vn/x/media/catalog/product/s/a/samsung-galaxy-watch6_1__1.png',
  'samsung-galaxy-watch6': 'https://cdn2.cellphones.com.vn/x/media/catalog/product/s/a/samsung-galaxy-watch6_1__1.png',
  'macbook-pro-14-m3': 'https://cdn2.cellphones.com.vn/x/media/catalog/product/m/a/macbook-pro-14-m3_1.png',
  'macbook-air-m2-13-inch': 'https://cdn2.cellphones.com.vn/x/media/catalog/product/m/a/macbook-air-m2_2.png',
  'macbook-air-m2': 'https://cdn2.cellphones.com.vn/x/media/catalog/product/m/a/macbook-air-m2_2.png',
  'macbook-air-m3': 'https://cdn2.cellphones.com.vn/x/media/catalog/product/m/a/macbook-air-m3_1.png',
  'airpods-pro-2': 'https://cdn2.cellphones.com.vn/x/media/catalog/product/a/i/airpods-pro-2-usb-c_1.png',
  'airpods-pro-2-usb-c': 'https://cdn2.cellphones.com.vn/x/media/catalog/product/a/i/airpods-pro-2-usb-c_1.png',
  'ipad-pro-11-inch-m2': 'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/ipad-pro-11-inch-m2_1.png',
  'ipad-pro-11-m2': 'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/ipad-pro-11-inch-m2_1.png',
  'xiaomi-14-pro': 'https://cdn2.cellphones.com.vn/x/media/catalog/product/x/i/xiaomi-14-pro_1.png',
  'xiaomi-14': 'https://cdn2.cellphones.com.vn/x/media/catalog/product/x/i/xiaomi-14_2.png',
  'oppo-find-x7-pro': 'https://cdn2.cellphones.com.vn/x/media/catalog/product/o/p/oppo-find-x7-pro_1.png',
  'vivo-x100-pro': 'https://cdn2.cellphones.com.vn/x/media/catalog/product/v/i/vivo-x100-pro_1.png',
  'realme-gt5-pro': 'https://cdn2.cellphones.com.vn/x/media/catalog/product/r/e/realme-gt5-pro_1.png',
  'dell-xps-13-plus': 'https://cdn2.cellphones.com.vn/x/media/catalog/product/d/e/dell-xps-13-plus_1.png',
  'asus-rog-strix-g16': 'https://cdn2.cellphones.com.vn/x/media/catalog/product/a/s/asus-rog-strix-g16_1.png',
}

function getProductImageUrl(name: string): string | null {
  const normalized = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  if (PRODUCT_IMAGES[normalized]) return PRODUCT_IMAGES[normalized]
  const withoutCapacity = normalized.replace(/-\d+gb|-13-inch|-11-inch|-m[23]/g, '')
  if (PRODUCT_IMAGES[withoutCapacity]) return PRODUCT_IMAGES[withoutCapacity]
  for (const key of Object.keys(PRODUCT_IMAGES)) {
    if (normalized.includes(key) || key.includes(normalized)) return PRODUCT_IMAGES[key]
  }
  return null
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
  onWishlist?: (p: Product) => void
  onCompare?: (p: Product) => void
  onQuickView?: (p: Product) => void
}

export function ProductCard({
  product,
  showSold = false,
  showWishlist = true,
  showRating = true,
  showCompare = false,
  onWishlist,
  onCompare,
  onQuickView,
}: ProductCardProps) {
  const imageUrl = product.image || getProductImageUrl(product.name)
  const discount = product.originalPrice && product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0
  const soldPercent = product.sold ? Math.min(95, Math.round((product.sold / 500) * 100)) : 0

  return (
    <Link
      href={`/san-pham/${product.id}`}
      className="shine-card group relative bg-white rounded-lg overflow-hidden hover:shadow-card-hover transition-all hover:-translate-y-1 flex flex-col h-full"
    >
      {/* Image */}
      <div className="relative aspect-square bg-white overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-contain p-3 group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <span>No image</span>
          </div>
        )}

        {/* Discount badge */}
        {discount > 0 && (
          <span className="absolute top-2 left-2 px-1.5 py-0.5 bg-cps-red text-white text-[10px] font-bold rounded">
            -{discount}%
          </span>
        )}

        {/* Custom badge */}
        {product.badge && (
          <span className="absolute top-2 right-2 px-1.5 py-0.5 bg-yellow-400 text-cps-red text-[10px] font-bold rounded">
            {product.badge}
          </span>
        )}

        {/* Wishlist button */}
        {showWishlist && (
          <button
            onClick={(e) => { e.preventDefault(); onWishlist?.(product) }}
            className="absolute bottom-2 right-2 w-7 h-7 bg-white/90 rounded-full shadow opacity-0 group-hover:opacity-100 transition-all hover:scale-110 flex items-center justify-center"
          >
            <Heart className="w-3.5 h-3.5 text-gray-500 hover:text-cps-red" />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-2.5 flex flex-col flex-1">
        {/* Name */}
        <h3 className="text-xs text-neutral-700 line-clamp-2 mb-1.5 group-hover:text-cps-red transition-colors min-h-[32px]">
          {product.name}
        </h3>

        {/* Rating */}
        {showRating && product.rating && (
          <div className="flex items-center gap-1 mb-1">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            <span className="text-[10px] text-neutral-500">{product.rating}</span>
            {product.reviews && <span className="text-[10px] text-neutral-400">({product.reviews})</span>}
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-1.5 mt-auto">
          <span className="text-sm font-bold text-cps-red">{formatPrice(product.price)}</span>
          {discount > 0 && product.originalPrice && (
            <span className="text-[10px] text-neutral-400 line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>

        {/* Sold progress (Flash Sale) */}
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