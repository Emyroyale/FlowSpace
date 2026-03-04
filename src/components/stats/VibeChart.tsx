'use client'

import { motion } from 'framer-motion'
import { FocusSession } from '@/lib/storage'
import { VIBES } from '@/lib/vibes'

export default function VibeChart({ sessions }: { sessions: FocusSession[] }) {
    if (sessions.length === 0) {
        return (
            <div className="flex h-40 items-center justify-center rounded-3xl border border-white/5 bg-white/[0.02]">
                <p className="text-sm text-white/40">No data yet</p>
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
                            {vibe.name}
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
