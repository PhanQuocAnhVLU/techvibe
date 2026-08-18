'use client'

// Realistic SVG Product Images - không cần API placeholder
export function PhoneImage({ brand = 'apple', color = 'black', className = '' }: { brand?: string; color?: string; className?: string }) {
  const colors: Record<string, { body: string; screen: string; accent: string }> = {
    black: { body: '#1a1a1a', screen: '#0a0a0a', accent: '#333' },
    blue: { body: '#3b82f6', screen: '#1e3a8a', accent: '#1e40af' },
    white: { body: '#f5f5f5', screen: '#e5e5e5', accent: '#d4d4d4' },
    gold: { body: '#d4af37', screen: '#b8941f', accent: '#92750c' },
    red: { body: '#dc2626', screen: '#991b1b', accent: '#7f1d1d' },
    silver: { body: '#c0c0c0', screen: '#a0a0a0', accent: '#808080' },
  }
  const c = colors[color] || colors.black

  return (
    <svg viewBox="0 0 200 300" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`grad-${brand}-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={c.body} />
          <stop offset="100%" stopColor={c.accent} />
        </linearGradient>
      </defs>
      {/* Phone body */}
      <rect x="40" y="20" width="120" height="260" rx="20" fill={`url(#grad-${brand}-${color})`} />
      {/* Screen */}
      <rect x="48" y="28" width="104" height="244" rx="14" fill={c.screen} />
      {/* Notch */}
      <rect x="85" y="35" width="30" height="6" rx="3" fill="#000" />
      {/* Camera module */}
      {brand === 'apple' && (
        <>
          <rect x="55" y="50" width="35" height="35" rx="8" fill="#000" opacity="0.6" />
          <circle cx="65" cy="62" r="6" fill="#1a1a1a" stroke="#444" strokeWidth="1" />
          <circle cx="80" cy="72" r="6" fill="#1a1a1a" stroke="#444" strokeWidth="1" />
          <circle cx="65" cy="62" r="3" fill="#333" />
        </>
      )}
      {brand === 'samsung' && (
        <g>
          <circle cx="70" cy="65" r="10" fill="#000" opacity="0.6" />
          <circle cx="70" cy="65" r="5" fill="#1a1a1a" stroke="#444" strokeWidth="1" />
          <circle cx="70" cy="65" r="2" fill="#666" />
        </g>
      )}
      {/* Apple logo */}
      {brand === 'apple' && (
        <g transform="translate(100, 150)">
          <path d="M0,-8 C-2,-10 -6,-10 -8,-6 C-10,-2 -8,4 -4,4 C-2,4 0,2 0,2 C0,2 2,4 4,4 C8,4 10,-2 8,-6 C6,-10 2,-10 0,-8 Z" fill="#666" opacity="0.4" />
        </g>
      )}
      {/* Home indicator */}
      <rect x="80" y="262" width="40" height="3" rx="1.5" fill="#666" opacity="0.5" />
    </svg>
  )
}

export function LaptopImage({ color = 'silver', className = '' }: { color?: string; className?: string }) {
  return (
    <svg viewBox="0 0 300 200" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`laptop-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#c0c0c0" />
          <stop offset="100%" stopColor="#808080" />
        </linearGradient>
      </defs>
      {/* Base */}
      <rect x="20" y="170" width="260" height="15" rx="3" fill="#404040" />
      <rect x="100" y="180" width="100" height="5" rx="2" fill="#666" />
      {/* Screen back */}
      <rect x="40" y="30" width="220" height="140" rx="8" fill={`url(#laptop-${color})`} />
      {/* Screen front */}
      <rect x="46" y="36" width="208" height="128" rx="4" fill="#1a1a1a" />
      {/* Apple logo */}
      <circle cx="150" cy="100" r="12" fill="none" stroke="#666" strokeWidth="1" opacity="0.3" />
      {/* Screen content - abstract windows */}
      <rect x="55" y="45" width="40" height="6" rx="2" fill="#3b82f6" opacity="0.4" />
      <rect x="55" y="55" width="60" height="4" rx="1" fill="#666" opacity="0.3" />
      <rect x="55" y="63" width="50" height="4" rx="1" fill="#666" opacity="0.3" />
    </svg>
  )
}

export function HeadphonesImage({ color = 'white', className = '' }: { color?: string; className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`headphones-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={color === 'white' ? '#e5e5e5' : '#404040'} />
        </linearGradient>
      </defs>
      {/* Headband */}
      <path d="M 30 100 Q 30 30, 100 30 Q 170 30, 170 100" stroke="#666" strokeWidth="8" fill="none" />
      <path d="M 30 100 Q 30 30, 100 30 Q 170 30, 170 100" stroke="#999" strokeWidth="4" fill="none" />
      {/* Left ear cup */}
      <ellipse cx="30" cy="120" rx="22" ry="28" fill={`url(#headphones-${color})`} stroke="#333" strokeWidth="1" />
      <ellipse cx="30" cy="120" rx="14" ry="18" fill="#1a1a1a" />
      {/* Right ear cup */}
      <ellipse cx="170" cy="120" rx="22" ry="28" fill={`url(#headphones-${color})`} stroke="#333" strokeWidth="1" />
      <ellipse cx="170" cy="120" rx="14" ry="18" fill="#1a1a1a" />
      {/* Microphone */}
      <line x1="60" y1="100" x2="40" y2="140" stroke="#666" strokeWidth="2" />
      <circle cx="40" cy="140" r="3" fill="#666" />
    </svg>
  )
}

export function WatchImage({ color = 'black', className = '' }: { color?: string; className?: string }) {
  return (
    <svg viewBox="0 0 150 200" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Strap top */}
      <rect x="50" y="10" width="50" height="50" rx="6" fill="#333" />
      {/* Strap bottom */}
      <rect x="50" y="140" width="50" height="50" rx="6" fill="#333" />
      {/* Watch body */}
      <rect x="40" y="60" width="70" height="80" rx="14" fill={color === 'black' ? '#1a1a1a' : '#c0c0c0'} stroke="#333" strokeWidth="1" />
      {/* Screen */}
      <rect x="46" y="66" width="58" height="68" rx="10" fill="#000" />
      {/* Crown */}
      <rect x="110" y="90" width="6" height="10" rx="2" fill="#666" />
      <rect x="110" y="105" width="6" height="6" rx="1" fill="#666" />
      {/* Time on watch */}
      <text x="75" y="100" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold">10:30</text>
      <text x="75" y="115" textAnchor="middle" fill="#666" fontSize="6">MON</text>
      {/* Heart icon */}
      <path d="M 75 125 L 72 122 C 70 120, 70 117, 72 115 C 73 114, 75 115, 75 117 C 75 115, 77 114, 78 115 C 80 117, 80 120, 78 122 Z" fill="#ef4444" />
    </svg>
  )
}

export function TabletImage({ color = 'silver', className = '' }: { color?: string; className?: string }) {
  return (
    <svg viewBox="0 0 200 250" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="20" width="160" height="210" rx="14" fill={color === 'silver' ? '#c0c0c0' : '#1a1a1a'} />
      <rect x="28" y="28" width="144" height="194" rx="8" fill="#000" />
      {/* Camera */}
      <circle cx="100" cy="40" r="2" fill="#333" />
      {/* Home button */}
      <circle cx="100" cy="225" r="8" fill="none" stroke="#666" strokeWidth="2" />
    </svg>
  )
}

// Smart product image component - picks right SVG
export function ProductImage({ name, className = '' }: { name: string; className?: string }) {
  const lower = name.toLowerCase()
  let color = 'black'
  let brand = 'apple'

  if (lower.includes('iphone') || lower.includes('ipad')) {
    brand = 'apple'
    if (lower.includes('titan')) color = 'silver'
    else if (lower.includes('xanh') || lower.includes('blue')) color = 'blue'
    else if (lower.includes('vàng') || lower.includes('gold')) color = 'gold'
    else color = 'black'
    return <PhoneImage brand="apple" color={color} className={className} />
  }
  if (lower.includes('samsung')) {
    brand = 'samsung'
    if (lower.includes('titan') || lower.includes('silver')) color = 'silver'
    else color = 'black'
    return <PhoneImage brand="samsung" color={color} className={className} />
  }
  if (lower.includes('xiaomi') || lower.includes('oppo') || lower.includes('vivo') || lower.includes('realme')) {
    if (lower.includes('xiaomi')) return <PhoneImage brand="android" color="blue" className={className} />
    if (lower.includes('oppo')) return <PhoneImage brand="android" color="green" className={className} />
    return <PhoneImage brand="android" color={color} className={className} />
  }
  if (lower.includes('macbook') || lower.includes('laptop') || lower.includes('asus') || lower.includes('dell')) {
    return <LaptopImage color="silver" className={className} />
  }
  if (lower.includes('airpod') || lower.includes('tai nghe') || lower.includes('headphone')) {
    return <HeadphonesImage color="white" className={className} />
  }
  if (lower.includes('watch') || lower.includes('đồng hồ')) {
    return <WatchImage color="black" className={className} />
  }
  if (lower.includes('ipad') || lower.includes('tablet')) {
    return <TabletImage color="silver" className={className} />
  }
  return <PhoneImage brand="android" color="black" className={className} />
}