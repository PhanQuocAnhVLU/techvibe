'use client'

import Link from 'next/link'
import {
  Smartphone, Laptop, Tablet, Watch, Headphones, Camera,
  Tv, Home as HomeIcon, Plug, Gamepad2, Speaker, Wrench,
  ChevronRight, Recycle, Percent, Package
} from 'lucide-react'

const iconMap: Record<string, any> = {
  Smartphone, Laptop, Tablet, Watch, Headphones, Camera,
  Tv, HomeIcon, Plug, Gamepad2, Speaker, Wrench,
  Package, Recycle, Percent,
}

interface Category {
  id: string
  name: string
  slug: string
  icon: string | null
}

export function SidebarMenu({ categories }: { categories: Category[] }) {
  const fallback = [
    { name: 'Điện thoại', icon: Smartphone, href: '/san-pham?danh-muc=dien-thoai', hot: true },
    { name: 'Laptop', icon: Laptop, href: '/san-pham?danh-muc=laptop' },
    { name: 'Tablet', icon: Tablet, href: '/san-pham?danh-muc=tablet' },
    { name: 'Âm thanh', icon: Headphones, href: '/san-pham?danh-muc=am-thanh' },
    { name: 'Đồng hồ thông minh', icon: Watch, href: '/san-pham?danh-muc=dong-ho' },
    { name: 'Tivi', icon: Tv, href: '/san-pham?danh-muc=tivi' },
    { name: 'Nhà thông minh', icon: HomeIcon, href: '/san-pham?danh-muc=smart-home' },
    { name: 'Phụ kiện', icon: Plug, href: '/san-pham?danh-muc=phu-kien' },
    { name: 'Máy ảnh - Quay phim', icon: Camera, href: '/san-pham?danh-muc=may-anh' },
    { name: 'Gaming Gear', icon: Gamepad2, href: '/san-pham?danh-muc=gaming' },
    { name: 'Loa', icon: Speaker, href: '/san-pham?danh-muc=loa' },
    { name: 'Thu cũ đổi mới', icon: Recycle, href: '/thu-cu', highlight: true },
    { name: 'Khuyến mãi', icon: Percent, href: '/khuyen-mai', highlight: true },
    { name: 'Sửa chữa', icon: Wrench, href: '/sua-chua' },
  ]

  // Use DB categories if available, fallback to static
  const list = categories && categories.length > 0
    ? categories.map((c) => {
        const Icon = iconMap[c.icon || ''] || Package
        const href = c.slug === 'thu-cu' ? '/thu-cu'
          : c.slug === 'khuyen-mai' ? '/khuyen-mai'
          : c.slug === 'sua-chua' ? '/sua-chua'
          : `/san-pham?danh-muc=${c.slug}`
        return {
          name: c.name,
          icon: Icon,
          href,
          highlight: c.slug === 'thu-cu' || c.slug === 'khuyen-mai',
        }
      })
    : fallback

  return (
    <aside className="hidden md:block w-56 shrink-0">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <ul className="py-2">
          {list.map((cat: any) => {
            const Icon = cat.icon
            return (
              <li key={cat.name}>
                <Link
                  href={cat.href}
                  className="group flex items-center gap-3 px-4 h-10 hover:bg-neutral-100 transition-colors"
                >
                  <Icon className={`w-4 h-4 shrink-0 ${cat.highlight ? 'text-cps-red' : 'text-neutral-500 group-hover:text-cps-red'} transition-colors`} />
                  <span className={`text-xs font-semibold flex-1 ${cat.highlight ? 'text-cps-red' : 'text-neutral-700 group-hover:text-cps-red'} transition-colors`}>
                    {cat.name}
                  </span>
                  {cat.hot && (
                    <span className="px-1.5 py-0.5 text-[8px] font-bold bg-cps-red text-white rounded">HOT</span>
                  )}
                  {cat.highlight && !cat.hot && (
                    <span className="px-1.5 py-0.5 text-[8px] font-bold bg-yellow-400 text-cps-red rounded">NEW</span>
                  )}
                  <ChevronRight className="w-3 h-3 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </aside>
  )
}
