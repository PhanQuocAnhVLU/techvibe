'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { Check, AlertCircle, Info, X, ShoppingCart, Heart, Star } from 'lucide-react'

interface Toast {
  id: number
  type: 'success' | 'error' | 'info' | 'cart' | 'wishlist'
  message: string
}

interface AppContextType {
  // Cart
  cartItems: any[]
  addToCart: (product: any, quantity?: number) => void
  removeFromCart: (id: number) => void
  updateCartQuantity: (id: number, qty: number) => void
  clearCart: () => void
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void

  // Wishlist
  wishlist: any[]
  toggleWishlist: (product: any) => void

  // Compare
  compareList: any[]
  toggleCompare: (product: any) => void
  isCompareOpen: boolean
  setIsCompareOpen: (open: boolean) => void

  // Recently viewed
  recentlyViewed: any[]
  addToRecentlyViewed: (product: any) => void

  // Search
  isSearchOpen: boolean
  setIsSearchOpen: (open: boolean) => void

  // Quick view
  quickViewProduct: any
  setQuickViewProduct: (product: any) => void

  // Toast
  toasts: Toast[]
  addToast: (type: Toast['type'], message: string) => void
  removeToast: (id: number) => void

  // Promo bar
  isPromoBarVisible: boolean
  hidePromoBar: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<any[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [wishlist, setWishlist] = useState<any[]>([])
  const [compareList, setCompareList] = useState<any[]>([])
  const [isCompareOpen, setIsCompareOpen] = useState(false)
  const [recentlyViewed, setRecentlyViewed] = useState<any[]>([])
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<any>(null)
  const [toasts, setToasts] = useState<Toast[]>([])
  const [isPromoBarVisible, setIsPromoBarVisible] = useState(true)

  // Load from localStorage
  useEffect(() => {
    const saved = {
      cart: localStorage.getItem('cart'),
      wishlist: localStorage.getItem('wishlist'),
      compare: localStorage.getItem('compare'),
      recently: localStorage.getItem('recently'),
    }
    if (saved.cart) setCartItems(JSON.parse(saved.cart))
    if (saved.wishlist) setWishlist(JSON.parse(saved.wishlist))
    if (saved.compare) setCompareList(JSON.parse(saved.compare))
    if (saved.recently) setRecentlyViewed(JSON.parse(saved.recently))
  }, [])

  // Save to localStorage
  useEffect(() => { localStorage.setItem('cart', JSON.stringify(cartItems)) }, [cartItems])
  useEffect(() => { localStorage.setItem('wishlist', JSON.stringify(wishlist)) }, [wishlist])
  useEffect(() => { localStorage.setItem('compare', JSON.stringify(compareList)) }, [compareList])
  useEffect(() => { localStorage.setItem('recently', JSON.stringify(recentlyViewed)) }, [recentlyViewed])

  const addToCart = (product: any, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        )
      }
      return [...prev, { ...product, quantity }]
    })
    addToast('cart', `Đã thêm "${product.name}" vào giỏ hàng`)
  }

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const updateCartQuantity = (id: number, qty: number) => {
    if (qty < 1) return removeFromCart(id)
    setCartItems(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity: qty } : item))
    )
  }

  const clearCart = () => setCartItems([])

  const toggleWishlist = (product: any) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id)
      if (exists) {
        addToast('wishlist', `�ã xóa "${product.name}" khỏi yêu thích`)
        return prev.filter(item => item.id !== product.id)
      }
      addToast('wishlist', `�ã thêm "${product.name}" vào yêu thích`)
      return [...prev, product]
    })
  }

  const toggleCompare = (product: any) => {
    setCompareList(prev => {
      const exists = prev.find(item => item.id === product.id)
      if (exists) {
        return prev.filter(item => item.id !== product.id)
      }
      if (prev.length >= 4) {
        addToast('error', 'Chỉ có thể so sánh tối đa 4 sản phẩm')
        return prev
      }
      addToast('info', `Đã thêm "${product.name}" vào danh sách so sánh`)
      return [...prev, product]
    })
  }

  const addToRecentlyViewed = (product: any) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(item => item.id !== product.id)
      return [product, ...filtered].slice(0, 8)
    })
  }

  const addToast = (type: Toast['type'], message: string) => {
    const id = Date.now() + Math.random()
    setToasts(prev => [...prev, { id, type, message }])
    setTimeout(() => removeToast(id), 3000)
  }

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  const hidePromoBar = () => setIsPromoBarVisible(false)

  return (
    <AppContext.Provider
      value={{
        cartItems, addToCart, removeFromCart, updateCartQuantity, clearCart, isCartOpen, setIsCartOpen,
        wishlist, toggleWishlist,
        compareList, toggleCompare, isCompareOpen, setIsCompareOpen,
        recentlyViewed, addToRecentlyViewed,
        isSearchOpen, setIsSearchOpen,
        quickViewProduct, setQuickViewProduct,
        toasts, addToast, removeToast,
        isPromoBarVisible, hidePromoBar,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}

// Toast Notification Component
export function ToastContainer() {
  const { toasts, removeToast } = useApp()

  return (
    <div className="fixed top-20 right-4 z-[100] space-y-2 max-w-sm">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 p-4 rounded-lg shadow-lg animate-slide-in-right ${
            toast.type === 'success' ? 'bg-green-500 text-white' :
            toast.type === 'error' ? 'bg-red-500 text-white' :
            toast.type === 'cart' ? 'bg-[#ca3838] text-white' :
            toast.type === 'wishlist' ? 'bg-pink-500 text-white' :
            'bg-blue-500 text-white'
          }`}
        >
          {toast.type === 'success' && <Check className="w-5 h-5 shrink-0" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 shrink-0" />}
          {toast.type === 'cart' && <ShoppingCart className="w-5 h-5 shrink-0" />}
          {toast.type === 'wishlist' && <Heart className="w-5 h-5 shrink-0" />}
          {toast.type === 'info' && <Info className="w-5 h-5 shrink-0" />}
          <p className="text-sm font-medium flex-1">{toast.message}</p>
          <button onClick={() => removeToast(toast.id)}>
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  )
}
