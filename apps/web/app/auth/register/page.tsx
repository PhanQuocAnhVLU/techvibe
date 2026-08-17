'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, ArrowLeft, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert('Mật khẩu xác nhận không khớp')
      return
    }
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      alert('Đăng ký thành công! Vui lòng đăng nhập.')
    }, 1500)
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
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-secondary">Tạo tài khoản mới</h1>
            <p className="text-gray-500 mt-1">Đăng ký để nhận nhiều ưu đãi hơn</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Họ và tên</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Nhập họ và tên của bạn"
                className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:border-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Số điện thoại</label>
              <div className="flex">
                <div className="flex items-center px-4 bg-gray-100 border border-r-0 border-border rounded-l-md text-gray-500">
                  +84
                </div>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="Nhập số điện thoại"
                  className="flex-1 px-4 py-3 border border-border rounded-r-md focus:outline-none focus:border-primary"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="Nhập email của bạn"
                className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:border-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Mật khẩu</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  placeholder="Tạo mật khẩu (ít nhất 8 ký tự)"
                  className="w-full px-4 py-3 pr-12 border border-border rounded-md focus:outline-none focus:border-primary"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {formData.password && (
                <div className="mt-2 space-y-1">
                  <PasswordRequirement met={formData.password.length >= 8} text="Ít nhất 8 ký tự" />
                  <PasswordRequirement met=/[A-Z]/.test(formData.password)} text="Ít nhất 1 chữ hoa" />
                  <PasswordRequirement met=/[0-9]/.test(formData.password)} text="Ít nhất 1 số" />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Xác nhận mật khẩu</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  placeholder="Nhập lại mật khẩu"
                  className="w-full px-4 py-3 pr-12 border border-border rounded-md focus:outline-none focus:border-primary"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                checked={formData.acceptTerms}
                onChange={(e) => handleChange('acceptTerms', e.target.checked)}
                className="mt-1 w-4 h-4 accent-primary"
                required
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                Tôi đồng ý với{' '}
                <Link href="/dieu-khoan" className="text-primary hover:underline">
                  Điều khoản sử dụng
                </Link>{' '}
                và{' '}
                <Link href="/chinh-sach-rieng-tu" className="text-primary hover:underline">
                  Chính sách bảo mật
                </Link>
              </label>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? 'Đang xử lý...' : 'Đăng ký'}
            </Button>
          </form>

          {/* Login Link */}
          <p className="text-center mt-6 text-gray-600">
            Đã có tài khoản?{' '}
            <Link href="/auth/login" className="text-primary font-semibold hover:underline">
              Đăng nhập ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

function PasswordRequirement({ met, text }: { met: boolean; text: string }) {
  return (
    <div className={`flex items-center gap-2 text-xs ${met ? 'text-green-600' : 'text-gray-400'}`}>
      <Check className="w-3 h-3" />
      <span>{text}</span>
    </div>
  )
}
