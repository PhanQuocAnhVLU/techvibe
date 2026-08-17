'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingCart, FlashlightIcon as Flash } from 'lucide-react'
import { Product } from '@/lib/types'
import { formatPrice, calculateDiscount } from '@/lib/utils'
import { cn } from '@/lib/utils'
import { Badge } from './badge'
import { Button } from './button'
import { RatingStars } from './rating-stars'

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const discount = calculateDiscount(product.originalPrice, product.price)
  const displayPrice = product.isFlashSale && product.flashSalePrice 
    ? product.flashSalePrice 
    : product.price

  return (
    <div className={cn('product-card bg-white rounded-md overflow-hidden', className)}>
      {/* Image Container */}
      <div className="relative aspect-square bg-gray-50">
        {/* Badges */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
          {discount >= 10 && (
            <Badge variant="discount">-{discount}%</Badge>
          )}
          {product.isNew && <Badge variant="new">Mới</Badge>}
          {product.isBestseller && <Badge variant="bestseller">Bán chạy</Badge>}
          {product.isFlashSale && <Badge variant="flash">Flash Sale</Badge>}
        </div>

        {/* Wishlist Button */}
        <button className="absolute top-2 right-2 z-10 p-1.5 bg-white/80 rounded-full hover:bg-white transition-colors">
          <Heart className="w-4 h-4 text-gray-600 hover:text-primary" />
        </button>

        {/* Product Image */}
        <Link href={`/san-pham/${product.slug}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </Link>

        {/* Installment Badge */}
        {product.tags.includes('installment') && (
          <div className="absolute bottom-2 left-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
            Trả góp 0%
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-3">
        {/* Brand */}
        <p className="text-xs text-gray-500 mb-1">{product.brand}</p>

        {/* Name */}
        <Link href={`/san-pham/${product.slug}`} className="block">
          <h3 className="font-medium text-sm text-secondary line-clamp-2 hover:text-primary transition-colors mb-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-2">
          <RatingStars rating={product.rating} size="sm" />
          <span className="text-xs text-gray-500">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="mb-3">
          <p className="font-bold text-lg text-primary">
            {formatPrice(displayPrice)}
          </p>
          {discount > 0 && (
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </p>
              <span className="text-xs text-primary font-medium">
                Tiết kiệm {formatPrice(product.originalPrice - displayPrice)}
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 gap-1">
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">Giỏ hàng</span>
          </Button>
          <Button variant="primary" size="sm" className="flex-1">
            Mua ngay
          </Button>
        </div>
      </div>
    </div>
  )
}
