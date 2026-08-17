'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Grid3X3, Search, ShoppingCart, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/', icon: Home, label: 'Trang chủ' },
  { href: '/san-pham/dien-thoai', icon: Grid3X3, label: 'Danh mục' },
  { href: '/san-pham/dien-thoai', icon: Search, label: 'Tìm kiếm' },
  { href: '/gio-hang', icon: ShoppingCart, label: 'Giỏ hàng', badge: 3 },
  { href: '/tai-khoan', icon: User, label: 'Tài khoản' },
]

export function MobileBottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border md:hidden z-50 safe-area-bottom">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/' && pathname.startsWith(item.href.split('/')[1] ? '/' + item.href.split('/')[1] : ''))
          
          return (
            <Link
              key={item.href + item.label}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center py-2 px-3 min-w-[60px]',
                isActive ? 'text-primary' : 'text-gray-500'
              )}
            >
              <div className="relative">
                <item.icon className="w-5 h-5" />
                {item.badge && (
                  <span className="absolute -top-1 -right-2 w-4 h-4 bg-primary text-white text-[10px] rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
