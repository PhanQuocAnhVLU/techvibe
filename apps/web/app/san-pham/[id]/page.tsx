'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ChevronRight, Star, Minus, Plus, Heart, Share2, Truck, 
  ShieldCheck, RotateCcw, Check, ChevronDown, ChevronUp,
  ShoppingCart, TruckIcon, Eye, ZoomIn, X, Camera
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductMockup } from '@/components/product-mockup'
import { SmartImage } from '@/components/smart-image'

// Sample product data
const product = {
  id: 1,
  name: 'iPhone 15 Pro Max 256GB Natural Titanium',
  brand: 'Apple',
  category: 'dien-thoai',
  price: 32990000,
  originalPrice: 34990000,
  rating: 4.8,
  reviews: 1245,
  images: [
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/iphone-15-pro-max_3.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/iphone-15-pro-max_3.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/iphone-15-pro-max_3.png',
    'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/iphone-15-pro-max_3.png',
  ],
  colors: [
    { name: 'Titan tự nhiên', code: '#9A9A9A' },
    { name: 'Titan xanh', code: '#3A3A3A' },
    { name: 'Titan trắng', code: '#F5F5F5' },
    { name: 'Titan đen', code: '#1A1A1A' },
  ],
  storages: [
    { value: '256GB', price: 32990000 },
    { value: '512GB', price: 38990000 },
    { value: '1TB', price: 44990000 },
  ],
  specs: {
    screen: '6.7" Super Retina XDR',
    resolution: '2796 x 1290 pixels',
    camera: '48MP + 12MP + 12MP',
    cpu: 'Apple A17 Pro',
    ram: '8GB',
    battery: '4422 mAh',
    os: 'iOS 17',
  },
  stock: 45,
  description: `iPhone 15 Pro Max sở hữu khung titanium cao cấp, mang đến độ bền vượt trội và trọng lượng nhẹ hơn. Chip A17 Pro mới nhất với Neural Engine 16-core cho hiệu năng mạnh mẽ và khả năng xử lý AI tiên tiến.

Hệ thống camera 48MP với cảm biến quad-pixel tiên tiến, cho phép chụp ảnh ở độ phân giải 24MP và 48MP. Chế độ Cinematic nay hỗ trợ quay video 4K/60fps với Dolby Vision.

Màn hình Super Retina XDR 6.7" với ProMotion 120Hz mang đến trải nghiệm mượt mà. Khe SIM thứ hai nay đã được thay thế bằng Action Button có thể tùy chỉnh.`,
  promotions: [
    'Giảm ngay 2 triệu khi mua kèm AirPods',
    'Trả góp 0% lãi suất 6 tháng',
    'Tặng 500.000đ khi thanh toán qua Ví ShopeePay',
  ],
  accessories: [
    { id: 1, name: 'AirPods Pro 2', brand: 'Apple', price: 6990000, image: '' },
    { id: 2, name: 'Ốp lưng MagSafe', brand: 'Apple', price: 990000, image: '' },
    { id: 3, name: 'Cáp sạc USB-C', brand: 'Apple', price: 590000, image: '' },
  ],
  similarProducts: [
    { id: 2, name: 'iPhone 15 Pro', brand: 'Apple', price: 28990000, image: '' },
    { id: 3, name: 'iPhone 15 Plus', brand: 'Apple', price: 24990000, image: '' },
    { id: 4, name: 'iPhone 14 Pro Max', brand: 'Apple', price: 27990000, image: '' },
    { id: 5, name: 'iPhone 15', brand: 'Apple', price: 22990000, image: '' },
  ],
}

const reviews = [
  { id: 1, user: 'Nguyễn Văn A', date: '15/08/2024', rating: 5, content: 'Sản phẩm tuyệt vời, giao hàng nhanh, đóng gói cẩn thận. Camera chụp rất đẹp!' },
  { id: 2, user: 'Trần Thị B', date: '12/08/2024', rating: 4, content: 'Máy đẹp, chạy mượt nhưng giá hơi cao so với thị trường.' },
  { id: 3, user: 'Lê Văn C', date: '10/08/2024', rating: 5, content: 'Pin trâu, camera xịn, màn hình đẹp. Rất hài lòng!' },
]

