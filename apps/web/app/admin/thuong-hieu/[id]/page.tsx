import { createServerSupabase } from '@/lib/supabase-server'
import { notFound } from 'next/navigation'
import { BrandForm } from '@/components/admin/content-forms'

export default async function EditBrandPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createServerSupabase()
  const { data } = await supabase.from('brands').select('*').eq('id', id).maybeSingle()
  if (!data) notFound()
  return <BrandForm brand={data} />
}