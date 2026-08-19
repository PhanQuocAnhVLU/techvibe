'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Field, Input, Textarea, Button, Card, CardHeader } from './form'

export function CategoryForm({ category }: { category?: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [name, setName] = useState(category?.name || '')
  const [slug, setSlug] = useState(category?.slug || '')
  const [icon, setIcon] = useState(category?.icon || '')
  const [description, setDescription] = useState(category?.description || '')

  const handleNameChange = (val: string) => {
    setName(val)
    if (!category) {
      setSlug(val.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[đĐ]/g, 'd')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, ''))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const payload = { name, slug, icon: icon || null, description: description || null }

    let result
    if (category) {
      result = await supabase.from('categories').update(payload).eq('id', category.id)
    } else {
      result = await supabase.from('categories').insert(payload)
    }

    setLoading(false)
    if (result.error) { setError(result.error.message); return }
    router.push('/admin/danh-muc')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/admin/danh-muc" className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900">
          <ArrowLeft className="w-4 h-4" />
          Quay lại
        </Link>
        <Button type="submit" disabled={loading}>
          <Save className="w-4 h-4" />
          {loading ? 'Đang lưu...' : (category ? 'Cập nhật' : 'Tạo danh mục')}
        </Button>
      </div>

      {error && <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">{error}</div>}

      <Card>
        <CardHeader title="Thông tin danh mục" />
        <div className="p-5 space-y-4">
          <Field label="Tên danh mục" required>
            <Input value={name} onChange={(e) => handleNameChange(e.target.value)} required />
          </Field>
          <Field label="Slug" required>
            <Input value={slug} onChange={(e) => setSlug(e.target.value)} required />
          </Field>
          <Field label="Icon (emoji hoặc URL)" hint="Có thể dùng emoji như 📱 hoặc URL ảnh">
            <Input value={icon} onChange={(e) => setIcon(e.target.value)} placeholder="📱" />
          </Field>
          <Field label="Mô tả">
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
          </Field>
        </div>
      </Card>
    </form>
  )
}

export function BrandForm({ brand }: { brand?: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [name, setName] = useState(brand?.name || '')
  const [slug, setSlug] = useState(brand?.slug || '')
  const [logo, setLogo] = useState(brand?.logo || '')

  const handleNameChange = (val: string) => {
    setName(val)
    if (!brand) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError(null)
    const payload = { name, slug, logo: logo || null }
    const result = brand
      ? await supabase.from('brands').update(payload).eq('id', brand.id)
      : await supabase.from('brands').insert(payload)
    setLoading(false)
    if (result.error) { setError(result.error.message); return }
    router.push('/admin/thuong-hieu')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/admin/thuong-hieu" className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900">
          <ArrowLeft className="w-4 h-4" />
          Quay lại
        </Link>
        <Button type="submit" disabled={loading}>
          <Save className="w-4 h-4" />
          {loading ? 'Đang lưu...' : (brand ? 'Cập nhật' : 'Tạo thương hiệu')}
        </Button>
      </div>

      {error && <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">{error}</div>}

      <Card>
        <CardHeader title="Thông tin thương hiệu" />
        <div className="p-5 space-y-4">
          <Field label="Tên thương hiệu" required>
            <Input value={name} onChange={(e) => handleNameChange(e.target.value)} required />
          </Field>
          <Field label="Slug" required>
            <Input value={slug} onChange={(e) => setSlug(e.target.value)} required />
          </Field>
          <Field label="Logo URL">
            <Input value={logo} onChange={(e) => setLogo(e.target.value)} placeholder="https://..." />
          </Field>
        </div>
      </Card>
    </form>
  )
}

export function BannerForm({ banner }: { banner?: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [title, setTitle] = useState(banner?.title || '')
  const [image, setImage] = useState(banner?.image || '')
  const [link, setLink] = useState(banner?.link || '')
  const [position, setPosition] = useState(banner?.position || 'hero')
  const [sortOrder, setSortOrder] = useState(banner?.sort_order || 0)
  const [isActive, setIsActive] = useState(banner?.is_active !== false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError(null)
    const payload = {
      title, image, link: link || null,
      position, sort_order: Number(sortOrder), is_active: isActive,
    }
    const result = banner
      ? await supabase.from('banners').update(payload).eq('id', banner.id)
      : await supabase.from('banners').insert(payload)
    setLoading(false)
    if (result.error) { setError(result.error.message); return }
    router.push('/admin/banner')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/admin/banner" className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900">
          <ArrowLeft className="w-4 h-4" />
          Quay lại
        </Link>
        <Button type="submit" disabled={loading}>
          <Save className="w-4 h-4" />
          {loading ? 'Đang lưu...' : (banner ? 'Cập nhật' : 'Tạo banner')}
        </Button>
      </div>

      {error && <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">{error}</div>}

      <Card>
        <CardHeader title="Thông tin banner" />
        <div className="p-5 space-y-4">
          <Field label="Tiêu đề" required>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
          </Field>
          <Field label="URL hình ảnh" required>
            <Input value={image} onChange={(e) => setImage(e.target.value)} required placeholder="https://..." />
          </Field>
          <Field label="Link khi click">
            <Input value={link} onChange={(e) => setLink(e.target.value)} placeholder="/san-pham/iphone-15" />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Vị trí">
              <SelectBanner value={position} onChange={setPosition} />
            </Field>
            <Field label="Thứ tự">
              <Input type="number" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} />
            </Field>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="w-4 h-4 rounded" />
            <span className="text-sm">Hiển thị banner</span>
          </label>
        </div>
      </Card>
    </form>
  )
}

function SelectBanner({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm bg-white focus:outline-none focus:border-[#e30019] focus:ring-2 focus:ring-red-100"
    >
      <option value="hero">Hero (lớn chính)</option>
      <option value="sidebar">Sidebar</option>
      <option value="popup">Popup</option>
      <option value="topbar">Top Bar</option>
    </select>
  )
}

export function NewsForm({ news }: { news?: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [title, setTitle] = useState(news?.title || '')
  const [slug, setSlug] = useState(news?.slug || '')
  const [excerpt, setExcerpt] = useState(news?.excerpt || '')
  const [content, setContent] = useState(news?.content || '')
  const [image, setImage] = useState(news?.image || '')
  const [isPublished, setIsPublished] = useState(news?.is_published !== false)

  const handleTitleChange = (val: string) => {
    setTitle(val)
    if (!news) {
      setSlug(val.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[đĐ]/g, 'd')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, ''))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError(null)
    const payload = {
      title, slug,
      excerpt: excerpt || null,
      content: content || null,
      image: image || null,
      is_published: isPublished,
    }
    const result = news
      ? await supabase.from('news').update(payload).eq('id', news.id)
      : await supabase.from('news').insert(payload)
    setLoading(false)
    if (result.error) { setError(result.error.message); return }
    router.push('/admin/tin-tuc')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/admin/tin-tuc" className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900">
          <ArrowLeft className="w-4 h-4" />
          Quay lại
        </Link>
        <Button type="submit" disabled={loading}>
          <Save className="w-4 h-4" />
          {loading ? 'Đang lưu...' : (news ? 'Cập nhật' : 'Đăng bài')}
        </Button>
      </div>

      {error && <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">{error}</div>}

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader title="Nội dung bài viết" />
            <div className="p-5 space-y-4">
              <Field label="Tiêu đề" required>
                <Input value={title} onChange={(e) => handleTitleChange(e.target.value)} required />
              </Field>
              <Field label="Slug" required>
                <Input value={slug} onChange={(e) => setSlug(e.target.value)} required />
              </Field>
              <Field label="Tóm tắt">
                <Textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={2} />
              </Field>
              <Field label="Nội dung">
                <Textarea value={content} onChange={(e) => setContent(e.target.value)} rows={12} placeholder="Nội dung bài viết (hỗ trợ HTML)..." />
              </Field>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader title="Hình ảnh" />
            <div className="p-5">
              <Field label="URL ảnh đại diện">
                <Input value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://..." />
              </Field>
              {image && (
                <div className="mt-3 rounded-lg overflow-hidden border border-neutral-200">
                  <img src={image} alt="preview" className="w-full h-40 object-cover" />
                </div>
              )}
            </div>
          </Card>

          <Card>
            <CardHeader title="Xuất bản" />
            <div className="p-5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} className="w-4 h-4 rounded" />
                <span className="text-sm">Xuất bản ngay</span>
              </label>
            </div>
          </Card>
        </div>
      </div>
    </form>
  )
}