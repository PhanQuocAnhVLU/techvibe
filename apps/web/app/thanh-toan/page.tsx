'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, Check, Truck, CreditCard, Package, MapPin, Phone, User, Mail } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { products } from '@/lib/data'
import { formatPrice } from '@/lib/utils'
import { cn } from '@/lib/utils'

type Step = 'shipping' | 'delivery' | 'payment' | 'confirm'

const steps = [
  { id: 'shipping', label: 'Thông tin giao hàng', icon: User },
  { id: 'delivery', label: 'Vận chuyển', icon: Truck },
  { id: 'payment', label: 'Thanh toán', icon: CreditCard },
  { id: 'confirm', label: 'Xác nhận', icon: Package },
]

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState<Step>('shipping')
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: 'Nguyễn Văn A',
    phone: '0901234567',
    email: 'nguyenvana@email.com',
    province: 'TP Hồ Chí Minh',
    district: 'Quận 1',
    ward: 'Phường Bến Nghé',
    address: '123 Trần Hưng Đạo',
    note: '',
  })
  const [selectedShipping, setSelectedShipping] = useState('standard')
  const [selectedPayment, setSelectedPayment] = useState('cod')

  const cartItems = [
    { product: products[0], quantity: 1 },
    { product: products[1], quantity: 2 },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const shippingFee = selectedShipping === 'express' ? 45000 : selectedShipping === 'same_day' ? 70000 : 0
  const discount = 0
  const total = subtotal - discount + shippingFee

  const stepIndex = steps.findIndex(s => s.id === currentStep)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    const nextIndex = stepIndex + 1
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex].id as Step)
    }
  }

  const prevStep = () => {
    const prevIndex = stepIndex - 1
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].id as Step)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 'shipping':
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-bold">Thông tin giao hàng</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Họ tên *</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Số điện thoại *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:border-primary"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:border-primary"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Tỉnh/Thành phố *</label>
                <select
                  value={formData.province}
                  onChange={(e) => handleInputChange('province', e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:border-primary"
                >
                  <option>TP Hồ Chí Minh</option>
                  <option>Hà Nội</option>
                  <option>Đà Nẵng</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Quận/Huyện *</label>
                <select
                  value={formData.district}
                  onChange={(e) => handleInputChange('district', e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:border-primary"
                >
                  <option>Quận 1</option>
                  <option>Quận 3</option>
                  <option>Quận Bình Thạnh</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phường/Xã *</label>
                <select
                  value={formData.ward}
                  onChange={(e) => handleInputChange('ward', e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:border-primary"
                >
                  <option>Phường Bến Nghé</option>
                  <option>Phường Đa Kao</option>
                  <option>Phường Nguyễn Thái Bình</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Địa chỉ cụ thể *</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Số nhà, tên đường"
                  className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:border-primary"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Ghi chú đơn hàng</label>
                <textarea
                  value={formData.note}
                  onChange={(e) => handleInputChange('note', e.target.value)}
                  placeholder="Ví dụ: Giao hàng giờ hành chính"
                  rows={2}
                  className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:border-primary resize-none"
                />
              </div>
            </div>
          </div>
        )

      case 'delivery':
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-bold">Phương thức vận chuyển</h2>
            
            <div className="space-y-3">
              {[
                { id: 'standard', label: 'Giao hàng tiêu chuẩn', desc: '2-5 ngày', price: 0, icon: Truck },
                { id: 'express', label: 'Giao hàng nhanh', desc: '1-2 ngày', price: 45000, icon: Truck },
                { id: 'same_day', label: 'Giao hàng trong ngày', desc: '4 giờ', price: 70000, icon: Truck },
                { id: 'pickup', label: 'Nhận tại cửa hàng', desc: 'Quận 1, TP.HCM', price: 0, icon: MapPin },
              ].map((option) => (
                <label
                  key={option.id}
                  className={cn(
                    'flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors',
                    selectedShipping === option.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-gray-400'
                  )}
                >
                  <input
                    type="radio"
                    name="shipping"
                    value={option.id}
                    checked={selectedShipping === option.id}
                    onChange={(e) => setSelectedShipping(e.target.value)}
                    className="w-5 h-5 accent-primary"
                  />
                  <option.icon className="w-6 h-6 text-primary" />
                  <div className="flex-1">
                    <p className="font-medium">{option.label}</p>
                    <p className="text-sm text-gray-500">{option.desc}</p>
                  </div>
                  <span className="font-semibold text-primary">
                    {option.price === 0 ? 'Miễn phí' : formatPrice(option.price)}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )

      case 'payment':
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-bold">Phương thức thanh toán</h2>
            
            <div className="space-y-3">
              {[
                { id: 'cod', label: 'Thanh toán khi nhận hàng (COD)', icon: Package },
                { id: 'vnpay', label: 'Thẻ ATM / Internet Banking (VNPay)', icon: CreditCard },
                { id: 'momo', label: 'Ví MoMo', icon: CreditCard },
                { id: 'zalopay', label: 'ZaloPay', icon: CreditCard },
                { id: 'credit', label: 'Thẻ tín dụng / Ghi nợ (Visa/Mastercard)', icon: CreditCard },
                { id: 'installment', label: 'Trả góp 0% qua thẻ tín dụng', icon: CreditCard },
              ].map((option) => (
                <label
                  key={option.id}
                  className={cn(
                    'flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors',
                    selectedPayment === option.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-gray-400'
                  )}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={option.id}
                    checked={selectedPayment === option.id}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="w-5 h-5 accent-primary"
                  />
                  <option.icon className="w-6 h-6 text-primary" />
                  <span className="font-medium">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        )

      case 'confirm':
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-bold">Xác nhận đơn hàng</h2>
            
            {/* Shipping Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Địa chỉ giao hàng
              </h3>
              <div className="text-sm space-y-1">
                <p className="font-medium">{formData.fullName}</p>
                <p>{formData.phone}</p>
                <p className="text-gray-600">
                  {formData.address}, {formData.ward}, {formData.district}, {formData.province}
                </p>
              </div>
            </div>

            {/* Delivery Method */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Truck className="w-4 h-4 text-primary" />
                Phương thức vận chuyển
              </h3>
              <p className="text-sm">
                {selectedShipping === 'standard' && 'Giao hàng tiêu chuẩn (2-5 ngày)'}
                {selectedShipping === 'express' && 'Giao hàng nhanh (1-2 ngày)'}
                {selectedShipping === 'same_day' && 'Giao hàng trong ngày (4 giờ)'}
                {selectedShipping === 'pickup' && 'Nhận tại cửa hàng'}
              </p>
            </div>

            {/* Payment Method */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-primary" />
                Thanh toán
              </h3>
              <p className="text-sm">
                {selectedPayment === 'cod' && 'Thanh toán khi nhận hàng (COD)'}
                {selectedPayment === 'vnpay' && 'Thẻ ATM / Internet Banking (VNPay)'}
                {selectedPayment === 'momo' && 'Ví MoMo'}
                {selectedPayment === 'zalopay' && 'ZaloPay'}
                {selectedPayment === 'credit' && 'Thẻ tín dụng / Ghi nợ'}
                {selectedPayment === 'installment' && 'Trả góp 0%'}
              </p>
            </div>

            {/* Products */}
            <div className="border border-border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 font-medium">Sản phẩm</th>
                    <th className="text-center p-3 font-medium">Số lượng</th>
                    <th className="text-right p-3 font-medium">Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={index} className="border-t border-border">
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <div className="relative w-16 h-16 bg-gray-50 rounded overflow-hidden">
                            <Image
                              src={item.product.images[0]}
                              alt={item.product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium line-clamp-2">{item.product.name}</p>
                            <p className="text-gray-500">{formatPrice(item.product.price)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 text-center">{item.quantity}</td>
                      <td className="p-3 text-right font-medium">
                        {formatPrice(item.product.price * item.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
    }
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
            <Link href="/gio-hang" className="text-gray-500 hover:text-primary">Giỏ hàng</Link>
            <span className="text-gray-400">/</span>
            <span className="text-primary font-medium">Thanh toán</span>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors',
                        index <= stepIndex
                          ? 'bg-primary text-white'
                          : 'bg-gray-200 text-gray-500'
                      )}
                    >
                      {index < stepIndex ? <Check className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
                    </div>
                    <span className={cn(
                      'text-xs mt-2 hidden sm:block',
                      index <= stepIndex ? 'text-primary font-medium' : 'text-gray-500'
                    )}>
                      {step.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={cn(
                      'w-16 sm:w-24 h-0.5 mx-2',
                      index < stepIndex ? 'bg-primary' : 'bg-gray-200'
                    )} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg p-6">
                {renderStep()}

                {/* Navigation */}
                <div className="flex justify-between mt-8 pt-6 border-t border-border">
                  {stepIndex > 0 ? (
                    <Button variant="outline" onClick={prevStep}>
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Quay lại
                    </Button>
                  ) : (
                    <Link href="/gio-hang">
                      <Button variant="outline">
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Giỏ hàng
                      </Button>
                    </Link>
                  )}

                  {currentStep === 'confirm' ? (
                    <Button>
                      Đặt hàng ngay
                    </Button>
                  ) : (
                    <Button onClick={nextStep}>
                      Tiếp tục
                      <ChevronLeft className="w-4 h-4 ml-1 rotate-180" />
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-6 sticky top-24">
                <h2 className="font-bold text-lg mb-4">Đơn hàng ({cartItems.length} sản phẩm)</h2>
                
                {/* Items Preview */}
                <div className="space-y-3 mb-4 pb-4 border-b border-border">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="relative w-16 h-16 bg-gray-50 rounded overflow-hidden shrink-0">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-gray-500 text-white text-xs rounded-full flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-2">{item.product.name}</p>
                        <p className="text-sm text-primary font-medium">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tạm tính</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Giảm giá</span>
                    <span className="text-green-600">-{formatPrice(discount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Phí vận chuyển</span>
                    <span className={shippingFee === 0 ? 'text-green-600' : ''}>
                      {shippingFee === 0 ? 'Miễn phí' : formatPrice(shippingFee)}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-3 border-t border-border">
                    <span>Tổng cộng</span>
                    <span className="text-primary">{formatPrice(total)}</span>
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
