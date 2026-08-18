'use client'

// Real product images from Cellphones.com.vn CDN
// Each product maps to its official Cellphones image URL

const imageMap: Record<string, string> = {
  // iPhones
  'iphone-15-pro-max-256gb': 'https://cdn.cellphones.com.vn/358x358,webp/media/catalog/product/i/p/iphone-15-pro-max_3.png',
  'iphone-15-pro-max': 'https://cdn.cellphones.com.vn/358x358,webp/media/catalog/product/i/p/iphone-15-pro-max_3.png',
  'iphone-15-plus-128gb': 'https://cdn.cellphones.com.vn/358x358,webp/media/catalog/product/i/p/iphone-15-plus_1.png',
  'iphone-15-128gb': 'https://cdn.cellphones.com.vn/358x358,webp/media/catalog/product/i/p/iphone-15_2.png',
  'iphone-14-128gb': 'https://cdn.cellphones.com.vn/358x358,webp/media/catalog/product/i/p/iphone-14_2.png',

  // Samsung
  'samsung-galaxy-s24-ultra': 'https://cdn.cellphones.com.vn/358x358,webp/media/catalog/product/s/a/samsung-galaxy-s24-ultra_2.png',
  'samsung-galaxy-z-flip5': 'https://cdn.cellphones.com.vn/358x358,webp/media/catalog/product/s/a/samsung-galaxy-z-flip5_2.png',
  'samsung-galaxy-watch-6': 'https://cdn.cellphones.com.vn/358x358,webp/media/catalog/product/s/a/samsung-galaxy-watch-6_1.png',
  'samsung-galaxy-tab-s9-ultra': 'https://cdn.cellphones.com.vn/358x358,webp/media/catalog/product/s/a/samsung-galaxy-tab-s9-ultra.png',

  // Apple laptops & accessories
  'macbook-pro-14-m3': 'https://cdn.cellphones.com.vn/358x358,webp/media/catalog/product/m/a/macbook-pro-14-m3_2.png',
  'macbook-pro-14-m2': 'https://cdn.cellphones.com.vn/358x358,webp/media/catalog/product/m/a/macbook-pro-14_2.png',
  'macbook-air-m2-13': 'https://cdn.cellphones.com.vn/358x358,webp/media/catalog/product/m/a/macbook-air-m2_2.png',
  'macbook-air-m2-13-inch': 'https://cdn.cellphones.com.vn/358x358,webp/media/catalog/product/m/a/macbook-air-m2_2.png',
  'airpods-pro-2': 'https://cdn.cellphones.com.vn/358x358,webp/media/catalog/product/a/i/airpods-pro-2-usb-c_2.png',
  'airpods-pro-2-usb-c': 'https://cdn.cellphones.com.vn/358x358,webp/media/catalog/product/a/i/airpods-pro-2-usb-c_2.png',
  'ipad-pro-11-m2': 'https://cdn.cellphones.com.vn/358x358,webp/media/catalog/product/i/p/ipad-pro-11-m2_2.png',

  // Xiaomi / OPPO / vivo / Realme
  'xiaomi-14-pro': 'https://cdn.cellphones.com.vn/358x358,webp/media/catalog/product/x/i/xiaomi-14-pro_2.png',
  'xiaomi-14-ultra': 'https://cdn.cellphones.com.vn/358x358,webp/media/catalog/product/x/i/xiaomi-14-ultra.png',
  'oppo-find-x7-pro': 'https://cdn.cellphones.com.vn/358x358,webp/media/catalog/product/o/p/oppo-find-x7-pro.png',
  'vivo-x100-pro': 'https://cdn.cellphones.com.vn/358x358,webp/media/catalog/product/v/i/vivo-x100-pro.png',
  'realme-gt5-pro': 'https://cdn.cellphones.com.vn/358x358,webp/media/catalog/product/r/e/realme-gt5-pro.png',

  // Dell / ASUS
  'dell-xps-13-plus': 'https://cdn.cellphones.com.vn/358x358,webp/media/catalog/product/d/e/dell-xps-13-plus.png',
  'asus-rog-strix-g16': 'https://cdn.cellphones.com.vn/358x358,webp/media/catalog/product/a/s/asus-rog-strix-g16.png',
}

const fallbackByBrand: Record<string, string> = {
  Apple: 'https://cdn.cellphones.com.vn/358x358,webp/media/catalog/product/i/p/iphone-15_2.png',
  Samsung: 'https://cdn.cellphones.com.vn/358x358,webp/media/catalog/product/s/a/samsung-galaxy-s24-ultra_2.png',
  Xiaomi: 'https://cdn.cellphones.com.vn/358x358,webp/media/catalog/product/x/i/xiaomi-14-pro_2.png',
  OPPO: 'https://cdn.cellphones.com.vn/358x358,webp/media/catalog/product/o/p/oppo-find-x7-pro.png',
  vivo: 'https://cdn.cellphones.com.vn/358x358,webp/media/catalog/product/v/i/vivo-x100-pro.png',
  Realme: 'https://cdn.cellphones.com.vn/358x358,webp/media/catalog/product/r/e/realme-gt5-pro.png',
  ASUS: 'https://cdn.cellphones.com.vn/358x358,webp/media/catalog/product/a/s/asus-rog-strix-g16.png',
  Dell: 'https://cdn.cellphones.com.vn/358x358,webp/media/catalog/product/d/e/dell-xps-13-plus.png',
}

const DEFAULT_FALLBACK = 'https://cdn.cellphones.com.vn/358x358,webp/media/catalog/product/i/p/iphone-15-pro-max_3.png'

function normalizeKey(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export function getProductImage(name: string, brand?: string): string {
  const key = normalizeKey(name)
  if (imageMap[key]) return imageMap[key]
  if (brand && fallbackByBrand[brand]) return fallbackByBrand[brand]
  return DEFAULT_FALLBACK
}

// Smart Image Component with loading state and fallback
export function getImageUrl(name: string, brand?: string): string {
  return getProductImage(name, brand)
}