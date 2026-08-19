import { createServerSupabase } from '../supabase-server'
import type { Product, Category, Brand } from '../types'
import type { ProductWithRelations, DbBanner, DbNews } from '../db-types'

function fmtVND(n: number) {
  return new Intl.NumberFormat('vi-VN').format(n) + '₫'
}

function mapProductToUI(row: ProductWithRelations): Product {
  const brandName = row.brand?.name ?? 'Unknown'
  const categoryName = row.category?.name ?? ''
  const categorySlug = row.category?.slug ?? ''
  const images = row.image_urls && row.image_urls.length > 0
    ? row.image_urls
    : ['https://placehold.co/500x500/png?text=No+Image']

  const tags: string[] = []
  if (row.is_flash_sale) tags.push('flashsale')
  if (row.badge === 'HOT') tags.push('bestseller')
  if (row.badge === 'NEW') tags.push('new')
  if (row.original_price && row.original_price > row.price) tags.push('installment')

  return {
    id: String(row.id),
    sku: `SKU-${row.id}`,
    name: row.name,
    slug: row.slug,
    brand: brandName,
    category: categoryName,
    categorySlug,
    images,
    price: row.price,
    originalPrice: row.original_price ?? row.price,
    rating: Number(row.rating) || 0,
    reviewCount: row.reviews_count || 0,
    soldCount: row.sold_count || 0,
    inStock: row.stock > 0,
    stockQuantity: row.stock,
    specs: row.specs
      ? Object.entries(row.specs).map(([label, value]) => ({ label, value }))
      : [],
    description: row.description ?? undefined,
    tags,
    isFlashSale: row.is_flash_sale,
    flashSalePrice: row.is_flash_sale ? row.price : undefined,
    isNew: row.badge === 'NEW',
    isBestseller: row.badge === 'HOT',
  }
}

export async function getFeaturedProducts(limit = 10): Promise<Product[]> {
  const supabase = await createServerSupabase()
  const { data, error } = await supabase
    .from('products')
    .select(`*, brand:brands(*), category:categories(*)`)
    .eq('is_active', true)
    .order('sold_count', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('getFeaturedProducts:', error)
    return []
  }
  return (data as ProductWithRelations[]).map(mapProductToUI)
}

export async function getFlashSaleProducts(limit = 8): Promise<Product[]> {
  const supabase = await createServerSupabase()
  const { data, error } = await supabase
    .from('products')
    .select(`*, brand:brands(*), category:categories(*)`)
    .eq('is_active', true)
    .eq('is_flash_sale', true)
    .limit(limit)

  if (error) {
    console.error('getFlashSaleProducts:', error)
    return []
  }
  return (data as ProductWithRelations[]).map(mapProductToUI)
}

export async function getProductsByCategorySlug(slug: string, limit = 10): Promise<Product[]> {
  const supabase = await createServerSupabase()
  const { data, error } = await supabase
    .from('products')
    .select(`*, brand:brands(*), category:categories(*)`)
    .eq('is_active', true)
    .eq('category.slug', slug)
    .limit(limit)

  if (error) {
    console.error('getProductsByCategorySlug:', error)
    return []
  }
  return (data as ProductWithRelations[]).map(mapProductToUI)
}

export async function getCategories(): Promise<Category[]> {
  const supabase = await createServerSupabase()
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('getCategories:', error)
    return []
  }
  return (data ?? []).map((c) => ({
    id: String(c.id),
    name: c.name,
    slug: c.slug,
    icon: c.icon ?? 'Package',
    productCount: 0,
  }))
}

export async function getBrands(): Promise<Brand[]> {
  const supabase = await createServerSupabase()
  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .order('name')

  if (error) {
    console.error('getBrands:', error)
    return []
  }
  return (data ?? []).map((b) => ({
    id: String(b.id),
    name: b.name,
    slug: b.slug,
    logo: b.logo_url ?? `/brands/${b.slug}.svg`,
    productCount: 0,
  }))
}

export async function getBanners(): Promise<DbBanner[]> {
  const supabase = await createServerSupabase()
  const { data, error } = await supabase
    .from('banners')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('getBanners:', error)
    return []
  }
  return (data ?? []) as DbBanner[]
}

export async function getNews(limit = 3): Promise<DbNews[]> {
  const supabase = await createServerSupabase()
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('is_active', true)
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('getNews:', error)
    return []
  }
  return (data ?? []) as DbNews[]
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createServerSupabase()
  const { data, error } = await supabase
    .from('products')
    .select(`*, brand:brands(*), category:categories(*)`)
    .eq('slug', slug)
    .eq('is_active', true)
    .maybeSingle()

  if (error || !data) return null
  return mapProductToUI(data as ProductWithRelations)
}

export function formatPrice(n: number): string {
  return fmtVND(n)
}
