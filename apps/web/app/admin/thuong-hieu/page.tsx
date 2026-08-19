import { createServerSupabase } from '@/lib/supabase-server'
import { Award, Plus, Edit } from 'lucide-react'
import Link from 'next/link'
import { DeleteButton } from '../danh-muc/delete-button'

export const dynamic = 'force-dynamic'

export default async function AdminBrandsPage() {
  const supabase = await createServerSupabase()
  const { data: brands } = await supabase.from('brands').select('*').order('name')

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm p-4 flex items-center justify-between">
        <div>
          <h2 className="font-bold text-lg">Danh sách thương hiệu</h2>
          <p className="text-sm text-neutral-500">{brands?.length || 0} thương hiệu</p>
        </div>
        <Link href="/admin/thuong-hieu/new" className="flex items-center gap-2 px-4 py-2 bg-[#e30019] text-white rounded-lg hover:bg-[#b8001c] text-sm font-medium">
          <Plus className="w-4 h-4" />
          Thêm thương hiệu
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {brands?.map((b: any) => (
          <div key={b.id} className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all text-center group relative">
            <Link href={`/admin/thuong-hieu/${b.id}`} className="block">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center mb-3 overflow-hidden">
                {b.logo ? (
                  <img src={b.logo} alt={b.name} className="w-full h-full object-contain p-2" />
                ) : (
                  <span className="font-black text-2xl text-neutral-400">{b.name.charAt(0)}</span>
                )}
              </div>
              <p className="font-bold text-neutral-900">{b.name}</p>
              <p className="text-xs text-neutral-500 mt-1">/{b.slug}</p>
            </Link>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
              <Link href={`/admin/thuong-hieu/${b.id}`} className="p-1.5 bg-white rounded-lg shadow-sm hover:bg-blue-50">
                <Edit className="w-3 h-3 text-blue-500" />
              </Link>
              <DeleteButton id={b.id} table="brands" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}