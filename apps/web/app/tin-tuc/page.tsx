'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Search, Clock, Eye, ThumbsUp } from 'lucide-react'

const categories = ['Tất cả', 'iPhone', 'Samsung', 'Xiaomi', 'OPPO', 'Laptop', 'Phụ kiện']

const articles = [
  { id: 1, title: 'iPhone 16 Pro lộ diện với thiết kế hoàn toàn mới', image: 'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/iphone-15-pro-max_3.png', category: 'iPhone', date: '16/08/2024', author: 'Nguyễn Văn A', views: 1234, comments: 45, excerpt: 'Theo nguồn tin từ Apple, iPhone 16 Pro s� có thiết kế hoàn toàn mới với viền màn hình siêu mỏng...' },
  { id: 2, title: 'Samsung Galaxy S25 Ultra sẽ có camera 200MP?', image: 'https://cdn2.cellphones.com.vn/x/media/catalog/product/s/a/samsung-galaxy-s24-ultra_2.png', category: 'Samsung', date: '15/08/2024', author: 'Trần Thị B', views: 892, comments: 32, excerpt: 'Samsung đang phát triển cảm biến camera 200MP thế hệ mới cho Galaxy S25 Ultra...' },
  { id: 3, title: 'MacBook Air M4 ra mắt cuối năm nay', image: 'https://cdn2.cellphones.com.vn/x/media/catalog/product/m/a/macbook-air-m2_2.png', category: 'Laptop', date: '14/08/2024', author: 'Lê Văn C', views: 567, comments: 23, excerpt: 'Theo Bloomberg, Apple sẽ ra mắt MacBook Air M4 vào tháng 10 năm nay với hiệu năng vượt trội...' },
  { id: 4, title: 'Xiaomi 14 Ultra - Đối thủ đáng gờm của iPhone 15 Pro Max', image: 'https://cdn2.cellphones.com.vn/x/media/catalog/product/x/i/xiaomi-14-ultra.png', category: 'Xiaomi', date: '13/08/2024', author: 'Phạm Thị D', views: 1456, comments: 67, excerpt: 'Xiaomi 14 Ultra với camera Leica đang tạo nên cuộc cạnh tranh khốc liệt với iPhone 15 Pro Max...' },
  { id: 5, title: 'Top 10 laptop gaming đáng mua nhất 2024', image: 'https://cdn2.cellphones.com.vn/x/media/catalog/product/a/s/asus-rog-strix-g16.png', category: 'Laptop', date: '12/08/2024', author: 'Hoàng Văn E', views: 2345, comments: 89, excerpt: 'Danh sách những chiếc laptop gaming có cấu hình mạnh mẽ và giá cả hợp lý nhất...' },
  { id: 6, title: 'Hướng dẫn chọn mua iPhone phù hợp nhất', image: 'https://cdn2.cellphones.com.vn/x/media/catalog/product/i/p/iphone-15_2.png', category: 'iPhone', date: '11/08/2024', author: 'Vũ Thị F', views: 1789, comments: 56, excerpt: 'Bài viết chi tiết giúp bạn chọn được chiếc iPhone phù hợp với nhu cầu và ngân sách...' },
]

export default function NewsPage() {
  const [search, setSearch] = useState('')
  const [activeCat, setActiveCat] = useState('Tất cả')

  const featured = articles[0]
  const filtered = articles.filter(a => {
    const matchesCat = activeCat === 'Tất cả' || a.category === activeCat
    const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase())
    return matchesCat && matchesSearch
  })

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="bg-[#ca3838] text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between">
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:opacity-80">Hồ Chí Minh</Link>
            <a href="tel:18002000" className="hidden sm:flex hover:opacity-80">1800.2000</a>
          </div>
        </div>
      </div>

      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-11 h-11 bg-[#ca3838] rounded-lg flex items-center justify-center">
              <span className="font-bold text-white text-2xl">T</span>
            </div>
            <div>
              <span className="font-bold text-xl text-[#363636]">Tech</span>
              <span className="font-bold text-xl text-[#ca3838]">Store</span>
            </div>
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center gap-2 text-sm mb-6">
          <Link href="/" className="text-gray-500 hover:text-[#ca3838]">Trang chủ</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-[#363636]">Tin tức công nghệ</span>
        </div>

        <h1 className="text-3xl font-bold text-[#363636] mb-6">Tin tức công nghệ</h1>

        {/* Featured */}
        <div className="bg-white rounded-lg overflow-hidden mb-6 grid md:grid-cols-2 hover:shadow-lg transition-shadow">
          <Link href={`/tin-tuc/${featured.id}`}>
            <img src={featured.image} alt="" className="w-full h-full object-cover aspect-video md:aspect-auto" />
          </Link>
          <div className="p-6">
            <span className="px-3 py-1 bg-[#fef6f6] text-[#ca3838] text-xs font-semibold rounded-full">{featured.category}</span>
            <h2 className="text-2xl font-bold text-[#363636] mt-3 mb-3 hover:text-[#ca3838]">
              <Link href={`/tin-tuc/${featured.id}`}>{featured.title}</Link>
            </h2>
            <p className="text-gray-500 mb-4">{featured.excerpt}</p>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span>{featured.date}</span>
              <span>•</span>
              <span>{featured.author}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {featured.views}</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm kiếm bài viết..."
                className="w-full pl-10 pr-4 py-2.5 border rounded-md focus:outline-none focus:border-[#ca3838]"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  className={`px-4 py-2 rounded-md whitespace-nowrap text-sm font-medium transition-colors ${
                    activeCat === cat ? 'bg-[#ca3838] text-white' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.slice(1).map(article => (
            <Link key={article.id} href={`/tin-tuc/${article.id}`} className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="aspect-video bg-gray-100 overflow-hidden">
                <img src={article.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div className="p-4">
                <span className="px-2 py-0.5 bg-[#fef6f6] text-[#ca3838] text-xs font-semibold rounded">{article.category}</span>
                <h3 className="font-bold text-[#363636] mt-2 line-clamp-2 group-hover:text-[#ca3838] transition-colors min-h-[48px]">{article.title}</h3>
                <p className="text-sm text-gray-500 mt-2 line-clamp-2">{article.excerpt}</p>
                <div className="flex items-center gap-3 text-xs text-gray-500 mt-3">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.date}</span>
                  <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{article.views}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <button className="w-10 h-10 border rounded hover:bg-gray-50">‹</button>
          <button className="w-10 h-10 bg-[#ca3838] text-white rounded">1</button>
          <button className="w-10 h-10 border rounded hover:bg-gray-50">2</button>
          <button className="w-10 h-10 border rounded hover:bg-gray-50">3</button>
          <button className="w-10 h-10 border rounded hover:bg-gray-50">›</button>
        </div>
      </div>
    </div>
  )
}