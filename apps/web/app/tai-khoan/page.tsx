'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { User, MapPin, ShoppingBag, Heart, Star, Gift, Bell, ChevronRight, LogOut, Edit3 } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { MobileBottomNav } from '@/components/layout/mobile-bottom-nav'
import { Button } from '@/components/ui/button'
import { products } from '@/lib/data'

const menuItems = [
  { href: '/tai-khoan/thong-tin', icon: User, label: 'Thông tin tài khoản', desc: 'Cập nhật thông tin cá nhân' },
  { href: '/tai-khoan/dia-chi', icon: MapPin, label: 'Sổ địa chỉ', desc: 'Quản lý địa chỉ giao hàng', badge: 2 },
  { href: '/tai-khoan/don-hang', icon: ShoppingBag, label: 'Đơn hàng của tôi', desc: 'Xem lịch sử mua hàng' },
  { href: '/tai-khoan/yeu-thich', icon: Heart, label: 'Sản phẩm yêu thích', desc: 'Danh sách sản phẩm đã lưu', badge: 5 },
  { href: '/tai-khoan/danh-gia', icon: Star, label: 'Đánh giá của tôi', desc: 'Xem các đánh giá đã viết' },
  { href: '/tai-khoan/voucher', icon: Gift, label: 'Kho Voucher', desc: 'Mã giảm giá của bạn', badge: 3 },
  { href: '/tai-khoan/thong-bao', icon: Bell, label: 'Thông báo', desc: 'Cài đặt thông báo' },
]

export default function AccountPage() {
  const user = {
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@email.com',
    phone: '0901234567',
    avatar: null,
    points: 1250,
    tier: 'Gold' as const,
  }

  return (
    <div className="min-h-screen flex flex-col bg-background pb-20 md:pb-0">
      <Header />

      <main className="flex-1">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-primary to-red-700 text-white">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                {user.avatar ? (
                  <Image src={user.avatar} alt={user.name} width={80} height={80} className="rounded-full" />
                ) : (
                  <span className="text-3xl font-bold">{user.name[0]}</span>
                )}
              </div>
              <div className="flex-1">
                <h1 className="text-xl font-bold">{user.name}</h1>
                <p className="text-white/80 text-sm">{user.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`px-2 py-0.5 text-xs rounded-full ${
                    user.tier === 'Gold' ? 'bg-yellow-400 text-yellow-900' : 'bg-gray-200 text-gray-700'
                  }`}>
                    {user.tier}
                  </span>
                  <span className="text-sm">{user.points.toLocaleString()} điểm</span>
                </div>
              </div>
              <Link href="/tai-khoan/chinh-sua">
                <Button variant="ghost" className="text-white hover:bg-white/20">
                  <Edit3 className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <div className="grid grid-cols-3 gap-4">
              <Link href="/tai-khoan/don-hang?status=pending" className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-xl">⏳</span>
                </div>
                <p className="text-sm font-medium">Chờ xử lý</p>
                <p className="text-xs text-gray-500">2 đơn</p>
              </Link>
              <Link href="/tai-khoan/don-hang?status=shipping" className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-xl">🚚</span>
                </div>
                <p className="text-sm font-medium">Đang giao</p>
                <p className="text-xs text-gray-500">1 đơn</p>
              </Link>
              <Link href="/tai-khoan/danh-gia" className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-xl">⭐</span>
                </div>
                <p className="text-sm font-medium">Chưa đánh giá</p>
                <p className="text-xs text-gray-500">3 đơn</p>
              </Link>
            </div>
          </div>
        </div>

        {/* Menu List */}
        <div className="mt-4">
          <div className="bg-white">
            {menuItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-4 p-4 border-b border-border last:border-b-0 hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{item.label}</span>
                    {item.badge && (
                      <span className="w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Link>
            ))}
          </div>
        </div>

        {/* Logout */}
        <div className="mt-4 p-4">
          <Button variant="outline" className="w-full text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600">
            <LogOut className="w-4 h-4 mr-2" />
            Đăng xuất
          </Button>
        </div>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  )
}
