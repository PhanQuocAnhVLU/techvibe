'use client'

import { useState } from 'react'
import { FileText, Plus, Eye, Edit, Trash2, Search, Calendar, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'

const posts = [
  { id: 1, title: 'iPhone 16 Pro lộ diện với thiết kế hoàn toàn mới', category: 'Tin công nghệ', status: 'published', views: 12500, date: '16/08/2024' },
  { id: 2, title: 'Samsung Galaxy S25 Ultra sẽ có camera 200MP?', category: 'Tin công nghệ', status: 'published', views: 8900, date: '15/08/2024' },
  { id: 3, title: 'MacBook Air M4 ra mắt cuối năm nay', category: 'Tin công nghệ', status: 'draft', views: 0, date: '14/08/2024' },
  { id: 4, title: 'Hướng dẫn chọn mua điện thoại phù hợp', category: 'Hướng dẫn', status: 'published', views: 5600, date: '10/08/2024' },
  { id: 5, title: 'So sánh iPhone 15 vs Samsung S24', category: 'Đánh giá', status: 'scheduled', views: 0, date: '20/08/2024' },
]

export default function PostsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const statusConfig: Record<string, { label: string; color: string }> = {
    published: { label: 'Đã đăng', color: 'bg-green-100 text-green-800' },
    draft: { label: 'Nháp', color: 'bg-gray-100 text-gray-800' },
    scheduled: { label: 'Hẹn giờ', color: 'bg-blue-100 text-blue-800' },
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bài viết</h1>
          <p className="text-gray-500">Quản lý tin tức và bài viết</p>
        </div>
        <Button size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Viết bài mới
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg p-4">
          <p className="text-sm text-gray-500 mb-1">Tổng bài viết</p>
          <p className="text-2xl font-bold">{posts.length}</p>
        </div>
        <div className="bg-white rounded-lg p-4">
          <p className="text-sm text-gray-500 mb-1">Đã đăng</p>
          <p className="text-2xl font-bold text-green-600">{posts.filter(p => p.status === 'published').length}</p>
        </div>
        <div className="bg-white rounded-lg p-4">
          <p className="text-sm text-gray-500 mb-1">Nháp</p>
          <p className="text-2xl font-bold text-gray-600">{posts.filter(p => p.status === 'draft').length}</p>
        </div>
        <div className="bg-white rounded-lg p-4">
          <p className="text-sm text-gray-500 mb-1">Tổng lượt xem</p>
          <p className="text-2xl font-bold text-primary">{posts.reduce((sum, p) => sum + p.views, 0).toLocaleString()}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm bài viết..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="published">Đã đăng</option>
            <option value="draft">Nháp</option>
            <option value="scheduled">Hẹn giờ</option>
          </select>
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tiêu đề</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Danh mục</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lượt xem</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngày đăng</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900">{post.title}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{post.category}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      {post.views > 0 ? (
                        <>
                          <Eye className="w-4 h-4" />
                          {post.views.toLocaleString()}
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-4 h-4" />
                          0
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusConfig[post.status].color}`}>
                      {statusConfig[post.status].label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-gray-100 rounded-lg" title="Sửa">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded-lg" title="Xóa">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
