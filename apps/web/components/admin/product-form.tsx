'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { Field, Input, Textarea, Select, Button, Card, CardHeader } from './form'
import { ImageUpload } from './image-upload'

interface ProductFormProps {
  product?: any
  categories: any[]
  brands: any[]
}

export function ProductForm({ product, categories, brands }: ProductFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [name, setName] = useState(product?.name || '')
  const [slug, setSlug] = useState(product?.slug || '')
  const [sku, setSku] = useState(product?.sku || `SKU-${Date.now().toString().slice(-6)}`)
  const [categoryId, setCategoryId] = useState(product?.category_id || '')
  const [brandId, setBrandId] = useState(product?.brand_id || '')
  const [price, setPrice] = useState(product?.price || 0)
  const [originalPrice, setOriginalPrice] = useState(product?.original_price || 0)
  const [stock, setStock] = useState(product?.stock || 0)
  const [description, setDescription] = useState(product?.description || '')
  const [images, setImages] = useState<string[]>(product?.image_urls || [])
  const [isActive, setIsActive] = useState(product?.is_active !== false)
  const [isFlashSale, setIsFlashSale] = useState(product?.is_flash_sale || false)
  const [badge, setBadge] = useState(product?.badge || '')
  const [specsText, setSpecsText] = useState(
    product?.specs ? Object.entries(product.specs).map(([k, v]) => `${k}: ${v}`).join('\n') : ''
  )

  // Auto-generate slug from name
  const handleNameChange = (val: string) => {
    setName(val)
    if (!product) {
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

    // Build specs object from text
    const specs: Record<string, string> = {}
    specsText.split('\n').forEach(line => {
      const [k, ...rest] = line.split(':')
      if (k && rest.length > 0) {
        specs[k.trim()] = rest.join(':').trim()
      }
    })

    const payload = {
      name,
      slug,
      sku,
      category_id: categoryId || null,
      brand_id: brandId || null,
      price: Number(price),
      original_price: Number(originalPrice) || null,
      stock: Number(stock),
      description,
      image_urls: images,
      is_active: isActive,
      is_flash_sale: isFlashSale,
      badge: badge || null,
      specs: Object.keys(specs).length > 0 ? specs : null,
    }

    let result
    if (product) {
      result = await supabase.from('products').update(payload).eq('id', product.id)
    } else {
      result = await supabase.from('products').insert(payload)
    }

    setLoading(false)

    if (result.error) {
      setError(result.error.message)
      return
    }

    router.push('/admin/san-pham')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/admin/san-pham" className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900">
          <ArrowLeft className="w-4 h-4" />
          Quay lại danh sách
        </Link>
        <Button type="submit" disabled={loading}>
          <Save className="w-4 h-4" />
          {loading ? 'Đang lưu...' : (product ? 'Cập nhật' : 'Tạo sản phẩm')}
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">{error}</div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader title="Thông tin cơ bản" subtitle="Tên, mô tả, slug sản phẩm" />
            <div className="p-5 space-y-4">
              <Field label="Tên sản phẩm" required>
                <Input value={name} onChange={(e) => handleNameChange(e.target.value)} required placeholder="iPhone 15 Pro Max 256GB" />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Slug (URL)" required>
                  <Input value={slug} onChange={(e) => setSlug(e.target.value)} required placeholder="iphone-15-pro-max-256gb" />
                </Field>
                <Field label="SKU">
                  <Input value={sku} onChange={(e) => setSku(e.target.value)} />
                </Field>
              </div>
              <Field label="Mô tả" hint="Mô tả chi tiết sản phẩm, tính năng nổi bật">
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5} placeholder="Mô tả sản phẩm..." />
              </Field>
            </div>
          </Card>

          <Card>
            <CardHeader title="Hình ảnh" subtitle="Tối đa 5 ảnh, ảnh đầu tiên là ảnh chính" />
            <div className="p-5">
              <ImageUpload value={images} onChange={setImages} folder="products" maxFiles={5} />
            </div>
          </Card>

          <Card>
            <CardHeader title="Thông số kỹ thuật" subtitle="Mỗi dòng: Tên thông số : Giá trị" />
            <div className="p-5">
              <Textarea
                value={specsText}
                onChange={(e) => setSpecsText(e.target.value)}
                rows={8}
                placeholder={`Màn hình: 6.7 inch Super Retina XDR\nChip: Apple A17 Pro\nRAM: 8GB\nPin: 4422 mAh`}
                className="font-mono text-xs"
              />
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader title="Giá & Kho" />
            <div className="p-5 space-y-4">
              <Field label="Giá bán (VNĐ)" required>
                <Input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  required
                  min={0}
                />
              </Field>
              <Field label="Giá gốc (VNĐ)" hint="Để trống nếu không giảm giá">
                <Input
                  type="number"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(Number(e.target.value))}
                  min={0}
                />
              </Field>
              <Field label="Số lượng kho" required>
                <Input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(Number(e.target.value))}
                  required
                  min={0}
                />
              </Field>
              {originalPrice > price && price > 0 && (
                <div className="bg-red-50 rounded-lg p-3 text-sm">
                  <span className="text-red-700 font-bold">
                    -{Math.round((1 - price / originalPrice) * 100)}%
                  </span>
                  <span className="text-neutral-600 ml-2">giảm giá</span>
                </div>
              )}
            </div>
          </Card>

          <Card>
            <CardHeader title="Phân loại" />
            <div className="p-5 space-y-4">
              <Field label="Danh mục" required>
                <Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
                  <option value="">-- Chọn danh mục --</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </Select>
              </Field>
              <Field label="Thương hiệu">
                <Select value={brandId} onChange={(e) => setBrandId(e.target.value)}>
                  <option value="">-- Chọn thương hiệu --</option>
                  {brands.map(b => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </Select>
              </Field>
            </div>
          </Card>

          <Card>
            <CardHeader title="Hiển thị" />
            <div className="p-5 space-y-4">
              <Field label="Badge">
                <Select value={badge} onChange={(e) => setBadge(e.target.value)}>
                  <option value="">Không có</option>
                  <option value="NEW">NEW (Mới)</option>
                  <option value="HOT">HOT (Bán chạy)</option>
                  <option value="SALE">SALE (Giảm giá)</option>
                </Select>
              </Field>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="w-4 h-4 rounded" />
                <span className="text-sm">Hiển thị sản phẩm</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={isFlashSale} onChange={(e) => setIsFlashSale(e.target.checked)} className="w-4 h-4 rounded" />
                <span className="text-sm">Flash Sale</span>
              </label>
            </div>
          </Card>
        </div>
      </div>
    </form>
  )
}