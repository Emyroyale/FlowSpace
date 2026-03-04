'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TIMER_PRESETS, TimerPreset } from '@/lib/timer'
import { usePaidUser } from '@/hooks/usePaidUser'
import { useVibe } from '@/context/VibeContext'
import { VIBES } from '@/lib/vibes'

interface TimerPresetSelectorProps {
    selectedPreset: TimerPreset
    onSelect: (preset: TimerPreset) => void
    disabled?: boolean
}

export default function TimerPresetSelector({
    selectedPreset,
    onSelect,
    disabled = false,
}: TimerPresetSelectorProps) {
    const { isPaid } = usePaidUser()
    const { activeVibe } = useVibe()
    const accent = VIBES[activeVibe].accent
    const [showPaywall, setShowPaywall] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleCheckout = async () => {
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

    const handleClick = (preset: TimerPreset) => {
        if (disabled) return
        if (preset.isPaid && !isPaid) {
            setShowPaywall(true)
            return
        }
        onSelect(preset)
    }

    return (
        <div className="relative flex flex-col items-center gap-2">
            {/* Preset pills */}
            <div className="flex items-center gap-2">
                {TIMER_PRESETS.map((preset) => {
                    const isActive = preset.label === selectedPreset.label
                    const isLocked = preset.isPaid && !isPaid

                    return (
                        <motion.button
                            key={preset.label}
                            onClick={() => handleClick(preset)}
                            whileHover={disabled ? {} : { scale: 1.05 }}
                            whileTap={disabled ? {} : { scale: 0.95 }}
                            title={
                                isLocked
                                    ? `${preset.label} — Pro only`
                                    : `${preset.label}: ${preset.workMinutes}m work / ${preset.breakMinutes}m break`
                            }
                            className="relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all"
                            style={{
                                backgroundColor: isActive
                                    ? `${accent}25`
                                    : 'rgba(255,255,255,0.06)',
                                color: isActive ? accent : isLocked ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.6)',
                                boxShadow: isActive ? `0 0 12px ${accent}40` : 'none',
                                border: isActive ? `1px solid ${accent}60` : '1px solid rgba(255,255,255,0.08)',
                                cursor: disabled ? 'not-allowed' : 'pointer',
                                opacity: disabled && !isActive ? 0.4 : 1,
                            }}
                        >
                            {isLocked && <span className="text-[10px]">🔒</span>}
                            <span>{preset.label}</span>
                            <span style={{ opacity: 0.55 }}>{preset.workMinutes}m</span>
                        </motion.button>
                    )
                })}
            </div>

            {/* Subscribe modal */}
            <AnimatePresence>
                {showPaywall && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            className="fixed inset-0 z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowPaywall(false)}
                        />

                        {/* Modal */}
                        <motion.div
                            className="fixed left-1/2 top-1/2 z-50 w-80 -translate-x-1/2 -translate-y-1/2 rounded-2xl p-6 text-center shadow-2xl"
                            initial={{ opacity: 0, scale: 0.9, y: 8 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 8 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                            style={{
                                backgroundColor: '#111',
                                border: `1px solid ${accent}40`,
                                boxShadow: `0 0 40px ${accent}20`,
                            }}
                        >
                            <div className="mb-3 text-3xl">🔒</div>
                            <h3 className="mb-1 text-base font-semibold text-white">Pro Preset</h3>
                            <p className="mb-5 text-sm text-white/50">
                                Extended, Deep Work, and Ultra Focus sessions are available on the Pro plan.
                            </p>
                            <div className="flex flex-col gap-2">
                                <button
                                    onClick={handleCheckout}
                                    disabled={isLoading}
                                    className="rounded-full py-2 text-sm font-semibold text-black transition-opacity hover:opacity-90 disabled:opacity-50"
                                    style={{ backgroundColor: accent }}
                                >
                                    {isLoading ? 'Routing to Stripe...' : 'Upgrade to Pro →'}
                                </button>
                                <button
                                    onClick={() => setShowPaywall(false)}
                                    className="rounded-full py-2 text-sm text-white/40 transition-colors hover:text-white/60"
                                >
                                    Maybe later
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}
