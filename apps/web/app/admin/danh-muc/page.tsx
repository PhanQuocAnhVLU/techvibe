import { createServerSupabase } from '@/lib/supabase-server'
import { FolderTree, Plus, Edit } from 'lucide-react'
import Link from 'next/link'
import { DeleteButton } from './delete-button'

export const dynamic = 'force-dynamic'

export default async function AdminCategoriesPage() {
  const supabase = await createServerSupabase()
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true })

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm p-4 flex items-center justify-between">
        <div>
          <h2 className="font-bold text-lg">Danh sách danh mục</h2>
          <p className="text-sm text-neutral-500">{categories?.length || 0} danh mục</p>
        </div>
        <Link href="/admin/danh-muc/new" className="flex items-center gap-2 px-4 py-2 bg-[#e30019] text-white rounded-lg hover:bg-[#b8001c] text-sm font-medium">
          <Plus className="w-4 h-4" />
          Thêm danh mục
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {categories && categories.length > 0 ? (
          <div className="divide-y">
            {categories.map((c: any) => (
              <div key={c.id} className="px-5 py-4 flex items-center gap-4 hover:bg-neutral-50">
                <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center text-2xl">
                  {c.icon || '📦'}
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{c.name}</p>
                  <p className="text-xs text-neutral-500">/{c.slug}</p>
                </div>
                <div className="flex items-center gap-2">
                  {c.is_hot && <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded-full">Hot</span>}
                  {c.is_highlight && <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">Highlight</span>}
                </div>
                <div className="flex items-center gap-1">
                  <Link href={`/danh-muc?danh-muc=${c.slug}`} target="_blank" className="text-xs text-blue-500 hover:underline px-2">
                    Xem →
                  </Link>
                  <Link href={`/admin/danh-muc/${c.id}`} className="p-1.5 hover:bg-blue-50 rounded-lg" title="Sửa">
                    <Edit className="w-4 h-4 text-blue-500" />
                  </Link>
                  <DeleteButton id={c.id} table="categories" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <FolderTree className="w-16 h-16 mx-auto mb-3 text-neutral-300" />
            <p className="text-neutral-500">Chưa có danh mục nào</p>
          </div>
        )}
      </div>
    </div>
  )
}