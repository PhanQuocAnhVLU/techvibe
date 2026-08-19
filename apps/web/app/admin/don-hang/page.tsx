import { createServerSupabase } from '@/lib/supabase-server'
import Link from 'next/link'
import { ShoppingCart, Search, Filter, Eye } from 'lucide-react'
import { OrderStatusSelect } from './order-status-select'
import { OrdersExportButton } from '@/components/admin/orders-export-button'

export const dynamic = 'force-dynamic'

function formatVND(n: number) {
  return new Intl.NumberFormat('vi-VN').format(n) + 'đ'
}

const statusMap: Record<string, { label: string; color: string }> = {
  pending: { label: 'Chờ xác nhận', color: 'bg-yellow-100 text-yellow-700' },
  confirmed: { label: 'Đã xác nhận', color: 'bg-blue-100 text-blue-700' },
  processing: { label: 'Đang xử lý', color: 'bg-indigo-100 text-indigo-700' },
  shipping: { label: 'Đang giao', color: 'bg-purple-100 text-purple-700' },
  delivered: { label: 'Đã giao', color: 'bg-teal-100 text-teal-700' },
  completed: { label: 'Hoàn thành', color: 'bg-green-100 text-green-700' },
  cancelled: { label: 'Đã hủy', color: 'bg-red-100 text-red-700' },
  returned: { label: 'Trả hàng', color: 'bg-neutral-100 text-neutral-700' },
}

const paymentMap: Record<string, string> = {
  cod: 'COD',
  transfer: 'Chuyển khoản',
  momo: 'MoMo',
  vnpay: 'VNPay',
  zalopay: 'ZaloPay',
}

