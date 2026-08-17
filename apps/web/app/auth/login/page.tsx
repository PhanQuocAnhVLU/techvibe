'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, Phone, Mail, Lock, ArrowLeft, Facebook } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('phone')
  const [showPassword, setShowPassword] = useState(false)
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate login
    setTimeout(() => {
      setIsLoading(false)
      alert('Đăng nhập thành công!')
    }, 1500)
  }

  const handleSendOTP = async () => {
    if (!phone) {
      alert('Vui lòng nhập số điện thoại')
      return
    }
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      alert(`Mã OTP đã được gửi đến số ${phone}`)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-white p-4 border-b border-border">
        <Link href="/" className="flex items-center gap-2 text-primary">
          <ArrowLeft className="w-5 h-5" />
          <span>Quay lại</span>
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-3xl">T</span>
            </div>
            <h1 className="text-2xl font-bold text-secondary">Chào mừng bạn!</h1>
            <p className="text-gray-500 mt-1">Đăng nhập để tiếp tục mua sắm</p>
          </div>

          {/* Login Method Tabs */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
            <button
              onClick={() => setLoginMethod('phone')}
              className={`flex-1 py-2.5 rounded-md font-medium transition-colors ${
                loginMethod === 'phone'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-500'
              }`}
            >
              <Phone className="w-4 h-4 inline mr-2" />
              Điện thoại
            </button>
            <button
              onClick={() => setLoginMethod('email')}
              className={`flex-1 py-2.5 rounded-md font-medium transition-colors ${
                loginMethod === 'email'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-500'
              }`}
            >
              <Mail className="w-4 h-4 inline mr-2" />
              Email
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {loginMethod === 'phone' ? (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Số điện thoại
                  </label>
                  <div className="flex">
                    <div className="flex items-center px-4 bg-gray-100 border border-r-0 border-border rounded-l-md text-gray-500">
                      +84
                    </div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Nhập số điện thoại"
                      className="flex-1 px-4 py-3 border border-border rounded-r-md focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleSendOTP}
                  disabled={isLoading}
                >
                  Gửi mã OTP
                </Button>
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Nhập mã OTP
                  </label>
                  <input
                    type="text"
                    placeholder="Nhập 6 số mã OTP"
                    maxLength={6}
                    className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:border-primary tracking-widest text-center font-mono"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Nhập email của bạn"
                      className="w-full pl-11 pr-4 py-3 border border-border rounded-md focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Mật khẩu
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Nhập mật khẩu"
                      className="w-full pl-11 pr-12 py-3 border border-border rounded-md focus:outline-none focus:border-primary"
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
                <div className="text-right">
                  <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
                    Quên mật khẩu?
                  </Link>
                </div>
              </>
            )}

            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-sm text-gray-500">Hoặc đăng nhập với</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </Button>
            <Button variant="outline" className="gap-2">
              <Facebook className="w-5 h-5 text-blue-600" />
              Facebook
            </Button>
          </div>

          {/* Register Link */}
          <p className="text-center mt-6 text-gray-600">
            Chưa có tài khoản?{' '}
            <Link href="/auth/register" className="text-primary font-semibold hover:underline">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
