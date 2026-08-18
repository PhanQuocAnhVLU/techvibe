'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  X, Search, TrendingUp, History, XCircle, 
  Heart, ShoppingCart, ArrowRight, Trash2
} from 'lucide-react'
import { useApp } from '@/lib/app-context'
import { ProductMockup } from '@/components/product-mockup'

const trendingSearches = ['iPhone 15', 'Samsung Galaxy S24', 'MacBook Air M3', 'AirPods Pro 2', 'Xiaomi 14']
const suggestions = [
  { id: 1, name: 'iPhone 15 Pro Max 256GB', price: 32990000, image: '', brand: 'Apple' },
  { id: 2, name: 'Samsung Galaxy S24 Ultra', price: 28990000, image: '', brand: 'Samsung' },
  { id: 3, name: 'MacBook Air M2 13 inch', price: 26990000, image: '', brand: 'Apple' },
  { id: 4, name: 'Xiaomi 14 Pro', price: 18990000, image: '', brand: 'Xiaomi' },
]

export function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, addToCart } = useApp()
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [searchHistory, setSearchHistory] = useState<string[]>([])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isSearchOpen, setIsSearchOpen])

  useEffect(() => {
    if (isSearchOpen) {
      const history = localStorage.getItem('searchHistory')
      if (history) setSearchHistory(JSON.parse(history))
    }
  }, [isSearchOpen])

  if (!isSearchOpen) return null

  const filteredSuggestions = suggestions.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase()) ||
    s.brand.toLowerCase().includes(query.toLowerCase())
  )

  const handleSearch = (q: string) => {
    if (q.trim()) {
      const newHistory = [q, ...searchHistory.filter(h => h !== q)].slice(0, 8)
      setSearchHistory(newHistory)
      localStorage.setItem('searchHistory', JSON.stringify(newHistory))
      setIsSearchOpen(false)
      router.push(`/san-pham?q=${encodeURIComponent(q)}`)
    }
  }

  const clearHistory = () => {
    setSearchHistory([])
    localStorage.removeItem('searchHistory')
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-20 px-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/60" onClick={() => setIsSearchOpen(false)} />
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden animate-slide-down">
        {/* Search Input */}
        <div className="flex items-center gap-3 p-4 border-b">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
            placeholder="Tìm kiếm sản phẩm, thương hiệu, danh mục..."
            className="flex-1 outline-none text-base"
            autoFocus
          />
          <button onClick={() => setIsSearchOpen(false)} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {/* Suggestions */}
          {query && (
            <div className="p-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">Sản phẩm gợi �</h3>
              {filteredSuggestions.length > 0 ? (
                <div className="space-y-2">
                  {filteredSuggestions.map(item => (
                    <Link
                      key={item.id}
                      href={`/san-pham/${item.id}`}
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg"
                    >
                      <ProductMockup name={item.name} brand={item.brand} className="w-12 h-12 rounded" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.brand}</p>
                      </div>
                      <span className="text-sm font-semibold text-[#ca3838]">
                        {new Intl.NumberFormat('vi-VN').format(item.price)}đ
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">Không tìm thấy kết quả</p>
              )}
            </div>
          )}

          {/* Trending & History */}
          {!query && (
            <>
              <div className="p-4 border-b">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    Tìm kiếm hot
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => handleSearch(s)}
                      className="px-3 py-1 bg-gray-100 hover:bg-[#fef6f6] hover:text-[#ca3838] rounded-full text-sm"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-1">
                    <History className="w-4 h-4" />
                    Lịch sử tìm kiếm
                  </h3>
                  {searchHistory.length > 0 && (
                    <button onClick={clearHistory} className="text-xs text-[#ca3838] hover:underline">
                      Xóa tất cả
                    </button>
                  )}
                </div>
                {searchHistory.length > 0 ? (
                  <div className="space-y-1">
                    {searchHistory.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => handleSearch(s)}
                        className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded group"
                      >
                        <span className="text-sm">{s}</span>
                        <XCircle className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100" />
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 text-center py-4">Chưa có lịch sử tìm kiếm</p>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer hint */}
        <div className="border-t px-4 py-2 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-3">
            <span><kbd className="bg-gray-100 px-1.5 rounded">↵</kbd> Để tìm</span>
            <span><kbd className="bg-gray-100 px-1.5 rounded">Esc</kbd> Đóng</span>
          </div>
          <span className="text-[#ca3838] font-medium">Nhấn Ctrl+K để mở</span>
        </div>
      </div>
    </div>
  )
}

export function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cartItems, updateCartQuantity, removeFromCart, clearCart, addToast } = useApp()

  if (!isCartOpen) return null

  // Detect brand from name
  const detectBrand = (name: string): string | undefined => {
    const lower = name.toLowerCase()
    if (lower.includes('iphone') || lower.includes('ipad') || lower.includes('macbook') || lower.includes('airpod')) return 'Apple'
    if (lower.includes('samsung') || lower.includes('galaxy')) return 'Samsung'
    if (lower.includes('xiaomi')) return 'Xiaomi'
    if (lower.includes('oppo')) return 'OPPO'
    if (lower.includes('vivo')) return 'vivo'
    if (lower.includes('realme')) return 'Realme'
    if (lower.includes('dell')) return 'Dell'
    if (lower.includes('asus')) return 'ASUS'
    return undefined
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingFee = subtotal >= 500000 ? 0 : 30000

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/50" onClick={() => setIsCartOpen(false)} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Giỏ hàng ({cartItems.length})
          </h2>
          <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Giỏ hàng trống</p>
              <button onClick={() => setIsCartOpen(false)} className="mt-4 text-[#ca3838] hover:underline">
                Tiếp tục mua sắm
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex gap-3 pb-4 border-b">
                  <ProductMockup name={item.name} brand={detectBrand(item.name)} className="w-16 h-16 rounded" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm line-clamp-2">{item.name}</p>
                    <p className="text-sm text-[#ca3838] font-semibold mt-1">
                      {new Intl.NumberFormat('vi-VN').format(item.price)}đ
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 border rounded hover:bg-gray-100 flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 border rounded hover:bg-gray-100 flex items-center justify-center"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-auto text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={clearCart} className="text-xs text-gray-500 hover:text-red-500">
                Xóa tất cả
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t p-4 space-y-3">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Tạm tính</span>
                <span className="font-medium">{new Intl.NumberFormat('vi-VN').format(subtotal)}đ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Vận chuyển</span>
                <span className="font-medium">
                  {shippingFee === 0 ? 'Miễn phí' : new Intl.NumberFormat('vi-VN').format(shippingFee) + 'đ'}
                </span>
              </div>
            </div>
            <div className="flex justify-between pt-3 border-t">
              <span className="font-bold">Tổng cộng</span>
              <span className="text-xl font-bold text-[#ca3838]">
                {new Intl.NumberFormat('vi-VN').format(subtotal + shippingFee)}đ
              </span>
            </div>
            <Link href="/thanh-toan" onClick={() => setIsCartOpen(false)}>
              <button className="w-full bg-[#ca3838] text-white py-3 rounded-md font-semibold hover:bg-[#b32f2f]">
                Thanh toán
              </button>
            </Link>
            <button onClick={() => setIsCartOpen(false)} className="w-full border border-gray-300 py-3 rounded-md font-medium hover:bg-gray-50">
              Tiếp tục mua sắm
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, wishlist, toggleCompare, compareList } = useApp()
  
  if (!quickViewProduct) return null

  const product = quickViewProduct
  const discount = product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0
  const isWishlisted = wishlist.some(p => p.id === product.id)
  const isCompared = compareList.some(p => p.id === product.id)

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/60" onClick={() => setQuickViewProduct(null)} />
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-scale-in flex flex-col md:flex-row">
        <button onClick={() => setQuickViewProduct(null)} className="absolute top-4 right-4 p-2 bg-white/90 rounded-full z-10">
          <X className="w-5 h-5" />
        </button>

        <div className="md:w-1/2 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-8">
          <ProductMockup name={product.name} brand={product.brand} className="max-w-full max-h-[400px]" />
        </div>

        <div className="md:w-1/2 p-6 overflow-y-auto">
          <span className="text-sm text-gray-500">{product.brand}</span>
          <h2 className="text-2xl font-bold text-[#363636] mt-1">{product.name}</h2>

          {product.rating && (
            <div className="flex items-center gap-2 mt-2">
              <div className="flex">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} className={`w-4 h-4 ${i <= product.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm">{product.rating}</span>
              <span className="text-sm text-gray-400">({product.reviews || 0} đánh giá)</span>
            </div>
          )}

          <div className="mt-4 p-4 bg-[#fef6f6] rounded-lg">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-[#ca3838]">
                {new Intl.NumberFormat('vi-VN').format(product.price)}đ
              </span>
              {discount > 0 && (
                <>
                  <span className="text-lg text-gray-400 line-through">
                    {new Intl.NumberFormat('vi-VN').format(product.originalPrice)}đ
                  </span>
                  <span className="text-sm font-semibold text-[#ca3838]">-{discount}%</span>
                </>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-2">Giá đã bao gồm VAT</p>
          </div>

          <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Trả góp 0%:</strong> {new Intl.NumberFormat('vi-VN').format(Math.round(product.price / 24))}đ/tháng x 24 tháng
            </p>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={() => { addToCart(product); setQuickViewProduct(null) }}
              className="flex-1 bg-[#ca3838] text-white py-3 rounded-md font-semibold hover:bg-[#b32f2f]"
            >
              <ShoppingCart className="w-4 h-4 inline mr-2" />
              Thêm vào giỏ
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              className={`p-3 border rounded-md ${isWishlisted ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:bg-gray-50'}`}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
            </button>
            <button
              onClick={() => toggleCompare(product)}
              className={`p-3 border rounded-md ${isCompared ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'}`}
            >
              <svg className={`w-5 h-5 ${isCompared ? 'text-blue-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </button>
          </div>

          <Link
            href={`/san-pham/${product.id}`}
            className="block mt-4 text-center text-[#ca3838] hover:underline"
            onClick={() => setQuickViewProduct(null)}
          >
            Xem chi tiết sản phẩm <ArrowRight className="w-4 h-4 inline" />
          </Link>
        </div>
      </div>
    </div>
  )
}
