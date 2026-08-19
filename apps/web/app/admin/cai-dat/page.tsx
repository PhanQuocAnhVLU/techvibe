import { Settings } from 'lucide-react'

export default function AdminSettingsPage() {
  return (
    <div className="bg-white rounded-2xl p-12 shadow-sm text-center">
      <Settings className="w-16 h-16 mx-auto mb-3 text-neutral-300" />
      <h2 className="text-xl font-bold mb-2">Cài đặt hệ thống</h2>
      <p className="text-neutral-500">Cấu hình chung, thanh toán, vận chuyển sẽ hiển thị tại đây</p>
    </div>
  )
}