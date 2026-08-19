import { createBrowserClient } from '@supabase/ssr'
import { supabase } from './supabase'

export interface WishlistItem {
  product_id: number
  created_at: string
}

export async function getWishlist(userId: string): Promise<number[]> {
  const { data, error } = await supabase
    .from('wishlists')
    .select('product_id')
    .eq('user_id', userId)
  if (error) {
    console.error('getWishlist:', error)
    return []
  }
  return (data ?? []).map(w => w.product_id)
}

export async function addToWishlist(userId: string, productId: number) {
  const { error } = await supabase
    .from('wishlists')
    .upsert({ user_id: userId, product_id: productId }, { onConflict: 'user_id,product_id' })
  return { error }
}

export async function removeFromWishlist(userId: string, productId: number) {
  const { error } = await supabase
    .from('wishlists')
    .delete()
    .eq('user_id', userId)
    .eq('product_id', productId)
  return { error }
}

export async function isInWishlist(userId: string, productId: number): Promise<boolean> {
  const { data } = await supabase
    .from('wishlists')
    .select('product_id')
    .eq('user_id', userId)
    .eq('product_id', productId)
    .maybeSingle()
  return !!data
}