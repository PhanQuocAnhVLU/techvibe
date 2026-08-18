'use client'

// Utility để thay thế /api/placeholder URLs b�ng ảnh thật từ Cellphones CDN
import { getProductImage } from '@/lib/product-images'

const CATEGORY_FALLBACK: Record<string, string> = {
  'dien-thoai': 'https://cdn2.cellphones.com.vn/x/358x358,webp/media/catalog/product/i/p/iphone-15-pro-max_3.png',
  'laptop': 'https://cdn2.cellphones.com.vn/x/358x358,webp/media/catalog/product/m/a/macbook-air-m2_2.png',
  'tablet': 'https://cdn2.cellphones.com.vn/x/358x358,webp/media/catalog/product/i/p/ipad-pro-11-m2_2.png',
  'phu-kien': 'https://cdn2.cellphones.com.vn/x/358x358,webp/media/catalog/product/a/i/airpods-pro-2-usb-c_2.png',
  'dong-ho': 'https://cdn2.cellphones.com.vn/x/358x358,webp/media/catalog/product/s/a/samsung-galaxy-watch-6_1.png',
  'am-thanh': 'https://cdn2.cellphones.com.vn/x/358x358,webp/media/catalog/product/a/i/airpods-pro-2-usb-c_2.png',
  'tv': 'https://cdn2.cellphones.com.vn/x/358x358,webp/media/catalog/product/i/p/iphone-15-pro-max_3.png',
  'smart-home': 'https://cdn2.cellphones.com.vn/x/358x358,webp/media/catalog/product/i/p/iphone-15-pro-max_3.png',
  'tin-tuc': 'https://cdn2.cellphones.com.vn/x/358x358,webp/media/catalog/product/t/i/tin-cong-nghe.png',
  'news': 'https://cdn2.cellphones.com.vn/x/358x358,webp/media/catalog/product/t/i/tin-cong-nghe.png',
}

const DEFAULT_IMAGE = 'https://cdn2.cellphones.com.vn/x/358x358,webp/media/catalog/product/i/p/iphone-15-pro-max_3.png'

export function getImageFor(name: string, brand?: string, category?: string): string {
  if (!name) return DEFAULT_IMAGE
  // Nếu name có dạng /api/placeholder, lấy từ category fallback
  if (name.includes('/api/placeholder')) {
    if (category && CATEGORY_FALLBACK[category]) return CATEGORY_FALLBACK[category]
    return DEFAULT_IMAGE
  }
  return getProductImage(name, brand)
}

export const FALLBACK_IMAGES = CATEGORY_FALLBACK
export const PLACEHOLDER_FALLBACK = DEFAULT_IMAGE