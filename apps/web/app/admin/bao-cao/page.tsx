import { BarChart3 } from 'lucide-react'

export default function AdminReportsPage() {
  return (
    <div className="bg-white rounded-2xl p-12 shadow-sm text-center">
      <BarChart3 className="w-16 h-16 mx-auto mb-3 text-neutral-300" />
      <h2 className="text-xl font-bold mb-2">Báo cáo thống kê</h2>
      <p className="text-neutral-500">Biểu đồ doanh thu, đơn hàng, sản phẩm bán chạy sẽ hiển thị tại đây</p>
    </div>
  )
}