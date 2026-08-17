'use client'

import Link from 'next/link'
import { ChevronRight, Copy, Clock, Tag, Sparkles, Gift } from 'lucide-react'

const flashSaleProducts = [
  { id: 1, name: 'iPhone 15 Pro Max 256GB', price: 27990000, originalPrice: 34990000, image: '/api/placeholder/300/300', sold: 89, stock: 11 },
  { id: 2, name: 'Samsung Galaxy S24 Ultra', price: 23990000, originalPrice: 31990000, image: '/api/placeholder/300/300', sold: 156, stock: 44 },
  { id: 3, name: 'MacBook Pro 14" M3', price: 39990000, originalPrice: 49990000, image: '/api/placeholder/300/300', sold: 67, stock: 33 },
  { id: 4, name: 'AirPods Pro 2', price: 5490000, originalPrice: 7990000, image: '/api/placeholder/300/300', sold: 234, stock: 66 },
  { id: 5, name: 'Xiaomi 14 Pro', price: 14990000, originalPrice: 21990000, image: '/api/placeholder/300/300', sold: 45, stock: 5 },
  { id: 6, name: 'iPad Pro 11" M2', price: 21990000, originalPrice: 29990000, image: '/api/placeholder/300/300', sold: 78, stock: 22 },
]

const vouchers = [
  { id: 1, code: 'TECH50K', name: 'Giảm 50K cho đơn từ 500K', discount: 50000, minOrder: 500000, expiry: '31/08/2024' },
  { id: 2, code: 'FREESHIP', name: 'Miễn phí vận chuyển toàn quốc', discount: 'Free Ship', minOrder: 0, expiry: '30/09/2024' },
  { id: 3, code: 'NEW100', name: 'Giảm 100K cho khách hàng mới', discount: 100000, minOrder: 1000000, expiry: '15/09/2024' },
  { id: 4, code: 'SUMMER20', name: 'Giảm 20% tối đa 500K', discount: '20%', minOrder: 2000000, expiry: '31/08/2024' },
]

function formatPrice(price: number) {
  return new Intl.NumberFormat('vi-VN').format(price) + 'đ'
}

