'use client'

import Link from 'next/link'
import { Search, ShoppingCart, MapPin, Phone, User, Menu, X, Heart } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { categories } from '@/lib/data'
import { Button } from '@/components/ui/button'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <header className="header-sticky">
      {/* Top Bar */}
      <div className="bg-secondary text-white text-xs">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="#" className="flex items-center gap-1 hover:text-primary transition-colors">
              <MapPin className="w-3 h-3" />
              <span>Hồ Chí Minh</span>
            </Link>
            <Link href="tel:18002001" className="hidden sm:flex items-center gap-1 hover:text-primary transition-colors">
              <Phone className="w-3 h-3" />
              <span>1800.2001</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/tra-cuu-don-hang" className="hover:text-primary transition-colors">
              Tra cứu đơn hàng
            </Link>
            <Link href="/khuyen-mai" className="hidden md:block hover:text-primary transition-colors">
              Khuyến mãi
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-xl text-secondary">Tech</span>
                <span className="font-bold text-xl text-primary">Store</span>
              </div>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2.5 pr-12 border border-border rounded-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                />
                <button className="absolute right-0 top-0 h-full px-4 bg-primary text-white rounded-r-md hover:bg-primary-hover transition-colors">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Link href="/tai-khoan" className="hidden md:flex flex-col items-center px-3 py-1 hover:text-primary transition-colors">
                <User className="w-5 h-5" />
                <span className="text-xs">Tài khoản</span>
              </Link>
              <Link href="/yeu-thich" className="hidden md:flex flex-col items-center px-3 py-1 hover:text-primary transition-colors">
                <Heart className="w-5 h-5" />
                <span className="text-xs">Yêu thích</span>
              </Link>
              <Link href="/gio-hang" className="relative flex flex-col items-center px-3 py-1 hover:text-primary transition-colors">
                <ShoppingCart className="w-5 h-5" />
                <span className="text-xs">Giỏ hàng</span>
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </Link>
              <button
                className="md:hidden p-2 hover:bg-gray-100 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Nav */}
      <nav className="bg-white border-b border-border hidden md:block">
        <div className="container mx-auto px-4">
          <ul className="flex items-center gap-1 overflow-x-auto">
            {categories.slice(0, 8).map((cat) => (
              <li key={cat.id}>
                <Link
                  href={`/san-pham/${cat.slug}`}
                  className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-secondary hover:text-primary hover:bg-primary/5 transition-colors whitespace-nowrap"
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/khuyen-mai"
                className="flex items-center gap-1 px-4 py-3 text-sm font-semibold text-primary hover:bg-primary/10 transition-colors whitespace-nowrap animate-pulse-sale"
              >
                <span>🔥</span>
                <span>Khuyến mãi</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-border">
          <div className="container mx-auto px-4 py-4">
            <div className="grid grid-cols-3 gap-2">
              {categories.slice(0, 9).map((cat) => (
                <Link
                  key={cat.id}
                  href={`/san-pham/${cat.slug}`}
                  className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
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
  )
}
