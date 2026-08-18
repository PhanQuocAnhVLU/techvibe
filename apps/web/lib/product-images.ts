'use client'

// Real product images from Cellphones.com.vn CDN (cdn2 subdomain - has CORS enabled)
const BASE = 'https://cdn2.cellphones.com.vn/x/media/catalog/product'

const imageMap: Record<string, string> = {
  // iPhones
  'iphone-15-pro-max-256gb': `${BASE}/i/p/iphone-15-pro-max_3.png`,
  'iphone-15-pro-max': `${BASE}/i/p/iphone-15-pro-max_3.png`,
  'iphone-15-plus-128gb': `${BASE}/i/p/iphone-15-plus_1.png`,
  'iphone-15-128gb': `${BASE}/i/p/iphone-15_2.png`,
  'iphone-14-128gb': `${BASE}/i/p/iphone-14_2.png`,

  // Samsung
  'samsung-galaxy-s24-ultra': `${BASE}/s/a/samsung-galaxy-s24-ultra_2.png`,
  'samsung-galaxy-z-flip5': `${BASE}/s/a/samsung-galaxy-z-flip5_2.png`,
  'samsung-galaxy-watch-6': `${BASE}/s/a/samsung-galaxy-watch-6_1.png`,
  'samsung-galaxy-tab-s9-ultra': `${BASE}/s/a/samsung-galaxy-tab-s9-ultra.png`,

  // Apple laptops & accessories
  'macbook-pro-14-m3': `${BASE}/m/a/macbook-pro-14-m3_2.png`,
  'macbook-pro-14-m2': `${BASE}/m/a/macbook-pro-14_2.png`,
  'macbook-air-m2-13': `${BASE}/m/a/macbook-air-m2_2.png`,
  'macbook-air-m2-13-inch': `${BASE}/m/a/macbook-air-m2_2.png`,
  'airpods-pro-2': `${BASE}/a/i/airpods-pro-2-usb-c_2.png`,
  'airpods-pro-2-usb-c': `${BASE}/a/i/airpods-pro-2-usb-c_2.png`,
  'ipad-pro-11-m2': `${BASE}/i/p/ipad-pro-11-m2_2.png`,

  // Xiaomi / OPPO / vivo / Realme
  'xiaomi-14-pro': `${BASE}/x/i/xiaomi-14-pro_2.png`,
  'xiaomi-14-ultra': `${BASE}/x/i/xiaomi-14-ultra.png`,
  'oppo-find-x7-pro': `${BASE}/o/p/oppo-find-x7-pro.png`,
  'vivo-x100-pro': `${BASE}/v/i/vivo-x100-pro.png`,
  'realme-gt5-pro': `${BASE}/r/e/realme-gt5-pro.png`,

  // Dell / ASUS
  'dell-xps-13-plus': `${BASE}/d/e/dell-xps-13-plus.png`,
  'asus-rog-strix-g16': `${BASE}/a/s/asus-rog-strix-g16.png`,
}

const fallbackByBrand: Record<string, string> = {
  Apple: `${BASE}/i/p/iphone-15-pro-max_3.png`,
  Samsung: `${BASE}/s/a/samsung-galaxy-s24-ultra_2.png`,
  Xiaomi: `${BASE}/x/i/xiaomi-14-pro_2.png`,
  OPPO: `${BASE}/o/p/oppo-find-x7-pro.png`,
  vivo: `${BASE}/v/i/vivo-x100-pro.png`,
  Realme: `${BASE}/r/e/realme-gt5-pro.png`,
  ASUS: `${BASE}/a/s/asus-rog-strix-g16.png`,
  Dell: `${BASE}/d/e/dell-xps-13-plus.png`,
}

const DEFAULT_FALLBACK = `${BASE}/i/p/iphone-15-pro-max_3.png`

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

export function getImageUrl(name: string, brand?: string): string {
  return getProductImage(name, brand)
}