export default function PromotionsPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Top Bar */}
      <div className="bg-[#ca3838] text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link href="#" className="hover:opacity-80">Hồ Chí Minh</Link>
              <Link href="tel:18002000" className="hidden sm:flex items-center gap-1 hover:opacity-80">1800.2000</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-11 h-11 bg-[#ca3838] rounded-lg flex items-center justify-center">
              <span className="font-bold text-white text-2xl">T</span>
            </div>
            <div>
              <span className="font-bold text-xl text-[#363636]">Tech</span>
              <span className="font-bold text-xl text-[#ca3838]">Store</span>
            </div>
          </Link>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-[#ca3838]">Trang chủ</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-[#363636]">Khuyến mãi</span>
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-[#ca3838] to-[#ff6b35] text-white">
        <div className="max-w-7xl mx-auto px-4 py-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Sparkles className="w-8 h-8" />
            <h1 className="text-3xl sm:text-4xl font-bold">KHUYẾN MÃI HOT</h1>
            <Sparkles className="w-8 h-8" />
          </div>
          <p className="text-white/90 mb-6">Giảm giá sốc đến 50% - Áp dụng cho tất cả sản ph�m</p>
          <div className="flex items-center justify-center gap-2 text-white">
            <Clock className="w-5 h-5" />
            <span>Kết thúc trong:</span>
            <div className="flex gap-2">
              <span className="bg-white text-[#ca3838] px-3 py-1 rounded font-bold">23</span>
              <span className="bg-white text-[#ca3838] px-3 py-1 rounded font-bold">59</span>
              <span className="bg-white text-[#ca3838] px-3 py-1 rounded font-bold">59</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Flash Sale Products */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#363636] flex items-center gap-2">
              <span className="text-2xl">🔥</span>
              Flash Sale hôm nay
            </h2>
            <Link href="/san-pham" className="text-[#ca3838] text-sm font-medium hover:underline">
              Xem tất cả
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {flashSaleProducts.map(product => {
              const discount = Math.round((1 - product.price / product.originalPrice) * 100)
              const soldPercent = Math.round((product.sold / (product.sold + product.stock)) * 100)
              return (
                <Link key={product.id} href={`/san-pham/${product.id}`} className="bg-white rounded-lg overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow group">
                  <div className="relative aspect-square bg-gray-50">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 px-2 py-0.5 text-xs font-bold bg-[#ca3838] text-white rounded">
                      -{discount}%
                    </span>
                  </div>
                  <div className="p-3">
                    <h3 className="text-xs font-medium line-clamp-2 min-h-[32px] group-hover:text-[#ca3838]">
                      {product.name}
                    </h3>
                    <div className="mt-2">
                      <span className="text-sm font-bold text-[#ca3838]">{formatPrice(product.price)}</span>
                      <span className="text-xs text-gray-400 line-through ml-1">{formatPrice(product.originalPrice)}</span>
                    </div>
                    <div className="mt-2">
                      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#ca3838] to-orange-500" style={{ width: `${soldPercent}%` }} />
                      </div>
                      <p className="text-[10px] text-gray-500 mt-1">Đã bán {product.sold}/{product.sold + product.stock}</p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Vouchers */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#363636] flex items-center gap-2">
              <Tag className="w-6 h-6 text-[#ca3838]" />
              Voucher giảm giá
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {vouchers.map(voucher => (
              <div key={voucher.id} className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-[#ca3838] transition-colors">
                <div className="flex">
                  {/* Left - Discount */}
                  <div className="bg-gradient-to-br from-[#ca3838] to-[#ff6b35] text-white p-4 flex flex-col items-center justify-center min-w-[120px]">
                    <Gift className="w-6 h-6 mb-1" />
                    <p className="text-xs">Giảm</p>
                    <p className="text-2xl font-bold">{typeof voucher.discount === 'number' ? formatPrice(voucher.discount) : voucher.discount}</p>
                  </div>
                  {/* Right - Info */}
                  <div className="flex-1 p-4">
                    <p className="font-medium text-[#363636]">{voucher.name}</p>
                    <p className="text-xs text-gray-500 mt-1">Đơn tối thiểu: {formatPrice(voucher.minOrder)}</p>
                    <p className="text-xs text-gray-500">HSD: {voucher.expiry}</p>
                    <div className="flex items-center justify-between mt-3">
                      <code className="text-xs font-mono bg-gray-100 px-2 py-1 rounded font-bold text-[#ca3838]">
                        {voucher.code}
                      </code>
                      <button className="text-xs bg-[#ca3838] text-white px-3 py-1 rounded hover:bg-[#b32f2f]">
                        <Copy className="w-3 h-3 inline" />
                        Sao chép
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Promotions */}
        <div>
          <h2 className="text-xl font-bold text-[#363636] mb-6">Khuyến mãi theo thương hiệu</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { brand: 'Apple', title: 'Mua iPhone tặng AirPods', desc: 'Áp dụng khi mua iPhone 15 series', color: 'bg-gray-900' },
              { brand: 'Samsung', title: 'Galaxy S24 Series giảm đến 5 triệu', desc: 'Trả góp 0% lãi suất', color: 'bg-blue-600' },
              { brand: 'Xiaomi', title: 'Xiaomi 14 Pro giảm 30%', desc: 'Số lượng có hạn', color: 'bg-orange-500' },
              { brand: 'OPPO', title: 'OPPO Find X7 Pro giá sốc', desc: 'Giảm ngay 3 triệu đồng', color: 'bg-green-600' },
            ].map((promo, idx) => (
              <Link key={idx} href="/san-pham" className={`${promo.color} text-white rounded-lg p-6 hover:opacity-90 transition-opacity`}>
                <h3 className="text-xl font-bold mb-2">{promo.title}</h3>
                <p className="text-white/80 text-sm">{promo.desc}</p>
                <p className="text-xs mt-4">Thương hiệu: {promo.brand}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
