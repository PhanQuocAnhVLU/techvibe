'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Search, Package, AlertCircle } from 'lucide-react'
import { getOrderByCode } from '@/lib/orders'

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

function formatPrice(p: number) {
  return new Intl.NumberFormat('vi-VN').format(p) + 'đ'
}

export default function TrackOrderPage() {
  const [code, setCode] = useState('')
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!code.trim()) return
    setLoading(true)
    setError(null)
    setOrder(null)
    const { data, error } = await getOrderByCode(code.trim())
    setLoading(false)
    if (error || !data) {
      setError('Không tìm thấy đơn hàng với mã này')
    } else {
      setOrder(data)
    }
  }

  const status = order ? statusMap[order.status] || statusMap.pending : null

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-[#ca3838]">Trang chủ</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-[#363636]">Tra cứu đơn hàng</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg p-6 mb-4">
          <h1 className="text-2xl font-bold mb-2">Tra cứu đơn hàng</h1>
          <p className="text-gray-500 mb-6">Nhập mã đơn hàng để xem trạng thái</p>

          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={code}
              onChange={e => setCode(e.target.value)}
              placeholder="VD: TV12345678"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#ca3838]"
            />
            <button type="submit" disabled={loading} className="px-6 py-3 bg-[#ca3838] text-white rounded-md hover:bg-[#b32f2f] disabled:opacity-50">
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm flex items-start gap-2">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {order && (
          <div className="bg-white rounded-lg p-6 mt-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Đơn hàng #{order.code}</h2>
              <span className={`text-xs px-3 py-1 rounded-full ${status?.color}`}>{status?.label}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm mb-4 pb-4 border-b">
              <div>
                <p className="text-gray-500">Ngày đặt</p>
                <p className="font-medium">{new Date(order.created_at).toLocaleString('vi-VN')}</p>
              </div>
              <div>
                <p className="text-gray-500">Tổng tiền</p>
                <p className="font-bold text-[#ca3838]">{formatPrice(order.total)}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-500">Người nhận</p>
                <p className="font-medium">{order.shipping_name} - {order.shipping_phone}</p>
                <p className="text-sm text-gray-600">{order.shipping_detail}, {order.shipping_ward}, {order.shipping_district}, {order.shipping_province}</p>
              </div>
            </div>

            <h3 className="font-bold mb-3">Sản phẩm ({order.items?.length})</h3>
            <div className="space-y-3">
              {order.items?.map((item: any) => (
                <div key={item.id} className="flex gap-3 pb-3 border-b last:border-0">
                  <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden shrink-0">
                    <img src={item.product_image || 'https://placehold.co/80/png'} alt={item.product_name} className="w-full h-full object-contain p-1" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.product_name}</p>
                    <p className="text-xs text-gray-500">x{item.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold">{formatPrice(item.total_price)}</p>
                </div>
              ))}
            </div>

            {order.user_id && (
              <Link href={`/tai-khoan/don-hang/${order.code}`} className="block text-center mt-4 py-2 text-sm text-[#ca3838] hover:underline">
                Xem chi tiết đầy đủ →
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
}