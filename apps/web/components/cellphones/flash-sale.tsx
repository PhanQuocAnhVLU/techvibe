'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ChevronRight } from 'lucide-react'
import { ProductCard } from './product-card'
import 'swiper/css'

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

export function FlashSale({ products }: { products?: any[] }) {
  const list = products && products.length > 0 ? products : []

  if (list.length === 0) {
    return null
  }

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
            {list.map((product: any) => (
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
