'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Package, Search, MapPin, Phone, Mail, Check, Clock } from 'lucide-react'

export default function OrderTrackingPage() {
  const [orderId, setOrderId] = useState('')
  const [phone, setPhone] = useState('')
  const [result, setResult] = useState<any>(null)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!orderId || !phone) return
    setResult({
      id: orderId,
      status: 'shipping',
      customer: 'Nguyễn Văn A',
      product: 'iPhone 15 Pro Max 256GB',
      total: 32990000,
      date: '17/08/2024 14:30',
      address: '123 Nguyễn Trãi, Q.1, TP.HCM',
      timeline: [
        { time: '17/08/2024 16:30', status: 'Đã bàn giao cho đơn vị vận chuyển', active: true },
        { time: '17/08/2024 15:30', status: 'Đang chuẩn bị hàng', active: true },
        { time: '17/08/2024 14:45', status: 'Đã xác nhận đơn hàng', active: true },
        { time: '17/08/2024 14:30', status: 'Đơn hàng được tạo', active: true },
      ]
    })
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Top Bar */}
      <div className="bg-[#ca3838] text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between">
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:opacity-80">Hồ Chí Minh</Link>
            <a href="tel:18002000" className="hidden sm:flex hover:opacity-80">1800.2000</a>
          </div>
          <Link href="/tai-khoan" className="hover:opacity-80">Tài khoản</Link>
        </div>
      </div>

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

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center gap-2 text-sm mb-6">
          <Link href="/" className="text-gray-500 hover:text-[#ca3838]">Trang chủ</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-[#363636]">Tra cứu đơn hàng</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-[#fef6f6] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Search className="w-8 h-8 text-[#ca3838]" />
                </div>
                <h1 className="text-2xl font-bold text-[#363636]">Tra cứu đơn hàng</h1>
                <p className="text-gray-500 mt-2">Nhập mã đơn hàng và số điện thoại để tra cứu</p>
              </div>

              <form onSubmit={handleSearch} className="space-y-4 max-w-md mx-auto">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mã đơn hàng</label>
                  <input
                    type="text"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="VD: TS123456"
                    className="w-full px-4 py-3 border rounded-md focus:outline-none focus:border-[#ca3838]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="VD: 0912345678"
                    className="w-full px-4 py-3 border rounded-md focus:outline-none focus:border-[#ca3838]"
                  />
                </div>
                <button type="submit" className="w-full bg-[#ca3838] text-white py-3 rounded-md font-semibold hover:bg-[#b32f2f]">
                  Tra cứu
                </button>
              </form>

              {result && (
                <div className="mt-8 pt-6 border-t">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold">Đơn hàng #{result.id}</h2>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold">Đang giao</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">Khách hàng</p>
                      <p className="font-medium">{result.customer}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">Sản phẩm</p>
                      <p className="font-medium">{result.product}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">Ngày đặt</p>
                      <p className="font-medium">{result.date}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">Tổng tiền</p>
                      <p className="font-bold text-[#ca3838]">{new Intl.NumberFormat('vi-VN').format(result.total)}đ</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3">Lịch sử vận chuyển</h3>
                    <div className="space-y-3">
                      {result.timeline.map((event: any, i: number) => (
                        <div key={i} className="flex gap-3 items-start">
                          <div className="w-6 h-6 rounded-full bg-[#ca3838] flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{event.status}</p>
                            <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                              <Clock className="w-3 h-3" />
                              {event.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-[#363636] mb-4">Hỗ trợ</h3>
              <div className="space-y-3">
                <a href="tel:18002000" className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-500">Hotline</p>
                    <p className="font-semibold">1800.2000</p>
                  </div>
                </a>
                <a href="mailto:cskh@techstore.vn" className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg hover:bg-orange-100">
                  <Mail className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="font-semibold text-sm">cskh@techstore.vn</p>
                  </div>
                </a>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#ca3838] to-[#ff6b35] rounded-lg p-6 text-white">
              <h3 className="font-bold mb-2">Cần hỗ trợ?</h3>
              <p className="text-sm text-white/90 mb-4">Đội ngũ CSKH luôn sẵn sàng hỗ trợ bạn 24/7</p>
              <Link href="/lien-he">
                <button className="w-full bg-white text-[#ca3838] py-2 rounded-md font-medium">Liên hệ ngay</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}