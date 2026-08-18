'use client'

import { useEffect, useState, useRef } from 'react'
import { useApp } from '@/lib/app-context'
import { ConfettiBurst } from './confetti'
import { SearchModal, CartDrawer, QuickViewModal } from './modals'
import { ScrollToTop } from './scroll-to-top'
import { ChatWidget } from './chat-widget'

export function GlobalFeatures() {
  const { addToCart } = useApp()
  const [confettiTrigger, setConfettiTrigger] = useState(0)
  const prevCartCount = useRef(0)

  // Detect cart addition via state change (simple polling)
  useEffect(() => {
    let lastCount = 0
    const checkCart = () => {
      const stored = localStorage.getItem('cart')
      if (stored) {
        try {
          const items = JSON.parse(stored)
          const count = items.reduce((sum: number, item: any) => sum + item.quantity, 0)
          if (count > lastCount && lastCount > 0) {
            setConfettiTrigger(Date.now())
          }
          lastCount = count
        } catch {}
      }
    }
    const interval = setInterval(checkCart, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <ConfettiBurst trigger={confettiTrigger} />
      <SearchModal />
      <CartDrawer />
      <QuickViewModal />
      <ScrollToTop />
      <ChatWidget />
    </>
  )
}