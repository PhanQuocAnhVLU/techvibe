'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Bell, Search, User, ChevronDown } from 'lucide-react'

const titleMap: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/san-pham': 'Quản lý sản phẩm',
  '/admin/don-hang': 'Quản lý đơn hàng',
  '/admin/khach-hang': 'Quản lý khách hàng',
  '/admin/danh-muc': 'Quản lý danh mục',
  '/admin/thuong-hieu': 'Quản lý thương hiệu',
  '/admin/khuyen-mai': 'Quản lý khuyến mãi',
  '/admin/banner': 'Quản lý banner',
  '/admin/tin-tuc': 'Quản lý tin tức',
  '/admin/bao-cao': 'Báo cáo thống kê',
  '/admin/cai-dat': 'Cài đặt hệ thống',
}

export default function Header() {
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState('')
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  const title = titleMap[pathname] || 'Admin'

  return (
    <header className="h-16 bg-white border-b border-neutral-200 sticky top-0 z-30 shadow-sm">
      <div className="h-full flex items-center justify-between px-4 md:px-6">
        {/* Title + Breadcrumb */}
        <div className="flex flex-col">
          <h1 className="text-lg md:text-xl font-bold text-neutral-900">{title}</h1>
          <p className="text-[10px] md:text-xs text-neutral-500 hidden sm:block">Trang quản trị TechVibe</p>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {/* Search */}
          <div className="hidden md:flex items-center bg-neutral-100 rounded-lg px-3 py-2 w-64">
            <Search className="w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm..."
              className="ml-2 bg-transparent outline-none text-sm flex-1 placeholder:text-neutral-400"
            />
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5 text-neutral-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#e30019] rounded-full" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-neutral-200 py-2 animate-fade-in">
                <div className="px-4 py-2 border-b flex items-center justify-between">
                  <span className="font-semibold text-sm">Thông báo</span>
                  <span className="text-[10px] text-[#e30019]">3 mới</span>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {[
                    { text: 'Đơn hàng mới #TV12345678', time: '5 phút trước', unread: true },
                    { text: 'Sản phẩm iPhone 15 sắp hết hàng', time: '1 giờ trước', unread: true },
                    { text: 'Khách hàng mới đăng ký', time: '3 giờ trước', unread: false },
                  ].map((n, i) => (
                    <div key={i} className={`px-4 py-2 hover:bg-neutral-50 cursor-pointer ${n.unread ? 'bg-blue-50/30' : ''}`}>
                      <p className="text-sm text-neutral-700">{n.text}</p>
                      <p className="text-xs text-neutral-400 mt-0.5">{n.time}</p>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 border-t text-center">
                  <button className="text-xs text-[#e30019] hover:underline">Xem tất cả</button>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 hover:bg-neutral-100 rounded-lg p-1.5 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#e30019] to-[#f26522] flex items-center justify-center text-white font-bold text-sm">
                A
              </div>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-semibold text-neutral-900">Admin</span>
                <span className="text-[10px] text-neutral-500">admin@techvibe.vn</span>
              </div>
              <ChevronDown className="w-4 h-4 text-neutral-400 hidden md:block" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-neutral-200 py-2 animate-fade-in">
                <div className="px-4 py-2 border-b">
                  <p className="font-semibold text-sm">Admin TechVibe</p>
                  <p className="text-xs text-neutral-500">admin@techvibe.vn</p>
                </div>
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-neutral-50">Hồ sơ</button>
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-neutral-50">Cài đặt</button>
                <div className="border-t my-1" />
                <button className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50">Đăng xuất</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}