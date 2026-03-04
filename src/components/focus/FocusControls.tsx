'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useCallback } from 'react'
import { TimerStatus } from '@/types'
import { playButtonTick } from '@/lib/sounds'

interface RippleButtonProps {
  onClick: () => void
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}

function RippleButton({ onClick, className, style, children }: RippleButtonProps) {
  const [ripples, setRipples] = useState<number[]>([])

  const handleClick = useCallback(() => {
    playButtonTick()
    setRipples((prev) => [...prev, Date.now()])
    onClick()
  }, [onClick])

  const removeRipple = useCallback((id: number) => {
    setRipples((prev) => prev.filter((r) => r !== id))
  }, [])

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className={`relative overflow-hidden ${className ?? ''}`}
      style={style}
    >
      {children}
      <AnimatePresence>
        {ripples.map((id) => (
          <motion.span
            key={id}
            initial={{ scale: 0.8, opacity: 0.4 }}
            animate={{ scale: 1.6, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            onAnimationComplete={() => removeRipple(id)}
            className="pointer-events-none absolute inset-0 rounded-full border-2"
            style={{ borderColor: 'var(--vibe-accent)' }}
          />
        ))}
      </AnimatePresence>
    </motion.button>
  )
}

interface FocusControlsProps {
  status: TimerStatus
  onStart: () => void
  onPause: () => void
  onResume: () => void
  onEnd: () => void
}

export default function FocusControls({
  status,
  onStart,
  onPause,
  onResume,
  onEnd,
}: FocusControlsProps) {
  if (status === 'idle') {
    return (
      <RippleButton
        onClick={onStart}
        className="rounded-full px-10 py-3 text-lg font-medium text-black transition-colors"
        style={{ backgroundColor: 'var(--vibe-accent)' }}
      >
        Start Focusing
      </RippleButton>
    )
  }

  if (status === 'running') {
    return (
      <div className="flex items-center gap-4">
        <RippleButton
          onClick={onPause}
          className="rounded-full border border-white/20 px-6 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/5"
        >
          Pause
        </RippleButton>
        <RippleButton
          onClick={onEnd}
          className="rounded-full px-6 py-2 text-sm font-medium text-white/40 transition-colors hover:text-white/60"
        >
          End
        </RippleButton>
      </div>
    )
  }

  if (status === 'paused') {
    return (
      <div className="flex items-center gap-4">
        <RippleButton
          onClick={onResume}
          className="rounded-full px-8 py-3 text-base font-medium text-black transition-colors"
          style={{ backgroundColor: 'var(--vibe-accent)' }}
        >
          Resume
        </RippleButton>
        <RippleButton
          onClick={onEnd}
          className="rounded-full border border-white/20 px-6 py-2 text-sm font-medium text-white/50 transition-colors hover:text-white/70"
        >
          End Session
        </RippleButton>
      </div>
    )
  }

  return null
}
