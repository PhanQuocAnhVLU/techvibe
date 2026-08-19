import { createServerSupabase } from '@/lib/supabase-server'
import { Newspaper, Plus, Edit } from 'lucide-react'
import Link from 'next/link'
import { DeleteButton } from '../danh-muc/delete-button'

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
        <Link href="/admin/tin-tuc/new" className="flex items-center gap-2 px-4 py-2 bg-[#e30019] text-white rounded-lg hover:bg-[#b8001c] text-sm font-medium">
          <Plus className="w-4 h-4" />
          Đăng bài mới
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {news?.map((n: any) => (
          <div key={n.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group relative">
            <div className="aspect-video bg-gradient-to-br from-neutral-100 to-neutral-200 overflow-hidden">
              {n.image ? (
                <img src={n.image} alt={n.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-5xl">📰</span>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-bold line-clamp-2">{n.title}</h3>
              <p className="text-xs text-neutral-500 mt-2">
                {n.published_at && new Date(n.published_at).toLocaleDateString('vi-VN')}
                {!n.is_published && <span className="ml-2 text-xs text-amber-600 font-semibold">Bản nháp</span>}
              </p>
            </div>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
              <Link href={`/admin/tin-tuc/${n.id}`} className="p-1.5 bg-white rounded-lg shadow-sm hover:bg-blue-50">
                <Edit className="w-3 h-3 text-blue-500" />
              </Link>
              <DeleteButton id={n.id} table="news" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}