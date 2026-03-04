'use client'

import TimerRing from '@/components/focus/TimerRing'
import TimerDisplay from '@/components/focus/TimerDisplay'

interface BreakCountdownProps {
  remainingSeconds: number
  totalSeconds: number
  onSkip: () => void
}

export default function BreakCountdown({
  remainingSeconds,
  totalSeconds,
  onSkip,
}: BreakCountdownProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative flex items-center justify-center">
        <TimerRing
          remainingSeconds={remainingSeconds}
          totalSeconds={totalSeconds}
          size={120}
          strokeWidth={4}
        />
        <div className="absolute">
          <TimerDisplay remainingSeconds={remainingSeconds} />
        </div>
      </div>
      <p className="text-xs text-white/40">Break time</p>
      <button
        onClick={onSkip}
        className="text-sm text-white/40 transition-colors hover:text-white/60"
      >
        Skip Break
      </button>
    </div>
  )
}
