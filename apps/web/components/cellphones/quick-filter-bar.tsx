'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Phone, Laptop, Headphones, Watch, Tablet, Camera,
  Tv, ChevronRight, Sparkles, TrendingUp, Zap
} from 'lucide-react'

const quickLinks = [
  { icon: Phone, label: 'Điện thoại', href: '/danh-muc?danh-muc=dien-thoai', color: 'from-blue-500 to-cyan-500' },
  { icon: Laptop, label: 'Laptop', href: '/danh-muc?danh-muc=laptop', color: 'from-purple-500 to-pink-500' },
  { icon: Tablet, label: 'Tablet', href: '/danh-muc?danh-muc=tablet', color: 'from-rose-500 to-orange-500' },
  { icon: Headphones, label: 'Âm thanh', href: '/danh-muc?danh-muc=am-thanh', color: 'from-emerald-500 to-teal-500' },
  { icon: Watch, label: 'Đồng hồ', href: '/danh-muc?danh-muc=dong-ho', color: 'from-amber-500 to-orange-500' },
  { icon: Camera, label: 'Camera', href: '/danh-muc?danh-muc=camera', color: 'from-indigo-500 to-purple-500' },
  { icon: Tv, label: 'TV', href: '/danh-muc?danh-muc=tv', color: 'from-sky-500 to-blue-500' },
  { icon: Sparkles, label: 'Phụ kiện', href: '/danh-muc?danh-muc=phu-kien', color: 'from-fuchsia-500 to-pink-500' },
]

export function QuickFilterBar() {
  const [showSticky, setShowSticky] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Normal bar */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-thin">
            <Link
              href="/khuyen-mai"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-cps-red to-cps-red-light text-white text-xs font-bold shrink-0 hover:shadow-md transition-shadow"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              Khuyến mãi HOT
            </Link>
            <Link
              href="/san-pham?sort=best_seller"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-50 text-yellow-700 text-xs font-bold shrink-0 hover:bg-yellow-100 transition-colors"
            >
              <TrendingUp className="w-3.5 h-3.5" />
              Bán chạy
            </Link>
            <div className="w-px h-5 bg-neutral-200 mx-1 shrink-0" />
            {quickLinks.map((q) => (
              <Link
                key={q.href}
                href={q.href}
                className="group flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-neutral-100 text-xs font-medium text-neutral-700 shrink-0 transition-colors"
              >
                <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${q.color} flex items-center justify-center`}>
                  <q.icon className="w-3 h-3 text-white" />
                </div>
                {q.label}
              </Link>
            ))}
            <Link
              href="/danh-muc"
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-cps-red shrink-0 ml-auto"
            >
              Xem tất cả <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Sticky mini bar - appears on scroll */}
      {showSticky && (
        <div className="fixed top-[60px] left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200 shadow-md animate-slide-in-left">
          <div className="max-w-7xl mx-auto px-4 h-12 flex items-center gap-2 overflow-x-auto scrollbar-thin">
            <span className="text-xs font-bold text-neutral-500 shrink-0">Danh mục:</span>
            {quickLinks.slice(0, 6).map((q) => (
              <Link
                key={q.href}
                href={q.href}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full hover:bg-red-50 text-xs font-medium text-neutral-700 hover:text-cps-red shrink-0 transition-colors"
              >
                <q.icon className="w-3 h-3" />
                {q.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}