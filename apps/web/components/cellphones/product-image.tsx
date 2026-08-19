'use client'

import { useState, useEffect } from 'react'

// CellphoneS CDN URL pattern: cdn2.cellphones.com.vn/x/media/catalog/product/{a}/{a}/{slug}_{n}.png
// Where {a} = first letter of slug
const PRODUCT_IMAGES: Record<string, string[]> = {
  // iPhone
  'iphone-15-pro-max-256gb': [
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/i/iphone-15-pro-max-256gb_1.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/i/iphone-15-pro-max-256gb_2.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/i/iphone-15-pro-max-256gb_3.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/i/iphone-15-pro-max-256gb_4.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/i/iphone-15-pro-max-256gb_5.png',
  ],
  'iphone-15-pro-max': [
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/i/iphone-15-pro-max-256gb_1.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/i/iphone-15-pro-max-256gb_2.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/i/iphone-15-pro-max-256gb_3.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/i/iphone-15-pro-max-256gb_4.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/i/iphone-15-pro-max-256gb_5.png',
  ],
  'iphone-15-plus-128gb': [
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/i/iphone-15-plus-128gb_1.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/i/iphone-15-plus-128gb_2.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/i/iphone-15-plus-128gb_3.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/i/iphone-15-plus-128gb_4.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/i/iphone-15-plus-128gb_5.png',
  ],
  'iphone-15-plus': [
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/i/iphone-15-plus-128gb_1.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/i/iphone-15-plus-128gb_2.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/i/iphone-15-plus-128gb_3.png',
  ],
  'iphone-15-128gb': [
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/i/iphone-15-128gb_1.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/i/iphone-15-128gb_2.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/i/iphone-15-128gb_3.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/i/iphone-15-128gb_4.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/i/iphone-15-128gb_5.png',
  ],
  'iphone-15': [
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/i/iphone-15-128gb_1.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/i/iphone-15-128gb_2.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/i/iphone-15-128gb_3.png',
  ],
  'iphone-14-128gb': [
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/i/iphone-14-128gb_1.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/i/iphone-14-128gb_2.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/i/iphone-14-128gb_3.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/i/iphone-14-128gb_4.png',
  ],
  'iphone-14': [
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/i/iphone-14-128gb_1.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/i/iphone-14-128gb_2.png',
  ],

  // Samsung
  'samsung-galaxy-s24-ultra': [
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/s/s/samsung-galaxy-s24-ultra_1.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/s/s/samsung-galaxy-s24-ultra_2.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/s/s/samsung-galaxy-s24-ultra_3.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/s/s/samsung-galaxy-s24-ultra_4.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/s/s/samsung-galaxy-s24-ultra_5.png',
  ],
  'samsung-galaxy-a55-5g': [
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/s/s/samsung-galaxy-a55-5g_1.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/s/s/samsung-galaxy-a55-5g_2.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/s/s/samsung-galaxy-a55-5g_3.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/s/s/samsung-galaxy-a55-5g_4.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/s/s/samsung-galaxy-a55-5g_5.png',
  ],
  'samsung-galaxy-watch-6': [
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/s/s/samsung-galaxy-watch6_1.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/s/s/samsung-galaxy-watch6_2.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/s/s/samsung-galaxy-watch6_3.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/s/s/samsung-galaxy-watch6_4.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/s/s/samsung-galaxy-watch6_5.png',
  ],

  // MacBook
  'macbook-pro-14-m3': [
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/m/m/macbook-pro-14-inch-m3_1.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/m/m/macbook-pro-14-inch-m3_2.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/m/m/macbook-pro-14-inch-m3_3.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/m/m/macbook-pro-14-inch-m3_4.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/m/m/macbook-pro-14-inch-m3_5.png',
  ],
  'macbook-air-m2-13-inch': [
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/m/m/macbook-air-m2-13-inch_1.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/m/m/macbook-air-m2-13-inch_2.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/m/m/macbook-air-m2-13-inch_3.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/m/m/macbook-air-m2-13-inch_4.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/m/m/macbook-air-m2-13-inch_5.png',
  ],
  'macbook-air-m3': [
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/m/m/macbook-air-m3-13-inch_1.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/m/m/macbook-air-m3-13-inch_2.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/m/m/macbook-air-m3-13-inch_3.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/m/m/macbook-air-m3-13-inch_4.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/m/m/macbook-air-m3-13-inch_5.png',
  ],

  // Dell
  'dell-xps-13-plus': [
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/d/d/dell-xps-13-plus_1.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/d/d/dell-xps-13-plus_2.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/d/d/dell-xps-13-plus_3.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/d/d/dell-xps-13-plus_4.png',
  ],

  // ASUS
  'asus-rog-strix-g16': [
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/a/a/asus-rog-strix-g16_1.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/a/a/asus-rog-strix-g16_2.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/a/a/asus-rog-strix-g16_3.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/a/a/asus-rog-strix-g16_4.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/a/a/asus-rog-strix-g16_5.png',
  ],

  // AirPods
  'airpods-pro-2-usb-c': [
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/a/a/airpods-pro-2-usb-c_1.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/a/a/airpods-pro-2-usb-c_2.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/a/a/airpods-pro-2-usb-c_3.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/a/a/airpods-pro-2-usb-c_4.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/a/a/airpods-pro-2-usb-c_5.png',
  ],

  // iPad
  'ipad-pro-11-inch-m2': [
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/i/ipad-pro-11-inch-m2_1.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/i/ipad-pro-11-inch-m2_2.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/i/ipad-pro-11-inch-m2_3.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/i/ipad-pro-11-inch-m2_4.png',
  ],

  // Xiaomi
  'xiaomi-14-pro': [
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/x/x/xiaomi-14-pro_1.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/x/x/xiaomi-14-pro_2.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/x/x/xiaomi-14-pro_3.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/x/x/xiaomi-14-pro_4.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/x/x/xiaomi-14-pro_5.png',
  ],
  'xiaomi-14': [
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/x/x/xiaomi-14_1.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/x/x/xiaomi-14_2.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/x/x/xiaomi-14_3.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/x/x/xiaomi-14_4.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/x/x/xiaomi-14_5.png',
  ],

  // OPPO
  'oppo-find-x7-pro': [
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/o/o/oppo-find-x7-pro_1.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/o/o/oppo-find-x7-pro_2.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/o/o/oppo-find-x7-pro_3.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/o/o/oppo-find-x7-pro_4.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/o/o/oppo-find-x7-pro_5.png',
  ],

  // vivo
  'vivo-x100-pro': [
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/v/v/vivo-x100-pro_1.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/v/v/vivo-x100-pro_2.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/v/v/vivo-x100-pro_3.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/v/v/vivo-x100-pro_4.png',
  ],

  // Realme
  'realme-gt5-pro': [
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/r/r/realme-gt5-pro_1.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/r/r/realme-gt5-pro_2.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/r/r/realme-gt5-pro_3.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/r/r/realme-gt5-pro_4.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/r/r/realme-gt5-pro_5.png',
  ],
}

