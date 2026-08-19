'use client'

import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { addToWishlist, removeFromWishlist } from '@/lib/wishlist'

export function useWishlist() {
  const [userId, setUserId] = useState<string | null>(null)
  const [items, setItems] = useState<number[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch user + wishlist
  useEffect(() => {
    let mounted = true
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!mounted) return
      if (!user) {
        setLoading(false)
        return
      }
      setUserId(user.id)
      const { data } = await supabase
        .from('wishlists')
        .select('product_id')
        .eq('user_id', user.id)
      if (mounted) {
        setItems((data ?? []).map(w => w.product_id))
        setLoading(false)
      }
    }
    init()

    // Listen auth
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session?.user) {
        setUserId(session.user.id)
        supabase
          .from('wishlists')
          .select('product_id')
          .eq('user_id', session.user.id)
          .then(({ data }) => setItems((data ?? []).map(w => w.product_id)))
      } else {
        setUserId(null)
        setItems([])
      }
    })
    return () => { mounted = false; sub.subscription.unsubscribe() }
  }, [])

  const toggle = useCallback(async (productId: number) => {
    if (!userId) {
      alert('Vui lòng đăng nhập để sử dụng yêu thích')
      return
    }
    const isIn = items.includes(productId)
    if (isIn) {
      setItems(prev => prev.filter(id => id !== productId))
      await removeFromWishlist(userId, productId)
    } else {
      setItems(prev => [...prev, productId])
      await addToWishlist(userId, productId)
    }
  }, [userId, items])

  const isWishlisted = useCallback((productId: number) => items.includes(productId), [items])

  return { items, loading, toggle, isWishlisted, isAuthed: !!userId }
}