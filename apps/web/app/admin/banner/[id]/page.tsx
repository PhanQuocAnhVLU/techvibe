import { createServerSupabase } from '@/lib/supabase-server'
import { notFound } from 'next/navigation'
import { BannerForm } from '@/components/admin/content-forms'

export default async function EditBannerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createServerSupabase()
  const { data } = await supabase.from('banners').select('*').eq('id', id).maybeSingle()
  if (!data) notFound()
  return <BannerForm banner={data} />
}