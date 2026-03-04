let audioCtx: AudioContext | null = null

function getAudioContext(): AudioContext | null {
  try {
    if (!audioCtx) {
      audioCtx = new AudioContext()
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume()
    }
    return audioCtx
  } catch {
    return null
  }
}

/** Warm bell with harmonics — plays when a focus session completes */
export function playSessionCompleteChime() {
  const ctx = getAudioContext()
  if (!ctx) return

  const now = ctx.currentTime
  const fundamentals = [523.25, 659.25, 783.99] // C5, E5, G5 chord

  for (const freq of fundamentals) {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, now)
    gain.gain.setValueAtTime(0.15, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2)
    osc.start(now)
    osc.stop(now + 1.2)
  }

  // Soft high harmonic shimmer
  const shimmer = ctx.createOscillator()
  const shimmerGain = ctx.createGain()
  shimmer.connect(shimmerGain)
  shimmerGain.connect(ctx.destination)
  shimmer.type = 'sine'
  shimmer.frequency.setValueAtTime(1568, now) // G6
  shimmerGain.gain.setValueAtTime(0.06, now)
  shimmerGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8)
  shimmer.start(now)
  shimmer.stop(now + 0.8)
}

/** Gentle lighter ding — plays when break ends */
export function playBreakEndChime() {
  const ctx = getAudioContext()
  if (!ctx) return

  const now = ctx.currentTime
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.type = 'sine'
  osc.frequency.setValueAtTime(1046.5, now) // C6
  osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.15) // G5
  gain.gain.setValueAtTime(0.12, now)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6)
  osc.start(now)
  osc.stop(now + 0.6)
}

/** Subtle 30ms tap — plays on button clicks */
export function playButtonTick() {
  const ctx = getAudioContext()
  if (!ctx) return

  const now = ctx.currentTime
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.type = 'square'
  osc.frequency.setValueAtTime(800, now)
  osc.frequency.exponentialRampToValueAtTime(400, now + 0.03)
  gain.gain.setValueAtTime(0.06, now)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03)
  osc.start(now)
  osc.stop(now + 0.04)
}

/** Filtered noise sweep — plays when switching vibes */
export function playVibeWhoosh() {
  const ctx = getAudioContext()
  if (!ctx) return

  const now = ctx.currentTime
  const bufferSize = ctx.sampleRate * 0.3
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.5
  }

  const noise = ctx.createBufferSource()
  noise.buffer = buffer
  const filter = ctx.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.setValueAtTime(400, now)
  filter.frequency.exponentialRampToValueAtTime(2000, now + 0.15)
  filter.frequency.exponentialRampToValueAtTime(300, now + 0.3)
  filter.Q.setValueAtTime(1.5, now)

  const gain = ctx.createGain()
  gain.gain.setValueAtTime(0.08, now)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3)

  noise.connect(filter)
  filter.connect(gain)
  gain.connect(ctx.destination)
  noise.start(now)
  noise.stop(now + 0.3)
}

/** Subtle urgent double-pulse — plays at 60 s remaining to signal almost done */
export function playWarningTick() {
  const ctx = getAudioContext()
  if (!ctx) return

  const now = ctx.currentTime

  // Two short descending pings, 150 ms apart
  for (let i = 0; i < 2; i++) {
    const t = now + i * 0.18
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = 'sine'
    osc.frequency.setValueAtTime(880, t)         // A5
    osc.frequency.exponentialRampToValueAtTime(660, t + 0.1) // E5
    gain.gain.setValueAtTime(0.13, t)
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18)
    osc.start(t)
    osc.stop(t + 0.2)
  }
}

/** Backward-compatible alias used by useTimer */
export const playChime = playSessionCompleteChime
