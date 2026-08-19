'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, ShoppingCart, User, Menu, X, ChevronRight, 
  ChevronLeft, Star, Heart, Truck, ShieldCheck, RotateCcw,
  Phone, Mail, MapPin, Clock, ArrowRight, Sparkles, Package,
  Trash2, Plus, Minus, Bell, Eye, GitCompare, Zap, Award, TrendingUp
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useApp } from '@/lib/app-context'
import { HeroMockup, NewsMockup } from '@/components/product-mockup'
import { SmartImage, RealImage } from '@/components/smart-image'

const banners = [
  { id: 1, title: 'iPhone 15 Pro Max', subtitle: 'Siêu phẩm chính hãng Apple', bg: 'from-slate-900 via-slate-800 to-slate-700', name: 'iPhone 15 Pro Max 256GB', brand: 'Apple', price: '27.990.000đ', originalPrice: '34.990.000đ' },
  { id: 2, title: 'Samsung Galaxy S24', subtitle: 'Flagship Android đỉnh cao', bg: 'from-blue-700 via-blue-600 to-indigo-700', name: 'Samsung Galaxy S24 Ultra', brand: 'Samsung', price: '23.990.000đ', originalPrice: '31.990.000đ' },
  { id: 3, title: 'MacBook Air M3', subtitle: 'Mỏng nhẹ - Mạnh mẽ', bg: 'from-gray-800 via-gray-700 to-gray-900', name: 'MacBook Air M3', brand: 'Apple', price: '32.990.000đ', originalPrice: '39.990.000đ' },
  { id: 4, title: 'Flash Sale 8.8', subtitle: 'Giảm đến 50%', bg: 'from-red-600 via-rose-600 to-orange-600', name: 'iPhone 15 Pro Max 256GB', brand: 'Apple', price: 'Từ 4.990.000đ' },
  { id: 5, title: 'Xiaomi 14 Pro', subtitle: 'Camera Leica đỉnh cao', bg: 'from-orange-600 via-amber-600 to-yellow-600', name: 'Xiaomi 14 Pro', brand: 'Xiaomi', price: '14.990.000đ', originalPrice: '21.990.000đ' },
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
  { id: 1, name: 'iPhone 15 Pro Max 256GB', price: 27990000, originalPrice: 34990000, sold: 234, image: '', brand: 'Apple' },
  { id: 2, name: 'Samsung Galaxy S24 Ultra', price: 23990000, originalPrice: 31990000, sold: 156, image: '', brand: 'Samsung' },
  { id: 3, name: 'MacBook Air M2 13 inch', price: 22990000, originalPrice: 29990000, sold: 89, image: '', brand: 'Apple' },
  { id: 4, name: 'AirPods Pro 2 USB-C', price: 5490000, originalPrice: 7990000, sold: 567, image: '', brand: 'Apple' },
  { id: 5, name: 'Xiaomi 14 Pro', price: 14990000, originalPrice: 21990000, sold: 78, image: '', brand: 'Xiaomi' },
  { id: 6, name: 'OPPO Find X7 Pro', price: 13990000, originalPrice: 18990000, sold: 45, image: '', brand: 'OPPO' },
  { id: 7, name: 'iPad Pro 11 inch M2', price: 21990000, originalPrice: 29990000, sold: 67, image: '', brand: 'Apple' },
  { id: 8, name: 'Samsung Galaxy Watch 6', price: 6990000, originalPrice: 11990000, sold: 123, image: '', brand: 'Samsung' },
]

