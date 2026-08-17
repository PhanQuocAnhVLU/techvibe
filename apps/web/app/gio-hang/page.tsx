'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ChevronRight, Minus, Plus, Trash2, Heart, 
  Tag, Truck, ShieldCheck, ArrowLeft, Check
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CartItem {
  id: number
  name: string
  variant: string
  price: number
  originalPrice: number
  quantity: number
  image: string
  stock: number
}

const initialCartItems: CartItem[] = [
  { id: 1, name: 'iPhone 15 Pro Max 256GB', variant: 'Titan tự nhiên', price: 32990000, originalPrice: 34990000, quantity: 1, image: '/api/placeholder/200/200', stock: 45 },
  { id: 2, name: 'AirPods Pro 2', variant: 'USB-C', price: 6990000, originalPrice: 7990000, quantity: 2, image: '/api/placeholder/200/200', stock: 12 },
]

const vouchers = [
  { code: 'TECHSTORE50', discount: 50000, minAmount: 500000, name: 'Giảm 50K cho đơn 500K' },
  { code: 'NEWUSER100', discount: 100000, minAmount: 1000000, name: 'Giảm 100K cho user mới' },
  { code: 'FLASH20', discount: 20000, minAmount: 200000, name: 'Flash sale giảm 20K' },
]

