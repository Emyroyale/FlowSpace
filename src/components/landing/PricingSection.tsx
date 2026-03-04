'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import { useVibe } from '@/context/VibeContext'
import { VIBES } from '@/lib/vibes'

const plans = [
  {
    name: 'Basic Flow',
    price: '$0',
    period: 'forever',
    features: [
      '1 deep work session per day',
      '2 ambient music vibes',
      'Basic Pomodoro timer',
      '7-day session history'
    ],
    cta: 'Start Free',
    isPro: false,
  },
  {
    name: 'FlowSpace Pro',
    price: '$4',
    period: '/month',
    features: [
      'Unlimited focus sessions',
      'All 4 curated music vibes',
      'AI accountability check-ins',
      'Full task management & tracking',
      'Detailed productivity analytics',
      'Unlimited streak history',
      'Support indie development'
    ],
    cta: 'Get Pro Access',
    isPro: true,
  },
]

export default function PricingSection() {
  const { activeVibe } = useVibe()
  const vibe = VIBES[activeVibe]
  const [isAnnual, setIsAnnual] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { userId } = useAuth()
  const router = useRouter()

  const handleCheckout = async () => {
    if (!userId) {
      router.push('/sign-up?redirect_url=' + encodeURIComponent(window.location.href))
      return
    }

    try {
      setIsLoading(true)
      const res = await fetch('/api/stripe/checkout', { method: 'POST' })
      if (!res.ok) throw new Error('Checkout failed')
      const data = await res.json()
      window.location.href = data.url
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="mx-auto max-w-5xl px-6 py-32" id="pricing">
      <div className="text-center mb-16">
        <h2 className="font-clash text-4xl font-bold text-white md:text-5xl">
          Invest in your <span style={{ color: vibe.accent }}>attention.</span>
        </h2>
        <p className="mt-4 font-geist text-lg text-white/50 max-w-xl mx-auto">
          Start for free to build the habit. Upgrade when you're ready to unlock ultimate focus and AI accountability.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <span className={`text-sm font-geist ${!isAnnual ? 'text-white' : 'text-white/40'}`}>Monthly</span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative h-7 w-14 rounded-full bg-white/10 transition-colors hover:bg-white/20"
          >
            <motion.div
              className="absolute left-1 top-1 h-5 w-5 rounded-full"
              style={{ backgroundColor: vibe.accent }}
              animate={{ x: isAnnual ? 28 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
          <span className={`text-sm font-geist flex items-center gap-2 ${isAnnual ? 'text-white' : 'text-white/40'}`}>
            Annually
            <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-xs font-semibold text-green-400">Save 20%</span>
          </span>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:gap-12 relative">
        {/* Glow effect positioned behind Pro plan */}
        <div
          className="absolute -right-20 top-20 h-96 w-96 rounded-full blur-[100px] pointer-events-none opacity-20"
          style={{ backgroundColor: vibe.accent }}
        />

        {plans.map((plan, i) => {
          const displayedPrice = plan.isPro && isAnnual ? '$39' : plan.price
          const displayedPeriod = plan.isPro && isAnnual ? '/year' : plan.period

          return (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className={`relative flex flex-col rounded-3xl border p-8 md:p-10 transition-all ${plan.isPro ? 'bg-black/40 backdrop-blur-xl' : 'bg-white/[0.02]'
                }`}
              style={{
                borderColor: plan.isPro ? vibe.accent : 'rgba(255,255,255,0.05)',
                boxShadow: plan.isPro ? `0 0 40px ${vibe.accent}15` : 'none',
              }}
            >
              {plan.isPro && (
                <div
                  className="absolute -top-4 right-8 rounded-full px-4 py-1 text-xs font-bold uppercase tracking-wider text-black shadow-lg"
                  style={{ backgroundColor: vibe.accent }}
                >
                  Most Popular
                </div>
              )}

              <h3 className="font-clash text-2xl font-semibold text-white">{plan.name}</h3>

              <div className="mt-4 flex items-baseline gap-1 border-b border-white/10 pb-8">
                <span className="font-clash text-5xl font-bold text-white">{displayedPrice}</span>
                <span className="text-base text-white/50">{displayedPeriod}</span>
              </div>

              <ul className="mt-8 flex-1 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 font-geist text-base text-white/70">
                    <svg
                      className="mt-0.5 h-5 w-5 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                      style={{ color: plan.isPro ? vibe.accent : 'rgba(255,255,255,0.3)' }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {plan.isPro ? (
                <button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="mt-10 block w-full rounded-2xl py-4 text-center text-sm font-semibold transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
                  style={{
                    backgroundColor: vibe.accent,
                    color: 'black',
                  }}
                >
                  {isLoading ? 'Securely routing...' : plan.cta}
                </button>
              ) : (
                <Link
                  href="/focus"
                  className="mt-10 block w-full rounded-2xl py-4 text-center text-sm font-semibold transition-all hover:scale-[1.02]"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    color: 'rgba(255,255,255,0.9)',
                  }}
                >
                  {plan.cta}
                </Link>
              )}
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
