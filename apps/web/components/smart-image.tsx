'use client'

import { useState } from 'react'
import { ProductMockup } from './product-mockup'

interface ProductImage {
  url: string
  brand?: string
}

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
    return ''
  }
}

// Reusable image component - uses beautiful SVG mockups by default since CDN is unreliable
// Falls back to remote image if URL provided directly
export function SmartImage({ name, brand, className = '', alt = '', src: directSrc, aspectRatio = 'square' }: { name: string; brand?: string; className?: string; alt?: string; src?: string; aspectRatio?: 'square' | 'video' | 'wide' }) {
  const aspectClass = {
    square: 'aspect-square',
    video: 'aspect-video',
    wide: 'aspect-[3/2]',
  }[aspectRatio]

  // If we have a direct URL and we want to show it (like hero banner with photo)
  // For product cards, always use mockup
  return (
    <div className={`relative overflow-hidden ${aspectClass} ${className}`}>
      <ProductMockup name={name} brand={brand} />
    </div>
  )
}

// Image component that always uses real image URL (for hero banners, etc.)
export function RealImage({ src, alt, className = '', aspectRatio = 'video' }: { src: string; alt: string; className?: string; aspectRatio?: 'square' | 'video' | 'wide' }) {
  const aspectClass = {
    square: 'aspect-square',
    video: 'aspect-video',
    wide: 'aspect-[3/2]',
  }[aspectRatio]

  return (
    <div className={`relative overflow-hidden ${aspectClass} ${className}`}>
      <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />
    </div>
  )
}