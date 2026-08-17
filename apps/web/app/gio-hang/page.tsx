'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Minus, Plus, Trash2, Tag, Truck, ArrowRight, ShoppingBag } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { products } from '@/lib/data'
import { formatPrice } from '@/lib/utils'

interface CartItem {
  product: typeof products[0]
  quantity: number
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([
    { product: products[0], quantity: 1 },
    { product: products[1], quantity: 2 },
  ])
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)

  const updateQuantity = (index: number, delta: number) => {
    setItems(prev => prev.map((item, i) => 
      i === index 
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    ))
  }

  const removeItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index))
  }

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'TECH500') {
      setAppliedCoupon('TECH500')
    }
  }

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const discount = appliedCoupon ? Math.min(500000, subtotal * 0.1) : 0
  const shippingFee = subtotal >= 500000 ? 0 : 30000
  const total = subtotal - discount + shippingFee

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center p-8">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Giỏ hàng trống</h2>
            <p className="text-gray-500 mb-6">Hãy thêm sản phẩm vào giỏ hàng của bạn</p>
            <Link href="/">
              <Button>Tiếp tục mua sắm</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-6">
            <Link href="/" className="text-gray-500 hover:text-primary">Trang chủ</Link>
            <span className="text-gray-400">/</span>
            <span className="text-primary font-medium">Giỏ hàng</span>
          </div>

          <h1 className="text-2xl font-bold mb-6">Giỏ hàng ({items.length} sản phẩm)</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, index) => (
                <div key={index} className="bg-white rounded-lg p-4 flex gap-4">
                  <Link href={`/san-pham/${item.product.slug}`} className="shrink-0">
                    <div className="relative w-24 h-24 bg-gray-50 rounded-lg overflow-hidden">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Link>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2">
                      <div>
                        <p className="text-xs text-gray-500">{item.product.brand}</p>
                        <Link href={`/san-pham/${item.product.slug}`} className="font-medium hover:text-primary transition-colors line-clamp-2">
                          {item.product.name}
                        </Link>
                      </div>
                      <button 
                        onClick={() => removeItem(index)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-end justify-between mt-3">
                      <div className="text-primary font-bold">
                        {formatPrice(item.product.price)}
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-border rounded-md">
                          <button 
                            onClick={() => updateQuantity(index, -1)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-10 text-center font-semibold">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(index, 1)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">
                            {formatPrice(item.product.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Continue Shopping */}
              <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline">
                <ArrowRight className="w-4 h-4 rotate-180" />
                Tiếp tục mua sắm
              </Link>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-6 sticky top-24">
                <h2 className="font-bold text-lg mb-4">Thông tin đơn hàng</h2>

                {/* Coupon */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    <Tag className="w-4 h-4 inline mr-1" />
                    Mã giảm giá
                  </label>
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between bg-primary/10 p-3 rounded-md">
                      <span className="text-primary font-medium">{appliedCoupon}</span>
                      <button 
                        onClick={() => setAppliedCoupon(null)}
                        className="text-sm text-red-500 hover:underline"
                      >
                        Xóa
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Nhập mã giảm giá"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1 px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:border-primary"
                      />
                      <Button onClick={applyCoupon} variant="outline" size="sm">
                        Áp dụng
                      </Button>
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-1">Thử: TECH500</p>
                </div>

                {/* Summary */}
                <div className="space-y-3 border-t border-border pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Tạm tính ({items.length} sản phẩm)</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Giảm giá</span>
                      <span className="text-green-600">-{formatPrice(discount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                      <Truck className="w-4 h-4 inline mr-1" />
                      Phí vận chuyển
                    </span>
                    <span className={shippingFee === 0 ? 'text-green-600' : ''}>
                      {shippingFee === 0 ? 'Miễn phí' : formatPrice(shippingFee)}
                    </span>
                  </div>

                  {shippingFee > 0 && (
                    <p className="text-xs text-gray-500">
                      Mua thêm {formatPrice(500000 - subtotal)} để được miễn phí vận chuyển
                    </p>
                  )}

                  <div className="flex justify-between font-bold text-lg pt-3 border-t border-border">
                    <span>Tổng cộng</span>
                    <span className="text-primary">{formatPrice(total)}</span>
                  </div>

                  <p className="text-xs text-gray-500">(Đã bao gồm VAT)</p>
                </div>

                <Link href="/thanh-toan">
                  <Button className="w-full mt-6" size="lg">
                    Tiến hành đặt hàng
                  </Button>
                </Link>

                {/* Trust badges */}
                <div className="mt-6 pt-4 border-t border-border space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="text-green-500">✓</span>
                    <span>Miễn phí đổi trả trong 15 ngày</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="text-green-500">✓</span>
                    <span>100% sản phẩm chính hãng</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="text-green-500">✓</span>
                    <span>Hỗ trợ trả góp 0%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
