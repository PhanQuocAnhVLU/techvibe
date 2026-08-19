'use client'

import Link from 'next/link'

const brands = [
  'Apple', 'Samsung', 'Xiaomi', 'OPPO', 'vivo', 'Realme',
  'Nokia', 'Tecno', 'ASUS', 'Dell', 'HP', 'Lenovo'
]

export function BrandList() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-3">
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-6 bg-cps-red rounded-full" />
          <h2 className="text-base font-bold text-cps-text">Thương hiệu nổi bật</h2>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-12 gap-2">
          {brands.map((brand) => (
            <Link
              key={brand}
              href={`/san-pham?thuong-hieu=${brand.toLowerCase()}`}
              className="border border-neutral-200 rounded-lg p-3 flex items-center justify-center hover:border-cps-red hover:shadow-md transition-all hover:-translate-y-0.5 bg-gradient-to-br from-white to-neutral-50 hover:from-red-50 hover:to-orange-50"
            >
              <span className="text-xs font-bold text-cps-text group-hover:text-cps-red">{brand}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}