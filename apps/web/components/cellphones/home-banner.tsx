'use client'

import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const tabs = [
  { id: 'all', label: 'Tất cả' },
  { id: 'iphone', label: 'iPhone' },
  { id: 'samsung', label: 'Samsung' },
  { id: 'xiaomi', label: 'Xiaomi' },
  { id: 'laptop', label: 'Laptop' },
  { id: 'tablet', label: 'Tablet' },
  { id: 'watch', label: 'Đồng hồ' },
  { id: 'audio', label: 'Âm thanh' },
]

const fallbackBanners = [
  {
    id: 1,
    image: 'https://cdn2.cellphones.com.vn/x/media/catalog/product/b/a/banner-iphone-15-pro-max.png',
    mobile: 'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/iphone-15-pro-max_3.png',
    title: 'iPhone 15 Pro Max',
    subtitle: 'Titan tự nhiên - Giảm ngay 5TR',
    bg: 'from-slate-900 via-gray-800 to-slate-900',
    price: '27.990.000đ',
  },
  {
    id: 2,
    image: 'https://cdn2.cellphones.com.vn/x/media/catalog/product/b/a/banner-samsung-s24.png',
    mobile: 'https://cdn2.cellphones.com.vn/x/media/catalog/product/s/a/samsung-galaxy-s24-ultra_2.png',
    title: 'Samsung Galaxy S24 Ultra',
    subtitle: 'AI thông minh - Trợ giá 6TR',
    bg: 'from-blue-700 via-indigo-700 to-blue-900',
    price: '23.990.000đ',
  },
  {
    id: 3,
    image: 'https://cdn2.cellphones.com.vn/x/media/catalog/product/b/a/banner-macbook-m3.png',
    mobile: 'https://cdn2.cellphones.com.vn/x/media/catalog/product/m/a/macbook-air-m3_1.png',
    title: 'MacBook Air M3',
    subtitle: 'Mỏng nhẹ - Pin 18h',
    bg: 'from-gray-800 via-gray-700 to-gray-900',
    price: '32.990.000đ',
  },
  {
    id: 4,
    image: 'https://cdn2.cellphones.com.vn/x/media/catalog/product/b/a/banner-flash-sale.png',
    mobile: 'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/iphone-15-pro-max_3.png',
    title: 'Flash Sale 8.8',
    subtitle: 'Giảm đến 50% toàn sàn',
    bg: 'from-red-600 via-rose-600 to-orange-600',
    price: 'Từ 4.990.000đ',
  },
]

export function HomeBanner({ banners }: { banners?: any[] }) {
  const [activeTab, setActiveTab] = useState('all')

  const list = banners && banners.length > 0
    ? banners.map((b) => ({
        id: b.id,
        image: b.image_url,
        mobile: b.mobile_image_url || b.image_url,
        title: b.title,
        subtitle: b.subtitle || '',
        bg: b.bg_gradient || 'from-slate-900 via-gray-800 to-slate-900',
        price: 'Xem ngay',
        href: b.cta_href || '#',
      }))
    : fallbackBanners

  return (
    <div className="flex-1 min-w-0">
      {/* Tabs Navigation */}
      <div className="bg-white rounded-t-xl px-2 pt-2">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-thin">
          {tabs.map((tab, idx) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-4 h-10 text-sm font-medium whitespace-nowrap transition-colors shrink-0 ${
                activeTab === tab.id
                  ? 'text-cps-red bg-neutral-100 font-semibold'
                  : 'text-neutral-600 hover:text-cps-red'
              } ${idx === 0 ? 'rounded-tl-md' : ''}`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <>
                  <span className="absolute -left-2 top-0 w-2 h-10 bg-neutral-100 [clip-path:polygon(100%_0,0%_50%,100%_100%)]" />
                  <span className="absolute -right-2 top-0 w-2 h-10 bg-neutral-100 [clip-path:polygon(0_0,100%_50%,0_100%)]" />
                </>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Banner */}
      <div className="relative rounded-b-xl overflow-hidden bg-gray-100 h-[300px] md:h-[400px]">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{
            clickable: true,
            renderBullet: (index, className) =>
              `<span class="${className} !w-2 !h-2 !bg-white/60 !opacity-100 [&.swiper-pagination-bullet-active]:!bg-white [&.swiper-pagination-bullet-active]:!w-6 [&.swiper-pagination-bullet-active]:!rounded-full"></span>`,
          }}
          navigation={{
            prevEl: '.banner-prev',
            nextEl: '.banner-next',
          }}
          loop
          className="h-full"
        >
          {list.map((banner: any) => (
            <SwiperSlide key={banner.id}>
              <div className={`w-full h-full bg-gradient-to-r ${banner.bg} relative overflow-hidden flex items-center`}>
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
                <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-yellow-400/20 rounded-full blur-3xl" />

                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-4 items-center">
                  <div>
                    <span className="inline-block px-3 py-1 bg-yellow-400 text-black text-xs font-bold rounded-full mb-3 animate-pulse">
                      🔥 HOT DEAL
                    </span>
                    <h2 className="text-2xl md:text-4xl font-black text-white mb-2 leading-tight drop-shadow-2xl">
                      {banner.title}
                    </h2>
                    <p className="text-white/90 mb-4 text-sm md:text-base">{banner.subtitle}</p>
                    <div className="flex items-baseline gap-3 mb-4">
                      <span className="text-2xl md:text-3xl font-black text-yellow-300 drop-shadow">
                        {banner.price}
                      </span>
                    </div>
                    <button className="px-6 py-2.5 bg-white text-cps-red font-bold rounded-md hover:bg-yellow-300 transition-colors shadow-xl">
                      Mua ngay →
                    </button>
                  </div>
                  <div className="hidden md:flex justify-end">
                    <div className="relative">
                      <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl" />
                      <img
                        src={banner.mobile}
                        alt={banner.title}
                        className="relative w-72 h-72 object-contain drop-shadow-2xl"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation arrows */}
        <button className="banner-prev absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110">
          <ChevronLeft className="w-5 h-5 text-cps-text" />
        </button>
        <button className="banner-next absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110">
          <ChevronRight className="w-5 h-5 text-cps-text" />
        </button>

        {/* Custom pagination style */}
        <style jsx global>{`
          .swiper-pagination {
            bottom: 12px !important;
          }
        `}</style>
      </div>
    </div>
  )
}
