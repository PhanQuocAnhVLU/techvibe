'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ChevronRight, Phone, Mail, MapPin, Clock,
  Facebook, Youtube, Instagram, Send, Sparkles,
  Award, TrendingUp, Package
} from 'lucide-react'
import { AnnouncementBar } from '@/components/cellphones/announcement-bar'
import { Header } from '@/components/cellphones/header'
import { SidebarMenu } from '@/components/cellphones/sidebar-menu'
import { HomeBanner } from '@/components/cellphones/home-banner'
import { RightBanner } from '@/components/cellphones/right-banner'
import { FlashSale } from '@/components/cellphones/flash-sale'
import { ProductSection } from '@/components/cellphones/product-section'
import { ServiceStrip } from '@/components/cellphones/service-strip'
import { BrandList } from '@/components/cellphones/brand-list'
import { useApp } from '@/lib/app-context'

const featuredProducts = [
  { id: 1, name: 'iPhone 15 Pro Max 256GB', price: 32990000, originalPrice: 34990000, rating: 4.8, reviews: 1245, sold: 234, brand: 'Apple' },
  { id: 2, name: 'Samsung Galaxy S24 Ultra', price: 28990000, originalPrice: 31990000, rating: 4.7, reviews: 892, sold: 189, brand: 'Samsung' },
  { id: 3, name: 'MacBook Pro 14 M3', price: 45990000, originalPrice: 49990000, rating: 4.9, reviews: 567, sold: 67, brand: 'Apple' },
  { id: 4, name: 'AirPods Pro 2', price: 6990000, originalPrice: 7990000, rating: 4.9, reviews: 3456, sold: 456, brand: 'Apple' },
  { id: 5, name: 'iPad Pro 11 inch M2', price: 27990000, originalPrice: 29990000, rating: 4.8, reviews: 789, sold: 89, brand: 'Apple' },
  { id: 6, name: 'Samsung Galaxy Watch 6', price: 8990000, originalPrice: 11990000, rating: 4.6, reviews: 456, sold: 123, brand: 'Samsung' },
  { id: 7, name: 'Xiaomi 14 Pro', price: 18990000, originalPrice: 21990000, rating: 4.6, reviews: 567, sold: 78, brand: 'Xiaomi' },
  { id: 8, name: 'OPPO Find X7 Pro', price: 15990000, originalPrice: 17990000, rating: 4.5, reviews: 234, sold: 45, brand: 'OPPO' },
  { id: 9, name: 'vivo X100 Pro', price: 16990000, originalPrice: 18990000, rating: 4.7, reviews: 178, sold: 34, brand: 'vivo' },
  { id: 10, name: 'Realme GT5 Pro', price: 12990000, originalPrice: 14990000, rating: 4.5, reviews: 345, sold: 89, brand: 'Realme' },
]

const phoneProducts = [
  { id: 1, name: 'iPhone 15 Pro Max 256GB', price: 32990000, originalPrice: 34990000, rating: 4.8, reviews: 1245, brand: 'Apple' },
  { id: 11, name: 'iPhone 15 Plus 128GB', price: 22990000, originalPrice: 24990000, rating: 4.7, reviews: 567, brand: 'Apple' },
  { id: 12, name: 'iPhone 15 128GB', price: 19990000, originalPrice: 21990000, rating: 4.8, reviews: 2103, brand: 'Apple' },
  { id: 13, name: 'iPhone 14 128GB', price: 15990000, originalPrice: 17990000, rating: 4.6, reviews: 3456, brand: 'Apple' },
  { id: 14, name: 'Samsung Galaxy A55 5G', price: 8490000, originalPrice: 9990000, rating: 4.5, reviews: 234, brand: 'Samsung' },
]

const laptopProducts = [
  { id: 3, name: 'MacBook Pro 14 M3', price: 45990000, originalPrice: 49990000, rating: 4.9, reviews: 567, brand: 'Apple' },
  { id: 15, name: 'MacBook Air M2 13 inch', price: 26990000, originalPrice: 29990000, rating: 4.8, reviews: 432, brand: 'Apple' },
  { id: 16, name: 'Dell XPS 13 Plus', price: 38990000, originalPrice: 41990000, rating: 4.7, reviews: 234, brand: 'Dell' },
  { id: 17, name: 'ASUS ROG Strix G16', price: 29990000, originalPrice: 32990000, rating: 4.8, reviews: 156, brand: 'ASUS' },
  { id: 18, name: 'MacBook Air M3', price: 32990000, originalPrice: 39990000, rating: 4.9, reviews: 289, brand: 'Apple' },
]

const newsItems = [
  { id: 1, title: 'iPhone 16 Pro lộ diện với thiết kế hoàn toàn mới', date: '16/08/2024', brand: 'Apple' },
  { id: 2, title: 'Samsung Galaxy S25 Ultra sẽ có camera 200MP?', date: '15/08/2024', brand: 'Samsung' },
  { id: 3, title: 'MacBook Air M4 ra mắt cuối năm nay', date: '14/08/2024', brand: 'Apple' },
]

function NewsletterSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-4">
      <div className="bg-gradient-to-r from-cps-red to-cps-red-light rounded-xl overflow-hidden p-6 md:p-8 text-white relative">
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-yellow-400/20 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-bold mb-2">Đăng ký nhận tin khuyến mãi</h3>
            <p className="text-sm text-white/90">
              Nhận ngay voucher <span className="font-bold text-yellow-300">500.000đ</span> cho đơn hàng đầu tiên!
            </p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              placeholder="Nhập email của bạn..."
              className="flex-1 md:w-80 px-4 py-3 rounded-md text-cps-text focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
            />
            <button className="px-5 py-3 bg-white text-cps-red font-bold rounded-md hover:bg-yellow-300 transition-colors flex items-center gap-1 shrink-0">
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Đăng ký</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function NewsSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-3">
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-1 h-6 bg-cps-red rounded-full" />
            <h2 className="text-base font-bold text-cps-text">Tin công nghệ</h2>
          </div>
          <Link href="/tin-tuc" className="text-cps-red hover:underline flex items-center gap-1 text-sm font-medium">
            Xem tất cả <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {newsItems.map((item) => (
            <Link
              key={item.id}
              href={`/tin-tuc/${item.id}`}
              className="group shine-card bg-white rounded-lg overflow-hidden border border-neutral-200 hover:shadow-md transition-all"
            >
              <div className="aspect-video bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center relative overflow-hidden">
                <span className="text-4xl opacity-30">{item.brand === 'Apple' ? '🍎' : item.brand === 'Samsung' ? '📱' : '💻'}</span>
                <div className="absolute top-2 left-2 px-2 py-0.5 bg-cps-red text-white text-[10px] font-bold rounded">
                  {item.brand}
                </div>
              </div>
              <div className="p-3">
                <p className="text-[10px] text-neutral-500 mb-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {item.date}
                </p>
                <h3 className="text-sm font-semibold text-cps-text group-hover:text-cps-red transition-colors line-clamp-2">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-neutral-900 text-white mt-6">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 bg-cps-red rounded-lg flex items-center justify-center">
                <span className="font-black text-white text-xl">T</span>
              </div>
              <div>
                <span className="font-bold text-lg">Tech</span>
                <span className="font-bold text-lg text-cps-red">Vibe</span>
              </div>
            </div>
            <p className="text-xs text-neutral-400 mb-3">
              Cửa hàng công nghệ hàng đầu Việt Nam với hơn 10 năm kinh nghiệm.
            </p>
            <div className="flex items-center gap-2">
              <a href="#" className="w-8 h-8 bg-neutral-800 hover:bg-cps-red rounded-full flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-neutral-800 hover:bg-cps-red rounded-full flex items-center justify-center transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-neutral-800 hover:bg-cps-red rounded-full flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-3 text-white">Thông tin</h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><Link href="/gioi-thieu" className="hover:text-white">Giới thiệu</Link></li>
              <li><Link href="/tin-tuc" className="hover:text-white">Tin tức</Link></li>
              <li><Link href="/lien-he" className="hover:text-white">Liên hệ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-3 text-white">Hỗ trợ</h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><Link href="#" className="hover:text-white">Hướng dẫn mua hàng</Link></li>
              <li><Link href="#" className="hover:text-white">Chính sách đổi trả</Link></li>
              <li><Link href="#" className="hover:text-white">Chính sách bảo hành</Link></li>
              <li><Link href="#" className="hover:text-white">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-3 text-white">Liên hệ</h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li className="flex items-start gap-1.5">
                <MapPin className="w-3 h-3 mt-0.5 shrink-0" />
                <span>123 Nguyễn Trãi, P.Bến Thành, Q.1, TP.HCM</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Phone className="w-3 h-3 shrink-0" />
                <span>1900.2000</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Mail className="w-3 h-3 shrink-0" />
                <span>cskh@techvibe.vn</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-8 pt-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-neutral-500">
          <p>© 2024 TechVibe. Tất cả quyền được bảo lưu.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white">Chính sách bảo mật</Link>
            <Link href="#" className="hover:text-white">Điều khoản sử dụng</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f2f2f3]">
      <AnnouncementBar />
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-3">
        {/* Hero: Sidebar + Banner + Right Banner */}
        <div className="flex gap-3 mb-4">
          <SidebarMenu />
          <HomeBanner />
          <RightBanner />
        </div>

        {/* Service Strip */}
        <ServiceStrip />

        {/* Flash Sale */}
        <FlashSale />
      </main>

      <div className="max-w-7xl mx-auto">
        <ProductSection
          title="Sản phẩm nổi bật"
          subtitle="Được yêu thích nhất tuần qua"
          products={featuredProducts}
          tabs={[
            { id: 'hot', label: 'Nổi bật' },
            { id: 'new', label: 'Mới nhất' },
            { id: 'bestseller', label: 'Bán chạy' },
          ]}
          icon={<Award className="w-5 h-5 text-cps-red" />}
          columns={5}
        />

        <ProductSection
          title="Điện thoại nổi bật"
          subtitle="iPhone, Samsung, Xiaomi..."
          products={phoneProducts}
          viewAllHref="/san-pham?danh-muc=dien-thoai"
          bgColor=""
          icon={<Phone className="w-5 h-5 text-cps-red" />}
          columns={5}
        />

        <ProductSection
          title="Laptop hot"
          subtitle="Macbook, Dell, ASUS..."
          products={laptopProducts}
          viewAllHref="/san-pham?danh-muc=laptop"
          bgColor=""
          icon={<Package className="w-5 h-5 text-cps-red" />}
          columns={5}
        />

        <BrandList />
        <NewsletterSection />
        <NewsSection />
      </div>

      <Footer />
    </div>
  )
}