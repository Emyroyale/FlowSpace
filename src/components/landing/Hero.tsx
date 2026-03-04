'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useVibe } from '@/context/VibeContext'
import { VIBES } from '@/lib/vibes'
import TimerDisplay from '@/components/focus/TimerDisplay'
import TimerRing from '@/components/focus/TimerRing'

export default function Hero() {
  const { activeVibe } = useVibe()
  const vibe = VIBES[activeVibe]

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-32 pb-20">
      {/* Giant ambient glow behind the timer card */}
      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center justify-center -z-10"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div
          className="h-[600px] w-[600px] rounded-full blur-[120px]"
          style={{ background: `radial-gradient(circle, ${vibe.accent}18 0%, transparent 70%)` }}
        />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-10 text-center w-full max-w-5xl">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/50 backdrop-blur-sm"
        >
          <span
            className="h-1.5 w-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: vibe.accent }}
          />
          No ads · No distractions · Just flow
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
          className="font-clash text-5xl font-bold leading-[1.05] text-white md:text-7xl lg:text-8xl"
        >
          Your focused
          <br />
          <span style={{ color: vibe.accent }}>workspace.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="max-w-xl font-geist text-lg text-white/45 md:text-xl"
        >
          A Pomodoro timer with immersive ambient music, AI check-ins, and a paywall-free core.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/focus"
            className="inline-block rounded-full px-8 py-3.5 text-base font-semibold text-black transition-all hover:scale-105 hover:brightness-110"
            style={{ backgroundColor: vibe.accent }}
          >
            Start Focusing Free →
          </Link>
          <a
            href="#pricing"
            className="inline-block rounded-full border border-white/10 px-8 py-3.5 text-base font-medium text-white/60 backdrop-blur-sm transition-all hover:border-white/20 hover:text-white"
          >
            See pricing
          </a>
        </motion.div>

        {/* Glassmorphism timer preview card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.55, ease: 'easeOut' }}
          className="relative mt-8 w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-8 shadow-2xl backdrop-blur-xl"
          style={{ boxShadow: `0 0 60px ${vibe.accent}15, 0 30px 60px rgba(0,0,0,0.6)` }}
        >
          {/* Inner glow ring */}
          <div
            className="absolute inset-0 rounded-3xl opacity-20"
            style={{ background: `radial-gradient(ellipse at 50% 0%, ${vibe.accent}40 0%, transparent 60%)` }}
          />

          <div className="relative flex flex-col items-center gap-6">
            <h3 className="font-geist text-sm text-white/40 uppercase tracking-widest font-medium">Deep Work Session</h3>

            {/* Simulated UI elements from the real timer */}
            <div className="relative flex items-center justify-center scale-90 sm:scale-100">
              <TimerRing remainingSeconds={2700} totalSeconds={3000} size={240} isRunning={true} />
              <div className="absolute text-5xl">
                <TimerDisplay remainingSeconds={2700} />
              </div>
            </div>

            <div className="flex gap-3">
              <div className="h-2 w-12 rounded-full bg-white/10" />
              <div className="h-2 w-12 rounded-full bg-white/30" />
              <div className="h-2 w-12 rounded-full bg-white/10" />
              <div className="h-2 w-12 rounded-full bg-white/10" />
            </div>
            <div className="flex gap-2 text-white/50 text-xs items-center">
              <span className="text-xl">{vibe.icon}</span> Playing {vibe.label}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
