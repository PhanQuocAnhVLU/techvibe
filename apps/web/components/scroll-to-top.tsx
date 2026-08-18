'use client'

import { useEffect, useState } from 'react'
import { ChevronUp } from 'lucide-react'

export function ScrollToTop() {
  const [scrollPercent, setScrollPercent] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = window.scrollY
      setScrollPercent(totalHeight > 0 ? (scrolled / totalHeight) * 100 : 0)
      setVisible(scrolled > 300)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!visible) return null

  // SVG circle with progress
  const radius = 22
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (scrollPercent / 100) * circumference

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 left-6 z-50 group"
      aria-label="Scroll to top"
    >
      <svg width="56" height="56" className="rotate-[-90deg]">
        <circle cx="28" cy="28" r={radius} fill="white" stroke="#e5e5e5" strokeWidth="3" />
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke="#ca3838"
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-150"
        />
      </svg>
      <ChevronUp className="w-5 h-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#ca3838] group-hover:scale-125 transition-transform" />
    </button>
  )
}