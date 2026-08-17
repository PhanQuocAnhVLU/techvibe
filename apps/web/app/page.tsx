'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Search, ShoppingCart, User, Menu, X, ChevronRight, 
  ChevronLeft, Star, Heart, Truck, ShieldCheck, RotateCcw,
  Phone, Mail, MapPin, Clock, ArrowRight, Percent, Gift
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const banners = [
  { id: 1, title: 'iPhone 15 Series', subtitle: 'Siêu phẩm chính hãng', bg: 'bg-gradient-to-r from-gray-900 to-gray-700', image: '/api/placeholder/600/400' },
  { id: 2, title: 'Samsung Galaxy S24', subtitle: 'Flagship Android đỉnh cao', bg: 'bg-gradient-to-r from-blue-600 to-blue-400', image: '/api/placeholder/600/400' },
  { id: 3, title: 'MacBook Air M3', subtitle: 'Siêu mỏng, siêu nhẹ', bg: 'bg-gradient-to-r from-gray-600 to-gray-400', image: '/api/placeholder/600/400' },
]

const categories = [
  { id: 'dien-thoai', name: 'Điện thoại', icon: '📱', count: 234 },
  { id: 'laptop', name: 'Laptop', icon: '💻', count: 156 },
  { id: 'tablet', name: 'Tablet', icon: '📲', count: 89 },
  { id: 'phu-kien', name: 'Phụ kiện', icon: '🎧', count: 456 },
  { id: 'dong-ho', name: 'Đồng hồ', icon: '⌚', count: 123 },
  { id: 'am-thanh', name: 'Âm thanh', icon: '🔊', count: 78 },
]

const featuredProducts = [
  { id: 1, name: 'iPhone 15 Pro Max 256GB', price: 32990000, originalPrice: 34990000, rating: 4.8, reviews: 1245, image: '/api/placeholder/300/300', badge: 'Giảm 2TR' },
  { id: 2, name: 'Samsung Galaxy S24 Ultra', price: 28990000, originalPrice: 31990000, rating: 4.7, reviews: 892, image: '/api/placeholder/300/300', badge: 'Hot' },
  { id: 3, name: 'MacBook Pro 14" M3', price: 45990000, originalPrice: 49990000, rating: 4.9, reviews: 567, image: '/api/placeholder/300/300', badge: 'Mới' },
  { id: 4, name: 'AirPods Pro 2', price: 6990000, originalPrice: 7990000, rating: 4.9, reviews: 3456, image: '/api/placeholder/300/300', badge: 'Bán chạy' },
  { id: 5, name: 'iPad Pro 11" M2', price: 27990000, originalPrice: 29990000, rating: 4.8, reviews: 789, image: '/api/placeholder/300/300', badge: '' },
  { id: 6, name: 'Samsung Galaxy Watch 6', price: 8990000, originalPrice: 11990000, rating: 4.6, reviews: 456, image: '/api/placeholder/300/300', badge: 'Giảm 25%' },
  { id: 7, name: 'Xiaomi 14 Pro', price: 18990000, originalPrice: 21990000, rating: 4.6, reviews: 567, image: '/api/placeholder/300/300', badge: '' },
  { id: 8, name: 'OPPO Find X7 Pro', price: 15990000, originalPrice: 17990000, rating: 4.5, reviews: 234, image: '/api/placeholder/300/300', badge: 'New' },
]

const brands = ['Apple', 'Samsung', 'Xiaomi', 'OPPO', 'vivo', 'Realme', 'Nokia', 'Tecno']

const news = [
  { id: 1, title: 'iPhone 16 Pro lộ diện với thiết kế hoàn toàn mới', image: '/api/placeholder/400/250', date: '16/08/2024' },
  { id: 2, title: 'Samsung Galaxy S25 Ultra sẽ có camera 200MP?', image: '/api/placeholder/400/250', date: '15/08/2024' },
  { id: 3, title: 'MacBook Air M4 ra mắt cuối năm nay', image: '/api/placeholder/400/250', date: '14/08/2024' },
]

function formatPrice(price: number) {
  return new Intl.NumberFormat('vi-VN').format(price) + 'đ'
}

