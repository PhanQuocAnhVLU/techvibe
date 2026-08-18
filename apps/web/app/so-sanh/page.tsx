'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, X, GitCompare, ArrowLeft, ShoppingCart, Heart, Star } from 'lucide-react'
import { SmartImage } from '@/components/smart-image'

interface Product {
  id: number
  name: string
  brand: string
  price: number
  originalPrice: number
  rating: number
  reviews: number
  image: string
  stock: number
  specs: Record<string, string>
}

const sampleProducts: Product[] = [
  {
    id: 1, name: 'iPhone 15 Pro Max 256GB', brand: 'Apple', price: 32990000, originalPrice: 34990000,
    rating: 4.8, reviews: 1245, image: '', stock: 45,
    specs: { 'Màn hình': '6.7" Super Retina XDR', 'Chip': 'Apple A17 Pro', 'RAM': '8GB', 'Pin': '4422 mAh', 'Camera': '48MP + 12MP + 12MP', 'OS': 'iOS 17' }
  },
  {
    id: 2, name: 'Samsung Galaxy S24 Ultra 256GB', brand: 'Samsung', price: 28990000, originalPrice: 31990000,
    rating: 4.7, reviews: 892, image: '', stock: 32,
    specs: { 'Màn hình': '6.8" Dynamic AMOLED 2X', 'Chip': 'Snapdragon 8 Gen 3', 'RAM': '12GB', 'Pin': '5000 mAh', 'Camera': '200MP + 12MP + 50MP + 10MP', 'OS': 'Android 14' }
  },
  {
    id: 3, name: 'Xiaomi 14 Ultra 512GB', brand: 'Xiaomi', price: 21990000, originalPrice: 24990000,
    rating: 4.6, reviews: 567, image: '', stock: 28,
    specs: { 'Màn hình': '6.73" LTPO AMOLED', 'Chip': 'Snapdragon 8 Gen 3', 'RAM': '16GB', 'Pin': '5300 mAh', 'Camera': '50MP + 50MP + 50MP + 50MP', 'OS': 'Android 14' }
  },
]

function formatPrice(price: number) { return new Intl.NumberFormat('vi-VN').format(price) + 'đ' }

export default function ComparePage() {
  const [products, setProducts] = useState<Product[]>([sampleProducts[0], sampleProducts[1]])

  const removeProduct = (id: number) => setProducts(prev => prev.filter(p => p.id !== id))
  const addProduct = (product: Product) => {
    if (products.length >= 4) return
    if (products.find(p => p.id === product.id)) return
    setProducts(prev => [...prev, product])
  }

  const allSpecs = Array.from(new Set(products.flatMap(p => Object.keys(p.specs))))

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Top Bar */}
      <div className="bg-[#ca3838] text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between">
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:opacity-80">Hồ Chí Minh</Link>
            <a href="tel:18002000" className="hidden sm:flex hover:opacity-80">1800.2000</a>
          </div>
          <Link href="/tra-cuu-don-hang" className="hover:opacity-80">Tra cứu đơn hàng</Link>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
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
            <Link href="/" className="text-sm text-gray-500 hover:text-[#ca3838] flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Title */}
        <div className="flex items-center gap-2 text-sm mb-6">
          <Link href="/" className="text-gray-500 hover:text-[#ca3838]">Trang chủ</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-[#363636]">So sánh sản phẩm</span>
        </div>

        <div className="bg-white rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-[#363636] flex items-center gap-2">
              <GitCompare className="w-6 h-6 text-[#ca3838]" />
              So sánh sản phẩm ({products.length}/4)
            </h1>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-16">
              <GitCompare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">Chưa có sản phẩm để so sánh</p>
              <Link href="/san-pham">
                <button className="bg-[#ca3838] text-white px-6 py-2 rounded-md font-medium">Thêm sản phẩm</button>
              </Link>
            </div>
          ) : (
            <>
              {/* Product Header Row */}
              <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: `200px repeat(${products.length}, 1fr) ${products.length < 4 ? '200px' : ''}` }}>
                <div></div>
                {products.map(product => (
                  <div key={product.id} className="relative border border-gray-200 rounded-lg p-4 hover:border-[#ca3838] transition-colors">
                    <button onClick={() => removeProduct(product.id)} className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded">
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                    <Link href={`/san-pham/${product.id}`}>
                      <SmartImage name={product.name} brand={product.brand} className="w-full aspect-square rounded mb-3 bg-gradient-to-br from-gray-50 to-gray-100" />
                      <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
                      <h3 className="font-medium text-sm text-[#363636] hover:text-[#ca3838] line-clamp-2 min-h-[40px]">{product.name}</h3>
                    </Link>
                    <div className="mt-3">
                      <span className="text-lg font-bold text-[#ca3838]">{formatPrice(product.price)}</span>
                      <span className="text-xs text-gray-400 line-through ml-2">{formatPrice(product.originalPrice)}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs font-medium">{product.rating}</span>
                      <span className="text-xs text-gray-400">({product.reviews})</span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button className="flex-1 bg-[#ca3838] text-white text-xs py-2 rounded hover:bg-[#b32f2f]">
                        <ShoppingCart className="w-3 h-3 inline mr-1" />
                        Mua ngay
                      </button>
                      <button className="p-2 border rounded hover:bg-gray-50">
                        <Heart className="w-3 h-3 text-gray-400" />
                      </button>
                    </div>
                  </div>
                ))}
                {products.length < 4 && (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center min-h-[280px]">
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-2">Thêm sản phẩm</p>
                      <select onChange={(e) => {
                        const p = sampleProducts.find(sp => sp.id === Number(e.target.value))
                        if (p) addProduct(p)
                      }} className="text-sm border rounded px-3 py-2">
                        <option>Chọn SP...</option>
                        {sampleProducts.filter(sp => !products.find(p => p.id === sp.id)).map(sp => (
                          <option key={sp.id} value={sp.id}>{sp.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* Specs Table */}
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-[#363636] w-[200px]">Thông số</th>
                      {products.map(p => (
                        <th key={p.id} className="px-4 py-3 text-sm font-semibold text-[#363636]">{p.brand}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {allSpecs.map((spec, idx) => (
                      <tr key={spec} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-3 text-sm font-medium text-gray-700">{spec}</td>
                        {products.map(p => (
                          <td key={p.id} className="px-4 py-3 text-sm text-center text-[#363636]">
                            {p.specs[spec] || <span className="text-gray-300">-</span>}
                          </td>
                        ))}
                      </tr>
                    ))}
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-700">Tình trạng</td>
                      {products.map(p => (
                        <td key={p.id} className="px-4 py-3 text-sm text-center">
                          {p.stock > 0 ? <span className="text-green-600 font-medium">Còn hàng ({p.stock})</span> : <span className="text-red-500">Hết hàng</span>}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}