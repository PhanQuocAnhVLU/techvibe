import { createServerSupabase } from '@/lib/supabase-server'
import Link from 'next/link'
import { Package, Plus, Search, Edit, Trash2, Eye } from 'lucide-react'
import { ProductDeleteButton } from './product-delete-button'

export const dynamic = 'force-dynamic'

function formatVND(n: number) {
  return new Intl.NumberFormat('vi-VN').format(n) + 'đ'
}

export default async function AdminProductsPage({ searchParams }: { searchParams: Promise<{ [k: string]: string }> }) {
  const params = await searchParams
  const supabase = await createServerSupabase()
  const search = params.q || ''

  let query = supabase
    .from('products')
    .select(`*, brand:brands(name), category:categories(name)`)
    .order('id', { ascending: false })
    .limit(50)

  if (search) query = query.or(`name.ilike.%${search}%,sku.ilike.%${search}%`)

  const { data: products } = await query

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-wrap items-center gap-3">
        <form className="flex-1 max-w-md flex items-center bg-neutral-100 rounded-lg px-3 py-2">
          <Search className="w-4 h-4 text-neutral-400" />
          <input
            type="text"
            name="q"
            defaultValue={search}
            placeholder="Tìm sản phẩm theo tên..."
            className="ml-2 bg-transparent outline-none text-sm flex-1"
          />
        </form>
        <Link
          href="/admin/san-pham/new"
          className="flex items-center gap-2 px-4 py-2 bg-[#e30019] text-white rounded-lg hover:bg-[#b8001c] transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Thêm sản phẩm
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {products && products.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-neutral-50 text-neutral-600 text-xs uppercase">
                <tr>
                  <th className="px-5 py-3 text-left">Sản phẩm</th>
                  <th className="px-5 py-3 text-left">Danh mục</th>
                  <th className="px-5 py-3 text-right">Giá</th>
                  <th className="px-5 py-3 text-right">Kho</th>
                  <th className="px-5 py-3 text-right">Đã bán</th>
                  <th className="px-5 py-3 text-center">Trạng thái</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {products.map((p: any) => (
                  <tr key={p.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-neutral-100 overflow-hidden shrink-0">
                          <img src={p.image_urls?.[0] || 'https://placehold.co/100/png'} alt={p.name} className="w-full h-full object-contain p-1" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-neutral-900 line-clamp-1">{p.name}</p>
                          <p className="text-xs text-neutral-500">ID: #{p.id} • {p.brand?.name || 'N/A'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full">{p.category?.name || 'N/A'}</span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <p className="font-bold text-[#e30019]">{formatVND(p.price)}</p>
                      {p.original_price && p.original_price > p.price && (
                        <p className="text-xs text-neutral-400 line-through">{formatVND(p.original_price)}</p>
                      )}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <span className={`font-semibold ${p.stock > 10 ? 'text-green-600' : p.stock > 0 ? 'text-orange-500' : 'text-red-500'}`}>
                        {p.stock}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right text-neutral-600">{p.sold_count || 0}</td>
                    <td className="px-5 py-3 text-center">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        p.is_active ? 'bg-green-100 text-green-700' : 'bg-neutral-100 text-neutral-600'
                      }`}>
                        {p.is_active ? 'Hiển thị' : 'Ẩn'}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1">
                        <Link href={`/san-pham/${p.slug || p.id}`} target="_blank" className="p-1.5 hover:bg-neutral-100 rounded-lg" title="Xem">
                          <Eye className="w-4 h-4 text-neutral-500" />
                        </Link>
                        <Link href={`/admin/san-pham/${p.id}`} className="p-1.5 hover:bg-blue-50 rounded-lg" title="Sửa">
                          <Edit className="w-4 h-4 text-blue-500" />
                        </Link>
                        <ProductDeleteButton productId={p.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <Package className="w-16 h-16 mx-auto mb-3 text-neutral-300" />
            <p className="text-neutral-500 mb-4">Chưa có sản phẩm</p>
          </div>
        )}
      </div>
    </div>
  )
}