'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export function ProductDeleteButton({ productId }: { productId: number }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Xóa sản phẩm này?')) return
    setLoading(true)
    await supabase.from('products').update({ is_active: false }).eq('id', productId)
    router.refresh()
    setLoading(false)
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="p-1.5 hover:bg-red-50 rounded-lg disabled:opacity-50"
      title="Xóa"
    >
      <Trash2 className="w-4 h-4 text-red-500" />
    </button>
  )
}