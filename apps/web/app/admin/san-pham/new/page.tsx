import { createServerSupabase } from '@/lib/supabase-server'
import { ProductForm } from '@/components/admin/product-form'

export const dynamic = 'force-dynamic'

export default async function NewProductPage() {
  const supabase = await createServerSupabase()
  const [{ data: categories }, { data: brands }] = await Promise.all([
    supabase.from('categories').select('id, name').order('name'),
    supabase.from('brands').select('id, name').order('name'),
  ])

  return <ProductForm categories={categories || []} brands={brands || []} />
}