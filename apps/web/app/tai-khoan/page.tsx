'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ChevronRight, User, Package, Heart, MapPin, Settings, 
  LogOut, Edit, Star, Gift, CreditCard, Bell, HelpCircle,
  Award, Phone, Mail, Calendar
} from 'lucide-react'

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('info')

  const menuItems = [
    { id: 'info', icon: User, label: 'Thông tin cá nhân' },
    { id: 'orders', icon: Package, label: 'Đơn hàng của tôi', count: 12 },
    { id: 'wishlist', icon: Heart, label: 'Sản phẩm yêu thích', count: 5 },
    { id: 'address', icon: MapPin, label: 'Sổ địa chỉ' },
    { id: 'points', icon: Award, label: 'Điểm thư�ng & Xu', count: '1,250' },
    { id: 'voucher', icon: Gift, label: 'Voucher của tôi', count: 8 },
    { id: 'payment', icon: CreditCard, label: 'Phương thức thanh toán' },
    { id: 'notification', icon: Bell, label: 'Thông báo' },
    { id: 'settings', icon: Settings, label: 'Cài đặt tài khoản' },
    { id: 'support', icon: HelpCircle, label: 'Trợ giúp & Hỗ trợ' },
  ]

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Top Bar */}
      <div className="bg-[#ca3838] text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link href="#" className="hover:opacity-80">Hồ Chí Minh</Link>
              <Link href="tel:18002000" className="hidden sm:flex items-center gap-1 hover:opacity-80">1800.2000</Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/tra-cuu-don-hang" className="hover:opacity-80">Tra cứu đơn hàng</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-11 h-11 bg-[#ca3838] rounded-lg flex items-center justify-center">
                <span className="font-bold text-white text-2xl">T</span>
              </div>
              <div>
                <span className="font-bold text-xl text-[#363636]">Tech</span>
                <span className="font-bold text-xl text-[#ca3838]">Store</span>
              </div>
            </Link>
            <Link href="/" className="text-sm text-gray-500 hover:text-[#ca3838]">
              Về trang chủ
            </Link>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
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
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            {/* User Card */}
            <div className="bg-gradient-to-br from-[#ca3838] to-[#ff6b35] rounded-lg p-6 text-white mb-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
                  N
                </div>
                <div>
                  <p className="font-semibold text-lg">Nguyễn Văn A</p>
                  <p className="text-white/80 text-sm">Thành viên Vàng</p>
                </div>
              </div>
              <div className="flex items-center justify-between bg-white/10 rounded-lg p-3">
                <div>
                  <p className="text-xs text-white/80">Điểm thưởng</p>
                  <p className="text-xl font-bold">1,250</p>
                </div>
                <Award className="w-8 h-8 text-white/60" />
              </div>
            </div>

            {/* Menu */}
            <nav className="bg-white rounded-lg overflow-hidden">
              {menuItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${
                    activeTab === item.id ? 'bg-[#fef6f6] text-[#ca3838] font-medium border-l-4 border-[#ca3838]' : 'text-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm">{item.label}</span>
                  </div>
                  {item.count !== undefined && (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      activeTab === item.id ? 'bg-[#ca3838] text-white' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {item.count}
                    </span>
                  )}
                </button>
              ))}
              <button className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 transition-colors border-t">
                <LogOut className="w-5 h-5" />
                <span className="text-sm">Đăng xuất</span>
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3 space-y-4">
            {/* Welcome */}
            <div className="bg-white rounded-lg p-6">
              <h1 className="text-2xl font-bold text-[#363636] mb-2">Xin chào, Nguyễn Văn A!</h1>
              <p className="text-gray-500">Quản lý thông tin và đơn hàng của bạn</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Đơn hàng', value: '12', icon: Package, color: 'bg-blue-100 text-blue-600' },
                { label: 'Yêu thích', value: '5', icon: Heart, color: 'bg-red-100 text-red-600' },
                { label: 'Voucher', value: '8', icon: Gift, color: 'bg-orange-100 text-orange-600' },
                { label: 'Điểm', value: '1,250', icon: Award, color: 'bg-purple-100 text-purple-600' },
              ].map((stat, idx) => (
                <div key={idx} className="bg-white rounded-lg p-4">
                  <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center mb-2`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <p className="text-2xl font-bold text-[#363636]">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Personal Info */}
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-[#363636]">Thông tin cá nhân</h2>
                <button className="text-[#ca3838] text-sm font-medium hover:underline flex items-center gap-1">
                  <Edit className="w-4 h-4" />
                  Chỉnh sửa
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <InfoItem icon={User} label="Họ và tên" value="Nguyễn Văn A" />
                <InfoItem icon={Phone} label="Số điện thoại" value="0912 345 678" />
                <InfoItem icon={Mail} label="Email" value="nguyenvana@email.com" />
                <InfoItem icon={Calendar} label="Ngày sinh" value="15/03/1995" />
                <InfoItem icon={MapPin} label="Địa chỉ" value="Quận 1, TP. Hồ Chí Minh" fullWidth />
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-[#363636]">Đơn hàng gần đây</h2>
                <Link href="/tai-khoan/don-hang" className="text-[#ca3838] text-sm font-medium hover:underline">
                  Xem tất cả
                </Link>
              </div>
              <div className="space-y-3">
                {[
                  { id: 'TS123456', date: '15/08/2024', total: '32.990.000đ', status: 'shipping' },
                  { id: 'TS123455', date: '10/08/2024', total: '15.990.000đ', status: 'completed' },
                  { id: 'TS123454', date: '05/08/2024', total: '6.990.000đ', status: 'completed' },
                ].map(order => (
                  <Link key={order.id} href={`/tai-khoan/don-hang/${order.id}`} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-[#ca3838] hover:bg-[#fef6f6] transition-all">
                    <div>
                      <p className="font-medium text-[#363636]">#{order.id}</p>
                      <p className="text-sm text-gray-500">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-[#ca3838]">{order.total}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        order.status === 'shipping' ? 'bg-indigo-100 text-indigo-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {order.status === 'shipping' ? 'Đang giao' : 'Hoàn thành'}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

function InfoItem({ icon: Icon, label, value, fullWidth }: any) {
  return (
    <div className={`flex items-center gap-3 p-3 bg-gray-50 rounded-lg ${fullWidth ? 'md:col-span-2' : ''}`}>
      <Icon className="w-5 h-5 text-gray-400" />
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-medium text-[#363636]">{value}</p>
      </div>
    </div>
  )
}
