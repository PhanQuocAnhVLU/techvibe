import Link from 'next/link'
import {
  ChevronRight, Phone, Mail, MapPin, Clock,
  Facebook, Youtube, Instagram, Send,
  Award, Package
} from 'lucide-react'
import { AnnouncementBar } from '@/components/cellphones/announcement-bar'
import { Header } from '@/components/cellphones/header'
import { SidebarMenu } from '@/components/cellphones/sidebar-menu'
import { HomeBanner } from '@/components/cellphones/home-banner'
import { RightBanner } from '@/components/cellphones/right-banner'
import { FlashSale } from '@/components/cellphones/flash-sale'
import { ProductSection } from '@/components/cellphones/product-section'
import { ServiceStrip } from '@/components/cellphones/service-strip'
import { BrandList } from '@/components/cellphones/brand-list'
import {
  getFeaturedProducts,
  getFlashSaleProducts,
  getProductsByCategorySlug,
  getBanners,
  getNews,
  getCategories,
} from '@/lib/api/products'

function NewsletterSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-4">
      <div className="bg-gradient-to-r from-cps-red to-cps-red-light rounded-xl overflow-hidden p-6 md:p-8 text-white relative">
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-yellow-400/20 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-bold mb-2">Đăng ký nhận tin khuyến mãi</h3>
            <p className="text-sm text-white/90">
              Nhận ngay voucher <span className="font-bold text-yellow-300">500.000đ</span> cho đơn hàng đầu tiên!
            </p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              placeholder="Nhập email của bạn..."
              className="flex-1 md:w-80 px-4 py-3 rounded-md text-cps-text focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
            />
            <button className="px-5 py-3 bg-white text-cps-red font-bold rounded-md hover:bg-yellow-300 transition-colors flex items-center gap-1 shrink-0">
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Đăng ký</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function NewsSection({ items }: { items: { id: number; title: string; slug: string; brand: string | null; published_at: string; cover_emoji: string }[] }) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-3">
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-1 h-6 bg-cps-red rounded-full" />
            <h2 className="text-base font-bold text-cps-text">Tin công nghệ</h2>
          </div>
          <Link href="/tin-tuc" className="text-cps-red hover:underline flex items-center gap-1 text-sm font-medium">
            Xem tất cả <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/tin-tuc/${item.slug}`}
              className="group shine-card bg-white rounded-lg overflow-hidden border border-neutral-200 hover:shadow-md transition-all"
            >
              <div className="aspect-video bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center relative overflow-hidden">
                <span className="text-5xl">{item.cover_emoji}</span>
                {item.brand && (
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-cps-red text-white text-[10px] font-bold rounded">
                    {item.brand}
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="text-[10px] text-neutral-500 mb-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {new Date(item.published_at).toLocaleDateString('vi-VN')}
                </p>
                <h3 className="text-sm font-semibold text-cps-text group-hover:text-cps-red transition-colors line-clamp-2">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-neutral-900 text-white mt-6">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 bg-cps-red rounded-lg flex items-center justify-center">
                <span className="font-black text-white text-xl">T</span>
              </div>
              <div>
                <span className="font-bold text-lg">Tech</span>
                <span className="font-bold text-lg text-cps-red">Vibe</span>
              </div>
            </div>
            <p className="text-xs text-neutral-400 mb-3">
              Cửa hàng công nghệ hàng đầu Việt Nam với hơn 10 năm kinh nghiệm.
            </p>
            <div className="flex items-center gap-2">
              <a href="#" className="w-8 h-8 bg-neutral-800 hover:bg-cps-red rounded-full flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-neutral-800 hover:bg-cps-red rounded-full flex items-center justify-center transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-neutral-800 hover:bg-cps-red rounded-full flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-3 text-white">Thông tin</h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><Link href="/gioi-thieu" className="hover:text-white">Giới thiệu</Link></li>
              <li><Link href="/tin-tuc" className="hover:text-white">Tin tức</Link></li>
              <li><Link href="/lien-he" className="hover:text-white">Liên hệ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-3 text-white">Hỗ trợ</h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li><Link href="#" className="hover:text-white">Hướng dẫn mua hàng</Link></li>
              <li><Link href="#" className="hover:text-white">Chính sách đổi trả</Link></li>
              <li><Link href="#" className="hover:text-white">Chính sách bảo hành</Link></li>
              <li><Link href="#" className="hover:text-white">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-3 text-white">Liên hệ</h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li className="flex items-start gap-1.5">
                <MapPin className="w-3 h-3 mt-0.5 shrink-0" />
                <span>123 Nguyễn Trãi, P.Bến Thành, Q.1, TP.HCM</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Phone className="w-3 h-3 shrink-0" />
                <span>1900.2000</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Mail className="w-3 h-3 shrink-0" />
                <span>cskh@techvibe.vn</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-8 pt-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-neutral-500">
          <p>© 2024 TechVibe. Tất cả quyền được bảo lưu.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white">Chính sách bảo mật</Link>
            <Link href="#" className="hover:text-white">Điều khoản sử dụng</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export const revalidate = 60 // ISR: revalidate every 60s

export default async function HomePage() {
  // Fetch all data in parallel
  const [
    featuredProducts,
    flashSaleProducts,
    phoneProducts,
    laptopProducts,
    banners,
    news,
    categories,
  ] = await Promise.all([
    getFeaturedProducts(10),
    getFlashSaleProducts(8),
    getProductsByCategorySlug('dien-thoai', 5),
    getProductsByCategorySlug('laptop', 5),
    getBanners(),
    getNews(3),
    getCategories(),
  ])

  // map UI types for ProductSection
  const productSectionMapper = (p: any) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    originalPrice: p.originalPrice,
    rating: p.rating,
    reviews: p.reviewCount,
    sold: p.soldCount,
    brand: p.brand,
    image: p.images?.[0],
    slug: p.slug,
  })

  const featuredMapped = featuredProducts.map(productSectionMapper)
  const phoneMapped = phoneProducts.map(productSectionMapper)
  const laptopMapped = laptopProducts.map(productSectionMapper)
  const flashSaleMapped = flashSaleProducts.map(productSectionMapper)

  return (
    <div className="min-h-screen bg-[#f2f2f3]">
      <AnnouncementBar />
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-3">
        {/* Hero: Sidebar + Banner + Right Banner */}
        <div className="flex gap-3 mb-4">
          <SidebarMenu categories={categories} />
          <HomeBanner banners={banners} />
          <RightBanner />
        </div>

        {/* Service Strip */}
        <ServiceStrip />

        {/* Flash Sale */}
        <FlashSale products={flashSaleMapped} />
      </main>

      <div className="max-w-7xl mx-auto">
        <ProductSection
          title="Sản phẩm nổi bật"
          subtitle="Được yêu thích nhất tuần qua"
          products={featuredMapped}
          tabs={[
            { id: 'hot', label: 'Nổi bật' },
            { id: 'new', label: 'Mới nhất' },
            { id: 'bestseller', label: 'Bán chạy' },
          ]}
          icon={<Award className="w-5 h-5 text-cps-red" />}
          columns={5}
        />

        <ProductSection
          title="Điện thoại nổi bật"
          subtitle="iPhone, Samsung, Xiaomi..."
          products={phoneMapped}
          viewAllHref="/san-pham?danh-muc=dien-thoai"
          bgColor=""
          icon={<Phone className="w-5 h-5 text-cps-red" />}
          columns={5}
        />

        <ProductSection
          title="Laptop hot"
          subtitle="Macbook, Dell, ASUS..."
          products={laptopMapped}
          viewAllHref="/san-pham?danh-muc=laptop"
          bgColor=""
          icon={<Package className="w-5 h-5 text-cps-red" />}
          columns={5}
        />

        <BrandList />
        <NewsletterSection />
        <NewsSection items={news.map(n => ({
          id: n.id,
          title: n.title,
          slug: n.slug,
          brand: n.brand,
          published_at: n.published_at,
          cover_emoji: n.cover_emoji,
        }))} />
      </div>

      <Footer />
    </div>
  )
}
