import { createServerSupabase } from '@/lib/supabase-server'
import { notFound } from 'next/navigation'
import { ProductForm } from '@/components/admin/product-form'

export const dynamic = 'force-dynamic'

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createServerSupabase()

  const [{ data: product }, { data: categories }, { data: brands }] = await Promise.all([
    supabase.from('products').select('*').eq('id', id).maybeSingle(),
    supabase.from('categories').select('id, name').order('name'),
    supabase.from('brands').select('id, name').order('name'),
  ])

  if (!product) notFound()

  return <ProductForm product={product} categories={categories || []} brands={brands || []} />
}