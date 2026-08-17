'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ChevronRight, MapPin, Truck, CreditCard, Smartphone,
  Check, AlertCircle, Plus, Eye, EyeOff, ArrowLeft
} from 'lucide-react'

interface CartItem {
  id: number
  name: string
  variant: string
  price: number
  quantity: number
  image: string
}

const cartItems: CartItem[] = [
  { id: 1, name: 'iPhone 15 Pro Max 256GB', variant: 'Titan tự nhiên', price: 32990000, quantity: 1, image: '/api/placeholder/200/200' },
  { id: 2, name: 'AirPods Pro 2', variant: 'USB-C', price: 6990000, quantity: 2, image: '/api/placeholder/200/200' },
]

const savedAddresses = [
  { id: 1, name: 'Nguyễn Văn A', phone: '0912 345 678', address: '123 Nguyễn Trãi, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh', isDefault: true },
  { id: 2, name: 'Nguyễn Văn A', phone: '0912 345 678', address: '456 Lê Văn Việt, Phường Tăng Nhơn Phú A, Quận 9, TP. Hồ Chí Minh', isDefault: false },
]

const paymentMethods = [
  { id: 'cod', name: 'Thanh toán khi nhận hàng (COD)', icon: Truck },
  { id: 'card', name: 'Thẻ ATM / Visa / Mastercard', icon: CreditCard },
  { id: 'momo', name: 'Ví MoMo', icon: Smartphone },
]

const shippingMethods = [
  { id: 'standard', name: 'Giao hàng tiêu chuẩn', time: '2-4 ngày làm việc', fee: 0 },
  { id: 'express', name: 'Giao hàng nhanh', time: '1-2 ngày làm việc', fee: 30000 },
]

function formatPrice(price: number) {
  return new Intl.NumberFormat('vi-VN').format(price) + 'đ'
}

