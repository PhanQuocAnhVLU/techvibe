'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  ChevronRight, Star, Minus, Plus, Heart, Share2, Truck, 
  ShieldCheck, RotateCcw, Check, ChevronDown, ChevronUp
} from 'lucide-react'
import { Button } from '@/components/ui/button'

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
    '/api/placeholder/600/600',
    '/api/placeholder/600/600',
    '/api/placeholder/600/600',
    '/api/placeholder/600/600',
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
    { id: 1, name: 'AirPods Pro 2', price: 6990000, image: '/api/placeholder/100/100' },
    { id: 2, name: 'Ốp lưng MagSafe', price: 990000, image: '/api/placeholder/100/100' },
    { id: 3, name: 'Cáp sạc USB-C', price: 590000, image: '/api/placeholder/100/100' },
  ],
  similarProducts: [
    { id: 2, name: 'iPhone 15 Pro', price: 28990000, image: '/api/placeholder/200/200' },
    { id: 3, name: 'iPhone 15 Plus', price: 24990000, image: '/api/placeholder/200/200' },
    { id: 4, name: 'iPhone 14 Pro Max', price: 27990000, image: '/api/placeholder/200/200' },
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

  const currentPrice = product.storages[selectedStorage].price
  const discount = product.originalPrice > currentPrice
    ? Math.round((1 - currentPrice / product.originalPrice) * 100)
    : 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="font-bold text-white text-xl">T</span>
              </div>
              <span className="font-bold text-xl">
                <span className="text-secondary">Tech</span>
                <span className="text-primary">Store</span>
              </span>
            </Link>

            <div className="flex items-center gap-4">
              <Link href="/gio-hang" className="relative p-2 hover:bg-gray-100 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-primary">Trang chủ</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/san-pham" className="text-gray-500 hover:text-primary">Điện thoại</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded-xl overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {discount > 0 && (
                <span className="absolute top-4 left-4 px-3 py-1.5 text-sm font-semibold bg-primary text-white rounded-lg">
                  -{discount}%
                </span>
              )}
              <div className="absolute bottom-4 left-4 flex gap-2">
                <button className="p-2 bg-white/90 rounded-full hover:bg-white">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="p-2 bg-white/90 rounded-full hover:bg-white">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === idx ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right - Product Info */}
          <div className="space-y-6">
            {/* Title & Rating */}
            <div>
              <span className="text-sm text-gray-500">{product.brand}</span>
              <h1 className="text-2xl font-bold text-gray-900 mt-1">{product.name}</h1>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className={`w-5 h-5 ${i <= product.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="font-medium">{product.rating}</span>
                <span className="text-gray-400">({product.reviews} đánh giá)</span>
              </div>
            </div>

            {/* Price */}
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-primary">{formatPrice(currentPrice)}</span>
                {product.originalPrice > currentPrice && (
                  <>
                    <span className="text-lg text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                    <span className="text-sm font-medium text-red-500">-{discount}%</span>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Góp mỗi tháng: <strong>{formatPrice(Math.round(currentPrice / 24))}</strong> x 24 tháng, 0% lãi
              </p>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Màu sắc: <span className="font-normal">{product.colors[selectedColor].name}</span></h3>
              <div className="flex gap-3">
                {product.colors.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(idx)}
                    className={`w-12 h-12 rounded-full border-2 transition-all ${
                      selectedColor === idx ? 'border-primary scale-110' : 'border-gray-200'
                    }`}
                    style={{ backgroundColor: color.code }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Storage Selection */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Dung lượng:</h3>
              <div className="flex gap-3">
                {product.storages.map((storage, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedStorage(idx)}
                    className={`px-5 py-3 rounded-lg border-2 font-medium transition-all ${
                      selectedStorage === idx
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {storage.value}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-gray-100"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-3 hover:bg-gray-100"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <span className="text-sm text-gray-500">Còn {product.stock} sản phẩm</span>
            </div>

            <div className="flex gap-3">
              <Button className="flex-1" size="lg">
                Thêm vào giỏ hàng
              </Button>
              <Button variant="outline" size="lg">
                Mua ngay
              </Button>
            </div>

            {/* Promotions */}
            <div className="bg-orange-50 rounded-xl p-4 space-y-2">
              <h3 className="font-semibold text-orange-600 mb-2">Khuyến mãi</h3>
              {product.promotions.map((promo, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-orange-500" />
                  <span>{promo}</span>
                </div>
              ))}
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <Truck className="w-6 h-6 mx-auto text-gray-400" />
                <p className="text-xs text-gray-500 mt-1">Miễn phí vận chuyển</p>
              </div>
              <div className="text-center">
                <ShieldCheck className="w-6 h-6 mx-auto text-gray-400" />
                <p className="text-xs text-gray-500 mt-1">Bảo hành 12 tháng</p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-6 h-6 mx-auto text-gray-400" />
                <p className="text-xs text-gray-500 mt-1">Đổi trả 7 ngày</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-12">
          <div className="flex border-b border-gray-200">
            {(['description', 'specs', 'reviews'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-semibold border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab === 'description' ? 'Mô tả' : tab === 'specs' ? 'Thông số' : 'Đánh giá'}
              </button>
            ))}
          </div>

          <div className="py-6">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="whitespace-pre-line text-gray-700">
                  {showFullDesc ? product.description : product.description.slice(0, 300) + '...'}
                </p>
                <button
                  onClick={() => setShowFullDesc(!showFullDesc)}
                  className="flex items-center gap-1 text-primary mt-4"
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
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between p-4 bg-white rounded-lg">
                    <span className="text-gray-500">
                      {key === 'screen' ? 'Màn hình' :
                       key === 'resolution' ? 'Độ phân giải' :
                       key === 'camera' ? 'Camera sau' :
                       key === 'cpu' ? 'Chip' :
                       key === 'ram' ? 'RAM' :
                       key === 'battery' ? 'Pin' :
                       key === 'os' ? 'Hệ điều hành' : key}
                    </span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <div className="flex items-center gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary">{product.rating}</div>
                    <div className="flex items-center gap-1 mt-1">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} className={`w-4 h-4 ${i <= product.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{product.reviews} đánh giá</p>
                  </div>
                </div>
                {reviews.map(review => (
                  <div key={review.id} className="bg-white rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          {review.user[0]}
                        </div>
                        <div>
                          <p className="font-medium">{review.user}</p>
                          <div className="flex items-center gap-1">
                            {[1,2,3,4,5].map(i => (
                              <Star key={i} className={`w-3 h-3 ${i <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-400">{review.date}</span>
                    </div>
                    <p className="text-gray-700">{review.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Accessories */}
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-6">Phụ kiện đi kèm</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {product.accessories.map(item => (
              <Link key={item.id} href={`/san-pham/${item.id}`} className="bg-white rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                <img src={item.image} alt={item.name} className="w-full aspect-square object-cover rounded-lg mb-3" />
                <p className="font-medium text-sm">{item.name}</p>
                <p className="text-primary font-semibold">{formatPrice(item.price)}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Similar Products */}
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-6">Sản phẩm tương tự</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {product.similarProducts.map(item => (
              <Link key={item.id} href={`/san-pham/${item.id}`} className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
                <img src={item.image} alt={item.name} className="w-full aspect-square object-cover rounded-lg mb-3" />
                <p className="font-medium text-sm line-clamp-2">{item.name}</p>
                <p className="text-primary font-semibold mt-2">{formatPrice(item.price)}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
