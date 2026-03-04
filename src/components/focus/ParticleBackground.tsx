'use client'

import { useRef, useEffect } from 'react'
import { useVibe } from '@/context/VibeContext'
import { VIBES } from '@/lib/vibes'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
}

interface BurstParticle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
  life: number
  maxLife: number
}

function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
    : [255, 255, 255]
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { activeVibe } = useVibe()
  const vibeRef = useRef(activeVibe)
  const burstParticlesRef = useRef<BurstParticle[]>([])
  const isFirstRender = useRef(true)

  // Spawn burst particles when vibe changes (not on initial mount)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      vibeRef.current = activeVibe
      return
    }
    vibeRef.current = activeVibe

    const cx = window.innerWidth / 2
    const cy = window.innerHeight / 2
    const newBurst: BurstParticle[] = Array.from({ length: 25 }, () => {
      const angle = Math.random() * Math.PI * 2
      const speed = Math.random() * 4 + 2
      return {
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 3 + 1.5,
        opacity: 1,
        life: 0,
        maxLife: 60,
      }
    })
    burstParticlesRef.current.push(...newBurst)
  }, [activeVibe])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    const dpr = Math.min(window.devicePixelRatio, 2)
    const particleCount = window.innerWidth < 768 ? 15 : 40

    function resize() {
      if (!canvas) return
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx!.scale(dpr, dpr)
    }

    resize()
    window.addEventListener('resize', resize)

    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 2 + 1,
      opacity: Math.random() * 0.3 + 0.1,
    }))

    function draw() {
      if (!ctx || !canvas) return
      const w = window.innerWidth
      const h = window.innerHeight

      ctx.clearRect(0, 0, w, h)

      const accent = VIBES[vibeRef.current].accent
      const [r, g, b] = hexToRgb(accent)

      // Ambient particles
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.opacity})`
        ctx.fill()
      }

      // Burst particles
      const burst = burstParticlesRef.current
      for (let i = burst.length - 1; i >= 0; i--) {
        const bp = burst[i]
        bp.x += bp.vx
        bp.y += bp.vy
        bp.vx *= 0.97
        bp.vy *= 0.97
        bp.life++

        const progress = bp.life / bp.maxLife
        const currentOpacity = bp.opacity * (1 - progress)
        const currentRadius = bp.radius * (1 - progress * 0.5)

        if (bp.life >= bp.maxLife) {
          burst.splice(i, 1)
          continue
        }

        ctx.beginPath()
        ctx.arc(bp.x, bp.y, currentRadius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${currentOpacity})`
        ctx.fill()
      }

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
    />
  )
}
