'use client'

import { useEffect, useRef } from 'react'
import { Sparkles } from 'lucide-react'

// Confetti effect when adding to cart
export function ConfettiBurst({ trigger, onDone }: { trigger: number; onDone?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (trigger === 0) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const colors = ['#ca3838', '#ff6b35', '#fbbf24', '#10b981', '#3b82f6', '#8b5cf6']
    const particles: any[] = []

    // Create particles from a central point
    const startX = window.innerWidth / 2
    const startY = window.innerHeight / 2

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: startX,
        y: startY,
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 1) * 14 - 4,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        life: 1,
        decay: Math.random() * 0.015 + 0.008,
        shape: Math.random() > 0.5 ? 'rect' : 'circle',
      })
    }

    let animationId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      let alive = false
      particles.forEach(p => {
        if (p.life <= 0) return
        alive = true
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.4
        p.vx *= 0.99
        p.rotation += p.rotationSpeed
        p.life -= p.decay

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.globalAlpha = Math.max(0, p.life)
        ctx.fillStyle = p.color
        if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size / 2)
        } else {
          ctx.beginPath()
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.restore()
      })

      if (alive) {
        animationId = requestAnimationFrame(animate)
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        onDone?.()
      }
    }
    animate()

    const timer = setTimeout(() => {
      cancelAnimationFrame(animationId)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }, 3000)

    return () => {
      cancelAnimationFrame(animationId)
      clearTimeout(timer)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
  }, [trigger, onDone])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[100]"
      style={{ width: '100vw', height: '100vh' }}
    />
  )
}

export function SparkleEffect({ trigger }: { trigger: number }) {
  if (trigger === 0) return null
  return (
    <div className="fixed inset-0 pointer-events-none z-[100] flex items-center justify-center">
      <div className="relative">
        {Array.from({ length: 8 }).map((_, i) => (
          <Sparkles
            key={i}
            className="absolute text-yellow-400 animate-ping"
            style={{
              top: `${(i % 4 - 2) * 30}px`,
              left: `${Math.floor(i / 4 - 0.5) * 30}px`,
              animationDelay: `${i * 0.05}s`,
              animationDuration: '0.6s',
            }}
          />
        ))}
      </div>
    </div>
  )
}