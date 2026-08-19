'use client'

import { MapPin, Search, Package } from 'lucide-react'

export function AnnouncementBar() {
  const messages = [
    'Sản phẩm Chính hãng - Xuất VAT đầy đủ',
    'Giao nhanh - Miễn phí cho đơn 300k',
    'Thu cũ giá ngon - Lên đời tiết kiệm',
  ]

  return (
    <div className="w-full bg-gradient-to-r from-cps-red to-cps-red-light text-white text-xs">
      <div className="max-w-7xl mx-auto px-4 h-[30px] flex items-center justify-between gap-4 overflow-hidden">
        {/* Marquee left */}
        <div className="flex-1 overflow-hidden relative">
          <div className="marquee-track">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center shrink-0">
                {messages.map((msg, j) => (
                  <div key={`${i}-${j}`} className="flex items-center shrink-0 pr-12">
                    <span className="text-yellow-300 mr-2">★</span>
                    <span>{msg}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Right links */}
        <div className="hidden md:flex items-center gap-4 shrink-0 border-l border-white/40 pl-4">
          <a href="#" className="hover:text-yellow-300 flex items-center gap-1 transition-colors">
            <MapPin className="w-3 h-3" />
            <span>Cửa hàng gần bạn</span>
          </a>
          <a href="/tra-cuu-don-hang" className="hover:text-yellow-300 flex items-center gap-1 transition-colors">
            <Package className="w-3 h-3" />
            <span>Tra cứu đơn hàng</span>
          </a>
          <a href="tel:18002097" className="hover:text-yellow-300 font-semibold transition-colors">
            1800 2097
          </a>
        </div>
      </div>
    </div>
  )
}