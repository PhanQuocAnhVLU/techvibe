'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface DeleteButtonProps {
  id: string
  table: string
  label?: string
}

export function DeleteButton({ id, table, label }: DeleteButtonProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!confirm(`Bạn có chắc muốn xóa ${label || 'mục này'}?`)) return
    setLoading(true)
    const { error } = await supabase.from(table).delete().eq('id', id)
    setLoading(false)
    if (error) {
      alert('Lỗi: ' + error.message)
      return
    }
    router.refresh()
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="p-1.5 hover:bg-red-50 rounded-lg disabled:opacity-50"
      title="Xóa"
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin text-red-500" /> : <Trash2 className="w-4 h-4 text-red-500" />}
    </button>
  )
}