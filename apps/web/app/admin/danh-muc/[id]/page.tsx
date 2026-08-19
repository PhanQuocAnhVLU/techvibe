import { createServerSupabase } from '@/lib/supabase-server'
import { notFound } from 'next/navigation'
import { CategoryForm } from '@/components/admin/content-forms'

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createServerSupabase()
  const { data } = await supabase.from('categories').select('*').eq('id', id).maybeSingle()
  if (!data) notFound()
  return <CategoryForm category={data} />
}