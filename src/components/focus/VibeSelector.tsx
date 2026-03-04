'use client'

import { motion } from 'framer-motion'
import { useVibe } from '@/context/VibeContext'
import { VIBES, VIBE_IDS, VibeId } from '@/lib/vibes'

interface VibeSelectorProps {
  onVibeChange?: (vibeId: VibeId) => void
}

export default function VibeSelector({ onVibeChange }: VibeSelectorProps) {
  const { activeVibe, setActiveVibe } = useVibe()

  const handleSelect = (vibeId: VibeId) => {
    setActiveVibe(vibeId)
    onVibeChange?.(vibeId)
  }

  return (
    <div className="flex items-center gap-3">
      {VIBE_IDS.map((id) => {
        const vibe = VIBES[id]
        const isActive = id === activeVibe

        return (
          <motion.button
            key={id}
            onClick={() => handleSelect(id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-lg transition-all"
            style={{
              backgroundColor: isActive ? `${vibe.accent}33` : 'rgba(255,255,255,0.05)',
              boxShadow: isActive ? `0 0 16px ${vibe.glow}` : 'none',
            }}
            title={vibe.label}
          >
            {isActive && (
              <motion.div
                layoutId="vibe-ring"
                className="absolute inset-0 rounded-full"
                style={{ boxShadow: `inset 0 0 0 2px ${vibe.accent}`, borderRadius: '9999px' }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              />
            )}
            <span>{vibe.icon}</span>
          </motion.button>
        )
      })}
    </div>
  )
}