function formatPrice(price: number) {
  return new Intl.NumberFormat('vi-VN').format(price) + 'đ'
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems)
  const [selectedItems, setSelectedItems] = useState<number[]>([1, 2])
  const [showVoucher, setShowVoucher] = useState(false)
  const [appliedVoucher, setAppliedVoucher] = useState<typeof vouchers[0] | null>(null)

  const toggleSelectItem = (id: number) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const toggleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(cartItems.map(item => item.id))
    }
  }

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, Math.min(item.stock, item.quantity + delta))
        return { ...item, quantity: newQty }
      }
      return item
    }))
  }

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
    setSelectedItems(prev => prev.filter(i => i !== id))
  }

  const subtotal = cartItems
    .filter(item => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.price * item.quantity, 0)

  const discount = cartItems
    .filter(item => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + (item.originalPrice - item.price) * item.quantity, 0)

  const shippingFee = subtotal >= 500000 ? 0 : 30000
  const voucherDiscount = appliedVoucher && subtotal >= appliedVoucher.minAmount ? appliedVoucher.discount : 0
  const total = subtotal + shippingFee - voucherDiscount

  const applyVoucher = (voucher: typeof vouchers[0]) => {
    setAppliedVoucher(voucher)
    setShowVoucher(false)
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="font-bold text-white text-xl">T</span>
              </div>
              <span className="font-bold text-xl">
                <span className="text-secondary">Tech</span>
                <span className="text-primary">Store</span>
              </span>
            </Link>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Giỏ hàng trống</h2>
          <p className="text-gray-500 mb-6">Hãy thêm sản phẩm vào giỏ hàng của bạn</p>
          <Link href="/san-pham">
            <Button size="lg">Tiếp tục mua sắm</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="font-bold text-white text-xl">T</span>
              </div>
              <span className="font-bold text-xl">
                <span className="text-secondary">Tech</span>
                <span className="text-primary">Store</span>
              </span>
            </Link>
            <Link href="/san-pham" className="flex items-center gap-2 text-gray-500 hover:text-primary">
              <ArrowLeft className="w-4 h-4" />
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-primary">Trang chủ</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900">Giỏ hàng</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Giỏ hàng ({cartItems.length} sản phẩm)</h1>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Select All */}
            <div className="bg-white rounded-lg p-4 flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedItems.length === cartItems.length}
                  onChange={toggleSelectAll}
                  className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="font-medium">Chọn tất cả ({cartItems.length} sản phẩm)</span>
              </label>
              <button className="text-gray-500 hover:text-red-500">
                Xóa tất cả
              </button>
            </div>

            {/* Cart Items */}
            {cartItems.map(item => {
              const isSelected = selectedItems.includes(item.id)
              const itemDiscount = Math.round((1 - item.price / item.originalPrice) * 100)

              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-lg p-4 transition-all ${isSelected ? 'ring-2 ring-primary' : ''}`}
                >
                  <div className="flex gap-4">
                    {/* Checkbox */}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectItem(item.id)}
                        className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                    </div>

                    {/* Image */}
                    <Link href={`/san-pham/${item.id}`} className="shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    </Link>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <Link href={`/san-pham/${item.id}`}>
                        <h3 className="font-medium text-gray-900 hover:text-primary">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-500 mt-1">{item.variant}</p>

                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-lg font-bold text-primary">{formatPrice(item.price)}</span>
                        {itemDiscount > 0 && (
                          <>
                            <span className="text-sm text-gray-400 line-through">{formatPrice(item.originalPrice)}</span>
                            <span className="text-xs font-medium text-red-500">-{itemDiscount}%</span>
                          </>
                        )}
                      </div>

                      {/* Quantity & Actions */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-2 hover:bg-gray-100"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-10 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-2 hover:bg-gray-100"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <button className="p-2 text-gray-400 hover:text-red-500">
                            <Heart className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-gray-400 hover:text-red-500"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Voucher */}
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Tag className="w-5 h-5 text-primary" />
                  <span className="font-medium">Mã giảm giá</span>
                </div>
                {appliedVoucher ? (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-green-600 font-medium">
                      Đã áp dụng: {appliedVoucher.code}
                    </span>
                    <button
                      onClick={() => setAppliedVoucher(null)}
                      className="text-sm text-red-500 hover:underline"
                    >
                      Hủy
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowVoucher(!showVoucher)}
                    className="text-sm text-primary hover:underline"
                  >
                    Chọn mã giảm giá
                  </button>
                )}
              </div>

              {showVoucher && (
                <div className="border-t pt-4 space-y-2">
                  {vouchers.map(voucher => (
                    <div
                      key={voucher.code}
                      className="flex items-center justify-between p-3 border border-dashed border-primary/50 rounded-lg"
                    >
                      <div>
                        <span className="font-semibold text-primary">{voucher.code}</span>
                        <p className="text-sm text-gray-500">{voucher.name}</p>
                        <p className="text-xs text-gray-400">Đơn tối thiểu {formatPrice(voucher.minAmount)}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => applyVoucher(voucher)}
                      >
                        Áp dụng
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-24">
              <h2 className="text-lg font-bold mb-4">Thông tin đơn hàng</h2>

              <div className="space-y-3 pb-4 border-b border-gray-100">
                <div className="flex justify-between">
                  <span className="text-gray-500">Tạm tính ({selectedItems.length} sản phẩm)</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Giảm giá</span>
                    <span className="font-medium">-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-500">Phí vận chuyển</span>
                  <span className="font-medium">
                    {shippingFee === 0 ? 'Miễn phí' : formatPrice(shippingFee)}
                  </span>
                </div>
                {voucherDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Mã giảm giá</span>
                    <span className="font-medium">-{formatPrice(voucherDiscount)}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between py-4">
                <span className="text-lg font-bold">Tổng cộng</span>
                <span className="text-2xl font-bold text-primary">{formatPrice(total)}</span>
              </div>

              {shippingFee > 0 && (
                <div className="bg-blue-50 rounded-lg p-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-blue-600">
                    <Truck className="w-4 h-4" />
                    <span>Mua thêm {formatPrice(500000 - subtotal)} để được miễn phí vận chuyển</span>
                  </div>
                </div>
              )}

              <Button className="w-full" size="lg">
                Tiến hành thanh toán
              </Button>

              {/* Benefits */}
              <div className="mt-6 pt-4 border-t border-gray-100 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <ShieldCheck className="w-5 h-5 text-green-500" />
                  <span>Thanh toán an toàn, bảo mật 100%</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <Truck className="w-5 h-5 text-blue-500" />
                  <span>Giao hàng trong 2-4 ngày làm việc</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
