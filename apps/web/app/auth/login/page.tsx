'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Eye, EyeOff, Phone, Mail, Lock } from 'lucide-react'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [method, setMethod] = useState<'email' | 'phone'>('phone')
  const [isLogin, setIsLogin] = useState(true)

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
          </div>
        </div>
      </div>

      {/* Header */}
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

      {/* Main */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6">
          <Link href="/" className="text-gray-500 hover:text-[#ca3838]">Trang chủ</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-[#363636]">{isLogin ? 'Đăng nhập' : 'Đăng ký'}</span>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left - Promo */}
          <div className="lg:col-span-2 hidden lg:block">
            <div className="bg-gradient-to-br from-[#ca3838] to-[#ff6b35] rounded-lg p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">Chào mừng bạn!</h2>
              <p className="text-white/90 mb-8">Đăng nhập để nhận nhiều ưu đãi hấp dẫn</p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Tích điểm đổi quà</h3>
                    <p className="text-sm text-white/80">Mỗi đơn hàng được tích điểm thưởng</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Voucher độc quyền</h3>
                    <p className="text-sm text-white/80">Nhận mã giảm giá riêng cho thành viên</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Flash sale sớm</h3>
                    <p className="text-sm text-white/80">Thông báo flash sale trước 24h</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg p-8">
              <h1 className="text-2xl font-bold text-[#363636] mb-2">
                {isLogin ? '�ăng nhập tài khoản' : 'Tạo tài khoản mới'}
              </h1>
              <p className="text-gray-500 mb-6">
                {isLogin ? 'Đăng nhập để tiếp tục mua sắm' : 'Trở thành thành viên TechStore ngay hôm nay'}
              </p>

              {/* Tabs */}
              <div className="flex border-b border-gray-200 mb-6">
                <button
                  onClick={() => setMethod('phone')}
                  className={`flex-1 pb-3 text-center font-medium border-b-2 transition-colors ${
                    method === 'phone'
                      ? 'border-[#ca3838] text-[#ca3838]'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Phone className="w-4 h-4 inline mr-2" />
                  Số điện thoại
                </button>
                <button
                  onClick={() => setMethod('email')}
                  className={`flex-1 pb-3 text-center font-medium border-b-2 transition-colors ${
                    method === 'email'
                      ? 'border-[#ca3838] text-[#ca3838]'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email
                </button>
              </div>

              {/* Form */}
              <form className="space-y-4">
                {method === 'phone' ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                    <div className="flex">
                      <select className="px-3 py-3 border border-gray-300 border-r-0 rounded-l-md bg-gray-50">
                        <option>+84</option>
                      </select>
                      <input
                        type="tel"
                        placeholder="Nhập số điện thoại"
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-r-md focus:outline-none focus:border-[#ca3838]"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      placeholder="email@example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#ca3838]"
                    />
                  </div>
                )}

                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên</label>
                    <input
                      type="text"
                      placeholder="Nhập họ và tên"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#ca3838]"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mật khẩu</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder={isLogin ? 'Nhập mật khẩu' : 'Tạo mật khẩu (tối thiểu 6 ký tự)'}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#ca3838] pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Xác nhận mật khẩu</label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Nhập lại mật khẩu"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#ca3838]"
                    />
                  </div>
                )}

                {isLogin && (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#ca3838]" />
                      <span className="text-sm text-gray-600">Ghi nhớ đăng nhập</span>
                    </label>
                    <Link href="#" className="text-sm text-[#ca3838] hover:underline">Quên mật khẩu?</Link>
                  </div>
                )}

                {!isLogin && (
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#ca3838]" />
                    <span className="text-sm text-gray-600">
                      Tôi đã đọc và đồng ý với <Link href="#" className="text-[#ca3838] hover:underline">Điều khoản sử dụng</Link> và <Link href="#" className="text-[#ca3838] hover:underline">Chính sách bảo mật</Link>
                    </span>
                  </label>
                )}

                <button
                  type="submit"
                  className="w-full bg-[#ca3838] text-white py-3 rounded-md font-semibold hover:bg-[#b32f2f] transition-colors"
                >
                  {isLogin ? 'Đăng nhập' : 'Đăng ký'}
                </button>
              </form>

              {/* Social Login */}
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">Hoặc đăng nhập với</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-4">
                  <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="text-sm font-medium">Google</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                    <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span className="text-sm font-medium">Facebook</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                    <svg className="w-5 h-5" fill="#000" viewBox="0 0 24 24">
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                    </svg>
                    <span className="text-sm font-medium">Apple</span>
                  </button>
                </div>
              </div>

              {/* Switch */}
              <p className="text-center text-sm text-gray-500 mt-6">
                {isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}{' '}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-[#ca3838] font-semibold hover:underline"
                >
                  {isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
