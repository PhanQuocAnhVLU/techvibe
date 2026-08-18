'use client'

import { useState, useEffect } from 'react'

interface ProductImage {
  url: string
  brand?: string
}

// Local cache to avoid refetching
const imageCache: Record<string, string> = {}

async function fetchImageUrl(name: string, brand?: string): Promise<string> {
  const cacheKey = `${name}__${brand || ''}`
  if (imageCache[cacheKey]) return imageCache[cacheKey]

  try {
    const res = await fetch(`/api/product-image?name=${encodeURIComponent(name)}&brand=${encodeURIComponent(brand || '')}`)
    const data: ProductImage = await res.json()
    imageCache[cacheKey] = data.url
    return data.url
  } catch {
    // Fallback URL when API fails
    return 'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/iphone-15-pro-max_3.png'
  }
}

// Smart Image Component with loading state, skeleton, and fallback
export function SmartImage({ name, brand, className = '', alt = '' }: { name: string; brand?: string; className?: string; alt?: string }) {
  const [src, setSrc] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let mounted = true
    fetchImageUrl(name, brand).then(url => {
      if (mounted) {
        setSrc(url)
        setLoading(false)
      }
    })
    return () => { mounted = false }
  }, [name, brand])

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {loading && (
        <div className="absolute inset-0 skeleton rounded" />
      )}
      <img
        src={src || 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxIDEiPjwvc3ZnPg=='}
        alt={alt || name}
        className={`w-full h-full object-cover transition-all duration-500 ${loading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
        loading="lazy"
        onError={() => setError(true)}
        onLoad={() => setLoading(false)}
      />
      {error && !loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400 text-xs">
          {brand || 'No img'}
        </div>
      )}
    </div>
  )
}