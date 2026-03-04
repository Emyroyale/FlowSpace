'use client'

import { formatTime } from '@/lib/timer'

interface TimerDisplayProps {
  remainingSeconds: number
}

export default function TimerDisplay({ remainingSeconds }: TimerDisplayProps) {
  return (
    <span className="font-mono text-5xl md:text-7xl font-medium text-white tabular-nums">
      {formatTime(remainingSeconds)}
    </span>
  )
}
