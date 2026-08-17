import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('vi-VN').format(price) + ' ₫'
}

export function formatPriceShort(price: number): string {
  if (price >= 1000000) {
    return (price / 1000000).toFixed(price % 1000000 === 0 ? 0 : 1) + ' triệu'
  }
  return formatPrice(price)
}

export function calculateDiscount(original: number, current: number): number {
  return Math.round(((original - current) / original) * 100)
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}
