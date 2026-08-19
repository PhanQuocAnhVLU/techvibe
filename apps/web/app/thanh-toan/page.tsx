'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronRight, MapPin, Truck, CreditCard, Smartphone, Check, AlertCircle } from 'lucide-react'
import { SmartImage } from '@/components/smart-image'
import { createOrder } from '@/lib/orders'
import { supabase } from '@/lib/supabase'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  brand?: string
}

const paymentMethods = [
  { id: 'cod', name: 'Thanh toán khi nhận hàng (COD)', icon: Truck },
  { id: 'transfer', name: 'Chuyển khoản ngân hàng', icon: CreditCard },
  { id: 'momo', name: 'Ví MoMo', icon: Smartphone },
]

function formatPrice(price: number) {
  return new Intl.NumberFormat('vi-VN').format(price) + 'đ'
}

export default function CheckoutPage() {
  const router = useRouter()
  const [userId, setUserId] = useState<string | null>(null)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [selectedPayment, setSelectedPayment] = useState('cod')
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Form state
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [province, setProvince] = useState('')
  const [district, setDistrict] = useState('')
  const [ward, setWard] = useState('')
  const [detail, setDetail] = useState('')
  const [note, setNote] = useState('')

  useEffect(() => {
    // Get user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUserId(user?.id ?? null)
      if (user?.user_metadata?.full_name) setName(user.user_metadata.full_name)
    })

    // Get cart from localStorage (existing cart store)
    const stored = localStorage.getItem('cart')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        const items = parsed.state?.items ?? []
        setCartItems(items.map((i: any) => ({
          id: i.product?.id ?? i.id,
          name: i.product?.name ?? i.name,
          price: i.product?.price ?? i.price,
          quantity: i.quantity ?? 1,
          image: i.product?.images?.[0] ?? i.image ?? '',
          brand: i.product?.brand ?? i.brand,
        })))
      } catch (e) { console.error(e) }
    }
  }, [])

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingFee = subtotal > 0 ? 30000 : 0
  const total = subtotal + shippingFee

  const handlePlaceOrder = async () => {
    setError(null)
    if (!name || !phone || !province || !district || !ward || !detail) {
      setError('Vui lòng điền đầy đủ thông tin giao hàng')
      return
    }
    if (cartItems.length === 0) {
      setError('Giỏ hàng trống')
      return
    }

    setIsProcessing(true)
    const { order, error } = await createOrder({
      userId,
      items: cartItems.map(i => ({
        product_id: i.id,
        product_name: i.name,
        product_image: i.image,
        sku: `SKU-${i.id}`,
        quantity: i.quantity,
        unit_price: i.price,
      })),
      shipping: { name, phone, province, district, ward, detail },
      paymentMethod: selectedPayment as any,
      note,
      subtotal,
      shippingFee,
      discount: 0,
      total,
    })

    if (error) {
      setError(error.message)
      setIsProcessing(false)
      return
    }

    // Clear cart
    localStorage.removeItem('cart')
    router.push(`/tai-khoan/don-hang/${order.code}`)
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Giỏ hàng trống</h2>
          <p className="text-gray-500 mb-4">Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán</p>
          <Link href="/" className="inline-block px-6 py-3 bg-[#ca3838] text-white rounded-md">Tiếp tục mua sắm</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-[#ca3838]">Trang chủ</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/gio-hang" className="text-gray-500 hover:text-[#ca3838]">Giỏ hàng</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-[#363636]">Thanh toán</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Thanh toán</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm flex items-start gap-2">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" /> <span>{error}</span>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {/* Shipping info */}
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-[#ca3838]" />
                <h2 className="text-lg font-bold">Thông tin giao hàng</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <input type="text" placeholder="Họ và tên *" value={name} onChange={e => setName(e.target.value)} className="px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:border-[#ca3838]" required />
                <input type="tel" placeholder="Số điện thoại *" value={phone} onChange={e => setPhone(e.target.value)} className="px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:border-[#ca3838]" required />
                <input type="text" placeholder="Tỉnh/Thành phố *" value={province} onChange={e => setProvince(e.target.value)} className="px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:border-[#ca3838]" required />
                <input type="text" placeholder="Quận/Huyện *" value={district} onChange={e => setDistrict(e.target.value)} className="px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:border-[#ca3838]" required />
                <input type="text" placeholder="Phường/Xã *" value={ward} onChange={e => setWard(e.target.value)} className="px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:border-[#ca3838]" required />
                <input type="text" placeholder="Địa chỉ chi tiết *" value={detail} onChange={e => setDetail(e.target.value)} className="px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:border-[#ca3838]" required />
              </div>
              <textarea placeholder="Ghi chú (tùy chọn)" value={note} onChange={e => setNote(e.target.value)} rows={2} className="mt-3 w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:border-[#ca3838]" />
            </div>

            {/* Payment */}
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5 text-[#ca3838]" />
                <h2 className="text-lg font-bold">Phương thức thanh toán</h2>
              </div>
              <div className="space-y-3">
                {paymentMethods.map(pm => (
                  <label key={pm.id} className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${selectedPayment === pm.id ? 'border-[#ca3838] bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input type="radio" checked={selectedPayment === pm.id} onChange={() => setSelectedPayment(pm.id)} className="w-4 h-4 text-[#ca3838]" />
                    <pm.icon className="w-5 h-5" />
                    <span className="font-medium">{pm.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Order summary */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-4">
              <h2 className="text-lg font-bold mb-4">Đơn hàng ({cartItems.length})</h2>
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-3 pb-3 border-b last:border-0">
                    <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden shrink-0">
                      <SmartImage name={item.name} brand={item.brand} aspectRatio="square" className="w-full h-full" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-2">{item.name}</p>
                      <p className="text-xs text-gray-500 mt-1">SL: {item.quantity}</p>
                      <p className="text-sm font-semibold text-[#ca3838] mt-1">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t pt-4 text-sm">
                <div className="flex justify-between"><span>Tạm tính</span><span>{formatPrice(subtotal)}</span></div>
                <div className="flex justify-between"><span>Phí vận chuyển</span><span>{formatPrice(shippingFee)}</span></div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t"><span>Tổng cộng</span><span className="text-[#ca3838]">{formatPrice(total)}</span></div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="w-full mt-4 bg-[#ca3838] text-white py-3 rounded-md font-semibold hover:bg-[#b32f2f] transition-colors disabled:opacity-50"
              >
                {isProcessing ? 'Đang xử lý...' : 'Đặt hàng'}
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}