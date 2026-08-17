'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  ChevronRight, Flame, Clock, Tag, Percent, 
  ChevronLeft, ChevronRight as ChevronRightIcon, Star, Flashlight
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface FlashSaleItem {
  id: number
  name: string
  price: number
  originalPrice: number
  sold: number
  total: number
  image: string
}

interface PromotionBanner {
  id: number
  title: string
  subtitle: string
  bgColor: string
  image: string
}

const flashSaleItems: FlashSaleItem[] = [
  { id: 1, name: 'iPhone 15 Pro Max 256GB', price: 27990000, originalPrice: 34990000, sold: 234, total: 500, image: '/api/placeholder/200/200' },
  { id: 2, name: 'Samsung Galaxy S24 Ultra', price: 23990000, originalPrice: 31990000, sold: 156, total: 300, image: '/api/placeholder/200/200' },
  { id: 3, name: 'MacBook Air M2 13"', price: 24990000, originalPrice: 29990000, sold: 89, total: 200, image: '/api/placeholder/200/200' },
  { id: 4, name: 'AirPods Pro 2 USB-C', price: 5490000, originalPrice: 7990000, sold: 567, total: 1000, image: '/api/placeholder/200/200' },
  { id: 5, name: 'Xiaomi 14 Pro', price: 15990000, originalPrice: 21990000, sold: 78, total: 150, image: '/api/placeholder/200/200' },
  { id: 6, name: 'OPPO Find X7 Pro', price: 13990000, originalPrice: 18990000, sold: 45, total: 100, image: '/api/placeholder/200/200' },
  { id: 7, name: 'iPad Pro 11" M2', price: 23990000, originalPrice: 29990000, sold: 67, total: 120, image: '/api/placeholder/200/200' },
  { id: 8, name: 'Samsung Galaxy Watch 6', price: 7990000, originalPrice: 11990000, sold: 123, total: 250, image: '/api/placeholder/200/200' },
]

const banners: PromotionBanner[] = [
  { id: 1, title: 'Siêu Sale 8.8', subtitle: 'Giảm đến 50%', bgColor: 'bg-gradient-to-r from-red-500 to-orange-500', image: '/api/placeholder/400/200' },
  { id: 2, title: 'iPhone Đồng Giá', subtitle: 'Từ 15.99 Triệu', bgColor: 'bg-gradient-to-r from-gray-900 to-gray-700', image: '/api/placeholder/400/200' },
  { id: 3, title: 'Laptop Giáo Sĩ', subtitle: 'Giảm 5 Triệu', bgColor: 'bg-gradient-to-r from-blue-600 to-blue-400', image: '/api/placeholder/400/200' },
]

const brandPromotions = [
  { name: 'Apple', discount: '25%', color: 'bg-gray-100' },
  { name: 'Samsung', discount: '20%', color: 'bg-blue-50' },
  { name: 'Xiaomi', discount: '30%', color: 'bg-orange-50' },
  { name: 'OPPO', discount: '25%', color: 'bg-green-50' },
]

const vouchers = [
  { code: 'TECHSTORE10', discount: '10%', max: 500000, min: 2000000, bg: 'bg-red-500' },
  { code: 'FREESHIP', discount: 'Freeship', max: 0, min: 500000, bg: 'bg-blue-500' },
  { code: 'NEWUSER', discount: '100K', max: 100000, min: 500000, bg: 'bg-green-500' },
]

function formatPrice(price: number) {
  return new Intl.NumberFormat('vi-VN').format(price) + 'đ'
}

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  })

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
            if (hours < 0) {
              hours = 23
            }
          }
        }
        return { hours, minutes, seconds }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex items-center gap-2">
      {[
        { value: timeLeft.hours, label: 'Giờ' },
        { value: timeLeft.minutes, label: 'Phút' },
        { value: timeLeft.seconds, label: 'Giây' }
      ].map((item, idx) => (
        <div key={idx} className="flex flex-col items-center">
          <div className="bg-white text-red-600 px-3 py-2 rounded-lg font-bold text-xl min-w-[50px] text-center">
            {String(item.value).padStart(2, '0')}
          </div>
          <span className="text-xs text-white/80 mt-1">{item.label}</span>
        </div>
      ))}
    </div>
  )
}