const featuredProducts = [
  { id: 1, name: 'iPhone 15 Pro Max 256GB', price: 32990000, originalPrice: 34990000, rating: 4.8, reviews: 1245, image: '', badge: 'Giảm 2TR', sold: 234, brand: 'Apple' },
  { id: 2, name: 'Samsung Galaxy S24 Ultra', price: 28990000, originalPrice: 31990000, rating: 4.7, reviews: 892, image: '', badge: '', sold: 189, brand: 'Samsung' },
  { id: 3, name: 'MacBook Pro 14 M3', price: 45990000, originalPrice: 49990000, rating: 4.9, reviews: 567, image: '', badge: 'Mới', sold: 67, brand: 'Apple' },
  { id: 4, name: 'AirPods Pro 2', price: 6990000, originalPrice: 7990000, rating: 4.9, reviews: 3456, image: '', badge: 'Bán chạy', sold: 456, brand: 'Apple' },
  { id: 5, name: 'iPad Pro 11 inch M2', price: 27990000, originalPrice: 29990000, rating: 4.8, reviews: 789, image: '', badge: '', sold: 89, brand: 'Apple' },
  { id: 6, name: 'Samsung Galaxy Watch 6', price: 8990000, originalPrice: 11990000, rating: 4.6, reviews: 456, image: '', badge: 'Giảm 25%', sold: 123, brand: 'Samsung' },
  { id: 7, name: 'Xiaomi 14 Pro', price: 18990000, originalPrice: 21990000, rating: 4.6, reviews: 567, image: '', badge: '', sold: 78, brand: 'Xiaomi' },
  { id: 8, name: 'OPPO Find X7 Pro', price: 15990000, originalPrice: 17990000, rating: 4.5, reviews: 234, image: '', badge: 'New', sold: 45, brand: 'OPPO' },
  { id: 9, name: 'vivo X100 Pro', price: 16990000, originalPrice: 18990000, rating: 4.7, reviews: 178, image: '', badge: '', sold: 34, brand: 'vivo' },
  { id: 10, name: 'Realme GT5 Pro', price: 12990000, originalPrice: 14990000, rating: 4.5, reviews: 345, image: '', badge: '', sold: 89, brand: 'Realme' },
]

const phoneProducts = [
  { id: 1, name: 'iPhone 15 Pro Max 256GB', price: 32990000, originalPrice: 34990000, rating: 4.8, reviews: 1245, image: '', badge: 'Hot', brand: 'Apple' },
  { id: 2, name: 'iPhone 15 Plus 128GB', price: 22990000, originalPrice: 24990000, rating: 4.7, reviews: 567, image: '', badge: '', brand: 'Apple' },
  { id: 3, name: 'iPhone 15 128GB', price: 19990000, originalPrice: 21990000, rating: 4.8, reviews: 2103, image: '', badge: '', brand: 'Apple' },
  { id: 4, name: 'iPhone 14 128GB', price: 15990000, originalPrice: 17990000, rating: 4.6, reviews: 3456, image: '', badge: '', brand: 'Apple' },
]

const laptopProducts = [
  { id: 9, name: 'MacBook Pro 14 M3', price: 45990000, originalPrice: 49990000, rating: 4.9, reviews: 567, image: '', badge: 'Mới', brand: 'Apple' },
  { id: 10, name: 'MacBook Air M2 13 inch', price: 26990000, originalPrice: 29990000, rating: 4.8, reviews: 432, image: '', badge: '', brand: 'Apple' },
  { id: 11, name: 'Dell XPS 13 Plus', price: 38990000, originalPrice: 41990000, rating: 4.7, reviews: 234, image: '', badge: '', brand: 'Dell' },
  { id: 12, name: 'ASUS ROG Strix G16', price: 29990000, originalPrice: 32990000, rating: 4.8, reviews: 156, image: '', badge: 'Hot', brand: 'ASUS' },
]

const brands = ['Apple', 'Samsung', 'Xiaomi', 'OPPO', 'vivo', 'Realme', 'Nokia', 'Tecno', 'ASUS', 'Dell', 'HP', 'Lenovo']

