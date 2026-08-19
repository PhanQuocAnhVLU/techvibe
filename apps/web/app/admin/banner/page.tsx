import { createServerSupabase } from '@/lib/supabase-server'
import { Image as ImageIcon, Plus, Edit } from 'lucide-react'
import Link from 'next/link'
import { DeleteButton } from '../danh-muc/delete-button'

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
        <Link href="/admin/banner/new" className="flex items-center gap-2 px-4 py-2 bg-[#e30019] text-white rounded-lg hover:bg-[#b8001c] text-sm font-medium">
          <Plus className="w-4 h-4" />
          Thêm banner
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {banners?.map((b: any) => (
          <div key={b.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group relative">
            <div className="aspect-[16/9] bg-neutral-100 overflow-hidden">
              <img src={b.image || b.image_url} alt={b.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <h3 className="font-bold">{b.title}</h3>
              <p className="text-sm text-neutral-500 mt-1">{b.subtitle || b.position}</p>
              <div className="flex items-center gap-2 mt-3">
                <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full">Thứ tự: {b.sort_order}</span>
                {b.is_active && <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">Hiển thị</span>}
              </div>
            </div>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
              <Link href={`/admin/banner/${b.id}`} className="p-1.5 bg-white rounded-lg shadow-sm hover:bg-blue-50">
                <Edit className="w-3 h-3 text-blue-500" />
              </Link>
              <DeleteButton id={b.id} table="banners" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}