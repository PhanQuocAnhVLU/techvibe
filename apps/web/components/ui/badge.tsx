import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const badgeVariants = cva(
  'inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-sm',
  {
    variants: {
      variant: {
        default: 'bg-gray-100 text-gray-800',
        discount: 'bg-primary text-white',
        new: 'bg-primary text-white',
        bestseller: 'bg-orange-500 text-white',
        flash: 'bg-accent text-secondary',
        outofstock: 'bg-gray-400 text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}
