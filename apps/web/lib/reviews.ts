import { supabase } from './supabase'

export async function getProductReviews(productId: number) {
  const { data, error } = await supabase
    .from('reviews')
    .select(`*, profile:profiles(full_name, avatar_url)`)
    .eq('product_id', productId)
    .order('created_at', { ascending: false })
  return { data: data ?? [], error }
}

export async function createReview(productId: number, rating: number, content: string, userId: string) {
  const { data, error } = await supabase
    .from('reviews')
    .upsert({ product_id: productId, rating, content, user_id: userId }, { onConflict: 'user_id,product_id' })
    .select()
    .single()
  return { data, error }
}