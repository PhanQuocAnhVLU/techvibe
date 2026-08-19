import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'
import { createServerSupabase } from '@/lib/supabase-server'
import { WishlistClient } from './wishlist-client'

export const dynamic = 'force-dynamic'

export default async function WishlistPage() {
  const user = await getCurrentUser()
  if (!user) redirect('/auth/login')

  const supabase = await createServerSupabase()
  const { data } = await supabase
    .from('wishlists')
    .select(`product:products(*, brand:brands(*), category:categories(*))`)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const products = (data ?? []).map((w: any) => w.product).filter(Boolean)

  return <WishlistClient initialProducts={products} userId={user.id} />
}