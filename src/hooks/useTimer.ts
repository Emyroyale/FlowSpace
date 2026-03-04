'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { TimerStatus } from '@/types'
import { DEFAULT_PRESET } from '@/lib/timer'
import { playChime, playWarningTick } from '@/lib/sounds'
import { WARNING_SECONDS } from '@/lib/timer'

interface UseTimerProps {
  vibeId?: string
  taskName?: string
}

interface TimerState {
  status: TimerStatus
  totalSeconds: number
  remainingSeconds: number
  sessionCount: number
}

interface UseTimerReturn extends TimerState {
  start: () => void
  pause: () => void
  resume: () => void
  skip: () => void
  reset: () => void
  setWorkMinutes: (minutes: number) => void
  setBreakMinutes: (minutes: number) => void
}

export function useTimer({ vibeId = 'coffee', taskName }: UseTimerProps = {}): UseTimerReturn {
  const [status, setStatus] = useState<TimerStatus>('idle')
  const [totalSeconds, setTotalSeconds] = useState(DEFAULT_PRESET.workMinutes * 60)
  const [remainingSeconds, setRemainingSeconds] = useState(DEFAULT_PRESET.workMinutes * 60)
  const [sessionCount, setSessionCount] = useState(0)

  // Keep latest props in refs so we don't have to put them in the dependency matrix for startTicking
  const vibeIdRef = useRef(vibeId)
  const taskNameRef = useRef(taskName)

  useEffect(() => {
    vibeIdRef.current = vibeId
    taskNameRef.current = taskName
  }, [vibeId, taskName])

  const endTimeRef = useRef<number>(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const workSecondsRef = useRef(DEFAULT_PRESET.workMinutes * 60)
  const breakSecondsRef = useRef(DEFAULT_PRESET.breakMinutes * 60)
  const warningFiredRef = useRef(false)

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const startTicking = useCallback(() => {
    clearTimer()
    intervalRef.current = setInterval(() => {
      const now = Date.now()
      const remaining = Math.max(0, Math.ceil((endTimeRef.current - now) / 1000))
      setRemainingSeconds(remaining)

      if (remaining <= 0) {
        clearTimer()
        setStatus((prev) => {
          if (prev === 'running') {
            playChime()
            setSessionCount((c) => c + 1)

            // Save the completed session to the database
            fetch('/api/sessions', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                durationMins: Math.round(workSecondsRef.current / 60),
                vibeId: vibeIdRef.current,
                taskName: taskNameRef.current?.trim() || undefined
              })
            }).catch(err => console.error('Failed to save session to DB:', err))

            return 'complete'
          }
          if (prev === 'break') {
            return 'idle'
          }
          return prev
        })
      } else if (remaining <= WARNING_SECONDS && !warningFiredRef.current) {
        warningFiredRef.current = true
        playWarningTick()
      }
    }, 200)
  }, [clearTimer])

  const start = useCallback(() => {
    const total = workSecondsRef.current
    setTotalSeconds(total)
    setRemainingSeconds(total)
    endTimeRef.current = Date.now() + total * 1000
    warningFiredRef.current = false  // reset for fresh session
    setStatus('running')
    startTicking()
  }, [startTicking])

  const pause = useCallback(() => {
    clearTimer()
    setStatus('paused')
  }, [clearTimer])

  const resume = useCallback(() => {
    endTimeRef.current = Date.now() + remainingSeconds * 1000
    setStatus('running')
    startTicking()
  }, [remainingSeconds, startTicking])

  const startBreak = useCallback(() => {
    const workMinutes = Math.round(workSecondsRef.current / 60)
    const breakMinutes = workMinutes > 30 ? 10 : 5
    const total = breakMinutes * 60

    setTotalSeconds(total)
    setRemainingSeconds(total)
    endTimeRef.current = Date.now() + total * 1000
    setStatus('break')
    startTicking()
  }, [startTicking])

  const skip = useCallback(() => {
    clearTimer()
    const total = workSecondsRef.current
    setTotalSeconds(total)
    setRemainingSeconds(total)
    setStatus('idle')
  }, [clearTimer])

  const reset = useCallback(() => {
    clearTimer()
    const total = workSecondsRef.current
    setTotalSeconds(total)
    setRemainingSeconds(total)
    setStatus('idle')
    setSessionCount(0)
  }, [clearTimer])

  const setWorkMinutes = useCallback((minutes: number) => {
    workSecondsRef.current = minutes * 60
    if (status === 'idle') {
      setTotalSeconds(minutes * 60)
      setRemainingSeconds(minutes * 60)
    }
  }, [status])

  const setBreakMinutes = useCallback((minutes: number) => {
    breakSecondsRef.current = minutes * 60
  }, [])

  // Auto-transition from complete to break after 2 seconds
  useEffect(() => {
    if (status === 'complete') {
      const timeout = setTimeout(() => {
        startBreak()
      }, 2000)
      return () => clearTimeout(timeout)
    }
  }, [status, startBreak])

  // Auto-transition from break end to idle
  useEffect(() => {
    if (status === 'break' && remainingSeconds <= 0) {
      const total = workSecondsRef.current
      setTotalSeconds(total)
      setRemainingSeconds(total)
      setStatus('idle')
    }
  }, [status, remainingSeconds])

  // Cleanup on unmount
  useEffect(() => {
    return () => clearTimer()
  }, [clearTimer])

  return {
    status,
    totalSeconds,
    remainingSeconds,
    sessionCount,
    start,
    pause,
    resume,
    skip,
    reset,
    setWorkMinutes,
    setBreakMinutes,
  }
}
