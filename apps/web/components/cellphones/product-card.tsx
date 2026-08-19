'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Heart, Star } from 'lucide-react'

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

// Comprehensive product image map - covers all products used in the demo
// URL pattern: cdn2.cellphones.com.vn/x/media/catalog/product/{a}/{letter}/{slug}_{n}.png
// Falls back to SVG mockup if URL fails
const PRODUCT_IMAGES: Record<string, string[]> = {
  // iPhone series
  'iphone-15-pro-max': [
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/iphone-15-pro-max_3.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/iphone-15-pro-max-titan-1.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/iphone-15-pro-max_1.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/iphone-15-pro-max_2.png',
  ],
  'iphone-15-pro-max-256gb': [
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/iphone-15-pro-max_3.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/iphone-15-pro-max-titan-1.png',
  ],
  'iphone-15-plus': [
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/iphone-15-plus_1.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/iphone-15-plus-128gb_1.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/iphone_15_plus.png',
  ],
  'iphone-15-plus-128gb': [
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/iphone-15-plus_1.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/iphone-15-plus-128gb_1.png',
  ],
  'iphone-15': [
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/iphone-15_2.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/iphone-15-128gb_1.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/iphone15.png',
  ],
  'iphone-15-128gb': [
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/iphone-15_2.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/iphone-15-128gb_1.png',
  ],
  'iphone-14': [
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/iphone-14_1.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/iphone-14-128gb_1.png',
  ],
  'iphone-14-128gb': [
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/iphone-14_1.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/iphone-14-128gb_1.png',
  ],

  // Samsung
  'samsung-galaxy-s24-ultra': [
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/s/a/samsung-galaxy-s24-ultra_2.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/s/a/samsung-galaxy-s24-ultra_1.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/s/a/samsung-galaxy-s24-ultra-256gb_1.png',
  ],
  'samsung-galaxy-a55': [
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/s/a/samsung-galaxy-a55-5g_1.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/s/a/samsung-galaxy-a55_1.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/s/a/samsung-a55_1.png',
  ],
  'samsung-galaxy-a55-5g': [
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/s/a/samsung-galaxy-a55-5g_1.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/s/a/samsung-galaxy-a55_1.png',
  ],
  'samsung-galaxy-s24': [
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/s/a/samsung-galaxy-s24_1.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/s/a/samsung-galaxy-s24-256gb_1.png',
  ],
  'samsung-galaxy-watch-6': [
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/s/a/samsung-galaxy-watch6_1__1.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/s/a/samsung-galaxy-watch-6_1.png',
  ],
  'samsung-galaxy-watch6': [
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/s/a/samsung-galaxy-watch6_1__1.png',
  ],

  // MacBook / Laptop
  'macbook-pro-14-m3': [
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/m/a/macbook-pro-14-m3_1.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/m/a/macbook-pro-14-inch-m3_1.png',
  ],
  'macbook-air-m2-13-inch': [
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/m/a/macbook-air-m2_2.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/m/a/macbook-air-m2-13-inch_1.png',
  ],
  'macbook-air-m2': [
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/m/a/macbook-air-m2_2.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/m/a/macbook-air-m2-13-inch_1.png',
  ],
  'macbook-air-m3': [
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/m/a/macbook-air-m3_1.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/m/a/macbook-air-m3-13-inch_1.png',
  ],
  'dell-xps-13-plus': [
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/d/e/dell-xps-13-plus_1.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/d/e/dell-xps-13-plus-9320_1.png',
  ],
  'asus-rog-strix-g16': [
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/a/s/asus-rog-strix-g16_1.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/a/s/asus-rog-strix-g16-2024_1.png',
  ],
  'asus-rog-strix-g16-g614': [
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/a/s/asus-rog-strix-g16_1.png',
  ],

  // AirPods
  'airpods-pro-2': [
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/a/i/airpods-pro-2-usb-c_1.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/a/i/airpods-pro-2_1.png',
  ],
  'airpods-pro-2-usb-c': [
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/a/i/airpods-pro-2-usb-c_1.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/a/i/airpods-pro-2_1.png',
  ],

  // iPad
  'ipad-pro-11-inch-m2': [
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/ipad-pro-11-inch-m2_1.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/ipad-pro-11-m2_1.png',
  ],
  'ipad-pro-11-m2': [
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/ipad-pro-11-inch-m2_1.png',
  ],

  // Xiaomi
  'xiaomi-14-pro': [
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/x/i/xiaomi-14-pro_1.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/x/i/xiaomi-14-pro-256gb_1.png',
  ],
  'xiaomi-14': [
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/x/i/xiaomi-14_2.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/x/i/xiaomi-14-128gb_1.png',
  ],

  // OPPO
  'oppo-find-x7-pro': [
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/o/p/oppo-find-x7-pro_1.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/o/p/oppo-find-x7-ultra_1.png',
  ],
  'oppo-find-x7-ultra': [
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/o/p/oppo-find-x7-ultra_1.png',
  ],

  // vivo
  'vivo-x100-pro': [
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/v/i/vivo-x100-pro_1.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/v/i/vivo-x100-pro-256gb_1.png',
  ],

  // Realme
  'realme-gt5-pro': [
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/r/e/realme-gt5-pro_1.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/r/e/realme-gt5-pro-256gb_1.png',
  ],
}

