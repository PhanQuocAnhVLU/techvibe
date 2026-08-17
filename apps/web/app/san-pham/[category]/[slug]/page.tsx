'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { 
  ChevronLeft, ChevronRight, Heart, Share2, Truck, Shield, 
  RotateCcw, Check, Minus, Plus, Star, Facebook, MessageCircle
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ProductCard } from '@/components/product/product-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RatingStars } from '@/components/ui/rating-stars'
import { products } from '@/lib/data'
import { formatPrice, calculateDiscount } from '@/lib/utils'
import { cn } from '@/lib/utils'

export default function ProductDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const product = products.find(p => p.slug === slug) || products[0]
  
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState('Titan Natural')
  const [selectedStorage, setSelectedStorage] = useState('256GB')
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description')

  const discount = calculateDiscount(product.originalPrice, product.price)
  
  const colors = ['Titan Natural', 'Titan Black', 'Titan White', 'Titan Blue']
  const storages = ['128GB', '256GB', '512GB', '1TB']

  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 4)

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-border">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-primary transition-colors">
                Trang chủ
              </Link>
              <span className="text-gray-400">/</span>
              <Link href={`/san-pham/${product.categorySlug}`} className="text-gray-500 hover:text-primary transition-colors">
                {product.category}
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-primary font-medium truncate">{product.name}</span>
            </div>
          </div>
        </div>

        {/* Product Main */}
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square bg-white rounded-lg overflow-hidden">
                {product.isFlashSale && (
                  <Badge variant="flash" className="absolute top-4 left-4 z-10 text-sm px-3 py-1">
                    🔥 Flash Sale
                  </Badge>
                )}
                <Image
                  src={product.images[selectedImage] || product.images[0]}
                  alt={product.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                
                {/* Navigation */}
                <button 
                  onClick={() => setSelectedImage(prev => prev > 0 ? prev - 1 : product.images.length - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setSelectedImage(prev => prev < product.images.length - 1 ? prev + 1 : 0)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      'relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors shrink-0',
                      selectedImage === index ? 'border-primary' : 'border-transparent hover:border-gray-300'
                    )}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Share & Wishlist */}
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors">
                  <Heart className="w-5 h-5" />
                  <span className="text-sm">Thêm vào yêu thích</span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors">
                  <Share2 className="w-5 h-5" />
                  <span className="text-sm">Chia sẻ</span>
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Title & Rating */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-gray-500">{product.brand}</span>
                  <span className="text-gray-300">|</span>
                  <span className="text-sm text-gray-500">SKU: {product.sku}</span>
                </div>
                <h1 className="text-2xl font-bold text-secondary mb-3">{product.name}</h1>
                <div className="flex items-center gap-3">
                  <RatingStars rating={product.rating} />
                  <span className="text-sm text-gray-600">{product.rating} ({product.reviewCount} đánh giá)</span>
                  <span className="text-gray-300">|</span>
                  <span className="text-sm text-gray-600">{product.soldCount.toLocaleString()} đã bán</span>
                </div>
              </div>

              {/* Price */}
              <div className="bg-primary/5 rounded-lg p-4">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-3xl font-bold text-primary">{formatPrice(product.price)}</span>
                  {discount > 0 && (
                    <>
                      <span className="text-lg text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                      <Badge variant="discount">-{discount}%</Badge>
                    </>
                  )}
                </div>
                {discount > 0 && (
                  <p className="text-sm text-gray-600">
                    Tiết kiệm: <span className="text-primary font-semibold">{formatPrice(product.originalPrice - product.price)}</span>
                  </p>
                )}
                
                {/* Installment */}
                <div className="mt-4 p-3 bg-white rounded-md">
                  <p className="text-sm text-gray-600 mb-1">Trả góp 0%</p>
                  <p className="font-semibold text-secondary">
                    {formatPrice(Math.round(product.price / 12))}/tháng x 12 tháng
                  </p>
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <h3 className="font-semibold mb-3">Màu sắc:</h3>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        'px-4 py-2 border rounded-md text-sm transition-colors',
                        selectedColor === color
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-border hover:border-gray-400'
                      )}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Storage Selection */}
              <div>
                <h3 className="font-semibold mb-3">Dung lượng:</h3>
                <div className="flex flex-wrap gap-2">
                  {storages.map((storage) => (
                    <button
                      key={storage}
                      onClick={() => setSelectedStorage(storage)}
                      className={cn(
                        'px-4 py-2 border rounded-md text-sm transition-colors',
                        selectedStorage === storage
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-border hover:border-gray-400'
                      )}
                    >
                      {storage}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center border border-border rounded-md">
                  <button 
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="p-3 hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(prev => Math.min(product.stockQuantity, prev + 1))}
                    className="p-3 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  Còn {product.stockQuantity} sản phẩm
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" size="lg" className="flex-1 gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
                  </svg>
                  Thêm vào giỏ hàng
                </Button>
                <Button variant="primary" size="lg" className="flex-1">
                  Mua ngay
                </Button>
              </div>

              {/* Policy */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border">
                <div className="flex items-center gap-3">
                  <Truck className="w-8 h-8 text-primary" />
                  <div>
                    <p className="font-semibold text-sm">Miễn phí giao hàng</p>
                    <p className="text-xs text-gray-500">Cho đơn từ 500.000đ</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="w-8 h-8 text-primary" />
                  <div>
                    <p className="font-semibold text-sm">Đổi trả 15 ngày</p>
                    <p className="text-xs text-gray-500">Áp dụng mọi sản phẩm</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-8 h-8 text-primary" />
                  <div>
                    <p className="font-semibold text-sm">Bảo hành 12 tháng</p>
                    <p className="text-xs text-gray-500">Chính hãng Apple</p>
                  </div>
                </div>
              </div>

              {/* Promotions */}
              <div className="bg-accent/10 rounded-lg p-4">
                <h3 className="font-semibold mb-3 text-secondary">🎁 Khuyến mãi</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>Giảm 500.000đ khi thanh toán qua VNPay</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>Tặng 1 suất mua kèm AirPods với giá ưu đãi 4.990.000đ</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>Trả góp 0% lãi suất với thẻ tín dụng</span>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" size="sm" className="gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Chat ngay
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Phone className="w-4 h-4" />
                  Gọi 1800.2001
                </Button>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="mt-12">
            {/* Tab Headers */}
            <div className="flex border-b border-border">
              {(['description', 'specs', 'reviews'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    'px-6 py-4 font-semibold transition-colors relative',
                    activeTab === tab
                      ? 'text-primary'
                      : 'text-gray-500 hover:text-gray-700'
                  )}
                >
                  {tab === 'description' && 'Mô tả'}
                  {tab === 'specs' && 'Thông số kỹ thuật'}
                  {tab === 'reviews' && `Đánh giá (${product.reviewCount})`}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-b-lg p-6">
              {activeTab === 'description' && (
                <div className="prose max-w-none">
                  <h3 className="text-lg font-bold mb-4">{product.name}</h3>
                  <p className="text-gray-600 mb-4">
                    {product.name} là chiếc smartphone cao cấp nhất của Apple, mang đến trải nghiệm 
                    di động đỉnh cao với thiết kế tinh tế, hiệu năng mạnh mẽ và hệ thống camera chuyên nghiệp.
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Màn hình Super Retina XDR 6.7 inch với ProMotion 120Hz</li>
                    <li>Chip A17 Pro cho hiệu năng vượt trội</li>
                    <li>Hệ thống camera 48MP với khả năng zoom quang 5x</li>
                    <li>Pin trâu, hỗ trợ sạc nhanh MagSafe</li>
                    <li>Chất liệu titanium cao cấp, nhẹ và bền</li>
                  </ul>
                </div>
              )}

              {activeTab === 'specs' && (
                <div>
                  <table className="w-full">
                    <tbody>
                      {[
                        ['Màn hình', '6.7" Super Retina XDR'],
                        ['Chip', 'A17 Pro'],
                        ['RAM', '8GB'],
                        ['Dung lượng', '256GB / 512GB / 1TB'],
                        ['Camera sau', '48MP + 12MP + 12MP'],
                        ['Camera trước', '12MP'],
                        ['Pin', '4.422 mAh'],
                        ['Sạc', 'MagSafe 15W / Lightning 20W'],
                        ['SIM', 'Nano SIM + eSIM'],
                        ['Mạng', '5G / 4G LTE'],
                        ['Bluetooth', '5.3'],
                        ['NFC', 'Có'],
                        ['Face ID', 'Có'],
                        ['Chống nước', 'IP68'],
                        ['Kích thước', '159.9 x 76.7 x 8.25 mm'],
                        ['Trọng lượng', '221g'],
                      ].map(([label, value]) => (
                        <tr key={label} className="border-b border-border">
                          <td className="py-3 text-gray-500 w-1/3">{label}</td>
                          <td className="py-3 font-medium">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  {/* Summary */}
                  <div className="flex flex-col md:flex-row gap-8 p-6 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-primary">{product.rating}</div>
                      <RatingStars rating={product.rating} size="lg" className="justify-center mt-2" />
                      <p className="text-sm text-gray-500 mt-1">{product.reviewCount} đánh giá</p>
                    </div>
                    <div className="flex-1 space-y-2">
                      {[5, 4, 3, 2, 1].map((stars) => {
                        const count = Math.floor(product.reviewCount * (stars === 5 ? 0.6 : stars === 4 ? 0.25 : 0.1))
                        const percent = (count / product.reviewCount) * 100
                        return (
                          <div key={stars} className="flex items-center gap-2">
                            <span className="w-8 text-sm">{stars} ★</span>
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-accent rounded-full"
                                style={{ width: `${percent}%` }}
                              />
                            </div>
                            <span className="w-12 text-sm text-gray-500 text-right">{count}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Sample Reviews */}
                  <div className="space-y-4">
                    {[
                      { name: 'Nguyễn Văn A', rating: 5, date: '15/08/2026', content: 'Sản phẩm tuyệt vời, giao hàng nhanh, đóng gói cẩn thận. Máy chính hãng 100%.' },
                      { name: 'Trần Thị B', rating: 5, date: '14/08/2026', content: 'Đã mua 2 chiếc cho cả nhà. Chất lượng tốt, giá cả hợp lý hơn nhiều chỗ khác.' },
                      { name: 'Lê Văn C', rating: 4, date: '13/08/2026', content: 'Sản phẩm tốt, nhân viên tư vấn nhiệt tình. Trừ 1 sao vì giao hàng chậm 1 ngày.' },
                    ].map((review, index) => (
                      <div key={index} className="border-b border-border pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                              <span className="font-semibold text-primary">{review.name[0]}</span>
                            </div>
                            <div>
                              <p className="font-semibold">{review.name}</p>
                              <RatingStars rating={review.rating} size="sm" />
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <p className="text-gray-600">{review.content}</p>
                      </div>
                    ))}
                  </div>

                  <Button variant="outline" className="w-full">Xem thêm đánh giá</Button>
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-6">Sản phẩm liên quan</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
