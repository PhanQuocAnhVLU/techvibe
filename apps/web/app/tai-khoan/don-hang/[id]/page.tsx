'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Check, Clock, Truck, Package, Home, Phone } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { MobileBottomNav } from '@/components/layout/mobile-bottom-nav'
import { Button } from '@/components/ui/button'
import { products } from '@/lib/data'
import { formatPrice } from '@/lib/utils'

const order = {
  id: 'ORD20260817001',
  date: '17/08/2026 lúc 14:30',
  status: 'shipping',
  shippingAddress: {
    name: 'Nguyễn Văn A',
    phone: '0901234567',
    address: '123 Trần Hưng Đạo, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
  },
  items: [
    { product: products[0], quantity: 1 },
    { product: products[1], quantity: 1 },
  ],
  subtotal: products[0].price + products[1].price,
  shippingFee: 0,
  discount: 500000,
  total: products[0].price + products[1].price - 500000,
  paymentMethod: 'COD (Thanh toán khi nhận hàng)',
  timeline: [
    { status: 'ordered', label: 'Đặt hàng thành công', time: '14:30 - 17/08/2026', done: true },
    { status: 'confirmed', label: 'Xác nhận đơn hàng', time: '14:45 - 17/08/2026', done: true },
    { status: 'processing', label: 'Đang chuẩn bị hàng', time: '15:00 - 17/08/2026', done: true },
    { status: 'shipping', label: 'Đang giao cho đơn vị vận chuyển', time: '09:00 - 18/08/2026', done: true },
    { status: 'delivered', label: 'Giao hàng thành công', time: '', done: false },
  ],
}

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: 'Chờ xác nhận', color: 'text-yellow-700', bg: 'bg-yellow-100' },
  confirmed: { label: 'Đã xác nhận', color: 'text-blue-700', bg: 'bg-blue-100' },
  processing: { label: 'Đang xử lý', color: 'text-purple-700', bg: 'bg-purple-100' },
  shipping: { label: 'Đang giao hàng', color: 'text-indigo-700', bg: 'bg-indigo-100' },
  completed: { label: 'Hoàn thành', color: 'text-green-700', bg: 'bg-green-100' },
  cancelled: { label: 'Đã hủy', color: 'text-red-700', bg: 'bg-red-100' },
}

export default function OrderDetailPage() {
  const [showCancelModal, setShowCancelModal] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-background pb-20 md:pb-0">
      <Header />

      <main className="flex-1">
        {/* Header */}
        <div className="bg-white border-b border-border sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Link href="/tai-khoan/don-hang" className="text-primary">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div className="flex-1">
                <h1 className="text-xl font-bold">Chi tiết đơn hàng</h1>
                <p className="text-sm text-gray-500">{order.id}</p>
              </div>
              <span className={cn(
                'px-3 py-1 rounded-full text-sm font-medium',
                statusConfig[order.status].bg,
                statusConfig[order.status].color
              )}>
                {statusConfig[order.status].label}
              </span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white border-b border-border">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              {order.timeline.map((step, index) => (
                <div key={step.status} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center',
                      step.done ? 'bg-primary text-white' : 'bg-gray-200 text-gray-400'
                    )}>
                      {step.done ? <Check className="w-5 h-5" /> : <span>{index + 1}</span>}
                    </div>
                    <p className="text-xs text-center mt-2 max-w-[80px]">{step.label}</p>
                    {step.time && <p className="text-[10px] text-gray-400">{step.time}</p>}
                  </div>
                  {index < order.timeline.length - 1 && (
                    <div className={cn(
                      'w-8 h-0.5 mx-1',
                      order.timeline[index + 1]?.done ? 'bg-primary' : 'bg-gray-200'
                    )} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-white mt-4">
          <div className="container mx-auto px-4 py-4">
            <h2 className="font-semibold mb-3 flex items-center gap-2">
              <Home className="w-5 h-5 text-primary" />
              Địa chỉ giao hàng
            </h2>
            <div className="text-sm">
              <p className="font-medium">{order.shippingAddress.name}</p>
              <p className="text-gray-600 flex items-center gap-1">
                <Phone className="w-4 h-4" />
                {order.shippingAddress.phone}
              </p>
              <p className="text-gray-500 mt-1">{order.shippingAddress.address}</p>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="bg-white mt-4">
          <div className="container mx-auto px-4 py-4">
            <h2 className="font-semibold mb-3">Sản phẩm đã đặt</h2>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="relative w-20 h-20 bg-gray-50 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium line-clamp-2">{item.product.name}</p>
                    <p className="text-sm text-gray-500">x{item.quantity}</p>
                    <p className="font-bold text-primary">{formatPrice(item.product.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="bg-white mt-4">
          <div className="container mx-auto px-4 py-4">
            <h2 className="font-semibold mb-3">Thanh toán</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Tạm tính</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Phí vận chuyển</span>
                <span className={order.shippingFee === 0 ? 'text-green-600' : ''}>
                  {order.shippingFee === 0 ? 'Miễn phí' : formatPrice(order.shippingFee)}
                </span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Giảm giá</span>
                  <span>-{formatPrice(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Tổng cộng</span>
                <span className="text-primary">{formatPrice(order.total)}</span>
              </div>
              <div className="flex justify-between text-gray-500 pt-2 border-t">
                <span>Phương thức</span>
                <span>{order.paymentMethod}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 p-4 space-y-3">
          {order.status === 'shipping' && (
            <Button className="w-full" size="lg">
              <Truck className="w-5 h-5 mr-2" />
              Theo dõi đơn hàng
            </Button>
          )}
          {order.status === 'completed' && (
            <Button className="w-full" size="lg" variant="outline">
              <Package className="w-5 h-5 mr-2" />
              Mua lại
            </Button>
          )}
          {order.status === 'pending' && (
            <Button 
              variant="outline" 
              className="w-full text-red-500 border-red-200"
              onClick={() => setShowCancelModal(true)}
            >
              Hủy đơn hàng
            </Button>
          )}
        </div>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}
