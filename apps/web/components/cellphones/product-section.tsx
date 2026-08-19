'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Sparkles } from 'lucide-react'
import { ProductCard } from './product-card'
import { useApp } from '@/lib/app-context'

interface Product {
  id: number | string
  name: string
  brand?: string
  price: number
  originalPrice?: number
  image?: string
  rating?: number
  reviews?: number
  sold?: number
  badge?: string
  slug?: string
}

interface ProductSectionProps {
  title: string
  subtitle?: string
  products: Product[]
  viewAllHref?: string
  tabs?: { id: string; label: string }[]
  bgColor?: string
  icon?: React.ReactNode
  columns?: 2 | 4 | 5 | 6
}

export function ProductSection({
  title,
  subtitle,
  products,
  viewAllHref = '/san-pham',
  tabs,
  bgColor = '',
  icon,
  columns = 5,
}: ProductSectionProps) {
  const [activeTab, setActiveTab] = useState(tabs?.[0]?.id)
  const { setQuickViewProduct } = useApp()

  const colClass = {
    2: 'grid-cols-2',
    4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
    5: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
    6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6',
  }[columns]

  return (
    <section className={`max-w-7xl mx-auto px-4 py-3 ${bgColor}`}>
      <div className="bg-white rounded-xl overflow-hidden shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-100">
          <div className="flex items-center gap-3">
            <div className="w-1 h-7 bg-cps-red rounded-full" />
            <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center">
              {icon || <Sparkles className="w-5 h-5 text-cps-red" />}
            </div>
            <div>
              <h2 className="text-lg font-bold text-cps-text">{title}</h2>
              {subtitle && <p className="text-xs text-neutral-500">{subtitle}</p>}
            </div>
          </div>

          {tabs && tabs.length > 0 ? (
            <div className="hidden md:flex items-center gap-4">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-cps-red font-bold'
                      : 'text-neutral-500 hover:text-cps-red'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="h-0.5 bg-cps-red mt-1 rounded-full" />
                  )}
                </button>
              ))}
            </div>
          ) : (
            <Link
              href={viewAllHref}
              className="text-cps-red hover:underline flex items-center gap-1 text-sm font-medium"
            >
              Xem tất cả
              <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {/* Grid */}
        <div className={`grid ${colClass} gap-3 p-3`}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              showWishlist
              showRating
              onQuickView={setQuickViewProduct as any}
            />
          ))}
        </div>
      </div>
    </section>
  )
}