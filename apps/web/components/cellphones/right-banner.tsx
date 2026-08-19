'use client'

import Link from 'next/link'
import { ArrowRight, Gift, Recycle } from 'lucide-react'

const rightBanners = [
  {
    id: 1,
    title: 'Thu cũ đổi mới',
    subtitle: 'Giá cao - Lên đời dễ',
    icon: Recycle,
    bg: 'bg-gradient-to-br from-orange-500 to-cps-red',
    href: '/thu-cu',
  },
  {
    id: 2,
    title: 'Voucher 500K',
    subtitle: 'Cho khách mới',
    icon: Gift,
    bg: 'bg-gradient-to-br from-yellow-400 to-orange-500',
    href: '/khuyen-mai',
  },
]

export function RightBanner() {
  return (
    <aside className="hidden xl:flex w-56 shrink-0 flex-col gap-3">
      {rightBanners.map((banner) => {
        const Icon = banner.icon
        return (
          <Link
            key={banner.id}
            href={banner.href}
            className={`group ${banner.bg} rounded-xl p-5 text-white flex-1 flex flex-col justify-between min-h-[180px] hover:scale-[1.02] hover:shadow-2xl transition-all cursor-pointer overflow-hidden relative`}
          >
            {/* Decorative circles */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/10 rounded-full blur-2xl" />

            <div className="relative z-10">
              <Icon className="w-10 h-10 mb-3 drop-shadow-lg" />
              <h3 className="text-lg font-bold leading-tight mb-1">{banner.title}</h3>
              <p className="text-xs text-white/90">{banner.subtitle}</p>
            </div>
            <div className="relative z-10 flex items-center gap-1 text-xs font-semibold">
              Xem ngay <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        )
      })}
    </aside>
  )
}