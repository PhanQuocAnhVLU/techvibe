import { NextResponse } from 'next/server'
import { products } from './products-data'

export const dynamic = 'force-dynamic'

// Proxy endpoint - returns product images URLs (data-based)
// Real implementation would fetch from Cellphones, but we use local data
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const name = searchParams.get('name')
  const brand = searchParams.get('brand')

  if (!name) {
    return NextResponse.json({ error: 'Missing name' }, { status: 400 })
  }

  // Get product image URL
  const product = products.find(p => p.n.toLowerCase() === name.toLowerCase())
  if (product) {
    return NextResponse.json({ url: product.u, brand: product.b })
  }

  // Try brand fallback
  if (brand) {
    const brandProduct = products.find(p => p.b.toLowerCase() === brand.toLowerCase())
    if (brandProduct) {
      return NextResponse.json({ url: brandProduct.u, brand })
    }
  }

  // Default fallback
  return NextResponse.json({ 
    url: products[0].u, 
    brand: 'Apple' 
  })
}