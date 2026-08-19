import { createServerSupabase } from '@/lib/supabase-server'
import { notFound } from 'next/navigation'
import { NewsForm } from '@/components/admin/content-forms'

export default async function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createServerSupabase()
  const { data } = await supabase.from('news').select('*').eq('id', id).maybeSingle()
  if (!data) notFound()
  return <NewsForm news={data} />
}