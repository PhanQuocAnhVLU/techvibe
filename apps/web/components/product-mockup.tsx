'use client'

// SVG Product Mockup Generator - creates beautiful product images without external CDN
// Each product gets a unique gradient + product silhouette

import { useState } from 'react'

interface ProductMockupProps {
  name: string
  brand?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

// Gradient configurations by brand
const brandGradients: Record<string, { bg: string; accent: string; shadow: string }> = {
  Apple: {
    bg: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    accent: '#5e9eff',
    shadow: 'rgba(94, 158, 255, 0.4)',
  },
  Samsung: {
    bg: 'linear-gradient(135deg, #1428a0 0%, #1e4dd8 50%, #2563eb 100%)',
    accent: '#fbbf24',
    shadow: 'rgba(37, 99, 235, 0.4)',
  },
  Xiaomi: {
    bg: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #ffb627 100%)',
    accent: '#ffffff',
    shadow: 'rgba(255, 107, 53, 0.4)',
  },
  OPPO: {
    bg: 'linear-gradient(135deg, #00a86b 0%, #16a34a 50%, #22c55e 100%)',
    accent: '#ffffff',
    shadow: 'rgba(0, 168, 107, 0.4)',
  },
  vivo: {
    bg: 'linear-gradient(135deg, #4158d0 0%, #c850c0 50%, #ffcc70 100%)',
    accent: '#ffffff',
    shadow: 'rgba(200, 80, 192, 0.4)',
  },
  Realme: {
    bg: 'linear-gradient(135deg, #ffd200 0%, #f7971e 50%, #ffd200 100%)',
    accent: '#000000',
    shadow: 'rgba(247, 151, 30, 0.4)',
  },
  Dell: {
    bg: 'linear-gradient(135deg, #007db8 0%, #0084c8 50%, #00a3e0 100%)',
    accent: '#ffffff',
    shadow: 'rgba(0, 132, 200, 0.4)',
  },
  ASUS: {
    bg: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #0a0a0a 100%)',
    accent: '#9b87f5',
    shadow: 'rgba(155, 135, 245, 0.4)',
  },
}

const defaultGradient = {
  bg: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #d946ef 100%)',
  accent: '#ffffff',
  shadow: 'rgba(139, 92, 246, 0.4)',
}

// Phone SVG - Modern smartphone with screen glow
function PhoneMockup({ gradient, accent, modelName }: { gradient: string; accent: string; modelName: string }) {
  return (
    <svg viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id={`phoneBody-${modelName}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1f2937" />
          <stop offset="50%" stopColor="#111827" />
          <stop offset="100%" stopColor="#030712" />
        </linearGradient>
        <linearGradient id={`phoneScreen-${modelName}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
        <filter id={`glow-${modelName}`}>
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Phone body */}
      <rect x="60" y="30" width="180" height="340" rx="28" fill={`url(#phoneBody-${modelName})`} stroke="#374151" strokeWidth="1.5" />

      {/* Screen border */}
      <rect x="68" y="38" width="164" height="324" rx="22" fill="#000000" />

      {/* Screen content */}
      <rect x="72" y="42" width="156" height="316" rx="19" fill={`url(#phoneScreen-${modelName})`} opacity="0.9" />

      {/* Dynamic Island */}
      <rect x="120" y="55" width="60" height="18" rx="9" fill="#000000" />

      {/* Screen highlight */}
      <rect x="72" y="42" width="156" height="80" rx="19" fill="url(#phoneScreen-${modelName})" opacity="0.3" />

      {/* Bright accent icon */}
      <g filter={`url(#glow-${modelName})`}>
        <circle cx="150" cy="200" r="40" fill={accent} opacity="0.85" />
        <circle cx="150" cy="200" r="28" fill="white" opacity="0.95" />
        <path d="M 130 200 L 145 215 L 170 185" stroke={accent} strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Camera lens */}
      <circle cx="200" cy="70" r="14" fill="#1a1a1a" stroke="#4b5563" strokeWidth="2" />
      <circle cx="200" cy="70" r="9" fill="#0a0a0a" />
      <circle cx="197" cy="67" r="3" fill="#3b82f6" opacity="0.6" />

      {/* Bottom indicator */}
      <rect x="130" y="350" width="40" height="4" rx="2" fill="white" opacity="0.6" />
    </svg>
  )
}

