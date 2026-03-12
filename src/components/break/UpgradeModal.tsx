'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useVibe } from '@/context/VibeContext'
import { VIBES } from '@/lib/vibes'

interface UpgradeModalProps {
    onDismiss: () => void
}

export default function UpgradeModal({ onDismiss }: UpgradeModalProps) {
    const { activeVibe } = useVibe()
    const accent = VIBES[activeVibe].accent
    const [isLoading, setIsLoading] = useState(false)

    const handleCheckout = async () => {
        try {
            setIsLoading(true)
            const res = await fetch('/api/stripe/checkout', { method: 'POST' })
            if (!res.ok) throw new Error('Checkout failed')
            const data = await res.json()
            window.location.href = data.url
        } catch (err) {
            console.error('[UpgradeModal] Checkout error:', err)
            setIsLoading(false)
        }
    }

    return (
        <AnimatePresence>
            {/* Backdrop */}
            <motion.div
                key="upgrade-backdrop"
                className="fixed inset-0 z-50"
                style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onDismiss}
            />

            {/* Modal card */}
            <motion.div
                key="upgrade-modal"
                className="fixed left-1/2 top-1/2 z-[60] w-[340px] max-w-[92vw] -translate-x-1/2 -translate-y-1/2 rounded-3xl p-7 text-center"
                initial={{ opacity: 0, scale: 0.88, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.88, y: 16 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                style={{
                    backgroundColor: '#0e0e10',
                    border: `1px solid ${accent}45`,
                    boxShadow: `0 0 60px ${accent}22, 0 24px 60px rgba(0,0,0,0.7)`,
                }}
            >
                {/* Glow orb */}
                <div
                    className="absolute left-1/2 top-0 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl pointer-events-none"
                    style={{ backgroundColor: `${accent}30` }}
                />

                {/* Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.15, type: 'spring', stiffness: 300, damping: 16 }}
                    className="mb-4 text-4xl"
                >
                    ⚡
                </motion.div>

                <h3 className="mb-1 text-lg font-bold text-white leading-snug">
                    Want unlimited sessions<br />+ AI check-ins?
                </h3>
                <p className="mb-1 text-3xl font-extrabold" style={{ color: accent }}>
                    $9<span className="text-base font-medium text-white/40">/month</span>
                </p>

                {/* Feature bullets */}
                <ul className="mb-6 mt-3 space-y-1.5 text-left">
                    {[
                        'Unlimited focus sessions',
                        'AI productivity check-ins',
                        'Extended & Deep Work presets',
                        'Detailed session stats',
                    ].map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-white/60">
                            <span className="text-xs" style={{ color: accent }}>✓</span>
                            {f}
                        </li>
                    ))}
                </ul>

                <div className="flex flex-col gap-2">
                    <button
                        id="upgrade-modal-cta"
                        onClick={handleCheckout}
                        disabled={isLoading}
                        className="w-full rounded-full py-3 text-sm font-bold text-black transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                        style={{ backgroundColor: accent }}
                    >
                        {isLoading ? 'Heading to Stripe…' : 'Upgrade to Pro →'}
                    </button>
                    <button
                        id="upgrade-modal-dismiss"
                        onClick={onDismiss}
                        className="w-full rounded-full py-2.5 text-sm text-white/35 transition-colors hover:text-white/55"
                    >
                        Maybe later
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