export default async function AdminOrdersPage({ searchParams }: { searchParams: Promise<{ [k: string]: string }> }) {
  const params = await searchParams
  const supabase = await createServerSupabase()
  const status = params.status || 'all'
  const search = params.q || ''

  let query = supabase
    .from('orders')
    .select(`*, items:order_items(*)`)
    .order('created_at', { ascending: false })
    .limit(100)

  if (status !== 'all') query = query.eq('status', status)
  if (search) query = query.ilike('code', `%${search}%`)

  const { data: orders, error } = await query

  // Stats
  const { data: allOrders } = await supabase.from('orders').select('total, status')
  const totalRevenue = (allOrders ?? []).reduce((s: number, o: any) => s + (o.total || 0), 0)
  const stats = {
    all: allOrders?.length || 0,
    pending: allOrders?.filter((o: any) => o.status === 'pending').length || 0,
    shipping: allOrders?.filter((o: any) => o.status === 'shipping').length || 0,
    completed: allOrders?.filter((o: any) => o.status === 'completed').length || 0,
    cancelled: allOrders?.filter((o: any) => o.status === 'cancelled').length || 0,
    revenue: totalRevenue,
  }

  const tabs = [
    { id: 'all', label: 'Tất cả', count: stats.all },
    { id: 'pending', label: 'Chờ xác nhận', count: stats.pending },
    { id: 'shipping', label: 'Đang giao', count: stats.shipping },
    { id: 'completed', label: 'Hoàn thành', count: stats.completed },
    { id: 'cancelled', label: 'Đã hủy', count: stats.cancelled },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Tổng đơn" value={stats.all} icon="📦" color="bg-blue-500" />
        <StatCard label="Chờ xử lý" value={stats.pending} icon="⏳" color="bg-yellow-500" />
        <StatCard label="Đang giao" value={stats.shipping} icon="🚚" color="bg-purple-500" />
        <StatCard label="Doanh thu" value={formatVND(stats.revenue)} icon="💰" color="bg-emerald-500" />
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="border-b border-neutral-200 px-5">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-thin">
            {tabs.map(tab => (
              <Link
                key={tab.id}
                href={tab.id === 'all' ? '/admin/don-hang' : `/admin/don-hang?status=${tab.id}`}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  status === tab.id
                    ? 'border-[#e30019] text-[#e30019]'
                    : 'border-transparent text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {tab.label}
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                  status === tab.id ? 'bg-[#e30019] text-white' : 'bg-neutral-100 text-neutral-600'
                }`}>
                  {tab.count}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Toolbar */}
        <div className="p-4 flex flex-wrap items-center gap-3 border-b border-neutral-200">
          <form className="flex-1 max-w-md flex items-center bg-neutral-100 rounded-lg px-3 py-2">
            <Search className="w-4 h-4 text-neutral-400" />
            <input
              type="text"
              name="q"
              defaultValue={search}
              placeholder="Tìm theo mã đơn hàng..."
              className="ml-2 bg-transparent outline-none text-sm flex-1"
            />
          </form>
          <button className="flex items-center gap-2 px-3 py-2 border border-neutral-200 rounded-lg hover:bg-neutral-50 text-sm">
            <Filter className="w-4 h-4" />
            Lọc
          </button>
          <OrdersExportButton />
        </div>

        {/* Table */}
        {orders && orders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-neutral-50 text-neutral-600 text-xs uppercase">
                <tr>
                  <th className="px-5 py-3 text-left">Mã đơn</th>
                  <th className="px-5 py-3 text-left">Khách hàng</th>
                  <th className="px-5 py-3 text-left">Sản phẩm</th>
                  <th className="px-5 py-3 text-right">Tổng tiền</th>
                  <th className="px-5 py-3 text-left">Thanh toán</th>
                  <th className="px-5 py-3 text-left">Trạng thái</th>
                  <th className="px-5 py-3 text-left">Ngày đặt</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {orders.map((order: any) => {
                  const st = statusMap[order.status] || statusMap.pending
                  return (
                    <tr key={order.id} className="hover:bg-neutral-50 transition-colors">
                      <td className="px-5 py-3">
                        <p className="font-semibold text-neutral-900">#{order.code}</p>
                      </td>
                      <td className="px-5 py-3">
                        <p className="font-medium">{order.shipping_name || 'Khách vãng lai'}</p>
                        <p className="text-xs text-neutral-500">{order.shipping_phone}</p>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-2">
                            {order.items?.slice(0, 3).map((item: any, idx: number) => (
                              <div key={idx} className="w-8 h-8 rounded-lg bg-neutral-100 border-2 border-white overflow-hidden">
                                <img src={item.product_image || 'https://placehold.co/40/png'} alt="" className="w-full h-full object-contain p-0.5" />
                              </div>
                            ))}
                          </div>
                          <span className="text-xs text-neutral-600">{order.items?.length || 0} sp</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-right font-bold text-neutral-900">{formatVND(order.total)}</td>
                      <td className="px-5 py-3">
                        <span className="text-xs px-2 py-1 bg-neutral-100 rounded-full">{paymentMap[order.payment_method] || order.payment_method}</span>
                      </td>
                      <td className="px-5 py-3">
                        <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
                      </td>
                      <td className="px-5 py-3 text-xs text-neutral-500">
                        {new Date(order.created_at).toLocaleDateString('vi-VN')}
                      </td>
                      <td className="px-5 py-3">
                        <button className="p-2 hover:bg-neutral-100 rounded-lg" title="Xem chi tiết">
                          <Eye className="w-4 h-4 text-neutral-400" />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <ShoppingCart className="w-16 h-16 mx-auto mb-3 text-neutral-300" />
            <p className="text-neutral-500 mb-4">Chưa có đơn hàng nào</p>
            <p className="text-xs text-neutral-400">Đơn hàng sẽ hiển thị khi khách thanh toán</p>
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({ label, value, icon, color }: any) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center text-xl`}>{icon}</div>
      </div>
      <p className="text-2xl font-bold text-neutral-900">{value}</p>
      <p className="text-sm text-neutral-500 mt-1">{label}</p>
    </div>
  )
}