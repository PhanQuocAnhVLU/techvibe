'use client'

import Link from 'next/link'
import { ChevronRight, MapPin, Phone, Mail, Clock, MessageSquare, Send, Award, Users, Package, ShieldCheck } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="bg-[#ca3838] text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between">
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:opacity-80">Hồ Chí Minh</Link>
          </div>
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
          <span className="text-[#363636]">Liên hệ</span>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#363636] mb-3">Liên hệ với chúng tôi</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">Chúng tôi luôn sẵn sàng hỗ trợ bạn. Hãy liên hệ qua các kênh dưới đây hoặc gửi tin nhắn trực tiếp.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {[
            { icon: MapPin, title: 'Địa chỉ', content: '123 Nguyễn Trãi, P.Bến Thành\nQ.1, TP. Hồ Chí Minh', color: 'bg-blue-100 text-blue-600' },
            { icon: Phone, title: 'Hotline', content: '1800.2000 (Miễn phí)\n1900.2000 (CSKH)', color: 'bg-orange-100 text-orange-600' },
            { icon: Mail, title: 'Email', content: 'cskh@techstore.vn\nsupport@techstore.vn', color: 'bg-green-100 text-green-600' },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
              <div className={`w-14 h-14 ${item.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <item.icon className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-[#363636] mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 whitespace-pre-line">{item.content}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Contact Form */}
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-bold text-[#363636] mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#ca3838]" />
              Gửi tin nhắn
            </h2>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Họ tên *</label>
                  <input type="text" placeholder="Nguyễn Văn A" className="w-full px-4 py-2.5 border rounded-md focus:outline-none focus:border-[#ca3838]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại *</label>
                  <input type="tel" placeholder="0912345678" className="w-full px-4 py-2.5 border rounded-md focus:outline-none focus:border-[#ca3838]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" placeholder="email@example.com" className="w-full px-4 py-2.5 border rounded-md focus:outline-none focus:border-[#ca3838]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Chủ đề</label>
                <select className="w-full px-4 py-2.5 border rounded-md focus:outline-none focus:border-[#ca3838]">
                  <option>Tư vấn sản phẩm</option>
                  <option>Hỗ trợ đơn hàng</option>
                  <option>Bảo hành</option>
                  <option>Hợp tác kinh doanh</option>
                  <option>Khác</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nội dung *</label>
                <textarea rows={5} placeholder="Nhập nội dung..." className="w-full px-4 py-2.5 border rounded-md focus:outline-none focus:border-[#ca3838]" />
              </div>
              <button type="submit" className="w-full bg-[#ca3838] text-white py-3 rounded-md font-semibold hover:bg-[#b32f2f] flex items-center justify-center gap-2">
                <Send className="w-4 h-4" />
                Gửi tin nhắn
              </button>
            </form>
          </div>

          {/* Store Info */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-[#363636] mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#ca3838]" />
                Giờ làm việc
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b">
                  <span>Thứ 2 - Thứ 6</span>
                  <span className="font-medium">8:00 - 22:00</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span>Thứ 7</span>
                  <span className="font-medium">8:00 - 23:00</span>
                </div>
                <div className="flex justify-between py-2">
                  <span>Chủ nhật</span>
                  <span className="font-medium">9:00 - 21:00</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-[#363636] mb-4">Các chi nhánh</h3>
              <div className="space-y-3">
                {['Quận 1, TP.HCM', 'Quận Cầu Giấy, Hà Nội', 'Quận Hải Châu, Đà Nẵng'].map((branch, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-[#fef6f6] cursor-pointer">
                    <MapPin className="w-5 h-5 text-[#ca3838] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Chi nhánh {i + 1}</p>
                      <p className="text-xs text-gray-500">{branch}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-white rounded-lg p-6">
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-12 h-12 text-gray-300" />
                <span className="ml-2 text-gray-400">Google Maps</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}