import { createServerSupabase } from '@/lib/supabase-server'
import Link from 'next/link'
import { DollarSign, ShoppingCart, Users, Package, ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react'
import { RevenueChart } from '@/components/admin/revenue-chart'
import { CategoryPieChart } from '@/components/admin/category-pie-chart'

export const dynamic = 'force-dynamic'

async function getStats() {
  const supabase = await createServerSupabase()

  const [orders, products, profiles, recentOrders] = await Promise.all([
    supabase.from('orders').select('total, created_at, status', { count: 'exact' }),
    supabase.from('products').select('id', { count: 'exact', head: true }).eq('is_active', true),
    supabase.from('profiles').select('id', { count: 'exact', head: true }),
    supabase.from('orders').select('*, items:order_items(*)').order('created_at', { ascending: false }).limit(5),
  ])

  const allOrders = orders.data ?? []
  const totalRevenue = allOrders.reduce((sum, o: any) => sum + (o.total || 0), 0)
  const pendingOrders = allOrders.filter((o: any) => o.status === 'pending').length
  const completedOrders = allOrders.filter((o: any) => o.status === 'completed' || o.status === 'delivered').length

  // Top products
  const { data: topProducts } = await supabase
    .from('products')
    .select('id, name, price, sold_count, image_urls')
    .eq('is_active', true)
    .order('sold_count', { ascending: false })
    .limit(5)

  // Revenue by day (last 30 days)
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
  const { data: orders30d } = await supabase
    .from('orders')
    .select('total, created_at')
    .gte('created_at', thirtyDaysAgo)

  const revenueByDay: Record<string, number> = {}
  ;(orders30d ?? []).forEach((o: any) => {
    const date = new Date(o.created_at).toISOString().split('T')[0]
    revenueByDay[date] = (revenueByDay[date] || 0) + (o.total || 0)
  })

  // Fill missing days
  const chartData: { date: string; revenue: number }[] = []
  for (let i = 29; i >= 0; i--) {
    const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000)
    const dateStr = d.toISOString().split('T')[0]
    chartData.push({
      date: `${d.getDate()}/${d.getMonth() + 1}`,
      revenue: revenueByDay[dateStr] || 0,
    })
  }

  // Category breakdown
  const { data: productsByCategory } = await supabase
    .from('products')
    .select(`category_id, category:categories(name)`)
    .eq('is_active', true)

  const categoryStats: Record<string, number> = {}
  ;(productsByCategory ?? []).forEach((p: any) => {
    const name = p.category?.name || 'Khác'
    categoryStats[name] = (categoryStats[name] || 0) + 1
  })

  const categoryData = Object.entries(categoryStats)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6)

  return {
    totalRevenue,
    totalOrders: allOrders.length,
    totalProducts: products.count ?? 0,
    totalCustomers: profiles.count ?? 0,
    pendingOrders,
    completedOrders,
    recentOrders: recentOrders.data ?? [],
    topProducts: topProducts ?? [],
    chartData,
    categoryData,
  }
}

function formatVND(n: number) {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + 'B'
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(0) + 'M'
  if (n >= 1_000) return (n / 1_000).toFixed(0) + 'K'
  return new Intl.NumberFormat('vi-VN').format(n) + 'đ'
}