function getProductImageUrls(name: string): string[] {
  const normalized = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  if (PRODUCT_IMAGES[normalized]) return PRODUCT_IMAGES[normalized]

  const withoutCapacity = normalized.replace(/-\d+gb|-13-inch|-11-inch|-m[23]|-g\d+/g, '')
  if (PRODUCT_IMAGES[withoutCapacity]) return PRODUCT_IMAGES[withoutCapacity]

  for (const [key, urls] of Object.entries(PRODUCT_IMAGES)) {
    if (normalized.includes(key) || key.includes(normalized)) return urls
  }

  const brandMap: Record<string, string[]> = {
    'iphone': PRODUCT_IMAGES['iphone-15'] || [],
    'samsung': PRODUCT_IMAGES['samsung-galaxy-s24-ultra'] || [],
    'macbook': PRODUCT_IMAGES['macbook-air-m3'] || [],
    'airpods': PRODUCT_IMAGES['airpods-pro-2-usb-c'] || [],
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

export function ProductImage({ name, className = '' }: { name: string; className?: string }) {
  const [urls] = useState(() => getProductImageUrls(name))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [allFailed, setAllFailed] = useState(false)

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
        className={`w-full h-full flex items-center justify-center ${className}`}
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
      className={`w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-500 ${className}`}
      loading="lazy"
      onError={handleError}
    />
  )
}