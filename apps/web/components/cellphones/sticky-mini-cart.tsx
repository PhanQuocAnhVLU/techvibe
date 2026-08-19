'use client'

import { useEffect, useState } from 'react'
import { ShoppingCart, X, Trash2, Plus, Minus } from 'lucide-react'
import Link from 'next/link'

interface CartItem {
  id: string | number
  name: string
  price: number
  image?: string
  qty: number
  slug?: string
}

export function StickyMiniCart() {
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState<CartItem[]>([])
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Load cart from localStorage
    const load = () => {
      try {
        const raw = localStorage.getItem('techvibe-cart')
        if (raw) setItems(JSON.parse(raw))
      } catch {}
    }
    load()

    // Listen for cart updates
    const handler = () => load()
    window.addEventListener('cart-updated', handler)
    window.addEventListener('storage', handler)

    return () => {
      window.removeEventListener('cart-updated', handler)
      window.removeEventListener('storage', handler)
    }
  }, [])

  useEffect(() => {
    setVisible(items.length > 0)
  }, [items])

  const total = items.reduce((s, i) => s + i.price * i.qty, 0)
  const totalQty = items.reduce((s, i) => s + i.qty, 0)

  const updateQty = (id: string | number, delta: number) => {
    setItems(prev => {
      const next = prev.map(i =>
        i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i
      ).filter(i => i.qty > 0)
      localStorage.setItem('techvibe-cart', JSON.stringify(next))
      window.dispatchEvent(new Event('cart-updated'))
      return next
    })
  }

  const remove = (id: string | number) => updateQty(id, -999)

  if (!visible && !open) return null

  return (
    <>
      {/* Floating button */}
      {visible && !open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-20 md:bottom-6 right-4 z-30 bg-cps-red text-white pl-3 pr-4 py-3 rounded-full shadow-2xl hover:scale-105 transition-transform flex items-center gap-2"
        >
          <div className="relative">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 text-cps-red text-[10px] font-black rounded-full flex items-center justify-center">
              {totalQty}
            </span>
          </div>
          <span className="text-sm font-bold">{new Intl.NumberFormat('vi-VN').format(total)}đ</span>
        </button>
      )}

      {/* Mini cart panel */}
      {open && (
        <div className="fixed inset-0 z-50 flex justify-end animate-fade-in">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="relative bg-white w-full max-w-sm h-full shadow-2xl flex flex-col animate-slide-in-left">
            {/* Header */}
            <div className="px-4 py-3 border-b flex items-center justify-between bg-gradient-to-r from-cps-red to-cps-red-light text-white">
              <h3 className="font-bold flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Giỏ hàng ({totalQty})
              </h3>
              <button onClick={() => setOpen(false)} className="p-1 hover:bg-white/20 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {items.length === 0 ? (
                <div className="text-center py-12 text-neutral-400">
                  <ShoppingCart className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">Giỏ hàng trống</p>
                </div>
              ) : items.map(item => (
                <div key={item.id} className="flex gap-3 p-2 border border-neutral-200 rounded-lg">
                  <div className="w-16 h-16 rounded-md bg-neutral-100 overflow-hidden shrink-0">
                    {item.image && <img src={item.image} alt="" className="w-full h-full object-contain" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm line-clamp-2 font-medium">{item.name}</p>
                    <p className="text-sm font-bold text-cps-red mt-1">
                      {new Intl.NumberFormat('vi-VN').format(item.price)}đ
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center border border-neutral-300 rounded text-xs">
                        <button onClick={() => updateQty(item.id, -1)} className="w-6 h-6 hover:bg-neutral-100">
                          <Minus className="w-3 h-3 mx-auto" />
                        </button>
                        <span className="w-7 text-center font-semibold">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="w-6 h-6 hover:bg-neutral-100">
                          <Plus className="w-3 h-3 mx-auto" />
                        </button>
                      </div>
                      <button onClick={() => remove(item.id)} className="p-1 hover:bg-red-50 rounded text-red-500">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t p-4 bg-neutral-50">
                <div className="flex justify-between mb-3">
                  <span className="text-sm text-neutral-600">Tạm tính:</span>
                  <span className="text-lg font-black text-cps-red">
                    {new Intl.NumberFormat('vi-VN').format(total)}đ
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/gio-hang"
                    onClick={() => setOpen(false)}
                    className="py-2.5 border border-cps-red text-cps-red rounded-md font-semibold text-center text-sm hover:bg-red-50"
                  >
                    Xem giỏ
                  </Link>
                  <Link
                    href="/thanh-toan"
                    onClick={() => setOpen(false)}
                    className="py-2.5 bg-cps-red text-white rounded-md font-bold text-center text-sm hover:bg-cps-red-hover"
                  >
                    Thanh toán
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}