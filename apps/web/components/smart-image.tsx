'use client'

import { useState, useEffect } from 'react'
import { ProductMockup } from './product-mockup'

interface ProductImage {
  url: string
  brand?: string
}

// Local product image map - using Cellphones CDN URLs (verified working from cdn2)
const PRODUCT_IMAGES: Record<string, string> = {
  // iPhone
  'iphone-15-pro-max': 'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/i/iphone-15-pro-max-256gb_1.png',
  'iphone-15-pro-max-256gb': 'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/i/iphone-15-pro-max-256gb_1.png',
  'iphone-15-plus': 'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/i/iphone-15-plus-128gb_1.png',
  'iphone-15-plus-128gb': 'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/i/iphone-15-plus-128gb_1.png',
  'iphone-15': 'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/i/iphone-15-128gb_1.png',
  'iphone-15-128gb': 'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/i/iphone-15-128gb_1.png',
  'iphone-14': 'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/i/iphone-14-128gb_1.png',
  'iphone-14-128gb': 'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/i/iphone-14-128gb_1.png',

  // Samsung
  'samsung-galaxy-s24-ultra': 'https://cdn2.cellphones.com.vn/x/media/catalog/product/s/s/samsung-galaxy-s24-ultra_1.png',
  'samsung-galaxy-a55': 'https://cdn2.cellphones.com.vn/x/media/catalog/product/s/s/samsung-galaxy-a55-5g_1.png',
  'samsung-galaxy-a55-5g': 'https://cdn2.cellphones.com.vn/x/media/catalog/product/s/s/samsung-galaxy-a55-5g_1.png',
  'samsung-galaxy-watch-6': 'https://cdn2.cellphones.com.vn/x/media/catalog/product/s/s/samsung-galaxy-watch6_1.png',
  'samsung-galaxy-watch6': 'https://cdn2.cellphones.com.vn/x/media/catalog/product/s/s/samsung-galaxy-watch6_1.png',

  // MacBook
  'macbook-pro-14-m3': 'https://cdn2.cellphones.com.vn/x/media/catalog/product/m/m/macbook-pro-14-inch-m3_1.png',
  'macbook-air-m2-13-inch': 'https://cdn2.cellphones.com.vn/x/media/catalog/product/m/m/macbook-air-m2-13-inch_1.png',
  'macbook-air-m2': 'https://cdn2.cellphones.com.vn/x/media/catalog/product/m/m/macbook-air-m2-13-inch_1.png',
  'macbook-air-m3': 'https://cdn2.cellphones.com.vn/x/media/catalog/product/m/m/macbook-air-m3-13-inch_1.png',

  // AirPods
  'airpods-pro-2': 'https://cdn2.cellphones.com.vn/x/media/catalog/product/a/a/airpods-pro-2-usb-c_1.png',
  'airpods-pro-2-usb-c': 'https://cdn2.cellphones.com.vn/x/media/catalog/product/a/a/airpods-pro-2-usb-c_1.png',

  // iPad
  'ipad-pro-11-inch-m2': 'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/i/ipad-pro-11-inch-m2_1.png',
  'ipad-pro-11-m2': 'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/i/ipad-pro-11-inch-m2_1.png',

  // Xiaomi
  'xiaomi-14-pro': 'https://cdn2.cellphones.com.vn/x/media/catalog/product/x/x/xiaomi-14-pro_1.png',
  'xiaomi-14': 'https://cdn2.cellphones.com.vn/x/media/catalog/product/x/x/xiaomi-14_1.png',

  // OPPO
  'oppo-find-x7-pro': 'https://cdn2.cellphones.com.vn/x/media/catalog/product/o/o/oppo-find-x7-pro_1.png',
  'oppo-find-n3': 'https://cdn2.cellphones.com.vn/x/media/catalog/product/o/o/oppo-find-n3_1.png',

  // vivo
  'vivo-x100-pro': 'https://cdn2.cellphones.com.vn/x/media/catalog/product/v/v/vivo-x100-pro_1.png',

  // Realme
  'realme-gt5-pro': 'https://cdn2.cellphones.com.vn/x/media/catalog/product/r/r/realme-gt5-pro_1.png',

  // Dell
  'dell-xps-13-plus': 'https://cdn2.cellphones.com.vn/x/media/catalog/product/d/d/dell-xps-13-plus_1.png',

  // ASUS
  'asus-rog-strix-g16': 'https://cdn2.cellphones.com.vn/x/media/catalog/product/a/a/asus-rog-strix-g16_1.png',
}

// Map product name to image key
function getProductImageKey(name: string): string | null {
  const normalized = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  if (PRODUCT_IMAGES[normalized]) return normalized

  // Try fuzzy matching - remove common suffixes
  const withoutCapacity = normalized.replace(/-\d+gb|-13-inch|-11-inch|-m[23]/g, '')
  if (PRODUCT_IMAGES[withoutCapacity]) return withoutCapacity

  // Try without "natural titanium" and similar
  const simplified = normalized.split('-').slice(0, 4).join('-')
  if (PRODUCT_IMAGES[simplified]) return simplified

  // Match by key words
  for (const key of Object.keys(PRODUCT_IMAGES)) {
    if (normalized.includes(key) || key.includes(normalized)) return key
  }

  return null
}

export function getProductImage(name: string): string | null {
  const key = getProductImageKey(name)
  return key ? PRODUCT_IMAGES[key] : null
}

export function SmartImage({ name, brand, className = '', alt = '', src: directSrc, aspectRatio = 'square' }: { name: string; brand?: string; className?: string; alt?: string; src?: string; aspectRatio?: 'square' | 'video' | 'wide' }) {
  const [src, setSrc] = useState<string | null>(directSrc || getProductImage(name))
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const aspectClass = { square: 'aspect-square', video: 'aspect-video', wide: 'aspect-[3/2]' }[aspectRatio]

  useEffect(() => {
    if (!directSrc) {
      setSrc(getProductImage(name))
      setLoading(true)
      setError(false)
    }
  }, [name, directSrc])

  if (!src || error) {
    return (
      <div className={`relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 ${aspectClass} ${className}`}>
        <ProductMockup name={name} brand={brand} />
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 ${aspectClass} ${className}`}>
      {loading && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100" />
      )}
      <img
        src={src}
        alt={alt || name}
        className={`relative w-full h-full object-contain p-3 transition-all duration-700 group-hover:scale-110 ${loading ? 'opacity-0' : 'opacity-100'}`}
        loading="lazy"
        onLoad={() => setLoading(false)}
        onError={() => { setError(true); setLoading(false) }}
      />
    </div>
  )
}

export function RealImage({ src, alt, className = '', aspectRatio = 'video' }: { src: string; alt: string; className?: string; aspectRatio?: 'square' | 'video' | 'wide' }) {
  const aspectClass = { square: 'aspect-square', video: 'aspect-video', wide: 'aspect-[3/2]' }[aspectRatio]
  const [loading, setLoading] = useState(true)

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 ${aspectClass} ${className}`}>
      {loading && <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100" />}
      <img
        src={src}
        alt={alt}
        className={`relative w-full h-full object-cover transition-opacity duration-700 ${loading ? 'opacity-0' : 'opacity-100'}`}
        loading="lazy"
        onLoad={() => setLoading(false)}
      />
    </div>
  )
}