export default function HomePage() {
  const [currentBanner, setCurrentBanner] = useState(0)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const nextBanner = () => setCurrentBanner((prev) => (prev + 1) % banners.length)
  const prevBanner = () => setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Top bar */}
          <div className="flex items-center justify-between py-3">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="font-bold text-white text-xl">T</span>
              </div>
              <span className="font-bold text-xl">
                <span className="text-secondary">Tech</span>
                <span className="text-primary">Store</span>
              </span>
            </Link>

            {/* Search */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              <Link href="/gio-hang" className="relative p-2 hover:bg-gray-100 rounded-lg">
                <ShoppingCart className="w-6 h-6 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
              </Link>
              <Link href="/auth/login" className="hidden sm:flex items-center gap-2 text-sm text-gray-600 hover:text-primary">
                <User className="w-5 h-5" />
                <span>Đăng nhập</span>
              </Link>
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Categories nav */}
          <nav className="hidden lg:flex items-center gap-6 py-2 overflow-x-auto">
            <Link href="/khuyen-mai" className="text-sm text-red-500 font-semibold flex items-center gap-1 whitespace-nowrap">
              <Percent className="w-4 h-4" />
              Khuyến mãi
            </Link>
            {categories.map(cat => (
              <Link 
                key={cat.id} 
                href={`/san-pham?danh-muc=${cat.id}`}
                className="text-sm text-gray-600 hover:text-primary whitespace-nowrap"
              >
                {cat.name}
              </Link>
            ))}
            <Link href="/admin/don-hang" className="text-sm text-gray-600 hover:text-primary whitespace-nowrap">
              Quản lý đơn hàng
            </Link>
          </nav>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="lg:hidden border-t border-gray-200 py-4 px-4 bg-white">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Link href="/khuyen-mai" className="block py-2 text-red-500 font-semibold">Khuyến mãi</Link>
              {categories.map(cat => (
                <Link key={cat.id} href={`/san-pham?danh-muc=${cat.id}`} className="block py-2 text-gray-600">
                  {cat.name}
                </Link>
              ))}
              <Link href="/auth/login" className="block py-2 text-gray-600">Đăng nhập</Link>
              <Link href="/admin/don-hang" className="block py-2 text-gray-600">Quản lý đơn hàng</Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Banner */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${currentBanner * 100}%)` }}
            >
              {banners.map(banner => (
                <div
                  key={banner.id}
                  className={`w-full h-64 sm:h-80 ${banner.bg} flex items-center px-8 sm:px-16`}
                >
                  <div className="flex-1">
                    <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2">{banner.title}</h2>
                    <p className="text-lg sm:text-xl text-white/90 mb-4">{banner.subtitle}</p>
                    <Link href="/san-pham">
                      <Button className="bg-white text-inherit hover:bg-white/90">
                        Mua ngay
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                  <img src={banner.image} alt="" className="hidden sm:block w-72 h-48 object-contain" />
                </div>
              ))}
            </div>
          </div>
          
          <button onClick={prevBanner} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full shadow-lg flex items-center justify-center hover:bg-white">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={nextBanner} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full shadow-lg flex items-center justify-center hover:bg-white">
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentBanner(idx)}
                className={`w-3 h-3 rounded-full transition-all ${currentBanner === idx ? 'bg-primary w-8' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Danh mục sản phẩm</h2>
          <Link href="/san-pham" className="text-sm text-primary hover:underline flex items-center gap-1">
            Xem tất cả
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {categories.map(cat => (
            <Link
              key={cat.id}
              href={`/san-pham?danh-muc=${cat.id}`}
              className="bg-white rounded-xl p-4 text-center hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-2">{cat.icon}</div>
              <p className="font-medium text-sm">{cat.name}</p>
              <p className="text-xs text-gray-500">{cat.count} sản phẩm</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Flash Sale Banner */}
      <section className="bg-gradient-to-r from-red-500 to-orange-500">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔥</span>
                <h2 className="text-xl font-bold text-white">FLASH SALE</h2>
              </div>
              <div className="hidden sm:flex items-center gap-1 text-white">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Kết thúc trong:</span>
                <span className="font-bold bg-white text-red-600 px-2 py-1 rounded">23:59:59</span>
              </div>
            </div>
            <Link href="/khuyen-mai" className="text-white hover:underline flex items-center gap-1 text-sm">
              Xem tất cả
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Sản phẩm nổi bật</h2>
          <Link href="/san-pham" className="text-sm text-primary hover:underline flex items-center gap-1">
            Xem tất cả
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {featuredProducts.map(product => {
            const discount = product.originalPrice > product.price
              ? Math.round((1 - product.price / product.originalPrice) * 100)
              : 0

            return (
              <Link
                key={product.id}
                href={`/san-pham/${product.id}`}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
              >
                <div className="relative aspect-square bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.badge && (
                    <span className={`absolute top-2 left-2 px-2 py-1 text-xs font-semibold rounded ${
                      product.badge === 'Hot' ? 'bg-red-500 text-white' :
                      product.badge === 'Mới' || product.badge === 'New' ? 'bg-blue-500 text-white' :
                      product.badge === 'Bán chạy' ? 'bg-green-500 text-white' :
                      'bg-orange-500 text-white'
                    }`}>
                      {product.badge}
                    </span>
                  )}
                  {discount > 0 && (
                    <span className="absolute top-2 right-2 px-2 py-1 text-xs font-semibold bg-primary text-white rounded">
                      -{discount}%
                    </span>
                  )}
                  <button className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100">
                    <Heart className="w-5 h-5 text-gray-400 hover:text-red-500" />
                  </button>
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mt-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-sm text-gray-400">({product.reviews})</span>
                  </div>
                  <div className="mt-2">
                    <span className="text-lg font-bold text-primary">{formatPrice(product.price)}</span>
                    {discount > 0 && (
                      <span className="text-sm text-gray-400 line-through ml-2">{formatPrice(product.originalPrice)}</span>
                    )}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Brands */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-xl font-bold mb-6">Thương hiệu nổi bật</h2>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
          {brands.map((brand, idx) => (
            <Link
              key={idx}
              href={`/san-pham?thuong-hieu=${brand}`}
              className="bg-white rounded-lg p-4 flex items-center justify-center hover:shadow-md transition-shadow"
            >
              <span className="font-semibold text-gray-700">{brand}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* News */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Tin tức công nghệ</h2>
          <Link href="/tin-tuc" className="text-sm text-primary hover:underline flex items-center gap-1">
            Xem tất cả
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {news.map(item => (
            <Link key={item.id} href={`/tin-tuc/${item.id}`} className="group">
              <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden mb-3">
                <img src={item.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <p className="text-xs text-gray-500 mb-1">{item.date}</p>
              <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-2">{item.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Truck className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold">Miễn phí vận chuyển</h3>
              <p className="text-sm text-gray-500">Đơn từ 500.000đ</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="font-semibold">Bảo hành chính hãng</h3>
              <p className="text-sm text-gray-500">12 tháng</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <RotateCcw className="w-7 h-7 text-orange-600" />
              </div>
              <h3 className="font-semibold">Đổi trả dễ dàng</h3>
              <p className="text-sm text-gray-500">Trong 7 ngày</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Gift className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="font-semibold">Nhiều khuyến mãi</h3>
              <p className="text-sm text-gray-500">Hàng ngàn ưu đãi</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <span className="font-bold text-white text-xl">T</span>
                </div>
                <span className="font-bold text-xl">
                  <span className="text-secondary">Tech</span>
                  <span className="text-primary">Store</span>
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Cửa hàng công nghệ hàng đầu Việt Nam. Chất lượng - Giá tốt - Dịch vụ chu đáo.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Thông tin</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/gioi-thieu" className="hover:text-white">Giới thiệu</Link></li>
                <li><Link href="/tin-tuc" className="hover:text-white">Tin tức</Link></li>
                <li><Link href="/tuyen-dung" className="hover:text-white">Tuyển dụng</Link></li>
                <li><Link href="/lien-he" className="hover:text-white">Liên hệ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Hỗ trợ</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/huong-dan" className="hover:text-white">Hướng dẫn mua hàng</Link></li>
                <li><Link href="/chinh-sach" className="hover:text-white">Chính sách đổi trả</Link></li>
                <li><Link href="/bao-hanh" className="hover:text-white">Bảo hành</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Liên hệ</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>1900 1234</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>support@techstore.com</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-1" />
                  <span>123 Nguyễn Trãi, Q.1, TP.HCM</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 TechStore. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
