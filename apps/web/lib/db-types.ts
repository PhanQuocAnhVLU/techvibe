export interface DbProduct {
  id: number
  name: string
  slug: string
  brand_id: number | null
  category_id: number | null
  price: number
  original_price: number | null
  image_urls: string[]
  description: string | null
  specs: Record<string, string> | null
  rating: number
  reviews_count: number
  sold_count: number
  badge: string | null
  is_flash_sale: boolean
  stock: number
  is_active: boolean
  created_at: string
}

export interface DbCategory {
  id: number
  name: string
  slug: string
  icon: string | null
  is_hot: boolean
  is_highlight: boolean
  sort_order: number
}

export interface DbBrand {
  id: number
  name: string
  slug: string
  logo_url: string | null
}

export interface DbBanner {
  id: number
  title: string
  subtitle: string | null
  image_url: string
  mobile_image_url: string | null
  cta_text: string | null
  cta_href: string | null
  bg_gradient: string | null
  sort_order: number
  is_active: boolean
}

export interface DbNews {
  id: number
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  brand: string | null
  cover_emoji: string
  published_at: string
  is_active: boolean
}

export interface ProductWithRelations extends DbProduct {
  brand: DbBrand | null
  category: DbCategory | null
}

export interface BannerWithRelations extends DbBanner {}
