'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Search, MapPin, ShoppingCart, User, Grid3x3,
  Heart, Bell, ChevronDown
} from 'lucide-react'

export function Header() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-cps-red to-cps-red-light text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 h-[60px] flex items-center gap-3">
        {/* Logo */}
        <Link href="/" className="shrink-0 flex items-center gap-2 group">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <span className="text-cps-red font-black text-2xl">T</span>
          </div>
          <div className="hidden lg:block leading-none">
            <div className="font-black text-xl">TechVibe</div>
            <div className="text-[10px] text-white/80">.com.vn</div>
          </div>
        </Link>

        {/* Category Button */}
        <button className="hidden md:flex items-center gap-2 bg-cps-red-light hover:bg-white/20 h-10 px-3 rounded-md text-sm font-medium transition-colors shrink-0">
          <Grid3x3 className="w-4 h-4" />
          <span className="hidden lg:inline">Danh mục</span>
        </button>

        {/* Location Button */}
        <button className="hidden md:flex items-center gap-2 bg-cps-red-light hover:bg-white/20 h-10 px-3 rounded-md text-sm font-medium transition-colors shrink-0">
          <MapPin className="w-4 h-4" />
          <span className="hidden lg:inline">Hồ Chí Minh</span>
          <ChevronDown className="w-3 h-3 hidden lg:block" />
        </button>

        {/* Search Bar */}
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Bạn muốn mua gì hôm nay?"
            className="w-full h-10 pl-4 pr-12 rounded-md bg-white text-cps-text placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-md"
          />
          <button className="absolute right-1 top-1 h-8 w-10 flex items-center justify-center bg-cps-red-light hover:bg-cps-red-hover text-white rounded transition-colors">
            <Search className="w-4 h-4" />
          </button>
          {/* Quick suggestions dropdown */}
          {searchQuery && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-xl z-50 text-cps-text py-2 max-h-80 overflow-y-auto">
              {['iPhone 15', 'Samsung Galaxy S24', 'MacBook Air M3', 'AirPods Pro 2'].map((s) => (
                <button
                  key={s}
                  className="w-full px-4 py-2 hover:bg-gray-100 text-sm text-left flex items-center gap-2"
                >
                  <Search className="w-3 h-3 text-gray-400" />
                  <span>{s}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Notifications */}
          <button className="hidden md:flex relative w-10 h-10 items-center justify-center hover:bg-white/20 rounded-md transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full" />
          </button>

          {/* Cart */}
          <Link
            href="/gio-hang"
            className="relative flex items-center gap-2 h-10 px-3 hover:bg-white/20 rounded-md transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="hidden lg:inline text-sm">Giỏ hàng</span>
            <span className="absolute -top-1 -right-1 lg:right-2 w-5 h-5 bg-yellow-400 text-cps-red text-[10px] font-black rounded-full flex items-center justify-center">
              3
            </span>
          </Link>

          {/* Login */}
          <Link
            href="/auth/login"
            className="flex items-center gap-2 bg-cps-red-light hover:bg-white hover:text-cps-red h-10 px-3 rounded-md text-sm font-medium transition-colors"
          >
            <User className="w-4 h-4" />
            <span className="hidden lg:inline">Đăng nhập</span>
          </Link>
        </div>
      </div>
    </header>
  )
}