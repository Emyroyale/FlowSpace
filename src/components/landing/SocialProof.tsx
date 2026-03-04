'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

function AnimatedCounter({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTimestamp: number | null = null
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }
    window.requestAnimationFrame(step)
  }, [end, duration])

  return <span>{count.toLocaleString()}</span>
}

const testimonials = [
  {
    quote: "The only Pomodoro app I actually keep open. The visual vibes and built-in lofi completely lock me in.",
    author: "Sarah J.",
    role: "Software Engineer",
    avatar: "S"
  },
  {
    quote: "FlowSpace cured my tab hoarding. Having the timer and the music perfectly integrated is a game changer.",
    author: "Marcus T.",
    role: "Designer",
    avatar: "M"
  },
  {
    quote: "The binaural beats vibe is pure magic for my ADHD brain. Best $4/mo I spend.",
    author: "Elena R.",
    role: "Freelance Writer",
    avatar: "E"
  }
]

export default function SocialProof() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 border-y border-white/5 bg-white/[0.01]">
      <div className="text-center mb-16">
        <h2 className="font-clash text-3xl font-semibold text-white/90">
          Join <span className="text-white font-bold"><AnimatedCounter end={12845} /></span> daily focused sessions.
        </h2>
        <p className="mt-2 text-white/40 font-geist">Trusted by builders, writers, and students worldwide.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            className="rounded-2xl border border-white/10 bg-black/20 p-6 flex flex-col justify-between"
          >
            <p className="font-geist text-white/70 leading-relaxed">"{t.quote}"</p>
            <div className="mt-8 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 font-clash font-semibold text-white">
                {t.avatar}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-white/90">{t.author}</span>
                <span className="text-xs text-white/40">{t.role}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
