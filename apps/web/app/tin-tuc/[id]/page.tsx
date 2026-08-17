'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Eye, ThumbsUp, MessageCircle, Share2, Facebook, Twitter, Clock, User } from 'lucide-react'

export default function NewsDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="bg-[#ca3838] text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between">
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:opacity-80">Hồ Chí Minh</Link>
            <a href="tel:18002000" className="hidden sm:flex hover:opacity-80">1800.2000</a>
          </div>
        </div>
      </div>

      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-11 h-11 bg-[#ca3838] rounded-lg flex items-center justify-center">
              <span className="font-bold text-white text-2xl">T</span>
            </div>
            <div>
              <span className="font-bold text-xl text-[#363636]">Tech</span>
              <span className="font-bold text-xl text-[#ca3838]">Store</span>
            </div>
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center gap-2 text-sm mb-6">
          <Link href="/" className="text-gray-500 hover:text-[#ca3838]">Trang chủ</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <Link href="/tin-tuc" className="text-gray-500 hover:text-[#ca3838]">Tin tức</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-[#363636]">Bài viết</span>
        </div>

        <article className="bg-white rounded-lg p-8 mb-6">
          <span className="px-3 py-1 bg-[#fef6f6] text-[#ca3838] text-xs font-semibold rounded-full">iPhone</span>
          <h1 className="text-3xl font-bold text-[#363636] mt-4 mb-4">iPhone 16 Pro lộ diện với thiết kế hoàn toàn mới</h1>
          <div className="flex items-center gap-4 text-sm text-gray-500 pb-6 border-b">
            <span className="flex items-center gap-1"><User className="w-4 h-4" /> Nguyễn Văn A</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 16/08/2024</span>
            <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> 1,234 lượt xem</span>
          </div>

          <img src="/api/placeholder/800/450" alt="" className="w-full aspect-video object-cover rounded-lg my-6" />

          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Theo nguồn tin từ Apple, iPhone 16 Pro sẽ có thiết kế hoàn toàn mới với viền màn hình siêu mỏng. Đây là bước nhảy vọt trong thiết kế của Apple sau nhiều năm.
            </p>
            <h2 className="text-xl font-bold text-[#363636] mt-6 mb-3">Thiết kế mới</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              iPhone 16 Pro sẽ có viền màn hình chỉ 1.2mm, mỏng hơn đáng kể so với 1.5mm trên iPhone 15 Pro. Điều này giúp tăng diện tích hiển thị mà không làm tăng kích thước tổng thể.
            </p>
            <h2 className="text-xl font-bold text-[#363636] mt-6 mb-3">Cấu hình mạnh mẽ</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Máy được trang bị chip A18 Pro mới nhất với tiến trình 3nm, cho hiệu năng CPU tăng 15% và GPU tăng 20% so với thế hệ trước. RAM được nâng cấp lên 12GB.
            </p>
            <h2 className="text-xl font-bold text-[#363636] mt-6 mb-3">Camera cải tiến</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Hệ thống camera với cảm biến chính 48MP, camera góc siêu rộng 48MP mới và camera telephoto 5x. Đặc biệt, Apple đã tích hợp công nghệ AI vào xử lý ảnh.
            </p>
          </div>

          <div className="flex items-center gap-4 mt-8 pt-6 border-t">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100">
              <ThumbsUp className="w-4 h-4" />
              <span>Hữu ích (234)</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-600 rounded-md hover:bg-gray-100">
              <Share2 className="w-4 h-4" />
              <span>Chia sẻ</span>
            </button>
          </div>
        </article>

        {/* Related */}
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-xl font-bold text-[#363636] mb-4">Bài viết liên quan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <Link key={i} href={`/tin-tuc/${i}`} className="group">
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden mb-2">
                  <img src={`/api/placeholder/300/200`} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <h3 className="font-medium text-sm line-clamp-2 group-hover:text-[#ca3838]">Bài viết liên quan {i}</h3>
                <p className="text-xs text-gray-500 mt-1">16/08/2024</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}