function formatPrice(price: number) {
  return new Intl.NumberFormat('vi-VN').format(price) + 'đ'
}

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedStorage, setSelectedStorage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [showFullDesc, setShowFullDesc] = useState(false)
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description')
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const currentPrice = product.storages[selectedStorage].price
  const discount = product.originalPrice > currentPrice
    ? Math.round((1 - currentPrice / product.originalPrice) * 100)
    : 0

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
            <div className="flex items-center gap-4">
              <Link href="/tra-cuu-don-hang" className="hover:opacity-80">Tra cứu đơn hàng</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="w-11 h-11 bg-[#ca3838] rounded-lg flex items-center justify-center">
                <span className="font-bold text-white text-2xl">T</span>
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-2xl text-[#363636]">Tech</span>
                <span className="font-bold text-2xl text-[#ca3838]">Store</span>
              </div>
            </Link>
          </div>
        </div>
      </header>

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
          {/* Left - Images - Style TGDĐ */}
          <div className="space-y-4 animate-slide-in-left">
            {/* Main Image */}
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

            {/* Thumbnails */}
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

          {/* Right - Product Info - Style TGDĐ */}
          <div className="space-y-4">
            {/* Title & Rating */}
            <div>
              <span className="inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#ca3838] bg-red-50 rounded-full">{product.brand}</span>
              <h1 className="text-2xl font-bold text-[#363636] mt-2 leading-tight">{product.name}</h1>
              <div className="flex items-center gap-4 mt-3 flex-wrap">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className={`w-4 h-4 ${i <= product.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="font-bold text-sm">{product.rating}</span>
                <span className="text-gray-400 text-sm">({product.reviews} đánh giá)</span>
                <span className="text-gray-300">|</span>
                <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Còn hàng
                </span>
              </div>
            </div>

            {/* Price Box - Style TGDĐ */}
            <div className="bg-gradient-to-br from-[#fef6f6] to-orange-50 rounded-2xl p-5 border border-red-100">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-4xl font-black bg-gradient-to-r from-[#ca3838] to-orange-500 bg-clip-text text-transparent">{formatPrice(currentPrice)}</span>
                {product.originalPrice > currentPrice && (
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
                  <strong>Trả góp 0%:</strong> {formatPrice(Math.round(currentPrice / 24))}đ/tháng x 24 tháng
                </p>
              </div>
            </div>

            {/* Promotions */}
            <div className="bg-white border border-[#ca3838] rounded-lg p-4">
              <h3 className="font-semibold text-[#ca3838] mb-2">🎁 Khuyến mãi</h3>
              {product.promotions.map((promo, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm mb-1">
                  <Check className="w-4 h-4 text-[#16a34a]" />
                  <span>{promo}</span>
                </div>
              ))}
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="font-semibold text-[#363636] mb-3">Màu sắc: <span className="font-normal text-gray-600">{product.colors[selectedColor].name}</span></h3>
              <div className="flex gap-3">
                {product.colors.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(idx)}
                    className={`w-12 h-12 rounded-full border-2 transition-all ${
                      selectedColor === idx ? 'border-[#ca3838] scale-110 ring-2 ring-[#ca3838]/30' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    style={{ backgroundColor: color.code }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Storage Selection - Style TGDĐ */}
            <div>
              <h3 className="font-semibold text-[#363636] mb-3">Dung lượng:</h3>
              <div className="flex gap-3">
                {product.storages.map((storage, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedStorage(idx)}
                    className={`px-5 py-3 rounded-md border-2 font-medium transition-all ${
                      selectedStorage === idx
                        ? 'border-[#ca3838] bg-[#fef6f6] text-[#ca3838]'
                        : 'border-gray-200 hover:border-gray-300 text-[#363636]'
                    }`}
                  >
                    {storage.value}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart - Style TGDĐ */}
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
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-3 hover:bg-gray-100"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <span className="text-sm text-gray-500">Còn {product.stock} sản phẩm</span>
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

            {/* Benefits - Style TGDĐ */}
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

        {/* Tabs - Style TGDĐ */}
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
                  {showFullDesc ? product.description : product.description.slice(0, 300) + '...'}
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
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-500">
                        {key === 'screen' ? 'Màn hình' :
                         key === 'resolution' ? 'Độ phân giải' :
                         key === 'camera' ? 'Camera sau' :
                         key === 'cpu' ? 'Chip xử lý' :
                         key === 'ram' ? 'RAM' :
                         key === 'battery' ? 'Pin' :
                         key === 'os' ? 'Hệ điều hành' : key}
                      </span>
                      <span className="font-medium text-[#363636]">{value}</span>
                    </div>
                  ))}
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
                        <Star key={i} className={`w-4 h-4 ${i <= product.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{product.reviews} đánh giá</p>
                  </div>
                </div>
                {reviews.map(review => (
                  <div key={review.id} className="border-b border-gray-100 pb-4 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-semibold">
                        {review.user[0]}
                      </div>
                      <div>
                        <p className="font-medium">{review.user}</p>
                        <div className="flex items-center gap-1">
                          {[1,2,3,4,5].map(i => (
                            <Star key={i} className={`w-3 h-3 ${i <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                          ))}
                          <span className="text-xs text-gray-400 ml-2">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700">{review.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Accessories */}
        <div className="mt-10">
          <h2 className="text-lg font-bold text-[#363636] mb-4">Phụ kiện đi kèm</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {product.accessories.map(item => (
              <Link key={item.id} href={`/san-pham/${item.id}`} className="bg-white rounded-xl p-4 text-center hover:shadow-2xl transition-all hover:-translate-y-1 border border-gray-100 hover:border-[#ca3838]/30 group">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg mb-3 overflow-hidden">
                  <SmartImage name={item.name} brand={product.brand} aspectRatio="square" className="w-full" />
                </div>
                <p className="font-medium text-sm text-[#363636] group-hover:text-[#ca3838] transition-colors line-clamp-2">{item.name}</p>
                <p className="text-[#ca3838] font-bold mt-1">{formatPrice(item.price)}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Similar Products */}
        <div className="mt-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-7 bg-gradient-to-b from-[#ca3838] to-orange-500 rounded-full" />
            <h2 className="text-xl font-bold text-[#363636]">Sản phẩm tương tự</h2>
            <span className="text-xs text-gray-500 ml-2">Có thể bạn sẽ thích</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {product.similarProducts.map(item => (
              <Link key={item.id} href={`/san-pham/${item.id}`} className="bg-white rounded-xl p-3 hover:shadow-2xl transition-all hover:-translate-y-1 border border-gray-100 hover:border-[#ca3838]/30 group">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg mb-3 overflow-hidden">
                  <SmartImage name={item.name} brand={product.brand} aspectRatio="square" className="w-full" />
                </div>
                <p className="font-medium text-sm text-[#363636] line-clamp-2 group-hover:text-[#ca3838] transition-colors min-h-[40px]">{item.name}</p>
                <p className="bg-gradient-to-r from-[#ca3838] to-orange-500 bg-clip-text text-transparent font-bold mt-2">{formatPrice(item.price)}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[70] bg-black/95 flex items-center justify-center p-4 animate-fade-in" onClick={() => setLightboxOpen(false)}>
          <button onClick={() => setLightboxOpen(false)} className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all hover:scale-110">
            <X className="w-6 h-6" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); setSelectedImage(prev => (prev - 1 + product.images.length) % product.images.length) }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white"
          >
            <ChevronRight className="w-6 h-6 rotate-180" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); setSelectedImage(prev => (prev + 1) % product.images.length) }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="max-w-3xl w-full" onClick={e => e.stopPropagation()}>
            <div className="bg-white rounded-2xl p-12 flex items-center justify-center">
              <SmartImage name={product.name} brand={product.brand} aspectRatio="square" className="max-h-[70vh]" />
            </div>
            <div className="flex justify-center gap-2 mt-4">
              {product.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`h-2 rounded-full transition-all ${
                    selectedImage === idx ? 'bg-white w-8' : 'bg-white/40 w-2'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
