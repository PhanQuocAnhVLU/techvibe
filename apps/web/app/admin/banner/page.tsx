import { createServerSupabase } from '@/lib/supabase-server'
import { Image as ImageIcon, Plus } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminBannersPage() {
  const supabase = await createServerSupabase()
  const { data: banners } = await supabase.from('banners').select('*').order('sort_order')

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm p-4 flex items-center justify-between">
        <div>
          <h2 className="font-bold text-lg">Banner trang chủ</h2>
          <p className="text-sm text-neutral-500">{banners?.length || 0} banner đang hiển thị</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#e30019] text-white rounded-lg hover:bg-[#b8001c] text-sm font-medium">
          <Plus className="w-4 h-4" />
          Thêm banner
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {banners?.map((b: any) => (
          <div key={b.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
            <div className="aspect-[16/9] bg-neutral-100 overflow-hidden">
              <img src={b.image_url} alt={b.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <h3 className="font-bold">{b.title}</h3>
              <p className="text-sm text-neutral-500 mt-1">{b.subtitle}</p>
              <div className="flex items-center gap-2 mt-3">
                <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full">Thứ tự: {b.sort_order}</span>
                {b.is_active && <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">Hiển thị</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}