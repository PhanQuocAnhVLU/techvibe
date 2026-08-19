'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { X, Heart, ShoppingCart, Star, Eye, Plus, Minus, Check } from 'lucide-react'
import { ProductImage } from './product-image'

interface Product {
  id: number | string
  name: string
  brand?: string
  price: number
  originalPrice?: number
  rating?: number
  reviews?: number
  sold?: number
  badge?: string
  slug?: string
}

interface QuickViewProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export function QuickView({ product, isOpen, onClose }: QuickViewProps) {
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setQty(1)
      setAdded(false)
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen || !product) return null

  const discount = product.originalPrice && product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0

  const formatPrice = (n: number) => new Intl.NumberFormat('vi-VN').format(n) + 'đ'
  const savings = product.originalPrice ? product.originalPrice - product.price : 0

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-in-up">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-9 h-9 bg-white hover:bg-neutral-100 rounded-full shadow flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-2 gap-6 p-5">
          <div className="bg-neutral-50 rounded-xl aspect-square flex items-center justify-center relative overflow-hidden">
            <ProductImage name={product.name} />
            {discount > 0 && (
              <span className="absolute top-3 left-3 px-2.5 py-1 bg-cps-red text-white text-xs font-bold rounded">
                Giảm {discount}%
              </span>
            )}
            {product.badge && (
              <span className="absolute top-3 right-3 px-2.5 py-1 bg-yellow-400 text-cps-red text-xs font-bold rounded">
                {product.badge}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            {product.brand && (
              <p className="text-xs text-neutral-500 mb-1 font-semibold uppercase tracking-wide">
                {product.brand}
              </p>
            )}

            <h2 className="text-lg md:text-xl font-bold text-cps-text mb-3 leading-snug">
              {product.name}
            </h2>

            {product.rating && (
              <div className="flex items-center gap-2 mb-3 text-xs">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${i <= Math.round(product.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-neutral-200'}`}
                    />
                  ))}
                </div>
                <span className="font-semibold">{product.rating}</span>
                {product.reviews && (
                  <span className="text-neutral-500">({product.reviews} đánh giá)</span>
                )}
                <span className="text-neutral-300">|</span>
                <span className="text-neutral-500">Đã bán {product.sold || 0}</span>
              </div>
            )}

            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-4 mb-4">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-2xl md:text-3xl font-black text-cps-red">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm text-neutral-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              {savings > 0 && (
                <p className="text-xs text-cps-red font-semibold">
                  Tiết kiệm {formatPrice(savings)}
                </p>
              )}
            </div>

            <div className="mb-4 space-y-1.5">
              <p className="text-xs font-bold text-neutral-700 mb-1">🎁 Khuyến mãi</p>
              <div className="text-xs text-neutral-600 flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                Giảm thêm 5% khi thanh toán qua VNPay
              </div>
              <div className="text-xs text-neutral-600 flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                Trả góp 0% qua thẻ tín dụng
              </div>
              <div className="text-xs text-neutral-600 flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                Freeship đơn từ 500.000đ
              </div>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm text-neutral-600">Số lượng:</span>
              <div className="flex items-center border border-neutral-300 rounded-md">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-8 h-8 flex items-center justify-center hover:bg-neutral-100"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center text-sm font-semibold">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-8 h-8 flex items-center justify-center hover:bg-neutral-100"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-auto">
              <button
                onClick={() => {
                  setAdded(true)
                  setTimeout(() => setAdded(false), 2000)
                }}
                className={`w-full py-3 rounded-md font-bold flex items-center justify-center gap-2 transition-all ${
                  added
                    ? 'bg-emerald-500 text-white'
                    : 'bg-cps-red-light hover:bg-cps-red text-white'
                }`}
              >
                {added ? <><Check className="w-5 h-5" /> Đã thêm vào giỏ</> : <><ShoppingCart className="w-5 h-5" /> Thêm vào giỏ hàng</>}
              </button>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href={`/san-pham/${product.slug || product.id}`}
                  onClick={onClose}
                  className="py-2.5 border-2 border-cps-red text-cps-red rounded-md font-bold text-center text-sm hover:bg-red-50 flex items-center justify-center gap-1"
                >
                  <Eye className="w-4 h-4" />
                  Chi tiết
                </Link>
                <button className="py-2.5 border border-neutral-300 rounded-md font-semibold text-sm hover:bg-neutral-50 flex items-center justify-center gap-1">
                  <Heart className="w-4 h-4" />
                  Yêu thích
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}