export default function CheckoutPage() {
  const [selectedAddress, setSelectedAddress] = useState<number>(1)
  const [showAddAddress, setShowAddAddress] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState('cod')
  const [selectedShipping, setSelectedShipping] = useState('standard')
  const [showOrderReview, setShowOrderReview] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingFee = shippingMethods.find(s => s.id === selectedShipping)?.fee || 0
  const total = subtotal + shippingFee

  const handlePlaceOrder = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setOrderSuccess(true)
    }, 2000)
  }

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-lg">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-[#363636] mb-2">Đặt hàng thành công!</h1>
          <p className="text-gray-500 mb-6">
            Cảm ơn bạn đã đặt hàng. Mã đơn hàng của bạn là <strong className="text-[#ca3838]">#TS123456</strong>
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-2">Chúng tôi sẽ giao hàng trong:</p>
            <p className="text-lg font-semibold text-[#ca3838]">2-4 ngày làm việc</p>
          </div>
          <div className="space-y-3">
            <Link href="/tai-khoan/don-hang">
              <button className="w-full bg-[#ca3838] text-white py-3 rounded-md font-semibold hover:bg-[#b32f2f] transition-colors">
                Xem chi tiết đơn hàng
              </button>
            </Link>
            <Link href="/san-pham">
              <button className="w-full border-2 border-[#ca3838] text-[#ca3838] py-3 rounded-md font-semibold hover:bg-[#fef6f6] transition-colors">
                Tiếp tục mua sắm
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Top Bar */}
      <div className="bg-[#ca3838] text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link href="#" className="flex items-center gap-1 hover:opacity-80">Hồ Chí Minh</Link>
              <Link href="tel:18002000" className="hidden sm:flex items-center gap-1 hover:opacity-80">1800.2000</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-11 h-11 bg-[#ca3838] rounded-lg flex items-center justify-center">
                <span className="font-bold text-white text-2xl">T</span>
              </div>
              <div>
                <span className="font-bold text-xl text-[#363636]">Tech</span>
                <span className="font-bold text-xl text-[#ca3838]">Store</span>
              </div>
            </Link>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="w-8 h-8 bg-[#ca3838] text-white rounded-full flex items-center justify-center font-semibold">1</span>
              <span className="text-[#ca3838] font-semibold">Thanh toán</span>
              <span className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center font-semibold">2</span>
              <span className="text-gray-400">Hoàn thành</span>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left - Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold flex items-center gap-2 text-[#363636]">
                  <MapPin className="w-5 h-5 text-[#ca3838]" />
                  Địa chỉ giao hàng
                </h2>
                <button
                  onClick={() => setShowAddAddress(!showAddAddress)}
                  className="text-sm text-[#ca3838] hover:underline flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Thêm địa chỉ mới
                </button>
              </div>

              {showAddAddress && (
                <div className="bg-gray-50 rounded-lg p-4 mb-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Họ và tên"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#ca3838]"
                    />
                    <input
                      type="tel"
                      placeholder="Số điện thoại"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#ca3838]"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <select className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#ca3838]">
                      <option>Tỉnh/Thành phố</option>
                    </select>
                    <select className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#ca3838]">
                      <option>Quận/Huyện</option>
                    </select>
                    <select className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#ca3838]">
                      <option>Phường/Xã</option>
                    </select>
                  </div>
                  <input
                    type="text"
                    placeholder="Địa chỉ chi tiết (số nhà, tên đường)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:border-[#ca3838]"
                  />
                  <button className="bg-[#ca3838] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#b32f2f]">
                    Thêm địa chỉ
                  </button>
                </div>
              )}

              <div className="space-y-3">
                {savedAddresses.map(addr => (
                  <label
                    key={addr.id}
                    className={`flex items-start gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedAddress === addr.id
                        ? 'border-[#ca3838] bg-[#fef6f6]'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="address"
                      checked={selectedAddress === addr.id}
                      onChange={() => setSelectedAddress(addr.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{addr.name}</span>
                        <span className="text-gray-400">|</span>
                        <span className="text-gray-500">{addr.phone}</span>
                        {addr.isDefault && (
                          <span className="px-2 py-0.5 text-xs bg-[#ca3838]/10 text-[#ca3838] rounded">
                            Mặc định
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{addr.address}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Shipping Method */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg font-bold flex items-center gap-2 mb-4 text-[#363636]">
                <Truck className="w-5 h-5 text-[#ca3838]" />
                Phương thức vận chuyển
              </h2>

              <div className="space-y-3">
                {shippingMethods.map(method => (
                  <label
                    key={method.id}
                    className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedShipping === method.id
                        ? 'border-[#ca3838] bg-[#fef6f6]'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <input
                        type="radio"
                        name="shipping"
                        checked={selectedShipping === method.id}
                        onChange={() => setSelectedShipping(method.id)}
                      />
                      <div>
                        <p className="font-medium text-[#363636]">{method.name}</p>
                        <p className="text-sm text-gray-500">{method.time}</p>
                      </div>
                    </div>
                    <span className="font-semibold text-[#ca3838]">
                      {method.fee === 0 ? 'Miễn phí' : formatPrice(method.fee)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg font-bold flex items-center gap-2 mb-4 text-[#363636]">
                <CreditCard className="w-5 h-5 text-[#ca3838]" />
                Phương thức thanh toán
              </h2>

              <div className="space-y-3">
                {paymentMethods.map(method => (
                  <label
                    key={method.id}
                    className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedPayment === method.id
                        ? 'border-[#ca3838] bg-[#fef6f6]'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={selectedPayment === method.id}
                      onChange={() => setSelectedPayment(method.id)}
                    />
                    <method.icon className="w-6 h-6 text-gray-400" />
                    <div className="flex-1">
                      <p className="font-medium text-[#363636]">{method.name}</p>
                    </div>
                    {selectedPayment === method.id && (
                      <Check className="w-5 h-5 text-[#ca3838]" />
                    )}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-24">
              <button
                onClick={() => setShowOrderReview(!showOrderReview)}
                className="w-full flex items-center justify-between mb-4"
              >
                <h2 className="text-lg font-bold text-[#363636]">Đơn hàng ({cartItems.length} sản phẩm)</h2>
                <span className="text-sm text-[#ca3838]">{showOrderReview ? 'Thu gọn' : 'Xem chi tiết'}</span>
              </button>

              {showOrderReview && (
                <div className="space-y-4 mb-6 pb-4 border-b border-gray-200">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium line-clamp-2">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.variant}</p>
                        <p className="text-sm text-gray-500">x{item.quantity}</p>
                      </div>
                      <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Summary */}
              <div className="space-y-3 pb-4 border-b border-gray-200">
                <div className="flex justify-between">
                  <span className="text-gray-500">Tạm tính</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Phí vận chuyển</span>
                  <span className="font-medium">
                    {shippingFee === 0 ? 'Miễn phí' : formatPrice(shippingFee)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between py-4">
                <span className="text-lg font-bold text-[#363636]">Tổng cộng</span>
                <span className="text-2xl font-bold text-[#ca3838]">{formatPrice(total)}</span>
              </div>

              <div className="bg-[#fff8e6] rounded-lg p-3 mb-4">
                <div className="flex items-start gap-2 text-sm text-[#b8860b]">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <p>Bạn sẽ nhận được email xác nhận đơn hàng sau khi thanh toán thành công</p>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="w-full bg-[#ca3838] text-white py-3 rounded-md font-semibold hover:bg-[#b32f2f] transition-colors disabled:opacity-50"
              >
                {isProcessing ? 'Đang xử lý...' : 'Đặt hàng ngay'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
