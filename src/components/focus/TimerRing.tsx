'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface TimerRingProps {
  remainingSeconds: number
  totalSeconds: number
  size?: number
  strokeWidth?: number
  isRunning?: boolean
  isComplete?: boolean
}

export default function TimerRing({
  remainingSeconds,
  totalSeconds,
  size = 320,
  strokeWidth = 6,
  isRunning = false,
  isComplete = false,
}: TimerRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const progress = totalSeconds > 0 ? 1 - remainingSeconds / totalSeconds : 0
  const dashOffset = circumference * (1 - progress)
  const center = size / 2

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="transform -rotate-90"
    >
      <defs>
        <style>{`
          @keyframes breatheGlow {
            0%, 100% { filter: drop-shadow(0 0 8px var(--vibe-glow)); }
            50% { filter: drop-shadow(0 0 22px var(--vibe-glow)); }
          }
          @media (prefers-reduced-motion: reduce) {
            .timer-ring-breathing { animation: none !important; }
          }
        `}</style>
      </defs>

      {/* Background ring */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="var(--bg-secondary)"
        strokeWidth={strokeWidth}
      />

      {/* Progress ring with breathing glow */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="var(--vibe-accent)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={dashOffset}
        className={isRunning ? 'timer-ring-breathing' : ''}
        style={{
          transition: 'stroke-dashoffset 1s linear, stroke 0.6s ease',
          filter: 'drop-shadow(0 0 12px var(--vibe-glow))',
          ...(isRunning ? { animation: 'breatheGlow 3s ease-in-out infinite' } : {}),
        }}
      />

      {/* Completion pulse rings */}
      <AnimatePresence>
        {isComplete && [0, 1, 2].map((i) => (
          <motion.circle
            key={`pulse-${i}`}
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="var(--vibe-accent)"
            strokeWidth={2}
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 1.3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.8,
              delay: i * 0.25,
              ease: 'easeOut',
            }}
            style={{ transformOrigin: `${center}px ${center}px` }}
          />
        ))}
      </AnimatePresence>
    </svg>
  )
}