export default async function AdminDashboard() {
  const stats = await getStats()

  const statCards = [
    {
      label: 'Doanh thu',
      value: formatVND(stats.totalRevenue),
      icon: DollarSign,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      trend: `${stats.completedOrders} đơn HT`,
      trendUp: true,
    },
    {
      label: 'Đơn hàng',
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      trend: `${stats.pendingOrders} chờ xử lý`,
      trendUp: true,
    },
    {
      label: 'Sản phẩm',
      value: stats.totalProducts,
      icon: Package,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      trend: 'Đang bán',
      trendUp: true,
    },
    {
      label: 'Khách hàng',
      value: stats.totalCustomers,
      icon: Users,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
      trend: 'Đã đăng ký',
      trendUp: true,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-[#1a1a2e] to-[#16213e] rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="relative z-10 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Chào mừng quay lại, Admin 👋</h2>
            <p className="text-white/70 text-sm md:text-base">
              Tổng quan cửa hàng TechVibe • {new Date().toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
          <Link href="/admin/bao-cao" className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium backdrop-blur transition-colors flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Xem báo cáo chi tiết
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-12 h-12 rounded-xl ${s.bgColor} flex items-center justify-center`}>
                <s.icon className={`w-6 h-6 ${s.iconColor}`} />
              </div>
              <span className={`flex items-center gap-1 text-xs font-semibold ${s.trendUp ? 'text-emerald-600' : 'text-red-600'}`}>
                {s.trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {s.trend}
              </span>
            </div>
            <p className="text-2xl font-bold text-neutral-900">{s.value}</p>
            <p className="text-sm text-neutral-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-neutral-100">
            <h3 className="font-bold text-neutral-900">Doanh thu 30 ngày qua</h3>
            <p className="text-xs text-neutral-500">Biểu đồ doanh thu theo ngày</p>
          </div>
          <div className="p-5">
            <RevenueChart data={stats.chartData} />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-neutral-100">
            <h3 className="font-bold text-neutral-900">Phân bố danh mục</h3>
            <p className="text-xs text-neutral-500">Số sản phẩm theo danh mục</p>
          </div>
          <div className="p-5">
            <CategoryPieChart data={stats.categoryData} />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-neutral-900">Đơn hàng gần đây</h3>
              <p className="text-xs text-neutral-500">5 đơn hàng mới nhất</p>
            </div>
            <Link href="/admin/don-hang" className="text-sm text-[#e30019] hover:underline font-medium">
              Xem tất cả →
            </Link>
          </div>

          {stats.recentOrders.length === 0 ? (
            <div className="p-12 text-center text-neutral-400">
              <ShoppingCart className="w-12 h-12 mx-auto mb-2 opacity-30" />
              <p>Chưa có đơn hàng nào</p>
            </div>
          ) : (
            <div className="divide-y">
              {stats.recentOrders.map((order: any) => (
                <div key={order.id} className="px-5 py-3 hover:bg-neutral-50 transition-colors flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0">
                    <ShoppingCart className="w-5 h-5 text-neutral-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-neutral-900">#{order.code}</p>
                    <p className="text-xs text-neutral-500">
                      {new Date(order.created_at).toLocaleString('vi-VN')} • {order.items?.length || 0} sản phẩm
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm text-neutral-900">{formatVND(order.total)}</p>
                    <p className="text-[10px] text-neutral-500">{order.shipping_name || 'Khách'}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-neutral-100">
            <h3 className="font-bold text-neutral-900">Sản phẩm bán chạy</h3>
            <p className="text-xs text-neutral-500">Top 5 sản phẩm hot</p>
          </div>

          <div className="divide-y">
            {stats.topProducts.map((p: any, idx: number) => (
              <div key={p.id} className="px-5 py-3 flex items-center gap-3">
                <div className="text-lg font-black w-6 text-center text-neutral-300">#{idx + 1}</div>
                <div className="w-12 h-12 rounded-lg bg-neutral-100 overflow-hidden shrink-0">
                  <img
                    src={p.image_urls?.[0] || 'https://placehold.co/100/png'}
                    alt={p.name}
                    className="w-full h-full object-contain p-1"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium line-clamp-1">{p.name}</p>
                  <p className="text-xs text-neutral-500">{formatVND(p.price)} • Đã bán {p.sold_count || 0}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <h3 className="font-bold text-neutral-900 mb-4">Thao tác nhanh</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <QuickAction href="/admin/san-pham/new" label="Thêm sản phẩm" icon={Package} color="bg-blue-500" />
          <QuickAction href="/admin/don-hang" label="Xem đơn hàng" icon={ShoppingCart} color="bg-green-500" />
          <QuickAction href="/admin/banner" label="Quản lý banner" icon={TrendingUp} color="bg-purple-500" />
          <QuickAction href="/admin/tin-tuc" label="Đăng bài viết" icon={Users} color="bg-orange-500" />
        </div>
      </div>
    </div>
  )
}

function QuickAction({ href, label, icon: Icon, color }: any) {
  return (
    <Link href={href} className="group flex items-center gap-3 p-3 rounded-xl border border-neutral-200 hover:border-[#e30019] hover:bg-red-50 transition-all">
      <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <span className="text-sm font-medium text-neutral-700 group-hover:text-[#e30019]">{label}</span>
    </Link>
  )
}