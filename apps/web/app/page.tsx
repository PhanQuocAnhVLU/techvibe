'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Clock, ArrowRight } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { MobileBottomNav } from '@/components/layout/mobile-bottom-nav'
import { ProductCard } from '@/components/product/product-card'
import { Button } from '@/components/ui/button'
import { categories, products, banners, flashSale } from '@/lib/data'
import { formatPrice } from '@/lib/utils'

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [countdown, setCountdown] = useState({ hours: 4, minutes: 32, seconds: 15 })

  // Auto-slide hero banner
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
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

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % banners.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)

  const bestsellerProducts = products.filter(p => p.isBestseller || p.tags.includes('bestseller'))
  const newProducts = products.filter(p => p.isNew || p.tags.includes('new'))
  const flashSaleProducts = products.slice(0, 6)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Banner Slider */}
        <section className="relative bg-white">
          <div className="container mx-auto px-4 py-4">
            <div className="relative overflow-hidden rounded-lg">
              <div 
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {banners.map((banner, index) => (
                  <div key={banner.id} className="w-full flex-shrink-0">
                    <Link href={banner.link || '#'}>
                      <div className="relative h-64 md:h-80 lg:h-96">
                        <Image
                          src={banner.image}
                          alt={`Banner ${index + 1}`}
                          fill
                          className="object-cover"
                          priority={index === 0}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
                        <div className="absolute inset-0 flex items-center">
                          <div className="px-8 md:px-16 max-w-lg">
                            <h2 className="text-white text-2xl md:text-4xl font-bold mb-2">
                              iPhone 15 Series
                            </h2>
                            <p className="text-white/90 text-sm md:text-lg mb-4">
                              Giá tốt nhất thị trường - Ưu đãi lên đến 5 triệu
                            </p>
                            <Button variant="primary" className="bg-white text-primary hover:bg-gray-100">
                              Mua ngay
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {banners.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentSlide ? 'bg-white w-6' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-6 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-xl font-bold text-secondary mb-4">Danh mục sản phẩm</h2>
            <div className="grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/san-pham/${cat.slug}`}
                  className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl mb-2 group-hover:bg-primary group-hover:text-white transition-colors">
                    {cat.icon}
                  </div>
                  <span className="text-xs text-center text-secondary group-hover:text-primary transition-colors line-clamp-1">
                    {cat.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Flash Sale */}
        <section className="py-6 bg-gradient-to-r from-primary to-red-700">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-white">🔥 FLASH SALE</h2>
                <div className="flex items-center gap-1 bg-white/20 rounded px-3 py-1">
                  <Clock className="w-4 h-4 text-white" />
                  <span className="text-white font-bold">
                    {String(countdown.hours).padStart(2, '0')}:
                    {String(countdown.minutes).padStart(2, '0')}:
                    {String(countdown.seconds).padStart(2, '0')}
                  </span>
                </div>
              </div>
              <Link href="/flash-sale" className="flex items-center gap-1 text-white hover:underline">
                <span>Xem thêm</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {flashSaleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Bestseller Products */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-secondary">Sản phẩm bán chạy</h2>
              <Link href="/san-pham?sort=bestseller" className="flex items-center gap-1 text-primary hover:underline">
                <span>Xem tất cả</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {bestsellerProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Banner Ads */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/san-pham/apple" className="relative h-40 rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=700&h=200&fit=crop"
                  alt="Apple Products"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
                  <div className="p-6">
                    <p className="text-accent font-semibold text-sm">Ưu đãi đặc biệt</p>
                    <h3 className="text-white text-xl font-bold mb-2">Apple Products</h3>
                    <Button variant="primary" size="sm">Mua ngay</Button>
                  </div>
                </div>
              </Link>
              <Link href="/san-pham/samsung" className="relative h-40 rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=700&h=200&fit=crop"
                  alt="Samsung Products"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
                  <div className="p-6">
                    <p className="text-accent font-semibold text-sm">Giảm đến 20%</p>
                    <h3 className="text-white text-xl font-bold mb-2">Samsung Galaxy S24</h3>
                    <Button variant="primary" size="sm">Mua ngay</Button>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* New Products */}
        <section className="py-6 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-secondary">Sản phẩm mới</h2>
              <Link href="/san-pham?sort=newest" className="flex items-center gap-1 text-primary hover:underline">
                <span>Xem tất cả</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {newProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Brands */}
        <section className="py-6 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-xl font-bold text-secondary mb-4">Thương hiệu nổi bật</h2>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {['Apple', 'Samsung', 'Xiaomi', 'OPPO', 'vivo', 'ASUS'].map((brand) => (
                <Link
                  key={brand}
                  href={`/san-pham?brand=${brand.toLowerCase()}`}
                  className="flex items-center justify-center h-20 bg-gray-50 rounded-lg hover:bg-primary/5 hover:border-primary border border-transparent transition-colors"
                >
                  <span className="font-semibold text-secondary hover:text-primary transition-colors">
                    {brand}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Installment Banner */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-accent to-yellow-400 rounded-lg p-6 text-center">
              <h2 className="text-2xl font-bold text-secondary mb-2">
                Mua sắm với Trả góp 0%
              </h2>
              <p className="text-secondary/80 mb-4">
                Hỗ trợ trả góp qua thẻ tín dụng, FE Credit, Home Credit
              </p>
              <Button variant="secondary" className="border-secondary text-secondary">
                Tìm hiểu thêm
              </Button>
            </div>
          </div>
        </section>

        {/* Service Features */}
        <section className="py-6 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 p-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-2xl">🚚</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">Miễn phí giao hàng</p>
                  <p className="text-xs text-gray-500">Cho đơn từ 500K</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-2xl">🔄</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">Đổi trả 15 ngày</p>
                  <p className="text-xs text-gray-500">Áp dụng mọi sản phẩm</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-2xl">✅</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">100% chính hãng</p>
                  <p className="text-xs text-gray-500">Cam kết authentic</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-2xl">🏪</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">Hỗ trợ 24/7</p>
                  <p className="text-xs text-gray-500">Hotline 1800.2001</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  )
}
