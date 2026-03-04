'use client'

import { motion } from 'framer-motion'
import { FocusSession } from '@/lib/storage'
import { VIBES } from '@/lib/vibes'
import { BarChart2 } from 'lucide-react'
import Link from 'next/link'

export default function VibeChart({ sessions }: { sessions: FocusSession[] }) {
    if (sessions.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-8 text-center rounded-3xl border border-white/5 bg-white/[0.02]">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 mb-4">
                    <BarChart2 className="h-6 w-6 text-white/50" />
                </div>
                <h3 className="text-lg font-clash font-medium text-white mb-1">No sessions yet</h3>
                <p className="text-sm font-geist text-white/40 mb-6 max-w-[250px]">
                    Complete your first focus session to start tracking your progress
                </p>
                <Link
                    href="/focus"
                    className="rounded-full bg-white/10 px-6 py-2 text-sm font-geist font-medium text-white hover:bg-white/20 transition-colors"
                >
                    Start Focusing →
                </Link>
            </div>
        )
    }

    const vibeCounts = sessions.reduce((acc, curr) => {
        acc[curr.vibeId] = (acc[curr.vibeId] || 0) + 1
        return acc
    }, {} as Record<string, number>)

    const maxCount = Math.max(...Object.values(vibeCounts))

    return (
        <div className="flex flex-col gap-4">
            {Object.entries(vibeCounts).map(([vibeId, count]) => {
                const vibe = VIBES[vibeId as keyof typeof VIBES]
                if (!vibe) return null // handle edge case where a vibe was deleted or renamed

                const percentage = Math.round((count / maxCount) * 100)

                return (
                    <div key={vibeId} className="flex items-center gap-4">
                        <span className="w-20 shrink-0 font-geist text-sm text-white/60">
                            {vibe.label}
                        </span>
                        <div className="relative flex-1 h-3 rounded-full bg-white/5 overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ duration: 1, ease: 'easeOut' }}
                                className="absolute inset-y-0 left-0 rounded-full"
                                style={{ backgroundColor: vibe.accent }}
                            />
                        </div>
                        <span className="w-8 shrink-0 text-right font-geist text-sm font-medium text-white/40">
                            {count}
                        </span>
                    </div>
                )
            })}
        </div>
    )
}