export default function PromotionsPage() {
  const [currentBanner, setCurrentBanner] = useState(0)

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length)
  }

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="font-bold text-white text-xl">T</span>
              </div>
              <span className="font-bold text-xl">
                <span className="text-secondary">Tech</span>
                <span className="text-primary">Store</span>
              </span>
            </Link>

            <div className="flex items-center gap-4">
              <Link href="/gio-hang" className="relative p-2 hover:bg-gray-100 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Flash Sale Banner */}
      <div className="bg-gradient-to-r from-red-600 to-orange-500">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Flame className="w-8 h-8 text-yellow-300" />
                <h1 className="text-2xl font-bold text-white">FLASH SALE</h1>
              </div>
              <div className="hidden sm:block">
                <CountdownTimer />
              </div>
            </div>
            <Link href="/flash-sale" className="text-white hover:underline flex items-center gap-1">
              Xem tất cả
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Promo Banners Carousel */}
        <div className="relative mb-8">
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${currentBanner * 100}%)` }}
            >
              {banners.map(banner => (
                <div
                  key={banner.id}
                  className={`w-full h-48 sm:h-64 ${banner.bgColor} flex items-center px-8`}
                >
                  <div className="flex-1">
                    <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2">{banner.title}</h2>
                    <p className="text-lg sm:text-xl text-white/90">{banner.subtitle}</p>
                    <Button className="mt-4 bg-white text-inherit hover:bg-white/90">
                      Mua ngay
                    </Button>
                  </div>
                  <img src={banner.image} alt="" className="hidden sm:block w-64 h-40 object-contain" />
                </div>
              ))}
            </div>
          </div>
          
          <button
            onClick={prevBanner}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextBanner}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100"
          >
            <ChevronRightIcon className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentBanner(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentBanner === idx ? 'bg-primary w-8' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Flash Sale Products */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Flashlight className="w-6 h-6 text-orange-500" />
              <h2 className="text-xl font-bold">Đang giảm sốc</h2>
              <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">-{Math.round((1 - 27990000/34990000)*100)}%</span>
            </div>
            <Link href="/flash-sale" className="text-primary hover:underline text-sm">
              Xem tất cả
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {flashSaleItems.slice(0, 8).map(item => {
              const percentSold = Math.round((item.sold / item.total) * 100)
              const discount = Math.round((1 - item.price / item.originalPrice) * 100)

              return (
                <Link
                  key={item.id}
                  href={`/san-pham/${item.id}`}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group"
                >
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full aspect-square object-cover"
                    />
                    <span className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
                      -{discount}%
                    </span>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-lg font-bold text-primary">{formatPrice(item.price)}</span>
                    </div>
                    <span className="text-xs text-gray-400 line-through">{formatPrice(item.originalPrice)}</span>
                    
                    {/* Progress bar */}
                    <div className="mt-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-red-500">Đã bán {item.sold}</span>
                        <span className="text-gray-500">{percentSold}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-red-500 rounded-full"
                          style={{ width: `${percentSold}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Brand Promotions */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-6">Khuyến mãi theo thương hiệu</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {brandPromotions.map((brand, idx) => (
              <Link
                key={idx}
                href={`/san-pham?thuong-hieu=${brand.name}`}
                className={`${brand.color} rounded-xl p-4 text-center hover:opacity-80 transition-opacity`}
              >
                <h3 className="font-bold text-lg">{brand.name}</h3>
                <p className="text-red-500 font-semibold">Giảm {brand.discount}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Vouchers */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-6">
            <Tag className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold">Mã giảm giá</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {vouchers.map((voucher, idx) => (
              <div
                key={idx}
                className={`${voucher.bg} text-white rounded-xl p-4 flex items-center gap-4`}
              >
                <div className="text-center">
                  <span className="text-2xl font-bold">{voucher.discount}</span>
                  {voucher.max > 0 && <span className="text-sm"> (Max {formatPrice(voucher.max)})</span>}
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{voucher.code}</p>
                  <p className="text-sm opacity-80">Đơn từ {formatPrice(voucher.min)}</p>
                </div>
                <button className="px-4 py-2 bg-white text-inherit rounded-lg font-semibold text-sm hover:bg-white/90">
                  Lưu
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Weekly Highlights */}
        <section>
          <h2 className="text-xl font-bold mb-6">Khuyến mãi trong tuần</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/san-pham?khuyen-mai=tra-gop"
              className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white flex items-center gap-4"
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Percent className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-xl">Trả góp 0%</h3>
                <p className="opacity-90">Apple, Samsung trả góp 0% lãi suất</p>
              </div>
            </Link>
            <Link
              href="/san-pham?khuyen-mai=doi-tra"
              className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-6 text-white flex items-center gap-4"
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Clock className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-xl">Đổi trả 7 ngày</h3>
                <p className="opacity-90">Hoàn tiền nếu không hài lòng</p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
