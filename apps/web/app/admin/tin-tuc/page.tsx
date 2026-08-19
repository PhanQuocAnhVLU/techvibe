import { createServerSupabase } from '@/lib/supabase-server'
import { Newspaper, Plus } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminNewsPage() {
  const supabase = await createServerSupabase()
  const { data: news } = await supabase.from('news').select('*').order('published_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm p-4 flex items-center justify-between">
        <div>
          <h2 className="font-bold text-lg">Tin tức công nghệ</h2>
          <p className="text-sm text-neutral-500">{news?.length || 0} bài viết</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#e30019] text-white rounded-lg hover:bg-[#b8001c] text-sm font-medium">
          <Plus className="w-4 h-4" />
          Đăng bài mới
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {news?.map((n: any) => (
          <div key={n.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
            <div className="aspect-video bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center">
              <span className="text-5xl">{n.cover_emoji}</span>
            </div>
            <div className="p-4">
              {n.brand && <span className="text-[10px] px-2 py-0.5 bg-red-50 text-red-700 rounded-full">{n.brand}</span>}
              <h3 className="font-bold mt-2 line-clamp-2">{n.title}</h3>
              <p className="text-xs text-neutral-500 mt-2">{new Date(n.published_at).toLocaleDateString('vi-VN')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}