const news = [
  { id: 1, title: 'iPhone 16 Pro lộ diện với thiết kế hoàn toàn mới', image: '', brand: 'Apple', date: '16/08/2024' },
  { id: 2, title: 'Samsung Galaxy S25 Ultra sẽ có camera 200MP?', image: '', brand: 'Samsung', date: '15/08/2024' },
  { id: 3, title: 'MacBook Air M4 ra mắt cuối năm nay', image: '', brand: 'Apple', date: '14/08/2024' },
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
            <Link href="/" className="flex items-center gap-2 shrink-0 group">
              <div className="w-11 h-11 bg-gradient-to-br from-[#ca3838] to-orange-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <span className="font-black text-white text-2xl">T</span>
              </div>
              <div className="hidden sm:block">
                <span className="font-black text-2xl bg-gradient-to-r from-[#363636] to-[#ca3838] bg-clip-text text-transparent">TechStore</span>
              </div>
            </Link>

            <div className="flex-1 max-w-2xl">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="w-full flex items-center px-4 py-2.5 bg-gradient-to-r from-[#fef6f6] to-orange-50 border-2 border-[#ca3838] rounded-full hover:shadow-md transition-all text-left group"
              >
                <Search className="w-5 h-5 text-[#ca3838] mr-3 group-hover:scale-110 transition-transform" />
                <span className="text-gray-400 flex-1 text-sm">Bạn tìm gì hôm nay? (iPhone, Samsung, Laptop...)</span>
                <kbd className="hidden md:inline-block bg-white text-gray-500 text-xs px-2 py-0.5 rounded border shadow-sm">Ctrl+K</kbd>
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
        <div className="bg-gradient-to-r from-[#363636] to-[#4a4a4a] hidden md:block shadow-md">
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
                className="flex transition-transform duration-700 ease-out h-full"
                style={{ transform: `translateX(-${currentBanner * 100}%)` }}
              >
                {banners.map((banner, idx) => (
                  <div
                    key={banner.id}
                    className={`w-full h-full shrink-0 bg-gradient-to-r ${banner.bg} flex items-center px-8 sm:px-16 relative overflow-hidden`}
                  >
                    {/* Animated background shapes */}
                    <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

                    {/* Grid pattern overlay */}
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

                    <div className="flex-1 relative z-10 max-w-md">
                      <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-3 py-1.5 rounded-full mb-4 shadow-lg">
                        <Zap className="w-3.5 h-3.5 fill-black" /> HOT DEAL
                      </span>
                      <h2 className="text-3xl sm:text-5xl font-black text-white mb-3 leading-tight drop-shadow-2xl">{banner.title}</h2>
                      <p className="text-base sm:text-lg text-white/90 mb-5 max-w-xs">{banner.subtitle}</p>
                      <div className="flex items-center gap-3 mb-5">
                        <div className="bg-white/15 backdrop-blur-md px-3 py-2 rounded-lg border border-white/20">
                          <p className="text-[10px] text-white/70 uppercase tracking-wider">Giá từ</p>
                          <p className="text-lg font-black text-yellow-300">{banner.price || '9.990.000đ'}</p>
                        </div>
                        {banner.originalPrice && (
                          <div className="text-white/60 text-sm line-through">{banner.originalPrice}</div>
                        )}
                      </div>
                      <Link href="/san-pham">
                        <button className="group bg-white text-[#363636] px-7 py-3 rounded-full font-bold hover:bg-gray-100 transition-all flex items-center gap-2 hover:scale-105 hover:shadow-2xl shadow-xl">
                          Mua ngay
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </Link>
                    </div>
                    <div className="hidden sm:block w-96 h-72 relative">
                      <div className="absolute inset-0 bg-white/20 rounded-3xl blur-2xl" />
                      <div className="relative animate-float h-full">
                        <SmartImage
                          name={banner.name}
                          brand={banner.brand}
                          aspectRatio="wide"
                          className="bg-transparent"
                        />
                      </div>
                    </div>
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
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Truck, title: 'Miễn phí vận chuyển', desc: 'Đơn từ 500.000đ', color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50' },
              { icon: Package, title: 'Giao nhanh 2h', desc: 'Nội thành HCM, HN', color: 'from-orange-500 to-red-500', bg: 'bg-orange-50' },
              { icon: ShieldCheck, title: 'Bảo hành chính hãng', desc: '12-24 tháng', color: 'from-green-500 to-emerald-500', bg: 'bg-green-50' },
              { icon: RotateCcw, title: 'Đổi trả 30 ngày', desc: 'Không hỏi lý do', color: 'from-purple-500 to-pink-500', bg: 'bg-purple-50' },
            ].map((item, idx) => (
              <div key={idx} className="group flex items-center gap-3 p-3 rounded-xl hover:shadow-md transition-all cursor-pointer">
                <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <item.icon className={`w-6 h-6 bg-gradient-to-br ${item.color} bg-clip-text text-transparent`} style={{ WebkitTextFillColor: 'transparent' }} />
                </div>
                <div>
                  <p className="font-bold text-sm text-[#363636]">{item.title}</p>
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
                    className="bg-white rounded-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 group shine"
                    onClick={() => addToRecentlyViewed(product)}
                  >
                    <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                      <div className="zoom-img p-2">
                        <SmartImage name={product.name} brand={product.brand} />
                      </div>
                      <span className="absolute top-1 left-1 px-1.5 py-0.5 bg-[#ca3838] text-white text-[10px] font-bold rounded animate-pulse">
                        -{discount}%
                      </span>
                      <button
                        onClick={(e) => { e.preventDefault(); toggleWishlist(product) }}
                        className="absolute top-1 right-1 p-1 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:scale-125"
                      >
                        <Heart className={`w-3 h-3 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                      </button>
                    </div>
                    <div className="p-2">
                      <p className="text-xs font-medium text-[#363636] line-clamp-2 min-h-[32px]">{product.name}</p>
                      <p className="text-sm font-bold text-[#ca3838] mt-1">{formatPrice(product.price)}</p>
                      <div className="mt-1">
                        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#ca3838] via-orange-500 to-yellow-500 rounded-full"
                            style={{ width: `${soldPercent}%` }}
                          />
                        </div>
                        <p className="text-[10px] text-gray-500 mt-0.5">�ã bán {product.sold}</p>
                      </div>
                      <button
                        onClick={(e) => { e.preventDefault(); addToCart(product) }}
                        className="w-full mt-2 bg-gradient-to-r from-[#ca3838] to-orange-500 text-white text-[10px] py-1.5 rounded-md font-semibold hover:shadow-lg transition-all"
                      >
                        ⚡ Thêm vào giỏ
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
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-gradient-to-b from-[#ca3838] to-orange-500 rounded-full" />
            <h2 className="text-lg font-bold text-[#363636]">Khám phá theo danh mục</h2>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/san-pham?danh-muc=${cat.slug}`}
                className="group flex flex-col items-center p-4 rounded-xl hover:bg-gradient-to-br hover:from-[#fef6f6] hover:to-orange-50 transition-all hover:scale-105 hover:shadow-md"
              >
                <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">{cat.icon}</span>
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
        icon={<Award className="w-5 h-5 text-[#ca3838]" />}
      />

      {/* Phone Section */}
      <ProductSection
        title="Điện thoại nổi bật"
        subtitle="iPhone, Samsung, Xiaomi..."
        products={phoneProducts}
        viewAllHref="/san-pham?danh-muc=dien-thoai"
        bgColor="bg-gradient-to-r from-blue-50 to-white"
        onProductClick={addToRecentlyViewed}
        icon={<Phone className="w-5 h-5 text-blue-600" />}
      />

      {/* Laptop Section */}
      <ProductSection
        title="Laptop hot"
        subtitle="Macbook, Dell, ASUS..."
        products={laptopProducts}
        viewAllHref="/san-pham?danh-muc=laptop"
        bgColor="bg-gradient-to-r from-purple-50 to-white"
        onProductClick={addToRecentlyViewed}
        icon={<Package className="w-5 h-5 text-purple-600" />}
      />

      {/* Brands */}
      <section className="max-w-7xl mx-auto px-4 pb-4">
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-gradient-to-b from-[#ca3838] to-orange-500 rounded-full" />
            <h2 className="text-lg font-bold text-[#363636]">Thương hiệu</h2>
            <span className="text-xs text-gray-500 ml-2">12+ thương hiệu chính hãng</span>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-12 gap-2">
            {brands.map((brand, idx) => (
              <Link
                key={idx}
                href={`/san-pham?thuong-hieu=${brand.toLowerCase()}`}
                className="group relative overflow-hidden border border-gray-200 rounded-lg p-3 flex flex-col items-center justify-center hover:border-[#ca3838] hover:shadow-lg transition-all hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50 hover:from-red-50 hover:to-orange-50"
              >
                <span className="font-bold text-sm text-[#363636] group-hover:text-[#ca3838] transition-colors">{brand}</span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 pb-4">
        <div className="bg-gradient-to-r from-[#ca3838] via-orange-500 to-[#ca3838] rounded-2xl p-8 sm:p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 animate-pulse" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-400/20 rounded-full translate-y-1/2 -translate-x-1/2 animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="relative grid md:grid-cols-2 gap-6 items-center">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-6 h-6 text-yellow-300" />
                <span className="text-sm font-medium text-yellow-300">ƯU ĐÃI ĐẶC BIỆT</span>
              </div>
              <h2 className="text-3xl font-bold mb-3">Đăng ký nhận tin khuyến mãi</h2>
              <p className="text-white/90">Nhận ngay voucher 500.000đ cho đơn hàng đầu tiên và cập nhật các chương trình giảm giá hot nhất!</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Nhập email của bạn..."
                className="flex-1 px-5 py-3 rounded-md text-[#363636] focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button className="px-6 py-3 bg-[#363636] hover:bg-black rounded-md font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2 whitespace-nowrap">
                <Sparkles className="w-4 h-4" />
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* News */}
      <section className="max-w-7xl mx-auto px-4 py-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-1 h-7 bg-gradient-to-b from-[#ca3838] to-orange-500 rounded-full" />
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#363636]">Tin công nghệ</h2>
                <p className="text-xs text-gray-500">Cập nhật hàng ngày</p>
              </div>
            </div>
            <Link href="/tin-tuc" className="text-[#ca3838] hover:underline flex items-center gap-1 text-sm font-medium">
              Xem tất cả
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {news.map((item) => (
              <Link key={item.id} href={`/tin-tuc/${item.id}`} className="group">
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden mb-3 group-hover:shadow-lg transition-all">
                  <NewsMockup title={item.title} brand={item.brand} />
                </div>
                <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {item.date}
                </p>
                <h3 className="font-semibold text-[#363636] group-hover:text-[#ca3838] transition-colors line-clamp-2">{item.title}</h3>
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
function ProductSection({ title, subtitle, products, viewAllHref, bgColor = '', onProductClick, icon }: any) {
  const { setQuickViewProduct, toggleWishlist, wishlist, toggleCompare, compareList } = useApp()

  const isInWishlist = (id: number) => wishlist.some(p => p.id === id)
  const isInCompare = (id: number) => compareList.some(p => p.id === id)

  return (
    <section className={`max-w-7xl mx-auto px-4 pb-4 ${bgColor}`}>
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-1 h-7 bg-gradient-to-b from-[#ca3838] to-orange-500 rounded-full" />
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#ca3838]/10 to-orange-500/10 flex items-center justify-center">
              {icon || <Sparkles className="w-5 h-5 text-[#ca3838]" />}
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#363636]">{title}</h2>
              <p className="text-xs text-gray-500">{subtitle}</p>
            </div>
          </div>
          <Link href={viewAllHref} className="text-[#ca3838] hover:underline flex items-center gap-1 text-sm font-medium">
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
                className="border border-gray-100 rounded-xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 hover:border-[#ca3838]/30 group relative bg-white"
              >
                <Link href={`/san-pham/${product.id}`} onClick={() => onProductClick?.(product)}>
                  <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                    <div className="zoom-img aspect-square flex items-center justify-center p-2">
                      <SmartImage name={product.name} brand={product.brand} />
                    </div>
                    {product.badge && (
                      <span className={`absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold rounded-full shadow-md ${
                        product.badge === 'Hot' || product.badge === 'Giảm 2TR' ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white' :
                        product.badge === 'Mới' || product.badge === 'New' ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white' :
                        product.badge === 'Bán chạy' ? 'bg-gradient-to-r from-green-600 to-emerald-500 text-white' :
                        'bg-gradient-to-r from-orange-500 to-yellow-500 text-white'
                      }`}>
                        {product.badge}
                      </span>
                    )}
                    {discount > 0 && (
                      <span className="absolute top-2 right-2 px-2 py-0.5 text-[10px] font-bold bg-gradient-to-r from-red-600 to-pink-500 text-white rounded-full shadow-md">
                        -{discount}%
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1 font-semibold">{product.brand}</p>
                    <h3 className="text-sm font-medium text-[#363636] line-clamp-2 group-hover:text-[#ca3838] transition-colors min-h-[40px]">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1 mt-2">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs font-medium">{product.rating}</span>
                      <span className="text-xs text-gray-400">({product.reviews})</span>
                    </div>
                    <div className="mt-2">
                      <span className="text-base font-bold bg-gradient-to-r from-[#ca3838] to-orange-500 bg-clip-text text-transparent">{formatPrice(product.price)}</span>
                      {discount > 0 && (
                        <span className="text-xs text-gray-400 line-through ml-1">{formatPrice(product.originalPrice)}</span>
                      )}
                    </div>
                  </div>
                </Link>
                {/* Hover Actions */}
                <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-all z-10 translate-x-2 group-hover:translate-x-0" style={{ marginTop: discount > 0 ? '28px' : '0' }}>
                  <button
                    onClick={(e) => { e.preventDefault(); toggleWishlist(product) }}
                    className={`p-1.5 rounded-full shadow-lg ${isInWishlist(product.id) ? 'bg-red-50' : 'bg-white'} hover:scale-110 transition-transform`}
                    title="Yêu thích"
                  >
                    <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                  </button>
                  <button
                    onClick={(e) => { e.preventDefault(); setQuickViewProduct(product) }}
                    className="p-1.5 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
                    title="Xem nhanh"
                  >
                    <Eye className="w-4 h-4 text-gray-400" />
                  </button>
                  <button
                    onClick={(e) => { e.preventDefault(); toggleCompare(product) }}
                    className={`p-1.5 rounded-full shadow-lg ${isInCompare(product.id) ? 'bg-blue-50' : 'bg-white'} hover:scale-110 transition-transform`}
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
