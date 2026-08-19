'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronRight, Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react'
import { signIn, signUp } from '@/lib/auth-client'

export default function AuthPage() {
  const router = useRouter()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      if (mode === 'login') {
        const { error } = await signIn(email, password)
        if (error) throw error
        router.push('/tai-khoan')
        router.refresh()
      } else {
        if (password.length < 6) {
          throw new Error('Mật khẩu phải có ít nhất 6 ký tự')
        }
        const { error } = await signUp(email, password, fullName)
        if (error) throw error
        setError('Đăng ký thành công! Vui lòng kiểm tra email để xác nhận.')
        setTimeout(() => setMode('login'), 3000)
      }
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra')
    } finally {
      setLoading(false)
    }
  }

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
              <span className="font-bold text-xl text-[#ca3838]">Vibe</span>
            </div>
          </Link>
        </div>
      </header>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-2 text-sm mb-6">
          <Link href="/" className="text-gray-500 hover:text-[#ca3838]">Trang chủ</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-[#363636]">{mode === 'login' ? 'Đăng nhập' : 'Đăng ký'}</span>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left - Promo */}
          <div className="lg:col-span-2 hidden lg:block">
            <div className="bg-gradient-to-br from-[#ca3838] to-[#ff6b35] rounded-lg p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">Chào mừng bạn!</h2>
              <p className="text-white/90 mb-8">Đăng nhập để nhận nhiều ưu đãi hấp dẫn</p>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center shrink-0">✓</span>
                  <span>Tích điểm đổi quà cho mỗi đơn hàng</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center shrink-0">✓</span>
                  <span>Voucher độc quyền cho thành viên</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center shrink-0">✓</span>
                  <span>Thông báo flash sale trước 24h</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center shrink-0">✓</span>
                  <span>Lưu sản phẩm yêu thích & đơn hàng</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right - Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg p-8">
              <h1 className="text-2xl font-bold text-[#363636] mb-2">
                {mode === 'login' ? 'Đăng nhập tài khoản' : 'Tạo tài khoản mới'}
              </h1>
              <p className="text-gray-500 mb-6">
                {mode === 'login' ? 'Đăng nhập để tiếp tục mua sắm' : 'Trở thành thành viên TechVibe ngay hôm nay'}
              </p>

              {error && (
                <div className={`mb-4 p-3 rounded-md flex items-start gap-2 text-sm ${
                  error.includes('thành công') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                }`}>
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'register' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Nhập họ và tên"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#ca3838]"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@example.com"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#ca3838]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mật khẩu</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={mode === 'login' ? 'Nhập mật khẩu' : 'Tối thiểu 6 ký tự'}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#ca3838]"
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

                {mode === 'register' && (
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input type="checkbox" required className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#ca3838]" />
                    <span className="text-sm text-gray-600">
                      Tôi đã đọc và đồng ý với <Link href="#" className="text-[#ca3838] hover:underline">Điều khoản</Link> và <Link href="#" className="text-[#ca3838] hover:underline">Chính sách bảo mật</Link>
                    </span>
                  </label>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#ca3838] text-white py-3 rounded-md font-semibold hover:bg-[#b32f2f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Đang xử lý...' : (mode === 'login' ? 'Đăng nhập' : 'Đăng ký')}
                </button>
              </form>

              <p className="text-center text-sm text-gray-500 mt-6">
                {mode === 'login' ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}{' '}
                <button
                  onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(null) }}
                  className="text-[#ca3838] font-semibold hover:underline"
                >
                  {mode === 'login' ? 'Đăng ký ngay' : 'Đăng nhập'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}