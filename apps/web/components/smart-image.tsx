'use client'

import { useState } from 'react'
import { getProductImage } from '@/lib/product-images'

// Smart Image Component with loading state, skeleton, and fallback
export function SmartImage({ name, brand, className = '', alt = '' }: { name: string; brand?: string; className?: string; alt?: string }) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const src = getProductImage(name, brand)

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {loading && (
        <div className="absolute inset-0 skeleton rounded" />
      )}
      <img
        src={src}
        alt={alt || name}
        className={`w-full h-full object-cover transition-all duration-500 ${loading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
        loading="lazy"
        onLoad={() => setLoading(false)}
        onError={(e) => {
          setError(true)
          setLoading(false)
          // Try brand fallback
          const target = e.currentTarget
          if (brand) {
            const fallback = `https://cdn.cellphones.com.vn/358x358,webp/media/catalog/product/i/p/iphone-15_2.png`
            target.src = fallback
          }
        }}
      />
    </div>
  )
}

// Re-export with backward compat
export { ProductImage as PhoneImage } from '@/components/product-image'