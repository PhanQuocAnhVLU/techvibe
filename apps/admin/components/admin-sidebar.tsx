'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, Package, ShoppingCart, Users, Tag, 
  BarChart3, Settings, Bell, Warehouse, FileText, LogOut, Menu, X 
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const menuItems = [
  { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/san-pham', icon: Package, label: 'Sản phẩm' },
  { href: '/don-hang', icon: ShoppingCart, label: 'Đơn hàng' },
  { href: '/khach-hang', icon: Users, label: 'Khách hàng' },
  { href: '/khuyen-mai', icon: Tag, label: 'Khuyến mãi' },
  { href: '/kho-hang', icon: Warehouse, label: 'Kho hàng' },
  { href: '/bao-cao', icon: BarChart3, label: 'Báo cáo' },
  { href: '/bai-viet', icon: FileText, label: 'Bài viết' },
  { href: '/cai-dat', icon: Settings, label: 'Cài đặt' },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <aside className={cn(
      'bg-sidebar text-white h-screen fixed left-0 top-0 flex flex-col transition-all duration-300 z-40',
      isCollapsed ? 'w-16' : 'w-64'
    )}>
      {/* Logo */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div>
              <span className="font-bold text-xl">Tech</span>
              <span className="font-bold text-xl text-primary">Store</span>
              <p className="text-xs text-gray-400">Admin Panel</p>
            </div>
          )}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-white/10 rounded transition-colors"
          >
            {isCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors',
                    isActive 
                      ? 'bg-primary text-white' 
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  )}
                >
                  <item.icon className="w-5 h-5 shrink-0" />
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shrink-0">
            <span className="font-semibold">A</span>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">Admin</p>
              <p className="text-xs text-gray-400 truncate">admin@techstore.vn</p>
            </div>
          )}
          <button className="p-2 hover:bg-white/10 rounded transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  )
}
