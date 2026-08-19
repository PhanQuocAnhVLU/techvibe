'use client'

import { useState } from 'react'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { useRouter } from 'next/navigation'

const statuses = [
  { value: 'pending', label: 'Chờ xác nhận', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'confirmed', label: 'Đã xác nhận', color: 'bg-blue-100 text-blue-700' },
  { value: 'processing', label: 'Đang xử lý', color: 'bg-indigo-100 text-indigo-700' },
  { value: 'shipping', label: 'Đang giao', color: 'bg-purple-100 text-purple-700' },
  { value: 'delivered', label: 'Đã giao', color: 'bg-teal-100 text-teal-700' },
  { value: 'completed', label: 'Hoàn thành', color: 'bg-green-100 text-green-700' },
  { value: 'cancelled', label: 'Đã hủy', color: 'bg-red-100 text-red-700' },
]

export function OrderStatusSelect({ orderId, currentStatus }: { orderId: number; currentStatus: string }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const current = statuses.find(s => s.value === currentStatus) || statuses[0]

  const update = async (newStatus: string) => {
    setLoading(true)
    setOpen(false)
    await supabaseAdmin.from('orders').update({ status: newStatus }).eq('id', orderId)
    router.refresh()
    setLoading(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        disabled={loading}
        className={`text-xs px-2.5 py-1 rounded-full font-medium ${current.color} hover:opacity-80 transition-opacity`}
      >
        {current.label}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute left-0 mt-1 w-44 bg-white rounded-xl shadow-xl border border-neutral-200 py-1 z-50">
            {statuses.map(s => (
              <button
                key={s.value}
                onClick={() => update(s.value)}
                className={`w-full text-left px-3 py-2 text-xs hover:bg-neutral-50 ${
                  s.value === currentStatus ? 'font-semibold' : ''
                }`}
              >
                <span className={`inline-block w-2 h-2 rounded-full ${s.color.split(' ')[0]} mr-2`} />
                {s.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}