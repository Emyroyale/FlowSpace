'use client'

import { motion } from 'framer-motion'
import { useVibe } from '@/context/VibeContext'
import { VIBES, VIBE_IDS } from '@/lib/vibes'

export default function VibePreview() {
  const { activeVibe, setActiveVibe } = useVibe()

  return (
    <section className="mx-auto max-w-5xl px-6 py-24" id="vibes">
      <div className="text-center mb-16">
        <h2 className="font-clash text-4xl font-bold text-white md:text-5xl">
          Pick your <span style={{ color: VIBES[activeVibe].accent }}>vibe.</span>
        </h2>
        <p className="mt-4 font-geist text-lg text-white/50 max-w-xl mx-auto">
          The entire app shifts to match your mood. Every color, aesthetic, and sound changes instantaneously.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {VIBE_IDS.map((id, index) => {
          const vibe = VIBES[id]
          const isActive = id === activeVibe

          return (
            <motion.button
              key={id}
              onClick={() => setActiveVibe(id)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="relative overflow-hidden group flex flex-col items-center gap-4 rounded-3xl border px-2 py-10 transition-all duration-300"
              style={{
                borderColor: isActive ? vibe.accent : 'rgba(255,255,255,0.05)',
                backgroundColor: isActive ? `${vibe.accent}15` : 'rgba(255,255,255,0.02)',
                boxShadow: isActive ? `0 10px 40px ${vibe.glow}` : 'none',
              }}
            >
              {/* Background preview effect on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{ background: vibe.bgGradient }}
              />

              <div
                className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl text-3xl shadow-lg transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}
                style={{ backgroundColor: `${vibe.accent}20`, border: `1px solid ${vibe.accent}40` }}
              >
                {vibe.icon}
              </div>

              <div className="relative z-10 text-center">
                <span
                  className="block text-lg font-clash font-semibold transition-colors duration-300"
                  style={{ color: isActive ? vibe.accent : 'rgba(255,255,255,0.7)' }}
                >
                  {vibe.label}
                </span>
                <span className="mt-1 block text-xs tracking-wider text-white/40 uppercase">
                  {vibe.youtubeId ? "Ambient Track" : "Binaural"}
                </span>
              </div>

              {isActive && (
                <motion.div
                  layoutId="activeVibeIndicator"
                  className="absolute bottom-0 left-0 h-1 w-full"
                  style={{ backgroundColor: vibe.accent }}
                />
              )}
            </motion.button>
          )
        })}
      </div>
    </section>
  )
}
