'use client'

import Link from 'next/link'
import { ChevronRight, Package } from 'lucide-react'

function formatPrice(p: number) {
  return new Intl.NumberFormat('vi-VN').format(p) + 'đ'
}

const statusMap: Record<string, { label: string; color: string }> = {
  pending: { label: 'Chờ xác nhận', color: 'bg-yellow-100 text-yellow-700' },
  confirmed: { label: 'Đã xác nhận', color: 'bg-blue-100 text-blue-700' },
  processing: { label: 'Đang xử lý', color: 'bg-indigo-100 text-indigo-700' },
  shipping: { label: 'Đang giao', color: 'bg-purple-100 text-purple-700' },
  delivered: { label: 'Đã giao', color: 'bg-green-100 text-green-700' },
  completed: { label: 'Hoàn thành', color: 'bg-green-100 text-green-700' },
  cancelled: { label: 'Đã hủy', color: 'bg-red-100 text-red-700' },
  returned: { label: 'Trả hàng', color: 'bg-gray-100 text-gray-700' },
}

export function OrdersList({ orders }: { orders: any[] }) {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-[#ca3838]">Trang chủ</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/tai-khoan" className="text-gray-500 hover:text-[#ca3838]">Tài khoản</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-[#363636]">Đơn hàng</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">Đơn hàng của tôi</h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Chưa có đơn hàng</h3>
            <p className="text-gray-500 mb-4">Bạn chưa đặt đơn hàng nào</p>
            <Link href="/" className="inline-block px-6 py-3 bg-[#ca3838] text-white rounded-md hover:bg-[#b32f2f]">
              Mua sắm ngay
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map(order => {
              const status = statusMap[order.status] || { label: order.status, color: 'bg-gray-100 text-gray-700' }
              return (
                <Link
                  key={order.id}
                  href={`/tai-khoan/don-hang/${order.code}`}
                  className="block bg-white rounded-lg p-4 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-semibold">#{order.code}</p>
                      <p className="text-xs text-gray-500">{new Date(order.created_at).toLocaleString('vi-VN')}</p>
                    </div>
                    <span className={`text-xs px-2.5 py-1 rounded-full ${status.color}`}>{status.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {order.items?.slice(0, 4).map((item: any, idx: number) => (
                      <div key={idx} className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden shrink-0">
                        <img src={item.product_image || `https://placehold.co/80/png`} alt={item.product_name} className="w-full h-full object-contain p-1" />
                      </div>
                    ))}
                    {order.items?.length > 4 && (
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-sm text-gray-600">
                        +{order.items.length - 4}
                      </div>
                    )}
                    <div className="flex-1 text-right">
                      <p className="text-xs text-gray-500">{order.items?.length || 0} sản phẩm</p>
                      <p className="font-bold text-[#ca3838]">{formatPrice(order.total)}</p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}