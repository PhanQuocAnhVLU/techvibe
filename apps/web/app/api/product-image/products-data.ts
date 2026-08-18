// Curated list of product images from Cellphones.com.vn CDN
// Uses cdn2.cellphones.com.vn which has CORS enabled

interface ProductData {
  n: string  // name
  b: string  // brand
  u: string  // url
}

const BASE_URL = 'https://cdn2.cellphones.com.vn/x/media/catalog/product'

export const products: ProductData[] = [
  // iPhones
  { n: 'iPhone 15 Pro Max 256GB', b: 'Apple', u: `${BASE_URL}/i/p/iphone-15-pro-max_3.png` },
  { n: 'iPhone 15 Pro Max', b: 'Apple', u: `${BASE_URL}/i/p/iphone-15-pro-max_3.png` },
  { n: 'iPhone 15 Plus 128GB', b: 'Apple', u: `${BASE_URL}/i/p/iphone-15-plus_1.png` },
  { n: 'iPhone 15 128GB', b: 'Apple', u: `${BASE_URL}/i/p/iphone-15_2.png` },
  { n: 'iPhone 14 128GB', b: 'Apple', u: `${BASE_URL}/i/p/iphone-14_2.png` },
  { n: 'iPhone 14', b: 'Apple', u: `${BASE_URL}/i/p/iphone-14_2.png` },
  
  // Samsung
  { n: 'Samsung Galaxy S24 Ultra', b: 'Samsung', u: `${BASE_URL}/s/a/samsung-galaxy-s24-ultra_2.png` },
  { n: 'Samsung Galaxy S24', b: 'Samsung', u: `${BASE_URL}/s/a/samsung-galaxy-s24_1.png` },
  { n: 'Samsung Galaxy Z Flip5', b: 'Samsung', u: `${BASE_URL}/s/a/samsung-galaxy-z-flip5_2.png` },
  { n: 'Samsung Galaxy Watch 6', b: 'Samsung', u: `${BASE_URL}/s/a/samsung-galaxy-watch-6_1.png` },
  { n: 'Samsung Galaxy Tab S9 Ultra', b: 'Samsung', u: `${BASE_URL}/s/a/samsung-galaxy-tab-s9-ultra.png` },
  
  // Apple laptops & accessories
  { n: 'MacBook Pro 14 inch M3', b: 'Apple', u: `${BASE_URL}/m/a/macbook-pro-14-m3_2.png` },
  { n: 'MacBook Pro 14 M3', b: 'Apple', u: `${BASE_URL}/m/a/macbook-pro-14-m3_2.png` },
  { n: 'MacBook Air M2 13 inch', b: 'Apple', u: `${BASE_URL}/m/a/macbook-air-m2_2.png` },
  { n: 'AirPods Pro 2', b: 'Apple', u: `${BASE_URL}/a/i/airpods-pro-2-usb-c_2.png` },
  { n: 'AirPods Pro 2 USB-C', b: 'Apple', u: `${BASE_URL}/a/i/airpods-pro-2-usb-c_2.png` },
  { n: 'iPad Pro 11 inch M2', b: 'Apple', u: `${BASE_URL}/i/p/ipad-pro-11-m2_2.png` },
  { n: 'iPad Pro 11 M2', b: 'Apple', u: `${BASE_URL}/i/p/ipad-pro-11-m2_2.png` },
  
  // Xiaomi / OPPO / vivo / Realme
  { n: 'Xiaomi 14 Pro', b: 'Xiaomi', u: `${BASE_URL}/x/i/xiaomi-14-pro_2.png` },
  { n: 'Xiaomi 14 Ultra', b: 'Xiaomi', u: `${BASE_URL}/x/i/xiaomi-14-ultra.png` },
  { n: 'OPPO Find X7 Pro', b: 'OPPO', u: `${BASE_URL}/o/p/oppo-find-x7-pro.png` },
  { n: 'vivo X100 Pro', b: 'vivo', u: `${BASE_URL}/v/i/vivo-x100-pro.png` },
  { n: 'Realme GT5 Pro', b: 'Realme', u: `${BASE_URL}/r/e/realme-gt5-pro.png` },
  
  // Dell / ASUS
  { n: 'Dell XPS 13 Plus', b: 'Dell', u: `${BASE_URL}/d/e/dell-xps-13-plus.png` },
  { n: 'ASUS ROG Strix G16', b: 'ASUS', u: `${BASE_URL}/a/s/asus-rog-strix-g16.png` },
  
  // Accessories
  { n: 'Ốp lưng MagSafe', b: 'Apple', u: `${BASE_URL}/a/i/airpods-pro-2-usb-c_2.png` },
  { n: 'Cáp sạc USB-C', b: 'Apple', u: `${BASE_URL}/a/i/airpods-pro-2-usb-c_2.png` },
]