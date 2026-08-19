import { createServerSupabase } from '../supabase-server'
import type { ProductWithRelations } from '../db-types'
import type { Product } from '../types'

export interface ProductsFilter {
  categorySlug?: string
  brandSlug?: string
  search?: string
  minPrice?: number
  maxPrice?: number
  sortBy?: 'popular' | 'price-asc' | 'price-desc' | 'newest' | 'rating' | 'best-seller'
  page?: number
  pageSize?: number
}

export interface ProductsResult {
  products: Product[]
  total: number
  page: number
  pageSize: number
  totalPages: number
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

export async function getProducts(filter: ProductsFilter = {}): Promise<ProductsResult> {
  const supabase = await createServerSupabase()
  const page = filter.page ?? 1
  const pageSize = filter.pageSize ?? 16
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  let query = supabase
    .from('products')
    .select(`*, brand:brands(*), category:categories(*)`, { count: 'exact' })
    .eq('is_active', true)

  if (filter.categorySlug) {
    // Subquery: filter by category slug
    const { data: cat } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', filter.categorySlug)
      .maybeSingle()
    if (cat) {
      query = query.eq('category_id', cat.id)
    } else {
      return { products: [], total: 0, page, pageSize, totalPages: 0 }
    }
  }

  if (filter.brandSlug) {
    const { data: br } = await supabase
      .from('brands')
      .select('id')
      .eq('slug', filter.brandSlug)
      .maybeSingle()
    if (br) {
      query = query.eq('brand_id', br.id)
    }
  }

  if (filter.search) {
    query = query.ilike('name', `%${filter.search}%`)
  }

  if (filter.minPrice !== undefined) {
    query = query.gte('price', filter.minPrice)
  }
  if (filter.maxPrice !== undefined) {
    query = query.lte('price', filter.maxPrice)
  }

  // Sorting
  switch (filter.sortBy) {
    case 'price-asc':
      query = query.order('price', { ascending: true })
      break
    case 'price-desc':
      query = query.order('price', { ascending: false })
      break
    case 'rating':
      query = query.order('rating', { ascending: false })
      break
    case 'best-seller':
      query = query.order('sold_count', { ascending: false })
      break
    case 'newest':
      query = query.order('created_at', { ascending: false })
      break
    default: // popular
      query = query.order('sold_count', { ascending: false })
  }

  query = query.range(from, to)

  const { data, error, count } = await query

  if (error) {
    console.error('getProducts:', error)
    return { products: [], total: 0, page, pageSize, totalPages: 0 }
  }

  const products = (data as ProductWithRelations[]).map(mapProductToUI)
  const total = count ?? 0
  const totalPages = Math.ceil(total / pageSize)

  return { products, total, page, pageSize, totalPages }
}