function getProductImageUrls(name: string): string[] {
  const normalized = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  if (PRODUCT_IMAGES[normalized]) return PRODUCT_IMAGES[normalized]

  // Try removing capacity/storage suffix
  const withoutCapacity = normalized.replace(/-\d+gb|-13-inch|-11-inch|-m[23]|-g\d+/g, '')
  if (PRODUCT_IMAGES[withoutCapacity]) return PRODUCT_IMAGES[withoutCapacity]

  // Fuzzy match
  for (const [key, urls] of Object.entries(PRODUCT_IMAGES)) {
    if (normalized.includes(key) || key.includes(normalized)) return urls
  }

  // Match by brand prefix
  const brandMap: Record<string, string[]> = {
    'iphone': PRODUCT_IMAGES['iphone-15'] || [],
    'samsung': PRODUCT_IMAGES['samsung-galaxy-s24-ultra'] || [],
    'macbook': PRODUCT_IMAGES['macbook-air-m3'] || [],
    'airpods': PRODUCT_IMAGES['airpods-pro-2'] || [],
    'ipad': PRODUCT_IMAGES['ipad-pro-11-inch-m2'] || [],
    'xiaomi': PRODUCT_IMAGES['xiaomi-14-pro'] || [],
    'oppo': PRODUCT_IMAGES['oppo-find-x7-pro'] || [],
    'vivo': PRODUCT_IMAGES['vivo-x100-pro'] || [],
    'realme': PRODUCT_IMAGES['realme-gt5-pro'] || [],
    'dell': PRODUCT_IMAGES['dell-xps-13-plus'] || [],
    'asus': PRODUCT_IMAGES['asus-rog-strix-g16'] || [],
  }

  for (const [brand, urls] of Object.entries(brandMap)) {
    if (normalized.includes(brand) && urls.length > 0) return urls
  }

  return []
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

function ProductImage({ name }: { name: string }) {
  const [urls] = useState(() => getProductImageUrls(name))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [allFailed, setAllFailed] = useState(false)

  // Reset state if name changes
  useEffect(() => {
    setCurrentIndex(0)
    setAllFailed(false)
  }, [name])

  const handleError = () => {
    if (currentIndex < urls.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setAllFailed(true)
    }
  }

  // Render beautiful SVG fallback when all URLs fail
  if (allFailed || urls.length === 0) {
    const brand = (name.match(/iPhone|Samsung|Galaxy|MacBook|AirPods|iPad|Xiaomi|OPPO|vivo|Realme|Dell|ASUS/i)?.[0] || 'Product')
    const colors: Record<string, { bg: string; accent: string }> = {
      'iPhone': { bg: '#1a1a2e', accent: '#5e9eff' },
      'MacBook': { bg: '#1a1a1a', accent: '#9b87f5' },
      'AirPods': { bg: '#f8f8f8', accent: '#5e9eff' },
      'iPad': { bg: '#1a1a2e', accent: '#5e9eff' },
      'Samsung': { bg: '#1428a0', accent: '#fbbf24' },
      'Galaxy': { bg: '#1428a0', accent: '#fbbf24' },
      'Xiaomi': { bg: '#ff6b35', accent: '#ffffff' },
      'OPPO': { bg: '#00a86b', accent: '#ffffff' },
      'vivo': { bg: '#4158d0', accent: '#ffcc70' },
      'Realme': { bg: '#ffd200', accent: '#000000' },
      'Dell': { bg: '#007db8', accent: '#ffffff' },
      'ASUS': { bg: '#1a1a1a', accent: '#9b87f5' },
    }
    const palette = colors[brand] || { bg: '#6366f1', accent: '#ffffff' }
    const initial = brand.charAt(0)

    return (
      <div
        className="w-full h-full flex items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${palette.bg} 0%, ${palette.bg}dd 100%)` }}
      >
        <div className="text-center">
          <div className="text-5xl font-black text-white opacity-30 mb-1">{initial}</div>
          <div className="text-[10px] font-semibold text-white opacity-60 px-2">{brand}</div>
        </div>
      </div>
    )
  }

  return (
    <img
      src={urls[currentIndex]}
      alt={name}
      className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-500"
      loading="lazy"
      onError={handleError}
    />
  )
}

export function ProductCard({
  product,
  showSold = false,
  showWishlist = true,
  showRating = true,
}: ProductCardProps) {
  const discount = product.originalPrice && product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0
  const soldPercent = product.sold ? Math.min(95, Math.round((product.sold / 500) * 100)) : 0

  return (
    <Link
      href={`/san-pham/${product.id}`}
      className="shine-card group relative bg-white rounded-lg overflow-hidden hover:shadow-card-hover transition-all hover:-translate-y-1 flex flex-col h-full border border-neutral-100"
    >
      {/* Image container */}
      <div className="relative aspect-square bg-white overflow-hidden">
        <ProductImage name={product.name} />

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
            onClick={(e) => { e.preventDefault() }}
            className="absolute bottom-2 right-2 w-7 h-7 bg-white/90 rounded-full shadow opacity-0 group-hover:opacity-100 transition-all hover:scale-110 flex items-center justify-center"
          >
            <Heart className="w-3.5 h-3.5 text-gray-500 hover:text-cps-red" />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-2.5 flex flex-col flex-1">
        {/* Name - force white-space normal to avoid glued words */}
        <h3 className="text-xs text-neutral-700 line-clamp-2 mb-1.5 group-hover:text-cps-red transition-colors min-h-[32px]" style={{ wordSpacing: 'normal', whiteSpace: 'normal' }}>
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