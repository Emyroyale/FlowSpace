'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useVibe } from '@/context/VibeContext'
import { VIBES } from '@/lib/vibes'

export default function EmailCapture() {
    const { activeVibe } = useVibe()
    const accent = VIBES[activeVibe].accent

    const [email, setEmail] = useState('')
    const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [errorMsg, setErrorMsg] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email.trim() || state === 'loading' || state === 'success') return
        setState('loading')
        setErrorMsg('')

        try {
            const res = await fetch('/api/email/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email.trim() }),
            })
            if (res.ok) {
                setState('success')
            } else {
                const data = await res.json()
                setErrorMsg(data.error ?? 'Something went wrong')
                setState('error')
            }
        } catch {
            setErrorMsg('Network error — try again')
            setState('error')
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="flex flex-col items-center gap-2 w-full max-w-xs"
        >
            <AnimatePresence mode="wait">
                {state === 'success' ? (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 text-sm"
                        style={{ color: accent }}
                    >
                        <span className="text-lg">✓</span>
                        <span>Weekly focus tips on their way!</span>
                    </motion.div>
                ) : (
                    <motion.form
                        key="form"
                        onSubmit={handleSubmit}
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center gap-2 w-full"
                    >
                        <p className="text-[11px] text-white/30 tracking-wide uppercase font-medium">
                            Get weekly focus tips
                        </p>
                        <div className="flex w-full rounded-full overflow-hidden"
                            style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                            <input
                                id="email-capture-input"
                                type="email"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); if (state === 'error') setState('idle') }}
                                placeholder="your@email.com"
                                required
                                className="flex-1 min-w-0 bg-white/5 px-4 py-2 text-sm text-white placeholder-white/20 outline-none"
                            />
                            <button
                                type="submit"
                                id="email-capture-submit"
                                disabled={state === 'loading'}
                                className="px-4 py-2 text-sm font-semibold text-black transition-opacity hover:opacity-90 disabled:opacity-50 shrink-0"
                                style={{ backgroundColor: accent }}
                            >
                                {state === 'loading' ? '…' : '→'}
                            </button>
                        </div>
                        {state === 'error' && (
                            <p className="text-xs text-red-400/80">{errorMsg}</p>
                        )}
                    </motion.form>
                )}
            </AnimatePresence>
        </motion.div>
    )
}
