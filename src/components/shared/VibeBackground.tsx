'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useVibe } from '@/context/VibeContext'
import { VIBES } from '@/lib/vibes'

/* ─── Lofi: Neon boombox (accent-colored) ─────────────────────────────────── */
function BoomboxScene({ accent, opacity = 1 }: { accent: string, opacity?: number }) {
  return (
    <motion.div
      key="lofi-bg"
      className="fixed inset-0 -z-10 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <svg
        viewBox="0 0 200 110"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '340px', height: 'auto', filter: `drop-shadow(0 0 28px ${accent}80)` }}
      >
        {/* Body */}
        <rect x="20" y="30" width="160" height="65" rx="10" ry="10"
          fill="none" stroke={accent} strokeWidth="2.2" opacity="0.85" />
        {/* Antenna left */}
        <line x1="55" y1="30" x2="40" y2="8" stroke={accent} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        {/* Antenna right */}
        <line x1="145" y1="30" x2="160" y2="8" stroke={accent} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        {/* Speaker left */}
        <circle cx="58" cy="65" r="20" fill="none" stroke={accent} strokeWidth="2" opacity="0.8" />
        <circle cx="58" cy="65" r="10" fill="none" stroke={accent} strokeWidth="1.5" opacity="0.5" />
        <circle cx="58" cy="65" r="3" fill={accent} opacity="0.6" />
        {/* Speaker right */}
        <circle cx="142" cy="65" r="20" fill="none" stroke={accent} strokeWidth="2" opacity="0.8" />
        <circle cx="142" cy="65" r="10" fill="none" stroke={accent} strokeWidth="1.5" opacity="0.5" />
        <circle cx="142" cy="65" r="3" fill={accent} opacity="0.6" />
        {/* Cassette deck */}
        <rect x="82" y="40" width="36" height="22" rx="3" ry="3"
          fill="none" stroke={accent} strokeWidth="1.5" opacity="0.7" />
        <ellipse cx="100" cy="51" rx="6" ry="6"
          fill="none" stroke={accent} strokeWidth="1.2" opacity="0.6" />
        {/* Buttons row */}
        {[90, 97, 104, 111].map((x, i) => (
          <rect key={i} x={x} y="67" width="4" height="3" rx="1"
            fill={accent} opacity="0.45" />
        ))}
      </svg>
    </motion.div>
  )
}

/* ─── Rain: Animated falling drops ───────────────────────────────────────── */
const RAIN_DROPS = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  delay: Math.random() * 3,
  duration: 0.8 + Math.random() * 1.2,
  opacity: 0.08 + Math.random() * 0.18,
  height: 8 + Math.random() * 16,
}))

function RainScene({ accent, opacity = 1 }: { accent: string, opacity?: number }) {
  return (
    <motion.div
      key="rain-bg"
      className="fixed inset-0 -z-10 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {RAIN_DROPS.map((drop) => (
        <motion.div
          key={drop.id}
          className="absolute rounded-full"
          style={{
            left: `${drop.x}%`,
            top: '-5%',
            width: '1.5px',
            height: `${drop.height}px`,
            background: `linear-gradient(to bottom, transparent, ${accent})`,
            opacity: drop.opacity,
          }}
          animate={{ y: ['0vh', '110vh'] }}
          transition={{
            duration: drop.duration,
            delay: drop.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </motion.div>
  )
}

/* ─── Coffee: Drifting steam wisps ───────────────────────────────────────── */
const WISPS = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  x: 30 + i * 8,
  delay: i * 0.6,
}))

function CoffeeScene({ accent, opacity = 1 }: { accent: string, opacity?: number }) {
  return (
    <motion.div
      key="coffee-bg"
      className="fixed inset-0 -z-10 flex items-end justify-center pb-20 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {WISPS.map((wisp) => (
        <motion.div
          key={wisp.id}
          className="absolute bottom-1/4"
          style={{ left: `${wisp.x}%` }}
          initial={{ opacity: 0, y: 0, scaleX: 1 }}
          animate={{
            opacity: [0, 0.15, 0.1, 0],
            y: [0, -60, -120, -180],
            scaleX: [1, 1.4, 1.8, 2.2],
          }}
          transition={{
            duration: 4,
            delay: wisp.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        >
          <div
            className="rounded-full blur-xl"
            style={{
              width: '20px',
              height: '40px',
              background: `radial-gradient(ellipse at center, ${accent}30 0%, transparent 70%)`,
            }}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}

/* ─── Binaural: Slow-drifting geometric blobs ─────────────────────────────── */
const BLOBS = [
  { size: 340, x: '20%', y: '15%', dur: 14 },
  { size: 260, x: '65%', y: '60%', dur: 18 },
  { size: 200, x: '75%', y: '10%', dur: 12 },
  { size: 180, x: '10%', y: '65%', dur: 20 },
]

function BinauralScene({ accent, opacity = 1 }: { accent: string, opacity?: number }) {
  return (
    <motion.div
      key="binaural-bg"
      className="fixed inset-0 -z-10 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {BLOBS.map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: blob.size,
            height: blob.size,
            left: blob.x,
            top: blob.y,
            background: `radial-gradient(circle, ${accent}18 0%, transparent 70%)`,
          }}
          animate={{
            x: [0, 30, -20, 10, 0],
            y: [0, -20, 30, -10, 0],
            scale: [1, 1.08, 0.95, 1.04, 1],
          }}
          transition={{
            duration: blob.dur,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 1.5,
          }}
        />
      ))}
    </motion.div>
  )
}

/* ─── Main component ──────────────────────────────────────────────────────── */
interface VibeBackgroundProps {
  sceneOpacity?: number
}

export default function VibeBackground({ sceneOpacity = 1 }: VibeBackgroundProps) {
  const { activeVibe } = useVibe()
  const vibe = VIBES[activeVibe]

  return (
    <>
      {/* Smooth gradient base layer */}
      <motion.div
        className="fixed inset-0 -z-20"
        animate={{ background: vibe.bgGradient }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />

      {/* Per-vibe scene */}
      <AnimatePresence mode="wait">
        {activeVibe === 'lofi' && <BoomboxScene key="lofi" accent={vibe.accent} opacity={sceneOpacity} />}
        {activeVibe === 'rain' && <RainScene key="rain" accent={vibe.accent} opacity={sceneOpacity} />}
        {activeVibe === 'coffee' && <CoffeeScene key="coffee" accent={vibe.accent} opacity={sceneOpacity} />}
        {activeVibe === 'binaural' && <BinauralScene key="binaural" accent={vibe.accent} opacity={sceneOpacity} />}
      </AnimatePresence>
    </>
  )
}
