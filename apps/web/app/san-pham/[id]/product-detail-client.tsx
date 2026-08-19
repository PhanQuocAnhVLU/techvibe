'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ChevronRight, Star, Minus, Plus, Heart, Share2, Truck,
  ShieldCheck, RotateCcw, Check, ChevronDown, ChevronUp,
  ShoppingCart, Camera, ZoomIn, X
} from 'lucide-react'
import { SmartImage } from '@/components/smart-image'
import { Header } from '@/components/cellphones/header'
import { AnnouncementBar } from '@/components/cellphones/announcement-bar'
import { Footer } from '@/components/cellphones/footer'
import { ProductReviews } from '@/components/product-reviews'
import type { Product } from '@/lib/types'

function formatPrice(price: number) {
  return new Intl.NumberFormat('vi-VN').format(price) + 'đ'
}

const SPEC_LABELS: Record<string, string> = {
  screen: 'Màn hình',
  cpu: 'Chip xử lý',
  chip: 'Chip',
  ram: 'RAM',
  storage: 'Bộ nhớ',
  camera: 'Camera',
  battery: 'Pin',
  os: 'Hệ điều hành',
  connectivity: 'Kết nối',
  gpu: 'GPU',
  resolution: 'Độ phân giải',
}

export function ProductDetailClient({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [showFullDesc, setShowFullDesc] = useState(false)
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description')
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const discount = product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <AnnouncementBar />
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-[#ca3838] flex items-center gap-1 group">
              <span className="group-hover:underline">Trang chủ</span>
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-300" />
            <Link href="/san-pham" className="text-gray-500 hover:text-[#ca3838]">
              <span className="hover:underline">Sản phẩm</span>
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-300" />
            <span className="text-[#363636] font-medium truncate">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left - Images */}
          <div className="space-y-4 animate-slide-in-left">
            <div
              className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden group cursor-zoom-in shadow-md hover:shadow-2xl transition-shadow"
              onClick={() => setLightboxOpen(true)}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <SmartImage name={product.name} brand={product.brand} aspectRatio="square" className="w-full h-full" />
              </div>
              {discount > 0 && (
                <span className="absolute top-4 left-4 px-3 py-1.5 text-sm font-bold bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-full shadow-lg">
                  -{discount}%
                </span>
              )}
              <div className="absolute bottom-4 left-4 flex gap-2">
                <button className="p-2.5 bg-white/95 backdrop-blur rounded-full hover:bg-white shadow-lg hover:scale-110 transition-transform">
                  <Heart className="w-5 h-5 text-gray-400 hover:text-red-500" />
                </button>
                <button className="p-2.5 bg-white/95 backdrop-blur rounded-full hover:bg-white shadow-lg hover:scale-110 transition-transform">
                  <Share2 className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <button className="absolute top-4 right-4 p-2.5 bg-white/95 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 hover:bg-white shadow-lg hover:scale-110 transition-all">
                <ZoomIn className="w-5 h-5 text-gray-700" />
              </button>
              <div className="absolute bottom-4 right-4 flex items-center gap-1 px-3 py-1.5 bg-white/95 backdrop-blur rounded-full text-xs font-medium shadow">
                <Camera className="w-3 h-3" />
                <span>{selectedImage + 1} / {product.images.length}</span>
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto scrollbar-thin">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all hover:scale-105 bg-white ${
                    selectedImage === idx ? 'border-[#ca3838] shadow-lg ring-2 ring-[#ca3838]/20' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <SmartImage name={product.name} brand={product.brand} aspectRatio="square" className="w-full h-full" />
                </button>
              ))}
            </div>
          </div>

          {/* Right - Product Info */}
          <div className="space-y-4">
            <div>
              <span className="inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#ca3838] bg-red-50 rounded-full">{product.brand}</span>
              <h1 className="text-2xl font-bold text-[#363636] mt-2 leading-tight">{product.name}</h1>
              <div className="flex items-center gap-4 mt-3 flex-wrap">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className={`w-4 h-4 ${i <= Math.round(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="font-bold text-sm">{product.rating}</span>
                <span className="text-gray-400 text-sm">({product.reviewCount} đánh giá)</span>
                <span className="text-gray-300">|</span>
                <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  {product.inStock ? `Còn hàng (${product.stockQuantity})` : 'Hết hàng'}
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div className="bg-gradient-to-br from-[#fef6f6] to-orange-50 rounded-2xl p-5 border border-red-100">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-4xl font-black bg-gradient-to-r from-[#ca3838] to-orange-500 bg-clip-text text-transparent">{formatPrice(product.price)}</span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-lg text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                    <span className="px-2 py-0.5 text-sm font-bold bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-full">-{discount}%</span>
                  </>
                )}
              </div>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                <span>✓ Giá đã bao gồm VAT</span>
              </div>
              <div className="mt-3 p-3 bg-[#fff8e6] rounded-md">
                <p className="text-sm text-[#b8860b]">
                  <strong>Trả góp 0%:</strong> {formatPrice(Math.round(product.price / 24))}/tháng x 24 tháng
                </p>
              </div>
            </div>

            {/* Promotions */}
            <div className="bg-white border border-[#ca3838] rounded-lg p-4">
              <h3 className="font-semibold text-[#ca3838] mb-2">🎁 Khuyến mãi</h3>
              {[
                'Giảm ngay 2 triệu khi mua kèm AirPods',
                'Trả góp 0% lãi suất 6 tháng',
                'Tặng 500.000đ khi thanh toán qua ví điện tử',
              ].map((promo, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm mb-1">
                  <Check className="w-4 h-4 text-[#16a34a]" />
                  <span>{promo}</span>
                </div>
              ))}
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-gray-100"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                  className="p-3 hover:bg-gray-100"
                  disabled={!product.inStock}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <span className="text-sm text-gray-500">Còn {product.stockQuantity} sản phẩm</span>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 bg-[#ca3838] text-white py-3 rounded-md font-semibold hover:bg-[#b32f2f] transition-colors flex items-center justify-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Thêm vào giỏ hàng
              </button>
              <button className="flex-1 border-2 border-[#ca3838] text-[#ca3838] py-3 rounded-md font-semibold hover:bg-[#fef6f6] transition-colors">
                Mua ngay
              </button>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Truck className="w-6 h-6 mx-auto text-[#ca3838]" />
                <p className="text-xs text-gray-600 mt-1">Miễn phí vận chuyển</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <ShieldCheck className="w-6 h-6 mx-auto text-[#ca3838]" />
                <p className="text-xs text-gray-600 mt-1">Bảo hành 12 tháng</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <RotateCcw className="w-6 h-6 mx-auto text-[#ca3838]" />
                <p className="text-xs text-gray-600 mt-1">Đổi trả 7 ngày</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-10">
          <div className="flex border-b-2 border-gray-200">
            {([
              { key: 'description', label: 'Mô tả sản phẩm' },
              { key: 'specs', label: 'Thông số kỹ thuật' },
              { key: 'reviews', label: 'Đánh giá' }
            ] as const).map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-4 font-semibold border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? 'border-[#ca3838] text-[#ca3838]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="py-6 bg-white rounded-lg mt-4">
            {activeTab === 'description' && (
              <div className="px-6">
                <p className="whitespace-pre-line text-gray-700 leading-relaxed">
                  {showFullDesc
                    ? (product.description || `${product.name} - ${product.brand} ${product.category}. Sản phẩm chính hãng, bảo hành 12 tháng tại TechVibe.`)
                    : (product.description || `${product.name} - ${product.brand} ${product.category}. Sản phẩm chính hãng, bảo hành 12 tháng tại TechVibe.`).slice(0, 300) + '...'}
                </p>
                <button
                  onClick={() => setShowFullDesc(!showFullDesc)}
                  className="flex items-center gap-1 text-[#ca3838] mt-4 font-medium"
                >
                  {showFullDesc ? (
                    <>Thu gọn <ChevronUp className="w-4 h-4" /></>
                  ) : (
                    <>Xem thêm <ChevronDown className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="px-6">
                <h3 className="font-semibold text-lg mb-4">Thông số kỹ thuật</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {product.specs && product.specs.length > 0 ? (
                    product.specs.map((spec, idx) => (
                      <div key={idx} className="flex justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-500">{SPEC_LABELS[spec.label] || spec.label}</span>
                        <span className="font-medium text-[#363636]">{spec.value}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">Đang cập nhật thông số...</p>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="px-6">
                <div className="flex items-center gap-6 mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#ca3838]">{product.rating}</div>
                    <div className="flex items-center gap-1 mt-1">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} className={`w-4 h-4 ${i <= Math.round(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{product.reviewCount} đánh giá</p>
                  </div>
                </div>
                <ProductReviews productId={Number(product.id)} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[70] bg-black/95 flex items-center justify-center p-4 animate-fade-in" onClick={() => setLightboxOpen(false)}>
          <button onClick={() => setLightboxOpen(false)} className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all hover:scale-110">
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-3xl w-full" onClick={e => e.stopPropagation()}>
            <div className="bg-white rounded-2xl p-12 flex items-center justify-center">
              <SmartImage name={product.name} brand={product.brand} aspectRatio="square" className="max-h-[70vh]" />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
