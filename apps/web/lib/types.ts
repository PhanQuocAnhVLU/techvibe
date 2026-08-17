export interface Product {
  id: string
  sku: string
  name: string
  slug: string
  brand: string
  category: string
  categorySlug: string
  images: string[]
  price: number
  originalPrice: number
  rating: number
  reviewCount: number
  soldCount: number
  inStock: boolean
  stockQuantity: number
  variants?: ProductVariant[]
  specs?: Spec[]
  description?: string
  tags: string[]
  isFlashSale?: boolean
  flashSalePrice?: number
  flashSaleEndTime?: Date
  isNew?: boolean
  isBestseller?: boolean
}

export interface ProductVariant {
  id: string
  sku: string
  attributes: {
    color?: string
    storage?: string
    ram?: string
  }
  price: number
  originalPrice: number
  image?: string
  inStock: boolean
  stockQuantity: number
}

export interface Spec {
  label: string
  value: string
}

export interface Category {
  id: string
  name: string
  slug: string
  icon: string
  image?: string
  productCount: number
  subcategories?: Category[]
}

export interface Brand {
  id: string
  name: string
  slug: string
  logo: string
  productCount: number
}

export interface CartItem {
  product: Product
  variant?: ProductVariant
  quantity: number
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  discount: number
  shippingFee: number
  total: number
  couponCode?: string
}

export interface User {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  loyaltyPoints: number
  tier: 'bronze' | 'silver' | 'gold' | 'diamond'
}

export interface Address {
  id: string
  name: string
  phone: string
  province: string
  district: string
  ward: string
  detail: string
  isDefault: boolean
}

export interface Order {
  id: string
  code: string
  status: OrderStatus
  items: OrderItem[]
  shippingAddress: Address
  paymentMethod: PaymentMethod
  subtotal: number
  discount: number
  shippingFee: number
  total: number
  createdAt: Date
}

export type OrderStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'processing' 
  | 'shipping' 
  | 'delivered' 
  | 'completed'
  | 'cancelled'
  | 'returned'

export interface OrderItem {
  productId: string
  variantId?: string
  sku: string
  name: string
  image: string
  variantInfo?: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

export type PaymentMethod = 
  | 'cod' 
  | 'vnpay' 
  | 'momo' 
  | 'zalopay' 
  | 'transfer'

export interface FlashSale {
  id: string
  name: string
  startTime: Date
  endTime: Date
  products: Product[]
}

export interface Banner {
  id: string
  image: string
  link?: string
  position: 'hero' | 'banner' | 'popup'
  isActive: boolean
}
