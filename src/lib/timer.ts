export interface TimerPreset {
  label: string
  workMinutes: number
  breakMinutes: number
  isPaid: boolean
}

export const TIMER_PRESETS: TimerPreset[] = [
  { label: 'Quick Sprint', workMinutes: 15, breakMinutes: 5, isPaid: false },
  { label: 'Classic', workMinutes: 25, breakMinutes: 5, isPaid: false },
  { label: 'Extended', workMinutes: 30, breakMinutes: 5, isPaid: true },
  { label: 'Deep Work', workMinutes: 50, breakMinutes: 10, isPaid: true },
  { label: 'Ultra Focus', workMinutes: 90, breakMinutes: 10, isPaid: true },
]

/** Seconds remaining at which the "almost done" warning sound fires */
export const WARNING_SECONDS = 60

export const DEFAULT_PRESET = TIMER_PRESETS.find((p) => p.label === 'Classic') ?? TIMER_PRESETS[0]

export function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}
