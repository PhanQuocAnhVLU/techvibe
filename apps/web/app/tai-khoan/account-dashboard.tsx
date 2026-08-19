'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  User, Package, Heart, MapPin, Settings,
  LogOut, Edit, Gift, CreditCard, Bell, HelpCircle,
  Award, Phone, Mail, Calendar, ChevronRight
} from 'lucide-react'
import { signOut } from '@/lib/auth-client'
import { createBrowserClient } from '@supabase/ssr'

interface AccountDashboardProps {
  user: any
}

export function AccountDashboard({ user }: AccountDashboardProps) {
  const router = useRouter()
  const [orderCount, setOrderCount] = useState(0)
  const [wishlistCount, setWishlistCount] = useState(0)

  const profile = user.profile
  const fullName = profile?.full_name || user.email?.split('@')[0] || 'User'
  const tierLabel = { bronze: 'Đồng', silver: 'Bạc', gold: 'Vàng', diamond: 'Kim cương' }[profile?.tier as string] || 'Đồng'

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const fetchCounts = async () => {
      const [orders, wishlist] = await Promise.all([
        supabase.from('orders').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('wishlists').select('id', { count: 'exact', head: true }).eq('user_id', user.id),
      ])
      setOrderCount(orders.count ?? 0)
      setWishlistCount(wishlist.count ?? 0)
    }
    fetchCounts()
  }, [user.id])

  const handleLogout = async () => {
    await signOut()
    router.push('/')
    router.refresh()
  }

  const menuItems = [
    { id: 'info', icon: User, label: 'Thông tin cá nhân' },
    { id: 'orders', icon: Package, label: 'Đơn hàng của tôi', count: orderCount, href: '/tai-khoan/don-hang' },
    { id: 'wishlist', icon: Heart, label: 'Sản phẩm yêu thích', count: wishlistCount, href: '/tai-khoan/yeu-thich' },
    { id: 'points', icon: Award, label: 'Điểm thưởng', count: profile?.loyalty_points?.toLocaleString() || '0' },
    { id: 'voucher', icon: Gift, label: 'Voucher của tôi', count: 0 },
    { id: 'payment', icon: CreditCard, label: 'Phương thức thanh toán' },
    { id: 'notification', icon: Bell, label: 'Thông báo' },
    { id: 'settings', icon: Settings, label: 'Cài đặt tài khoản' },
    { id: 'support', icon: HelpCircle, label: 'Trợ giúp & Hỗ trợ' },
  ]

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-11 h-11 bg-[#ca3838] rounded-lg flex items-center justify-center">
                <span className="font-bold text-white text-2xl">T</span>
              </div>
              <div>
                <span className="font-bold text-xl text-[#363636]">Tech</span>
                <span className="font-bold text-xl text-[#ca3838]">Vibe</span>
              </div>
            </Link>
            <Link href="/" className="text-sm text-gray-500 hover:text-[#ca3838]">Về trang chủ</Link>
          </div>
        </div>
      </header>

      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-[#ca3838]">Trang chủ</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-[#363636]">Tài khoản của tôi</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1">
            <div className="bg-gradient-to-br from-[#ca3838] to-[#ff6b35] rounded-lg p-6 text-white mb-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
                  {fullName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-lg">{fullName}</p>
                  <p className="text-white/80 text-sm">Thành viên {tierLabel}</p>
                </div>
              </div>
              <div className="flex items-center justify-between bg-white/10 rounded-lg p-3">
                <div>
                  <p className="text-xs text-white/80">Điểm thưởng</p>
                  <p className="text-xl font-bold">{profile?.loyalty_points?.toLocaleString() || 0}</p>
                </div>
                <Award className="w-8 h-8 text-white/60" />
              </div>
            </div>

            <nav className="bg-white rounded-lg overflow-hidden">
              {menuItems.map(item => (
                <Link
                  key={item.id}
                  href={item.href || '#'}
                  className="w-full flex items-center justify-between gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-gray-700"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm">{item.label}</span>
                  </div>
                  {item.count !== undefined && item.count !== 0 && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                      {item.count}
                    </span>
                  )}
                </Link>
              ))}
              <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 transition-colors border-t">
                <LogOut className="w-5 h-5" />
                <span className="text-sm">Đăng xuất</span>
              </button>
            </nav>
          </aside>

          <main className="lg:col-span-3 space-y-4">
            <div className="bg-white rounded-lg p-6">
              <h1 className="text-2xl font-bold text-[#363636] mb-2">Xin chào, {fullName}!</h1>
              <p className="text-gray-500">Quản lý thông tin và đơn hàng của bạn</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatBox label="Đơn hàng" value={orderCount} icon={Package} color="bg-blue-100 text-blue-600" />
              <StatBox label="Yêu thích" value={wishlistCount} icon={Heart} color="bg-red-100 text-red-600" />
              <StatBox label="Voucher" value={0} icon={Gift} color="bg-orange-100 text-orange-600" />
              <StatBox label="Điểm" value={profile?.loyalty_points?.toLocaleString() || '0'} icon={Award} color="bg-purple-100 text-purple-600" />
            </div>

            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg font-bold text-[#363636] mb-4">Thông tin cá nhân</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <InfoItem icon={User} label="Họ và tên" value={fullName} />
                <InfoItem icon={Phone} label="Số điện thoại" value={profile?.phone || 'Chưa cập nhật'} />
                <InfoItem icon={Mail} label="Email" value={user.email || ''} />
                <InfoItem icon={Calendar} label="Ngày tham gia" value={new Date(user.created_at).toLocaleDateString('vi-VN')} />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

function StatBox({ label, value, icon: Icon, color }: any) {
  return (
    <div className="bg-white rounded-lg p-4">
      <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center mb-2`}>
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-2xl font-bold text-[#363636]">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  )
}

function InfoItem({ icon: Icon, label, value }: any) {
  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
      <Icon className="w-5 h-5 text-gray-400" />
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-medium text-[#363636]">{value}</p>
      </div>
    </div>
  )
}