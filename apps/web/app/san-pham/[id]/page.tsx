import { notFound } from 'next/navigation'
import { getProductBySlug } from '@/lib/api/products'
import { ProductDetailClient } from './product-detail-client'

export const revalidate = 60

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await getProductBySlug(id)
  if (!product) return { title: 'Sản phẩm không tồn tại' }
  return {
    title: `${product.name} | TechVibe`,
    description: product.description ?? product.name,
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await getProductBySlug(id)
  if (!product) notFound()

  return <ProductDetailClient product={product} />
}
