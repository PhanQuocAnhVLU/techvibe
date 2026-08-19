'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, GitCompare, Trash2 } from 'lucide-react'
import { ProductImage } from './product-image'

interface CompareItem {
  id: string | number
  name: string
  price: number
}

export function CompareBar() {
  const [items, setItems] = useState<CompareItem[]>([])

  useEffect(() => {
    const load = () => {
      try {
        const raw = localStorage.getItem('techvibe-compare')
        if (raw) setItems(JSON.parse(raw))
      } catch {}
    }
    load()
    const handler = () => load()
    window.addEventListener('compare-updated', handler)
    return () => window.removeEventListener('compare-updated', handler)
  }, [])

  const remove = (id: string | number) => {
    const next = items.filter(i => i.id !== id)
    setItems(next)
    localStorage.setItem('techvibe-compare', JSON.stringify(next))
    window.dispatchEvent(new Event('compare-updated'))
  }

  if (items.length === 0) return null

  return (
    <div className="fixed bottom-0 inset-x-0 z-30 bg-white border-t-2 border-cps-red shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-3">
        <div className="flex items-center gap-2 text-cps-red">
          <GitCompare className="w-5 h-5" />
          <span className="font-bold text-sm">So sánh ({items.length}/4)</span>
        </div>
        <div className="flex-1 flex items-center gap-2 overflow-x-auto">
          {items.map(item => (
            <div key={item.id} className="flex items-center gap-2 bg-neutral-50 rounded-lg pl-1 pr-2 py-1 shrink-0">
              <div className="w-8 h-8 bg-white rounded">
                <ProductImage name={item.name} className="!p-0.5" />
              </div>
              <span className="text-xs font-medium max-w-[120px] truncate">{item.name}</span>
              <button onClick={() => remove(item.id)} className="p-0.5 hover:bg-red-50 rounded text-red-500">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
          {Array.from({ length: Math.max(0, 2 - items.length) }).map((_, i) => (
            <div key={i} className="w-32 h-10 border-2 border-dashed border-neutral-200 rounded-lg flex items-center justify-center text-[10px] text-neutral-400">
              Trống
            </div>
          ))}
        </div>
        <Link
          href={`/so-sanh${items.length > 0 ? '?ids=' + items.map(i => i.id).join(',') : ''}`}
          className="px-4 py-1.5 bg-cps-red text-white text-sm font-bold rounded-md hover:bg-cps-red-hover shrink-0"
        >
          So sánh ngay
        </Link>
        <button
          onClick={() => { setItems([]); localStorage.removeItem('techvibe-compare'); window.dispatchEvent(new Event('compare-updated')) }}
          className="p-1.5 text-neutral-400 hover:text-red-500"
          title="Xóa tất cả"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}