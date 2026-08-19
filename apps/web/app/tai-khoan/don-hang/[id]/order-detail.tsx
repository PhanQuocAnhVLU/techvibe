'use client'

import Link from 'next/link'
import { ChevronRight, Package, Truck, MapPin, Phone, Mail, Clock } from 'lucide-react'

function formatPrice(p: number) {
  return new Intl.NumberFormat('vi-VN').format(p) + 'đ'
}

const statusMap: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: 'Chờ xác nhận', color: 'text-yellow-700', bg: 'bg-yellow-100' },
  confirmed: { label: 'Đã xác nhận', color: 'text-blue-700', bg: 'bg-blue-100' },
  processing: { label: 'Đang xử lý', color: 'text-purple-700', bg: 'bg-purple-100' },
  shipping: { label: 'Đang giao hàng', color: 'text-indigo-700', bg: 'bg-indigo-100' },
  delivered: { label: 'Đã giao hàng', color: 'text-green-700', bg: 'bg-green-100' },
  completed: { label: 'Hoàn thành', color: 'text-green-700', bg: 'bg-green-100' },
  cancelled: { label: 'Đã hủy', color: 'text-red-700', bg: 'bg-red-100' },
  returned: { label: 'Đã trả hàng', color: 'text-gray-700', bg: 'bg-gray-100' },
}

const paymentMap: Record<string, string> = {
  cod: 'Thanh toán khi nhận hàng',
  transfer: 'Chuyển khoản ngân hàng',
  momo: 'Ví MoMo',
  vnpay: 'VNPay',
  zalopay: 'ZaloPay',
}

export function OrderDetail({ order }: { order: any }) {
  const status = statusMap[order.status] || statusMap.pending
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-[#ca3838]">Trang chủ</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/tai-khoan" className="text-gray-500 hover:text-[#ca3838]">Tài khoản</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/tai-khoan/don-hang" className="text-gray-500 hover:text-[#ca3838]">Đơn hàng</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-[#363636]">#{order.code}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg p-6 mb-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h1 className="text-2xl font-bold mb-1">Đơn hàng #{order.code}</h1>
              <p className="text-sm text-gray-500">Đặt ngày {new Date(order.created_at).toLocaleString('vi-VN')}</p>
            </div>
            <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${status.bg} ${status.color}`}>
              {status.label}
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {/* Items */}
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-5 h-5 text-[#ca3838]" />
                <h2 className="font-bold">Sản phẩm ({order.items?.length || 0})</h2>
              </div>
              <div className="space-y-3">
                {order.items?.map((item: any) => (
                  <div key={item.id} className="flex gap-3 pb-3 border-b last:border-0">
                    <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden shrink-0">
                      <img src={item.product_image || 'https://placehold.co/80/png'} alt={item.product_name} className="w-full h-full object-contain p-1" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium line-clamp-2">{item.product_name}</p>
                      <p className="text-sm text-gray-500">SL: {item.quantity}</p>
                      <p className="font-semibold text-[#ca3838]">{formatPrice(item.total_price)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping */}
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Truck className="w-5 h-5 text-[#ca3838]" />
                <h2 className="font-bold">Địa chỉ giao hàng</h2>
              </div>
              <div className="text-sm space-y-1">
                <p className="font-semibold">{order.shipping_name} - {order.shipping_phone}</p>
                <p className="text-gray-600">{order.shipping_detail}, {order.shipping_ward}, {order.shipping_district}, {order.shipping_province}</p>
              </div>
              {order.note && (
                <p className="mt-3 text-sm text-gray-500 bg-gray-50 p-3 rounded">📝 {order.note}</p>
              )}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="bg-white rounded-lg p-6">
              <h2 className="font-bold mb-4">Tổng đơn hàng</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span>Tạm tính</span><span>{formatPrice(order.subtotal)}</span></div>
                <div className="flex justify-between"><span>Phí vận chuyển</span><span>{formatPrice(order.shipping_fee)}</span></div>
                {order.discount > 0 && <div className="flex justify-between text-green-600"><span>Giảm giá</span><span>-{formatPrice(order.discount)}</span></div>}
                <div className="flex justify-between font-bold text-lg pt-2 border-t"><span>Tổng cộng</span><span className="text-[#ca3838]">{formatPrice(order.total)}</span></div>
              </div>
              <div className="mt-4 pt-4 border-t">
                <p className="text-xs text-gray-500">Phương thức thanh toán</p>
                <p className="font-medium">{paymentMap[order.payment_method] || order.payment_method}</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}