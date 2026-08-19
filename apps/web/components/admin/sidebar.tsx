'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  LayoutDashboard, Package, ShoppingCart, Users, Tag, FolderTree,
  Award, Image as ImageIcon, Newspaper, Settings, LogOut, Bell,
  Search, ChevronRight, BarChart3
} from 'lucide-react'

const menuItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/san-pham', label: 'Sản phẩm', icon: Package, badge: '19' },
  { href: '/admin/don-hang', label: 'Đơn hàng', icon: ShoppingCart, badge: '0' },
  { href: '/admin/khach-hang', label: 'Khách hàng', icon: Users },
  { href: '/admin/danh-muc', label: 'Danh mục', icon: FolderTree },
  { href: '/admin/thuong-hieu', label: 'Thương hiệu', icon: Award },
  { href: '/admin/khuyen-mai', label: 'Khuyến mãi', icon: Tag },
  { href: '/admin/banner', label: 'Banner', icon: ImageIcon },
  { href: '/admin/tin-tuc', label: 'Tin tức', icon: Newspaper },
  { href: '/admin/bao-cao', label: 'Báo cáo', icon: BarChart3 },
  { href: '/admin/cai-dat', label: 'Cài đặt', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 bg-gradient-to-b from-[#1a1a2e] to-[#16213e] text-white
        transition-all duration-300 flex flex-col
        ${collapsed ? 'w-20' : 'w-64'}
        hidden lg:flex
      `}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10 shrink-0">
          <Link href="/admin" className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#e30019] to-[#f26522] flex items-center justify-center shrink-0">
              <span className="font-black text-white text-xl">T</span>
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="font-bold text-white text-base leading-tight">TechVibe</span>
                <span className="text-[10px] text-white/60 uppercase tracking-wider">Admin Panel</span>
              </div>
            )}
          </Link>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 hover:bg-white/10 rounded-md transition-colors shrink-0"
            title={collapsed ? 'Mở rộng' : 'Thu gọn'}
          >
            <ChevronRight className={`w-4 h-4 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 scrollbar-thin">
          <div className="space-y-1">
            {menuItems.map(item => {
              const Icon = item.icon
              const active = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={collapsed ? item.label : undefined}
                  className={`
                    group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                    transition-all duration-200 relative overflow-hidden
                    ${active
                      ? 'bg-gradient-to-r from-[#e30019] to-[#f26522] text-white shadow-lg shadow-red-500/30'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 shrink-0 ${active ? '' : 'group-hover:scale-110'} transition-transform`} />
                  {!collapsed && <span className="flex-1">{item.label}</span>}
                  {!collapsed && item.badge && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      active ? 'bg-white text-[#e30019]' : 'bg-[#e30019] text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  {active && !collapsed && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-l-full" />
                  )}
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-white/10 shrink-0">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!collapsed && <span>Về trang chủ</span>}
          </Link>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t shadow-lg">
        <div className="grid grid-cols-5 gap-1 p-2">
          {menuItems.slice(0, 5).map(item => {
            const Icon = item.icon
            const active = item.exact ? pathname === item.href : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 py-2 rounded-lg text-[10px] font-medium ${
                  active ? 'bg-red-50 text-[#e30019]' : 'text-neutral-600'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}