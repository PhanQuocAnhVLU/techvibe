'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, ShoppingCart, User, Menu, X, ChevronRight, 
  ChevronLeft, Star, Heart, Truck, ShieldCheck, RotateCcw,
  Phone, Mail, MapPin, Clock, ArrowRight, Sparkles, Package,
  Trash2, Plus, Minus, Bell, Eye, GitCompare
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useApp } from '@/lib/app-context'

const banners = [
  { id: 1, title: 'iPhone 15 Series', subtitle: 'Siêu phẩm chính hãng Apple', bg: 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700', image: '/api/placeholder/500/300' },
  { id: 2, title: 'Samsung Galaxy S24', subtitle: 'Flagship Android đỉnh cao', bg: 'bg-gradient-to-r from-blue-600 to-blue-800', image: '/api/placeholder/500/300' },
  { id: 3, title: 'MacBook Air M3', subtitle: 'Mỏng nhẹ - Mạnh mẽ', bg: 'bg-gradient-to-r from-gray-600 to-gray-800', image: '/api/placeholder/500/300' },
  { id: 4, title: 'Flash Sale 8.8', subtitle: 'Giảm đến 50%', bg: 'bg-gradient-to-r from-red-500 to-orange-500', image: '/api/placeholder/500/300' },
  { id: 5, title: 'Xiaomi 14 Pro', subtitle: 'Camera Leica đỉnh cao', bg: 'bg-gradient-to-r from-orange-500 to-red-500', image: '/api/placeholder/500/300' },
]

const sidebarBanners = [
  { id: 1, title: 'Laptop Gaming', bg: 'bg-gradient-to-br from-indigo-500 to-purple-600' },
  { id: 2, title: 'Phụ kiện chính hãng', bg: 'bg-gradient-to-br from-pink-500 to-rose-500' },
]

const categories = [
  { id: 'dien-thoai', name: '�iện thoại', icon: '📱', slug: 'dien-thoai' },
  { id: 'laptop', name: 'Laptop', icon: '💻', slug: 'laptop' },
  { id: 'tablet', name: 'Tablet', icon: '📲', slug: 'tablet' },
  { id: 'phu-kien', name: 'Phụ kiện', icon: '🎧', slug: 'phu-kien' },
  { id: 'dong-ho', name: 'Đồng hồ', icon: '⌚', slug: 'dong-ho' },
  { id: 'am-thanh', name: 'Âm thanh', icon: '🔊', slug: 'am-thanh' },
  { id: 'tv', name: 'Tivi', icon: '📺', slug: 'tivi' },
  { id: 'smart-home', name: 'Smart Home', icon: '🏠', slug: 'smart-home' },
]

const flashSaleProducts = [
  { id: 1, name: 'iPhone 15 Pro Max 256GB', price: 27990000, originalPrice: 34990000, sold: 234, image: '/api/placeholder/200/200', brand: 'Apple' },
  { id: 2, name: 'Samsung Galaxy S24 Ultra', price: 23990000, originalPrice: 31990000, sold: 156, image: '/api/placeholder/200/200', brand: 'Samsung' },
  { id: 3, name: 'MacBook Air M2 13"', price: 22990000, originalPrice: 29990000, sold: 89, image: '/api/placeholder/200/200', brand: 'Apple' },
  { id: 4, name: 'AirPods Pro 2 USB-C', price: 5490000, originalPrice: 7990000, sold: 567, image: '/api/placeholder/200/200', brand: 'Apple' },
  { id: 5, name: 'Xiaomi 14 Pro', price: 14990000, originalPrice: 21990000, sold: 78, image: '/api/placeholder/200/200', brand: 'Xiaomi' },
  { id: 6, name: 'OPPO Find X7 Pro', price: 13990000, originalPrice: 18990000, sold: 45, image: '/api/placeholder/200/200', brand: 'OPPO' },
  { id: 7, name: 'iPad Pro 11" M2', price: 21990000, originalPrice: 29990000, sold: 67, image: '/api/placeholder/200/200', brand: 'Apple' },
  { id: 8, name: 'Samsung Galaxy Watch 6', price: 6990000, originalPrice: 11990000, sold: 123, image: '/api/placeholder/200/200', brand: 'Samsung' },
]

const featuredProducts = [
  { id: 1, name: 'iPhone 15 Pro Max 256GB', price: 32990000, originalPrice: 34990000, rating: 4.8, reviews: 1245, image: '/api/placeholder/300/300', badge: 'Giảm 2TR', sold: 234, brand: 'Apple' },
  { id: 2, name: 'Samsung Galaxy S24 Ultra', price: 28990000, originalPrice: 31990000, rating: 4.7, reviews: 892, image: '/api/placeholder/300/300', badge: '', sold: 189, brand: 'Samsung' },
  { id: 3, name: 'MacBook Pro 14" M3', price: 45990000, originalPrice: 49990000, rating: 4.9, reviews: 567, image: '/api/placeholder/300/300', badge: 'Mới', sold: 67, brand: 'Apple' },
  { id: 4, name: 'AirPods Pro 2', price: 6990000, originalPrice: 7990000, rating: 4.9, reviews: 3456, image: '/api/placeholder/300/300', badge: 'Bán chạy', sold: 456, brand: 'Apple' },
  { id: 5, name: 'iPad Pro 11" M2', price: 27990000, originalPrice: 29990000, rating: 4.8, reviews: 789, image: '/api/placeholder/300/300', badge: '', sold: 89, brand: 'Apple' },
  { id: 6, name: 'Samsung Galaxy Watch 6', price: 8990000, originalPrice: 11990000, rating: 4.6, reviews: 456, image: '/api/placeholder/300/300', badge: 'Giảm 25%', sold: 123, brand: 'Samsung' },
  { id: 7, name: 'Xiaomi 14 Pro', price: 18990000, originalPrice: 21990000, rating: 4.6, reviews: 567, image: '/api/placeholder/300/300', badge: '', sold: 78, brand: 'Xiaomi' },
  { id: 8, name: 'OPPO Find X7 Pro', price: 15990000, originalPrice: 17990000, rating: 4.5, reviews: 234, image: '/api/placeholder/300/300', badge: 'New', sold: 45, brand: 'OPPO' },
  { id: 9, name: 'Vivo X100 Pro', price: 16990000, originalPrice: 18990000, rating: 4.7, reviews: 178, image: '/api/placeholder/300/300', badge: '', sold: 34, brand: 'vivo' },
  { id: 10, name: 'Realme GT5 Pro', price: 12990000, originalPrice: 14990000, rating: 4.5, reviews: 345, image: '/api/placeholder/300/300', badge: '', sold: 89, brand: 'Realme' },
]

const phoneProducts = [
  { id: 1, name: 'iPhone 15 Pro Max 256GB', price: 32990000, originalPrice: 34990000, rating: 4.8, reviews: 1245, image: '/api/placeholder/300/300', badge: 'Hot', brand: 'Apple' },
  { id: 2, name: 'iPhone 15 Plus 128GB', price: 22990000, originalPrice: 24990000, rating: 4.7, reviews: 567, image: '/api/placeholder/300/300', badge: '', brand: 'Apple' },
  { id: 3, name: 'iPhone 15 128GB', price: 19990000, originalPrice: 21990000, rating: 4.8, reviews: 2103, image: '/api/placeholder/300/300', badge: '', brand: 'Apple' },
  { id: 4, name: 'iPhone 14 128GB', price: 15990000, originalPrice: 17990000, rating: 4.6, reviews: 3456, image: '/api/placeholder/300/300', badge: '', brand: 'Apple' },
]

const laptopProducts = [
  { id: 9, name: 'MacBook Pro 14" M3', price: 45990000, originalPrice: 49990000, rating: 4.9, reviews: 567, image: '/api/placeholder/300/300', badge: 'Mới', brand: 'Apple' },
  { id: 10, name: 'MacBook Air M2 13"', price: 26990000, originalPrice: 29990000, rating: 4.8, reviews: 432, image: '/api/placeholder/300/300', badge: '', brand: 'Apple' },
  { id: 11, name: 'Dell XPS 13 Plus', price: 38990000, originalPrice: 41990000, rating: 4.7, reviews: 234, image: '/api/placeholder/300/300', badge: '', brand: 'Dell' },
  { id: 12, name: 'ASUS ROG Strix G16', price: 29990000, originalPrice: 32990000, rating: 4.8, reviews: 156, image: '/api/placeholder/300/300', badge: 'Hot', brand: 'ASUS' },
]

const brands = ['Apple', 'Samsung', 'Xiaomi', 'OPPO', 'vivo', 'Realme', 'Nokia', 'Tecno', 'ASUS', 'Dell', 'HP', 'Lenovo']

const news = [
  { id: 1, title: 'iPhone 16 Pro lộ diện với thiết kế hoàn toàn mới', image: '/api/placeholder/400/250', date: '16/08/2024' },
  { id: 2, title: 'Samsung Galaxy S25 Ultra sẽ có camera 200MP?', image: '/api/placeholder/400/250', date: '15/08/2024' },
  { id: 3, title: 'MacBook Air M4 ra mắt cuối năm nay', image: '/api/placeholder/400/250', date: '14/08/2024' },
]

function formatPrice(price: number) {
  return new Intl.NumberFormat('vi-VN').format(price) + 'đ'
}

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev
        seconds--
        if (seconds < 0) {
          seconds = 59
          minutes--
          if (minutes < 0) {
            minutes = 59
            hours--
            if (hours < 0) hours = 23
          }
        }
        return { hours, minutes, seconds }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex items-center gap-1">
      {[
        { value: timeLeft.hours },
        { value: timeLeft.minutes },
        { value: timeLeft.seconds }
      ].map((item, idx) => (
        <div key={idx} className="flex flex-col items-center">
          <div className="bg-[#333] text-white px-2 py-1 rounded font-bold text-lg min-w-[40px] text-center">
            {String(item.value).padStart(2, '0')}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function HomePage() {
  const [currentBanner, setCurrentBanner] = useState(0)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  
  const { cartItems, wishlist, compareList, isPromoBarVisible, hidePromoBar,
          setIsCartOpen, setIsSearchOpen, setQuickViewProduct,
          addToRecentlyViewed, toggleWishlist, toggleCompare, addToCart } = useApp()

  const nextBanner = () => setCurrentBanner((prev) => (prev + 1) % banners.length)
  const prevBanner = () => setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length)

  useEffect(() => {
    const interval = setInterval(nextBanner, 5000)
    return () => clearInterval(interval)
  }, [])

  const isInWishlist = (id: number) => wishlist.some(p => p.id === id)
  const isInCompare = (id: number) => compareList.some(p => p.id === id)
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Promo Bar */}
      {isPromoBarVisible && (
        <div className="bg-gradient-to-r from-[#ca3838] via-orange-500 to-[#ca3838] text-white text-xs">
          <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span className="font-medium">Freeship đơn từ 500K</span>
              <span className="hidden sm:inline opacity-90">• Trả góp 0% - Giảm thêm 5% khách hàng thân thiết</span>
            </div>
            <button onClick={hidePromoBar} className="hover:bg-white/20 rounded p-1">
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Top Bar */}
      <div className="bg-[#ca3838] text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1 hover:opacity-80">
                <MapPin className="w-3 h-3" />
                <span>Hồ Chí Minh</span>
              </button>
              <a href="tel:18002000" className="hidden sm:flex items-center gap-1 hover:opacity-80">
                <Phone className="w-3 h-3" />
                <span>1800.2000</span>
              </a>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/tra-cuu-don-hang" className="hover:opacity-80">Tra cứu đơn hàng</Link>
              <Link href="/khuyen-mai" className="hidden md:block hover:opacity-80">Khuyến mãi</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="w-11 h-11 bg-[#ca3838] rounded-lg flex items-center justify-center">
                <span className="font-bold text-white text-2xl">T</span>
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-2xl text-[#363636]">Tech</span>
                <span className="font-bold text-2xl text-[#ca3838]">Store</span>
              </div>
            </Link>

            <div className="flex-1 max-w-2xl">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="w-full flex items-center px-4 py-2.5 border-2 border-[#ca3838] rounded-md hover:bg-[#fef6f6] transition-colors text-left"
              >
                <Search className="w-5 h-5 text-[#ca3838] mr-3" />
                <span className="text-gray-400 flex-1">Bạn tìm gì hôm nay? (iPhone, Samsung, Laptop...)</span>
                <kbd className="hidden md:inline-block bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded">Ctrl+K</kbd>
              </button>
            </div>

            <div className="flex items-center gap-1">
              <Link href="/tai-khoan" className="hidden md:flex flex-col items-center px-3 py-1 hover:text-[#ca3838] text-[#363636]">
                <User className="w-5 h-5" />
                <span className="text-[10px]">Tài khoản</span>
              </Link>
              <button
                onClick={() => toggleWishlist(featuredProducts[0])}
                className="hidden md:flex flex-col items-center px-3 py-1 hover:text-[#ca3838] text-[#363636] relative"
              >
                <Heart className="w-5 h-5" />
                <span className="text-[10px]">Yêu thích</span>
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#ca3838] text-white text-[10px] rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>
              {compareList.length > 0 && (
                <button
                  className="hidden md:flex flex-col items-center px-3 py-1 hover:text-[#ca3838] text-[#363636] relative"
                >
                  <GitCompare className="w-5 h-5" />
                  <span className="text-[10px]">So sánh</span>
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white text-[10px] rounded-full flex items-center justify-center">
                    {compareList.length}
                  </span>
                </button>
              )}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex flex-col items-center px-3 py-1 hover:text-[#ca3838] text-[#363636]"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="text-[10px]">Giỏ hàng</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#ca3838] text-white text-[10px] rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                className="md:hidden p-2 hover:bg-gray-100 rounded-md"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Category Nav */}
        <div className="bg-[#363636] hidden md:block">
          <div className="max-w-7xl mx-auto px-4">
            <ul className="flex items-center">
              {categories.map((cat, idx) => (
                <li key={cat.id}>
                  <Link
                    href={`/san-pham?danh-muc=${cat.slug}`}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium text-white hover:bg-[#ca3838] transition-colors ${idx === 0 ? 'bg-[#ca3838]' : ''}`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/khuyen-mai"
                  className="flex items-center gap-1 px-4 py-3 text-sm font-bold text-yellow-400 hover:bg-[#ca3838] transition-colors animate-pulse"
                >
                  <span>🔥</span>
                  <span>Khuyến mãi</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {showMobileMenu && (
          <div className="md:hidden bg-white border-t">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="grid grid-cols-4 gap-2">
                {categories.slice(0, 8).map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/san-pham?danh-muc=${cat.slug}`}
                    className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <span className="text-2xl mb-1">{cat.icon}</span>
                    <span className="text-xs text-center">{cat.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Banner + Side Banners */}
      <section className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid lg:grid-cols-4 gap-4">
          {/* Left: Categories Sidebar */}
          <div className="hidden lg:block bg-white rounded-lg overflow-hidden">
            <div className="p-3 bg-[#ca3838] text-white text-center font-bold">
              Danh mục sản phẩm
            </div>
            <ul>
              {categories.map(cat => (
                <li key={cat.id}>
                  <Link
                    href={`/san-pham?danh-muc=${cat.slug}`}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-[#fef6f6] border-b border-gray-100 last:border-0 text-[#363636] hover:text-[#ca3838] transition-colors group"
                  >
                    <span className="text-xl">{cat.icon}</span>
                    <span className="text-sm font-medium flex-1">{cat.name}</span>
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Center: Banner Carousel */}
          <div className="lg:col-span-2">
            <div className="relative rounded-lg overflow-hidden h-[300px] sm:h-[350px]">
              <div 
                className="flex transition-transform duration-500 h-full"
                style={{ transform: `translateX(-${currentBanner * 100}%)` }}
              >
                {banners.map((banner) => (
                  <div
                    key={banner.id}
                    className={`w-full h-full shrink-0 ${banner.bg} flex items-center px-8 sm:px-16`}
                  >
                    <div className="flex-1">
                      <span className="inline-block bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded mb-3">
                        HOT
                      </span>
                      <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2">{banner.title}</h2>
                      <p className="text-lg sm:text-xl text-white/90 mb-4">{banner.subtitle}</p>
                      <Link href="/san-pham">
                        <button className="bg-white text-[#363636] px-6 py-2.5 rounded-md font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2">
                          Mua ngay
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </Link>
                    </div>
                    <img src={banner.image} alt="" className="hidden sm:block w-80 h-56 object-contain" />
                  </div>
                ))}
              </div>
              
              <button onClick={prevBanner} className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full shadow flex items-center justify-center hover:bg-white">
                <ChevronLeft className="w-5 h-5 text-[#363636]" />
              </button>
              <button onClick={nextBanner} className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full shadow flex items-center justify-center hover:bg-white">
                <ChevronRight className="w-5 h-5 text-[#363636]" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {banners.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentBanner(idx)}
                    className={`h-2 rounded-full transition-all ${currentBanner === idx ? 'bg-white w-6' : 'bg-white/50 w-2'}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Side Banners */}
          <div className="hidden lg:flex flex-col gap-4">
            {sidebarBanners.map(sb => (
              <div key={sb.id} className={`flex-1 ${sb.bg} rounded-lg p-6 text-white flex flex-col justify-between min-h-[170px] hover:scale-[1.02] transition-transform cursor-pointer`}>
                <span className="text-xs font-semibold bg-white/20 px-2 py-1 rounded inline-block w-fit">HOT</span>
                <div>
                  <h3 className="text-xl font-bold mb-2">{sb.title}</h3>
                  <button className="text-sm flex items-center gap-1 hover:underline">
                    Khám phá <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Strip */}
      <section className="bg-white border-y">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Truck, title: 'Miễn phí vận chuyển', desc: 'Đơn từ 500.000đ', color: 'text-blue-600' },
              { icon: Package, title: 'Giao nhanh 2h', desc: 'Nội thành HCM, HN', color: 'text-orange-600' },
              { icon: ShieldCheck, title: 'Bảo hành chính hãng', desc: '12-24 tháng', color: 'text-green-600' },
              { icon: RotateCcw, title: 'Đổi trả 30 ngày', desc: 'Không hỏi lý do', color: 'text-purple-600' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <item.icon className={`w-8 h-8 ${item.color}`} />
                <div>
                  <p className="font-semibold text-sm text-[#363636]">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flash Sale */}
      <section className="max-w-7xl mx-auto px-4 pt-4">
        <div className="bg-gradient-to-r from-[#ca3838] to-[#ff6b35] rounded-lg overflow-hidden">
          <div className="p-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">🔥</span>
                  <h2 className="text-2xl font-bold text-white">FLASH SALE</h2>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-white">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Kết thúc trong:</span>
                  <CountdownTimer />
                </div>
              </div>
              <Link href="/khuyen-mai" className="text-white hover:underline flex items-center gap-1 text-sm">
                Xem tất cả
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mt-4">
              {flashSaleProducts.map((product) => {
                const discount = Math.round((1 - product.price / product.originalPrice) * 100)
                const soldPercent = Math.min(95, Math.round((product.sold / 500) * 100))
                return (
                  <Link
                    key={product.id}
                    href={`/san-pham/${product.id}`}
                    className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
                    onClick={() => addToRecentlyViewed(product)}
                  >
                    <div className="relative">
                      <img src={product.image} alt={product.name} className="w-full aspect-square object-cover" />
                      <span className="absolute top-1 left-1 px-1.5 py-0.5 bg-[#ca3838] text-white text-[10px] font-bold rounded">
                        -{discount}%
                      </span>
                      <button
                        onClick={(e) => { e.preventDefault(); toggleWishlist(product) }}
                        className="absolute top-1 right-1 p-1 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Heart className={`w-3 h-3 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                      </button>
                    </div>
                    <div className="p-2">
                      <p className="text-xs font-medium text-[#363636] line-clamp-2 min-h-[32px]">{product.name}</p>
                      <p className="text-sm font-bold text-[#ca3838] mt-1">{formatPrice(product.price)}</p>
                      <div className="mt-1">
                        <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-[#ca3838] to-orange-500"
                            style={{ width: `${soldPercent}%` }}
                          />
                        </div>
                        <p className="text-[10px] text-gray-500 mt-0.5">�ã bán {product.sold}</p>
                      </div>
                      <button
                        onClick={(e) => { e.preventDefault(); addToCart(product) }}
                        className="w-full mt-2 bg-[#ca3838] text-white text-[10px] py-1 rounded hover:bg-[#b32f2f]"
                      >
                        Thêm vào giỏ
                      </button>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Block */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg p-4">
          <h2 className="text-lg font-bold text-[#363636] mb-4">Khám phá theo danh mục</h2>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/san-pham?danh-muc=${cat.slug}`}
                className="flex flex-col items-center p-4 rounded-lg hover:bg-[#fef6f6] transition-colors"
              >
                <span className="text-3xl mb-2">{cat.icon}</span>
                <span className="text-xs text-[#363636] text-center font-medium">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <ProductSection
        title="Sản phẩm nổi bật"
        subtitle="Được yêu thích nhất"
        products={featuredProducts}
        viewAllHref="/san-pham"
        onProductClick={addToRecentlyViewed}
      />

      {/* Phone Section */}
      <ProductSection
        title="Điện thoại nổi bật"
        subtitle="iPhone, Samsung, Xiaomi..."
        products={phoneProducts}
        viewAllHref="/san-pham?danh-muc=dien-thoai"
        bgColor="bg-gradient-to-r from-blue-50 to-white"
        onProductClick={addToRecentlyViewed}
      />

      {/* Laptop Section */}
      <ProductSection
        title="Laptop hot"
        subtitle="Macbook, Dell, ASUS..."
        products={laptopProducts}
        viewAllHref="/san-pham?danh-muc=laptop"
        bgColor="bg-gradient-to-r from-purple-50 to-white"
        onProductClick={addToRecentlyViewed}
      />

      {/* Brands */}
      <section className="max-w-7xl mx-auto px-4 pb-4">
        <div className="bg-white rounded-lg p-4">
          <h2 className="text-lg font-bold text-[#363636] mb-4">Thương hiệu</h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-12 gap-2">
            {brands.map((brand, idx) => (
              <Link
                key={idx}
                href={`/san-pham?thuong-hieu=${brand.toLowerCase()}`}
                className="border border-gray-200 rounded-lg p-3 flex items-center justify-center hover:border-[#ca3838] hover:text-[#ca3838] transition-colors text-sm font-medium"
              >
                {brand}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="max-w-7xl mx-auto px-4 py-4">
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-[#363636]">Tin công nghệ</h2>
            <Link href="/tin-tuc" className="text-[#ca3838] hover:underline flex items-center gap-1 text-sm">
              Xem tất cả
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {news.map((item) => (
              <Link key={item.id} href={`/tin-tuc/${item.id}`} className="group">
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-2">
                  <img src={item.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <p className="text-xs text-gray-500 mb-1">{item.date}</p>
                <h3 className="font-medium text-[#363636] group-hover:text-[#ca3838] transition-colors line-clamp-2">{item.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#363636] text-white">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-[#ca3838] rounded-lg flex items-center justify-center">
                  <span className="font-bold text-white text-xl">T</span>
                </div>
                <div>
                  <span className="font-bold text-lg">Tech</span>
                  <span className="font-bold text-lg text-[#ca3838]">Store</span>
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                Cửa hàng công nghệ hàng đầu Việt Nam với hơn 10 năm kinh nghiệm.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                <Phone className="w-4 h-4" />
                <span>Hotline: <strong className="text-white">1800.2000</strong></span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock className="w-4 h-4" />
                <span>Tổng đài: 8h - 22h (Thứ 2 - CN)</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Thông tin</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/gioi-thieu" className="hover:text-white transition-colors">Giới thiệu</Link></li>
                <li><Link href="/tin-tuc" className="hover:text-white transition-colors">Tin tức</Link></li>
                <li><Link href="/tuyen-dung" className="hover:text-white transition-colors">Tuyển dụng</Link></li>
                <li><Link href="/lien-he" className="hover:text-white transition-colors">Liên hệ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Hỗ trợ</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/huong-dan-mua-hang" className="hover:text-white transition-colors">Hướng dẫn mua hàng</Link></li>
                <li><Link href="/chinh-sach-doi-tra" className="hover:text-white transition-colors">Chính sách đ�i trả</Link></li>
                <li><Link href="/chinh-sach-bao-hanh" className="hover:text-white transition-colors">Chính sách bảo hành</Link></li>
                <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Liên hệ</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>123 Nguyễn Trãi, P.Bến Thành, Q.1, TP.HCM</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 shrink-0" />
                  <span>1900.2000</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 shrink-0" />
                  <span>cskh@techstore.vn</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
              <p>© 2024 TechStore. Tất cả quyền được bảo lưu.</p>
              <div className="flex items-center gap-4">
                <Link href="/chinh-sach-bao-mat" className="hover:text-white">Chính sách bảo mật</Link>
                <Link href="/dieu-khoan-su-dung" className="hover:text-white">Điều khoản sử dụng</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Reusable Product Section
function ProductSection({ title, subtitle, products, viewAllHref, bgColor = '', onProductClick }: any) {
  const { setQuickViewProduct, toggleWishlist, wishlist, toggleCompare, compareList } = useApp()
  
  const isInWishlist = (id: number) => wishlist.some(p => p.id === id)
  const isInCompare = (id: number) => compareList.some(p => p.id === id)

  return (
    <section className={`max-w-7xl mx-auto px-4 pb-4 ${bgColor}`}>
      <div className="bg-white rounded-lg overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h2 className="text-lg font-bold text-[#363636]">{title}</h2>
            <p className="text-xs text-gray-500">{subtitle}</p>
          </div>
          <Link href={viewAllHref} className="text-[#ca3838] hover:underline flex items-center gap-1 text-sm">
            Xem tất cả
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 p-3">
          {products.map((product: any) => {
            const discount = product.originalPrice > product.price
              ? Math.round((1 - product.price / product.originalPrice) * 100)
              : 0

            return (
              <div
                key={product.id}
                className="border border-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group relative"
              >
                <Link href={`/san-pham/${product.id}`} onClick={() => onProductClick?.(product)}>
                  <div className="relative bg-gray-50">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full aspect-square object-cover"
                    />
                    {product.badge && (
                      <span className={`absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold rounded ${
                        product.badge === 'Hot' || product.badge === 'Giảm 2TR' ? 'bg-[#ca3838] text-white' :
                        product.badge === 'Mới' || product.badge === 'New' ? 'bg-[#2563eb] text-white' :
                        product.badge === 'Bán chạy' ? 'bg-[#16a34a] text-white' :
                        'bg-[#f97316] text-white'
                      }`}>
                        {product.badge}
                      </span>
                    )}
                    {discount > 0 && (
                      <span className="absolute top-2 right-2 px-2 py-0.5 text-[10px] font-bold bg-[#ca3838] text-white rounded">
                        -{discount}%
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
                    <h3 className="text-sm font-medium text-[#363636] line-clamp-2 group-hover:text-[#ca3838] transition-colors min-h-[40px]">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1 mt-2">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs font-medium">{product.rating}</span>
                      <span className="text-xs text-gray-400">({product.reviews})</span>
                    </div>
                    <div className="mt-2">
                      <span className="text-base font-bold text-[#ca3838]">{formatPrice(product.price)}</span>
                      {discount > 0 && (
                        <span className="text-xs text-gray-400 line-through ml-1">{formatPrice(product.originalPrice)}</span>
                      )}
                    </div>
                  </div>
                </Link>
                {/* Hover Actions */}
                <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10" style={{ marginTop: discount > 0 ? '28px' : '0' }}>
                  <button
                    onClick={(e) => { e.preventDefault(); toggleWishlist(product) }}
                    className={`p-1.5 rounded-full shadow ${isInWishlist(product.id) ? 'bg-red-50' : 'bg-white'} hover:scale-110 transition-transform`}
                    title="Yêu thích"
                  >
                    <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                  </button>
                  <button
                    onClick={(e) => { e.preventDefault(); setQuickViewProduct(product) }}
                    className="p-1.5 bg-white rounded-full shadow hover:scale-110 transition-transform"
                    title="Xem nhanh"
                  >
                    <Eye className="w-4 h-4 text-gray-400" />
                  </button>
                  <button
                    onClick={(e) => { e.preventDefault(); toggleCompare(product) }}
                    className={`p-1.5 rounded-full shadow ${isInCompare(product.id) ? 'bg-blue-50' : 'bg-white'} hover:scale-110 transition-transform`}
                    title="So sánh"
                  >
                    <GitCompare className={`w-4 h-4 ${isInCompare(product.id) ? 'text-blue-500' : 'text-gray-400'}`} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
