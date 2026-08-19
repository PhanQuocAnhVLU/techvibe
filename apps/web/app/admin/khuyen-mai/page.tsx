import { Tag, Plus } from 'lucide-react'

export default function AdminPromotionsPage() {
  return (
    <div className="bg-white rounded-2xl p-12 shadow-sm text-center">
      <Tag className="w-16 h-16 mx-auto mb-3 text-neutral-300" />
      <h2 className="text-xl font-bold mb-2">Quản lý khuyến mãi</h2>
      <p className="text-neutral-500 mb-6">Tính năng đang được phát triển</p>
      <button className="flex items-center gap-2 px-4 py-2 bg-[#e30019] text-white rounded-lg hover:bg-[#b8001c] text-sm font-medium mx-auto">
        <Plus className="w-4 h-4" />
        Tạo chương trình mới
      </button>
    </div>
  )
}