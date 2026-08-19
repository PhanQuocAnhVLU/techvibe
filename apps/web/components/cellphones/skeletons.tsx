export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg overflow-hidden border border-neutral-100 flex flex-col h-full">
      <div className="aspect-square bg-gradient-to-br from-neutral-100 to-neutral-200 skeleton" />
      <div className="p-2.5 space-y-2">
        <div className="h-3 bg-neutral-200 rounded skeleton w-full" />
        <div className="h-3 bg-neutral-200 rounded skeleton w-3/4" />
        <div className="h-4 bg-neutral-200 rounded skeleton w-1/2 mt-2" />
      </div>
    </div>
  )
}

export function BannerSkeleton() {
  return (
    <div className="flex-1 min-w-0">
      <div className="bg-white rounded-t-xl h-10 mb-px" />
      <div className="bg-neutral-200 rounded-b-xl h-[300px] md:h-[400px] skeleton" />
    </div>
  )
}

export function SidebarSkeleton() {
  return (
    <div className="hidden md:block w-64 shrink-0 bg-white rounded-xl p-3 space-y-2">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="h-9 bg-neutral-100 rounded skeleton" />
      ))}
    </div>
  )
}