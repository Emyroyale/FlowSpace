'use client'

import { motion } from 'framer-motion'
import { useVibe } from '@/context/VibeContext'
import { VIBES } from '@/lib/vibes'
import { EyeOff, Headphones, Timer, BrainCircuit, ShieldCheck } from 'lucide-react'

const features = [
  {
    icon: EyeOff,
    title: 'Zero Distractions',
    description: 'No ads, no algorithmic feeds, no comments. Pure focus.',
  },
  {
    icon: Headphones,
    title: 'Curated Audio Vibes',
    description: 'Lofi beats, rain sounds, cafe noise, and ADHD binaural beats mapped directly to vibrant visual themes.',
  },
  {
    icon: Timer,
    title: 'Smart Timer presets',
    description: 'Sprint through a 15m quick task or sink into a 90m deep work session with one click.',
  },
  {
    icon: BrainCircuit,
    title: 'AI Accountability',
    description: 'Quick check-ins during your breaks ensure you actually return to work, not Twitter.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure & Private',
    description: 'Your session length, tasks, and streaks stay with you. We don\'t sell your attention.',
  }
]

export default function FeatureCards() {
  const { activeVibe } = useVibe()
  const vibe = VIBES[activeVibe]

  return (
    <section className="mx-auto max-w-6xl px-6 py-32" id="features">
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <h2 className="font-clash text-4xl font-bold text-white md:text-5xl">
          Everything you need to <span style={{ color: vibe.accent }}>find flow.</span>
        </h2>
        <p className="mt-4 font-geist text-lg text-white/50">
          FlowSpace strips away the noise. It combines exactly what you need to do your best work into one single tab.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: 'easeOut' }}
            whileHover={{ y: -8, scale: 1.02 }}
            className={`rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-xl backdrop-blur-md transition-all ${i === 1 ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
          >
            <div
              className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 shadow-inner mb-6"
              style={{ boxShadow: `inset 0 2px 10px rgba(255,255,255,0.1), 0 0 20px ${vibe.accent}15` }}
            >
              <feature.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-clash text-2xl font-semibold text-white">
              {feature.title}
            </h3>
            <p className="mt-3 font-geist text-base text-white/50 leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
