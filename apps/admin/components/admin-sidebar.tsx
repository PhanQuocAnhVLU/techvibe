'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, Package, ShoppingCart, Users, Tag, 
  BarChart3, Settings, Bell, Warehouse, FileText, LogOut, Menu, X,
  ChevronDown, ChevronRight, Plus
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const menuItems = [
  { 
    href: '/', 
    icon: LayoutDashboard, 
    label: 'Dashboard' 
  },
  { 
    href: '/san-pham', 
    icon: Package, 
    label: 'Sản phẩm',
    children: [
      { href: '/san-pham', label: 'Danh sách sản phẩm' },
      { href: '/san-pham/them', label: 'Thêm sản phẩm' },
      { href: '/danh-muc', label: 'Danh mục' },
      { href: '/thuong-hieu', label: 'Thương hiệu' },
    ]
  },
  { 
    href: '/don-hang', 
    icon: ShoppingCart, 
    label: 'Đơn hàng',
    children: [
      { href: '/don-hang', label: 'Tất cả đơn hàng' },
      { href: '/don-hang/cho-xac-nhan', label: 'Chờ xác nhận' },
      { href: '/don-hang/dang-xu-ly', label: 'Đang xử lý' },
      { href: '/don-hang/da-hoan-thanh', label: 'Đã hoàn thành' },
    ]
  },
  { 
    href: '/khach-hang', 
    icon: Users, 
    label: 'Khách hàng' 
  },
  { 
    href: '/khuyen-mai', 
    icon: Tag, 
    label: 'Khuyến mãi',
    children: [
      { href: '/khuyen-mai', label: 'Voucher' },
      { href: '/flash-sale', label: 'Flash Sale' },
      { href: '/khuyen-mai/bundle', label: 'Bundle Deal' },
    ]
  },
  { 
    href: '/kho-hang', 
    icon: Warehouse, 
    label: 'Kho hàng' 
  },
  { 
    href: '/bao-cao', 
    icon: BarChart3, 
    label: 'Báo cáo',
    children: [
      { href: '/bao-cao', label: 'Doanh thu' },
      { href: '/bao-cao/san-pham', label: 'Sản phẩm' },
      { href: '/bao-cao/khach-hang', label: 'Khách hàng' },
    ]
  },
  { 
    href: '/bai-viet', 
    icon: FileText, 
    label: 'Bài viết' 
  },
  { 
    href: '/cai-dat', 
    icon: Settings, 
    label: 'Cài đặt' 
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['/san-pham', '/don-hang'])

  const toggleMenu = (href: string) => {
    setExpandedMenus(prev =>
      prev.includes(href)
        ? prev.filter(h => h !== href)
        : [...prev, href]
    )
  }

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <aside className={cn(
      'bg-sidebar text-white h-screen fixed left-0 top-0 flex flex-col transition-all duration-300 z-40',
      isCollapsed ? 'w-16' : 'w-64'
    )}>
      {/* Logo */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="font-bold text-lg">T</span>
              </div>
              <div>
                <span className="font-bold">Tech</span>
                <span className="font-bold text-primary">Store</span>
                <p className="text-[10px] text-gray-400">Admin Panel</p>
              </div>
            </Link>
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
          {menuItems.map((item) => (
            <li key={item.href}>
              {item.children ? (
                <div>
                  <button
                    onClick={() => toggleMenu(item.href)}
                    className={cn(
                      'flex items-center gap-3 w-full px-3 py-2.5 rounded-md transition-colors',
                      'hover:bg-white/10',
                      isActive(item.href) && 'bg-primary'
                    )}
                  >
                    <item.icon className="w-5 h-5 shrink-0" />
                    {!isCollapsed && (
                      <>
                        <span className="flex-1 text-left font-medium">{item.label}</span>
                        <ChevronDown className={cn(
                          'w-4 h-4 transition-transform',
                          expandedMenus.includes(item.href) && 'rotate-180'
                        )} />
                      </>
                    )}
                  </button>
                  {!isCollapsed && expandedMenus.includes(item.href) && (
                    <ul className="ml-8 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={cn(
                              'flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors',
                              pathname === child.href
                                ? 'bg-white/10 text-primary'
                                : 'text-gray-300 hover:bg-white/5 hover:text-white'
                            )}
                          >
                            <ChevronRight className="w-3 h-3" />
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors',
                    isActive(item.href) 
                      ? 'bg-primary text-white' 
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  )}
                >
                  <item.icon className="w-5 h-5 shrink-0" />
                  {!isCollapsed && <span className="font-medium">{item.label}</span>}
                </Link>
              )}
            </li>
          ))}
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
