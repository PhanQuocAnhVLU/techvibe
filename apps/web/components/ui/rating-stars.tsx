import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RatingStarsProps {
  rating: number
  size?: 'sm' | 'md' | 'lg'
  showNumber?: boolean
  className?: string
}

const sizeClasses = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
}

export function RatingStars({ rating, size = 'md', showNumber = false, className }: RatingStarsProps) {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`full-${i}`}
          className={cn(sizeClasses[size], 'fill-accent text-accent')}
        />
      ))}
      {hasHalfStar && (
        <div className="relative">
          <Star className={cn(sizeClasses[size], 'text-gray-300')} />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className={cn(sizeClasses[size], 'fill-accent text-accent')} />
          </div>
        </div>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star
          key={`empty-${i}`}
          className={cn(sizeClasses[size], 'text-gray-300')}
        />
      ))}
      {showNumber && (
        <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
      )}
    </div>
  )
}