// Laptop SVG - Modern laptop with screen content
function LaptopMockup({ gradient, accent, modelName }: { gradient: string; accent: string; modelName: string }) {
  return (
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id={`laptopScreen-${modelName}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>

      {/* Laptop base */}
      <path d="M 40 250 L 360 250 L 380 270 L 20 270 Z" fill="#6b7280" />
      <rect x="40" y="250" width="320" height="6" fill="#9ca3af" />

      {/* Laptop screen back */}
      <rect x="60" y="40" width="280" height="215" rx="10" fill="#1f2937" />

      {/* Screen */}
      <rect x="68" y="48" width="264" height="199" rx="4" fill={`url(#laptopScreen-${modelName})`} />

      {/* Screen content - code lines */}
      <g opacity="0.85">
        <rect x="80" y="65" width="60" height="6" rx="3" fill="#fbbf24" />
        <rect x="80" y="80" width="120" height="6" rx="3" fill="white" opacity="0.9" />
        <rect x="100" y="95" width="80" height="6" rx="3" fill="#10b981" />
        <rect x="100" y="110" width="100" height="6" rx="3" fill="white" opacity="0.7" />
        <rect x="100" y="125" width="60" height="6" rx="3" fill="#ec4899" />
        <rect x="80" y="148" width="80" height="6" rx="3" fill="#3b82f6" />
        <rect x="100" y="163" width="140" height="6" rx="3" fill="white" opacity="0.9" />
        <rect x="100" y="178" width="60" height="6" rx="3" fill="#fbbf24" />
        <rect x="80" y="201" width="100" height="6" rx="3" fill="#10b981" />
      </g>

      {/* Camera notch */}
      <circle cx="200" cy="50" r="2" fill="#374151" />

      {/* Trackpad */}
      <rect x="160" y="258" width="80" height="4" rx="2" fill="#4b5563" />
    </svg>
  )
}

// Tablet SVG - Modern tablet with screen
function TabletMockup({ gradient, accent, modelName }: { gradient: string; accent: string; modelName: string }) {
  return (
    <svg viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id={`tabletScreen-${modelName}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#84cc16" />
          <stop offset="50%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>

      {/* Tablet body */}
      <rect x="40" y="30" width="220" height="340" rx="20" fill="#1f2937" stroke="#374151" strokeWidth="1.5" />

      {/* Screen */}
      <rect x="50" y="40" width="200" height="320" rx="12" fill={`url(#tabletScreen-${modelName})`} />

      {/* Screen design - app grid */}
      <g opacity="0.95">
        <rect x="65" y="55" width="50" height="50" rx="10" fill="white" opacity="0.9" />
        <rect x="125" y="55" width="50" height="50" rx="10" fill="white" opacity="0.8" />
        <rect x="185" y="55" width="50" height="50" rx="10" fill="white" opacity="0.7" />
        <rect x="65" y="115" width="50" height="50" rx="10" fill="white" opacity="0.8" />
        <rect x="125" y="115" width="50" height="50" rx="10" fill="white" opacity="0.9" />
        <rect x="185" y="115" width="50" height="50" rx="10" fill="white" opacity="0.7" />
      </g>

      {/* Home button */}
      <rect x="135" y="350" width="30" height="4" rx="2" fill="white" opacity="0.6" />
    </svg>
  )
}

// Watch SVG - Modern smartwatch
function WatchMockup({ gradient, accent, modelName }: { gradient: string; accent: string; modelName: string }) {
  return (
    <svg viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id={`watchScreen-${modelName}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={accent} />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
      </defs>

      {/* Watch strap top */}
      <path d="M 110 20 L 190 20 L 180 100 L 120 100 Z" fill="#1f2937" />
      {/* Watch strap bottom */}
      <path d="M 120 300 L 180 300 L 190 380 L 110 380 Z" fill="#1f2937" />

      {/* Watch body */}
      <rect x="100" y="100" width="100" height="200" rx="30" fill="#0a0a0a" stroke="#374151" strokeWidth="2" />

      {/* Screen */}
      <rect x="115" y="115" width="70" height="170" rx="20" fill={`url(#watchScreen-${modelName})`} />

      {/* Time display */}
      <text x="150" y="180" textAnchor="middle" fontSize="28" fontWeight="bold" fill="#000">10:30</text>
      <text x="150" y="220" textAnchor="middle" fontSize="12" fill="#000" opacity="0.7">Thứ 2</text>

      {/* Crown button */}
      <rect x="200" y="170" width="8" height="30" rx="3" fill="#4b5563" />
    </svg>
  )
}

// Headphones SVG
function HeadphonesMockup({ gradient, accent, modelName }: { gradient: string; accent: string; modelName: string }) {
  return (
    <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id={`hp-${modelName}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e5e7eb" />
        </linearGradient>
      </defs>

      {/* Headband */}
      <path d="M 50 150 Q 50 50 150 50 Q 250 50 250 150" stroke="url(#hp-${modelName})" strokeWidth="14" fill="none" strokeLinecap="round" />

      {/* Left ear cup */}
      <ellipse cx="50" cy="170" rx="32" ry="40" fill="#f9fafb" stroke="#d1d5db" strokeWidth="2" />
      <ellipse cx="50" cy="170" rx="20" ry="28" fill="#1f2937" />

      {/* Right ear cup */}
      <ellipse cx="250" cy="170" rx="32" ry="40" fill="#f9fafb" stroke="#d1d5db" strokeWidth="2" />
      <ellipse cx="250" cy="170" rx="20" ry="28" fill="#1f2937" />

      {/* Accent on center */}
      <circle cx="150" cy="50" r="6" fill={accent} />
    </svg>
  )
}

// Accessory SVG - Generic accessory (cable, case, etc.)
function AccessoryMockup({ gradient, accent, modelName }: { gradient: string; accent: string; modelName: string }) {
  return (
    <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id={`acc-${modelName}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={accent} />
          <stop offset="100%" stopColor="white" />
        </linearGradient>
      </defs>

      {/* Cable loops */}
      <circle cx="150" cy="150" r="100" fill="none" stroke="url(#acc-${modelName})" strokeWidth="14" strokeDasharray="60 20" />
      <circle cx="150" cy="150" r="65" fill="none" stroke="url(#acc-${modelName})" strokeWidth="10" strokeDasharray="40 15" opacity="0.7" />

      {/* Center connector */}
      <rect x="130" y="135" width="40" height="30" rx="6" fill="#1f2937" />
      <rect x="135" y="140" width="30" height="20" rx="3" fill="#3b82f6" />
    </svg>
  )
}

// Determine product type from name
function getProductType(name: string): 'phone' | 'laptop' | 'tablet' | 'watch' | 'headphones' | 'accessory' {
  const lower = name.toLowerCase()
  if (lower.includes('macbook') || lower.includes('laptop') || lower.includes('xps') || lower.includes('strix')) return 'laptop'
  if (lower.includes('ipad') || lower.includes('tab')) return 'tablet'
  if (lower.includes('watch') || lower.includes('đồng hồ')) return 'watch'
  if (lower.includes('airpods') || lower.includes('tai nghe') || lower.includes('headphone')) return 'headphones'
  if (lower.includes('iphone') || lower.includes('samsung galaxy') || lower.includes('xiaomi') || lower.includes('oppo') || lower.includes('vivo') || lower.includes('realme')) return 'phone'
  return 'accessory'
}

export function ProductMockup({ name, brand, className = '', size = 'md' }: ProductMockupProps) {
  const gradient = (brand && brandGradients[brand]) || defaultGradient
  const type = getProductType(name)
  const modelName = name.replace(/\s+/g, '').slice(0, 20)

  const sizeClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  }

  return (
    <div
      className={`relative w-full h-full ${sizeClasses[size]} ${className}`}
      style={{ background: gradient.bg }}
    >
      {/* Decorative circles */}
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20" style={{ background: gradient.accent }} />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full opacity-15" style={{ background: gradient.accent }} />

      {/* Brand label */}
      <div className="absolute top-3 left-3 z-10 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-sm text-white">
        {brand || 'Tech'}
      </div>

      {/* Product SVG */}
      <div className="relative w-full h-full flex items-center justify-center">
        {type === 'phone' && <PhoneMockup gradient={gradient.bg} accent={gradient.accent} modelName={modelName} />}
        {type === 'laptop' && <LaptopMockup gradient={gradient.bg} accent={gradient.accent} modelName={modelName} />}
        {type === 'tablet' && <TabletMockup gradient={gradient.bg} accent={gradient.accent} modelName={modelName} />}
        {type === 'watch' && <WatchMockup gradient={gradient.bg} accent={gradient.accent} modelName={modelName} />}
        {type === 'headphones' && <HeadphonesMockup gradient={gradient.bg} accent={gradient.accent} modelName={modelName} />}
        {type === 'accessory' && <AccessoryMockup gradient={gradient.bg} accent={gradient.accent} modelName={modelName} />}
      </div>

      {/* Product name */}
      <div className="absolute bottom-3 left-3 right-3 z-10">
        <p className="text-white text-xs font-semibold truncate drop-shadow-lg">{name}</p>
      </div>
    </div>
  )
}

// Hero Image - Large banner for homepage
export function HeroMockup({ title, subtitle, brand, accent }: { title: string; subtitle: string; brand: string; accent: string }) {
  const gradient = brandGradients[brand] || defaultGradient
  return (
    <div className="relative w-full h-full" style={{ background: gradient.bg }}>
      {/* Animated blobs */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-40 animate-pulse" style={{ background: gradient.accent }} />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-30" style={{ background: gradient.accent }} />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center p-8 z-10">
        <span className="text-xs font-bold uppercase tracking-widest text-white/80 mb-2">{brand}</span>
        <h3 className="text-3xl md:text-4xl font-black text-white mb-2 leading-tight">{title}</h3>
        <p className="text-sm text-white/80 mb-4 max-w-[80%]">{subtitle}</p>
        <button className="self-start px-5 py-2.5 bg-white text-gray-900 rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-xl">
          Mua ngay →
        </button>
      </div>

      {/* Phone mockup */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 w-40 h-56 md:w-52 md:h-72">
        <PhoneMockup gradient={gradient.bg} accent={gradient.accent} modelName={title} />
      </div>
    </div>
  )
}

// News thumbnail for articles
export function NewsMockup({ title, brand }: { title: string; brand?: string }) {
  const gradient = (brand && brandGradients[brand]) || defaultGradient
  return (
    <div className="relative w-full h-full" style={{ background: gradient.bg }}>
      <div className="absolute inset-0 opacity-30" style={{ background: `radial-gradient(circle at 30% 30%, ${gradient.accent}, transparent 60%)` }} />
      <div className="relative h-full flex flex-col justify-end p-4">
        <span className="text-[10px] font-bold uppercase tracking-wider text-white/80 mb-1">{brand || 'Tech News'}</span>
        <p className="text-white text-sm font-bold line-clamp-2 drop-shadow">{title}</p>
      </div>
    </div>
  )
}