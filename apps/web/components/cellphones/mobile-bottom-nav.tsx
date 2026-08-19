'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Home, Grid3x3, ShoppingCart, User, Heart, Search, X } from 'lucide-react'

export function MobileBottomNav() {
  const pathname = usePathname()
  const [showSearch, setShowSearch] = useState(false)

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile Search Modal */}
      {showSearch && (
        <div className="md:hidden fixed inset-0 z-50 bg-white animate-fade-in">
          <div className="flex items-center gap-2 p-3 border-b">
            <Search className="w-5 h-5 text-neutral-500" />
            <input
              autoFocus
              type="text"
              placeholder="Tìm sản phẩm..."
              className="flex-1 outline-none text-base"
            />
            <button onClick={() => setShowSearch(false)} className="p-1">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-4">
            <h4 className="text-xs font-bold text-neutral-500 mb-3 uppercase">Tìm kiếm phổ biến</h4>
            <div className="flex flex-wrap gap-2">
              {['iPhone 15 Pro Max', 'Samsung Galaxy S24', 'MacBook Air M3', 'AirPods Pro', 'Xiaomi 14'].map((q) => (
                <Link
                  key={q}
                  href={`/san-pham?q=${encodeURIComponent(q)}`}
                  onClick={() => setShowSearch(false)}
                  className="px-3 py-1.5 bg-neutral-100 rounded-full text-sm hover:bg-neutral-200"
                >
                  {q}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-neutral-200 shadow-[0_-2px_8px_rgba(0,0,0,0.04)] pb-safe">
        <div className="grid grid-cols-5 gap-1 p-1">
          <NavItem href="/" label="Trang chủ" icon={Home} active={isActive('/')} />
          <NavItem href="/danh-muc" label="Danh mục" icon={Grid3x3} active={isActive('/danh-muc')} />
          <button
            onClick={() => setShowSearch(true)}
            className="flex flex-col items-center justify-center gap-0.5 py-2 rounded-lg text-[10px] font-medium text-neutral-600"
          >
            <Search className="w-5 h-5" />
            <span>Tìm</span>
          </button>
          <NavItem href="/gio-hang" label="Giỏ hàng" icon={ShoppingCart} active={isActive('/gio-hang')} badge={3} />
          <NavItem href="/tai-khoan" label="Tài khoản" icon={User} active={isActive('/tai-khoan')} />
        </div>
      </nav>
    </>
  )
}

function NavItem({ href, label, icon: Icon, active, badge }: any) {
  return (
    <Link
      href={href}
      className={`relative flex flex-col items-center justify-center gap-0.5 py-2 rounded-lg text-[10px] font-medium transition-colors ${
        active ? 'text-cps-red' : 'text-neutral-600'
      }`}
    >
      <Icon className={`w-5 h-5 ${active ? 'fill-current' : ''}`} />
      <span>{label}</span>
      {badge && (
        <span className="absolute top-1 right-1/4 w-4 h-4 bg-cps-red text-white text-[9px] font-black rounded-full flex items-center justify-center">
          {badge}
        </span>
      )}
    </Link>
  )
}