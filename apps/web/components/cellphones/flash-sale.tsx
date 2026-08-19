'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ChevronRight } from 'lucide-react'
import { ProductCard } from './product-card'
import 'swiper/css'

const flashSaleProducts = [
  { id: 1, name: 'iPhone 15 Pro Max 256GB', price: 27990000, originalPrice: 34990000, sold: 234, brand: 'Apple' },
  { id: 2, name: 'Samsung Galaxy S24 Ultra', price: 23990000, originalPrice: 31990000, sold: 156, brand: 'Samsung' },
  { id: 3, name: 'MacBook Air M2 13 inch', price: 22990000, originalPrice: 29990000, sold: 89, brand: 'Apple' },
  { id: 4, name: 'AirPods Pro 2 USB-C', price: 5490000, originalPrice: 7990000, sold: 567, brand: 'Apple' },
  { id: 5, name: 'Xiaomi 14 Pro', price: 14990000, originalPrice: 21990000, sold: 78, brand: 'Xiaomi' },
  { id: 6, name: 'OPPO Find X7 Pro', price: 13990000, originalPrice: 18990000, sold: 45, brand: 'OPPO' },
  { id: 7, name: 'iPad Pro 11 inch M2', price: 21990000, originalPrice: 29990000, sold: 67, brand: 'Apple' },
  { id: 8, name: 'Samsung Galaxy Watch 6', price: 6990000, originalPrice: 11990000, sold: 123, brand: 'Samsung' },
  { id: 9, name: 'Dell XPS 13 Plus', price: 38990000, originalPrice: 41990000, sold: 34, brand: 'Dell' },
  { id: 10, name: 'ASUS ROG Strix G16', price: 29990000, originalPrice: 32990000, sold: 56, brand: 'ASUS' },
]

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev
        seconds--
        if (seconds < 0) { seconds = 59; minutes-- }
        if (minutes < 0) { minutes = 59; hours-- }
        if (hours < 0) { hours = 23 }
        return { hours, minutes, seconds }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex items-center gap-1.5">
      <span className="bg-black text-white text-sm font-bold px-2 py-1 rounded">
        {String(timeLeft.hours).padStart(2, '0')}
      </span>
      <span className="text-white font-bold">:</span>
      <span className="bg-black text-white text-sm font-bold px-2 py-1 rounded">
        {String(timeLeft.minutes).padStart(2, '0')}
      </span>
      <span className="text-white font-bold">:</span>
      <span className="bg-black text-white text-sm font-bold px-2 py-1 rounded">
        {String(timeLeft.seconds).padStart(2, '0')}
      </span>
    </div>
  )
}

export function FlashSale() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-3">
      <div className="bg-gradient-to-r from-cps-red to-cps-red-light rounded-xl overflow-hidden shadow-md">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-2 px-4 py-3 border-b border-white/20">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔥</span>
              <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">FLASH SALE</h2>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-white">
              <span className="text-sm font-medium">Kết thúc trong:</span>
              <CountdownTimer />
            </div>
          </div>
          <Link
            href="/khuyen-mai"
            className="text-white hover:text-yellow-300 flex items-center gap-1 text-sm font-medium transition-colors"
          >
            Xem tất cả
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Products */}
        <div className="p-3">
          <Swiper
            spaceBetween={8}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
              1280: { slidesPerView: 6 },
            }}
            className="!overflow-visible"
          >
            {flashSaleProducts.map((product) => (
              <SwiperSlide key={product.id} className="!h-auto">
                <ProductCard product={product} showSold />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}