'use client'

import Link from 'next/link'
import { 
  ChevronRight, Package, Truck, Check, MapPin, Phone, 
  Mail, Clock, CreditCard, Star, MessageSquare
} from 'lucide-react'
import { SmartImage } from '@/components/smart-image'

const order = {
  id: 'TS123456',
  date: '17/08/2024 14:30',
  total: 32990000,
  subtotal: 32990000,
  shipping: 0,
  discount: 0,
  status: 'shipping',
  paymentMethod: 'COD',
  paymentStatus: 'unpaid',
  customer: {
    name: 'Nguyễn Văn A',
    phone: '0912 345 678',
    email: 'nguyenvana@email.com',
  },
  address: '123 Nguy�n Trãi, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh',
  items: [
    {
      id: 1,
      name: 'iPhone 15 Pro Max 256GB',
      brand: 'Apple',
      variant: 'Titan tự nhiên',
      image: '',
      quantity: 1,
      price: 32990000,
    }
  ],
  timeline: [
    { status: 'pending', time: '17/08/2024 14:30', note: 'Đơn hàng được tạo' },
    { status: 'confirmed', time: '17/08/2024 14:45', note: 'Đã xác nhận đơn hàng' },
    { status: 'processing', time: '17/08/2024 15:30', note: 'Đang chuẩn bị hàng' },
    { status: 'shipping', time: '17/08/2024 16:00', note: 'Đã bàn giao cho đơn vị vận chuyển' },
  ],
  trackingCode: 'GHN123456789',
}

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: 'Chờ xác nhận', color: 'text-yellow-700', bg: 'bg-yellow-100' },
  confirmed: { label: 'Đã xác nhận', color: 'text-blue-700', bg: 'bg-blue-100' },
  processing: { label: 'Đang xử lý', color: 'text-purple-700', bg: 'bg-purple-100' },
  shipping: { label: 'Đang giao hàng', color: 'text-indigo-700', bg: 'bg-indigo-100' },
  completed: { label: 'Hoàn thành', color: 'text-green-700', bg: 'bg-green-100' },
  cancelled: { label: 'Đã hủy', color: 'text-red-700', bg: 'bg-red-100' },
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('vi-VN').format(price) + 'đ'
}

export default function OrderDetailPage() {
  const status = statusConfig[order.status]
  const currentStatusIndex = order.timeline.findIndex(t => t.status === order.status)

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

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-[#ca3838]">Trang chủ</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/tai-khoan" className="text-gray-500 hover:text-[#ca3838]">Tài khoản</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/tai-khoan/don-hang" className="text-gray-500 hover:text-[#ca3838]">Đơn hàng</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-[#363636]">#{order.id}</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main */}
          <div className="lg:col-span-2 space-y-4">
            {/* Status Banner */}
            <div className={`${status.bg} rounded-lg p-6`}>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-sm text-gray-600">Trạng thái đơn hàng</p>
                  <p className={`text-2xl font-bold ${status.color}`}>{status.label}</p>
                </div>
                {order.trackingCode && (
                  <div className="text-right">
                    <p className="text-xs text-gray-600">Mã vận đơn</p>
                    <p className="font-semibold text-[#363636]">{order.trackingCode}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Order Info */}
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-[#363636]">Thông tin đơn hàng</h2>
                <p className="text-sm text-gray-500">Ngày đặt: {order.date}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Mã đơn hàng</p>
                  <p className="font-semibold text-[#363636]">#{order.id}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Thanh toán</p>
                  <p className="font-semibold text-[#363636]">{order.paymentMethod}</p>
                </div>
              </div>
            </div>

            {/* Products */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg font-bold text-[#363636] mb-4">Sản phẩm ({order.items.length})</h2>
              <div className="space-y-4">
                {order.items.map(item => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <Link href={`/san-pham/${item.id}`}>
                      <SmartImage name={item.name} brand={item.brand} className="w-20 h-20 rounded-lg" />
                    </Link>
                    <div className="flex-1">
                      <Link href={`/san-pham/${item.id}`}>
                        <p className="font-medium text-[#363636] hover:text-[#ca3838]">{item.name}</p>
                      </Link>
                      <p className="text-sm text-gray-500 mt-1">Phân loại: {item.variant}</p>
                      <p className="text-sm text-gray-500">Số lượng: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-[#ca3838]">{formatPrice(item.price)}</p>
                      {order.status === 'completed' && (
                        <button className="text-xs text-[#ca3838] hover:underline mt-1 flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          Đánh giá
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg font-bold text-[#363636] mb-4">Trạng thái vận chuyển</h2>
              <div className="relative">
                {order.timeline.map((event, idx) => {
                  const isActive = idx <= currentStatusIndex
                  const isCurrent = idx === currentStatusIndex
                  return (
                    <div key={idx} className="flex gap-4 pb-6 last:pb-0 relative">
                      {/* Line */}
                      {idx < order.timeline.length - 1 && (
                        <div className={`absolute left-[15px] top-8 w-0.5 h-full ${isActive && idx < currentStatusIndex ? 'bg-[#ca3838]' : 'bg-gray-200'}`} />
                      )}
                      {/* Icon */}
                      <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        isActive ? 'bg-[#ca3838] text-white' : 'bg-gray-200 text-gray-400'
                      } ${isCurrent ? 'ring-4 ring-[#ca3838]/20' : ''}`}>
                        {event.status === 'shipping' ? <Truck className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                      </div>
                      {/* Content */}
                      <div className="flex-1 pt-1">
                        <p className={`font-medium ${isActive ? 'text-[#363636]' : 'text-gray-400'}`}>
                          {statusConfig[event.status]?.label || event.status}
                        </p>
                        <p className={`text-sm ${isActive ? 'text-gray-600' : 'text-gray-400'}`}>{event.note}</p>
                        <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {event.time}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Customer Info */}
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-[#363636] mb-4">Thông tin người nhận</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Package className="w-4 h-4 text-gray-400" />
                  <span>{order.customer.name}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>{order.customer.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="truncate">{order.customer.email}</span>
                </div>
                <div className="flex items-start gap-2 text-sm pt-3 border-t">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                  <span>{order.address}</span>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-[#363636] mb-4">Tổng đơn hàng</h3>
              <div className="space-y-2 pb-3 border-b border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Tạm tính</span>
                  <span className="font-medium">{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Phí vận chuyển</span>
                  <span className="font-medium">{order.shipping === 0 ? 'Miễn phí' : formatPrice(order.shipping)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Giảm giá</span>
                    <span className="font-medium">-{formatPrice(order.discount)}</span>
                  </div>
                )}
              </div>
              <div className="flex justify-between pt-3">
                <span className="font-bold text-[#363636]">Tổng cộng</span>
                <span className="text-xl font-bold text-[#ca3838]">{formatPrice(order.total)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              {order.status === 'shipping' && (
                <button className="w-full bg-[#ca3838] text-white py-3 rounded-md font-medium hover:bg-[#b32f2f]">
                  Xác nhận đã nhận hàng
                </button>
              )}
              {order.status === 'completed' && (
                <button className="w-full bg-[#ca3838] text-white py-3 rounded-md font-medium hover:bg-[#b32f2f]">
                  Mua lại
                </button>
              )}
              <button className="w-full border border-[#ca3838] text-[#ca3838] py-3 rounded-md font-medium hover:bg-[#fef6f6]">
                <MessageSquare className="w-4 h-4 inline mr-2" />
                Liên hệ hỗ trợ
              </button>
              <button className="w-full border border-gray-300 text-gray-600 py-3 rounded-md font-medium hover:bg-gray-50">
                Hủy đơn hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
