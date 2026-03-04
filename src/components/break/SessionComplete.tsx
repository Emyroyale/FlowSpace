'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useVibe } from '@/context/VibeContext'
import { VIBES } from '@/lib/vibes'

function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
    : [255, 255, 255]
}

type Shape = 'circle' | 'rect' | 'triangle'

interface ConfettiParticle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  opacity: number
  gravity: number
  rotation: number
  rotationSpeed: number
  shape: Shape
  sparkle: boolean
}

interface RippleRing {
  x: number
  y: number
  radius: number
  opacity: number
  startFrame: number
}

interface SessionCompleteProps {
  sessionCount: number
}

export default function SessionComplete({ sessionCount }: SessionCompleteProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { activeVibe } = useVibe()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const accent = VIBES[activeVibe].accent
    const [r, g, b] = hexToRgb(accent)
    const colors = [
      `rgba(${r}, ${g}, ${b}, 1)`,
      `rgba(${r}, ${g}, ${b}, 0.7)`,
      'rgba(255, 255, 255, 0.8)',
      'rgba(255, 255, 255, 0.5)',
      'rgba(255, 215, 0, 0.9)', // gold
    ]
    const shapes: Shape[] = ['circle', 'rect', 'triangle']
    const count = window.innerWidth < 768 ? 60 : 90

    const confetti: ConfettiParticle[] = Array.from({ length: count }, () => ({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 14,
      vy: (Math.random() - 1) * 12 - 3,
      size: Math.random() * 7 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: 1,
      gravity: 0.12,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.2,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      sparkle: Math.random() < 0.3,
    }))

    // 3 ripple rings from center
    const ripples: RippleRing[] = [0, 1, 2].map((i) => ({
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: 0,
      opacity: 0.6,
      startFrame: i * 8,
    }))

    let frame = 0
    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw ripple rings
      for (const ring of ripples) {
        if (frame >= ring.startFrame) {
          const age = frame - ring.startFrame
          ring.radius = age * 5
          ring.opacity = Math.max(0, 0.6 - age * 0.008)
          if (ring.opacity > 0) {
            ctx.beginPath()
            ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2)
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${ring.opacity})`
            ctx.lineWidth = 2
            ctx.stroke()
          }
        }
      }

      // Draw confetti
      for (const c of confetti) {
        c.x += c.vx
        c.vy += c.gravity
        c.y += c.vy
        c.rotation += c.rotationSpeed
        c.opacity = Math.max(0, c.opacity - 0.008)

        let alpha = c.opacity
        if (c.sparkle) {
          alpha *= 0.5 + 0.5 * Math.sin(frame * 0.3 + c.rotation * 10)
        }

        ctx.save()
        ctx.globalAlpha = alpha
        ctx.fillStyle = c.color
        ctx.translate(c.x, c.y)
        ctx.rotate(c.rotation)

        if (c.shape === 'circle') {
          ctx.beginPath()
          ctx.arc(0, 0, c.size / 2, 0, Math.PI * 2)
          ctx.fill()
        } else if (c.shape === 'rect') {
          ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size * 0.6)
        } else {
          ctx.beginPath()
          ctx.moveTo(0, -c.size / 2)
          ctx.lineTo(c.size / 2, c.size / 2)
          ctx.lineTo(-c.size / 2, c.size / 2)
          ctx.closePath()
          ctx.fill()
        }

        ctx.restore()
      }
      ctx.globalAlpha = 1

      frame++
      if (frame < 160) requestAnimationFrame(animate)
    }

    animate()
  }, [activeVibe])

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      className="relative text-center"
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-50"
      />
      <h2 className="font-clash text-4xl font-bold text-white">
        Session Complete
      </h2>
      <div className="mt-2 flex items-center justify-center gap-2 text-white/50">
        <span>
          {sessionCount} {sessionCount === 1 ? 'session' : 'sessions'} today
        </span>
        {sessionCount >= 3 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{
              delay: 0.5,
              duration: 0.6,
              repeat: Infinity,
              repeatDelay: 2,
            }}
            className="text-xl"
          >
            🔥
          </motion.span>
        )}
      </div>

      {/* Go Home */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="mt-6"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2 text-sm text-white/50 transition-all hover:border-white/30 hover:text-white/80"
        >
          ← Back to Home
        </Link>
      </motion.div>
    </motion.div>
  )
}
