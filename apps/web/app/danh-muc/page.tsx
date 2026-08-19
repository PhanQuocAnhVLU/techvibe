import Link from 'next/link'
import { ChevronRight, Smartphone, Laptop, Tablet, Watch, Headphones, Tv, Home as HomeIcon, Plug, Camera, Gamepad2, Speaker, Wrench, Recycle, Percent, Package } from 'lucide-react'
import { AnnouncementBar } from '@/components/cellphones/announcement-bar'
import { Header } from '@/components/cellphones/header'
import { Footer } from '@/components/cellphones/footer'
import { ProductsListing } from './products-listing'
import { getCategories } from '@/lib/api/products'
import { getProducts } from '@/lib/api/products-list'
import type { Metadata } from 'next'

const iconMap: Record<string, any> = {
  Smartphone, Laptop, Tablet, Watch, Headphones, Camera,
  Tv, HomeIcon, Plug, Gamepad2, Speaker, Wrench,
  Package, Recycle, Percent,
}

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams
  const category = params['danh-muc'] as string | undefined
  const search = params['q'] as string | undefined
  let title = 'Sản phẩm | TechVibe'
  if (category) title = `${category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} | TechVibe`
  if (search) title = `Tìm kiếm: ${search} | TechVibe`
  return { title }
}

const sortOptions = [
  { value: 'popular', label: 'Nổi bật' },
  { value: 'price-asc', label: 'Giá: Thấp đến cao' },
  { value: 'price-desc', label: 'Giá: Cao đến thấp' },
  { value: 'newest', label: 'Mới nhất' },
  { value: 'rating', label: 'Đánh giá cao nhất' },
  { value: 'best-seller', label: 'Bán chạy nhất' },
]

const priceRanges = [
  { min: 0, max: 5000000, label: 'Dưới 5 triệu' },
  { min: 5000000, max: 10000000, label: '5 - 10 triệu' },
  { min: 10000000, max: 20000000, label: '10 - 20 triệu' },
  { min: 20000000, max: 50000000, label: '20 - 50 triệu' },
  { min: 50000000, max: null, label: 'Trên 50 triệu' },
]

const brands = ['Apple', 'Samsung', 'Xiaomi', 'OPPO', 'vivo', 'Realme', 'Nokia', 'Tecno', 'ASUS', 'Dell', 'HP', 'Lenovo']

export default async function CategoryPage({ searchParams }: PageProps) {
  const params = await searchParams
  const categorySlug = (params['danh-muc'] as string) || 'dien-thoai'
  const brandFilter = (params['hang'] as string) || undefined
  const search = (params['q'] as string) || undefined
  const sortBy = (params['sort'] as any) || 'popular'
  const priceIdx = params['gia'] ? parseInt(params['gia'] as string) : null
  const page = parseInt((params['page'] as string) || '1')

  // Fetch categories + products in parallel
  const [categories, productsResult] = await Promise.all([
    getCategories(),
    getProducts({
      categorySlug,
      brandSlug: brandFilter,
      search,
      sortBy,
      minPrice: priceIdx !== null ? priceRanges[priceIdx].min : undefined,
      maxPrice: priceIdx !== null ? priceRanges[priceIdx].max ?? undefined : undefined,
      page,
      pageSize: 16,
    }),
  ])

  const currentCategory = categories.find((c: any) => c.slug === categorySlug)
  const title = currentCategory?.name || categorySlug.replace(/-/g, ' ')

  const catList = categories.map((c: any) => ({
    name: c.name,
    slug: c.slug,
    icon: iconMap[c.icon || ''] || Package,
    href: `/danh-muc/${c.slug}`,
  }))

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <AnnouncementBar />
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-[#ca3838]">Trang chủ</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-[#363636] capitalize">{title}</span>
            {search && (
              <>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <span className="text-[#363636]">Tìm kiếm: "{search}"</span>
              </>
            )}
          </div>
        </div>
      </div>

      <ProductsListing
        title={title}
        categories={catList}
        brands={brands}
        priceRanges={priceRanges}
        sortOptions={sortOptions}
        products={productsResult.products}
        total={productsResult.total}
        page={productsResult.page}
        totalPages={productsResult.totalPages}
        currentCategorySlug={categorySlug}
        currentBrand={brandFilter}
        currentSort={sortBy}
        currentPriceIdx={priceIdx}
        currentSearch={search}
      />

      <Footer />
    </div>
  )
}