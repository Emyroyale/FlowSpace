'use client'

import { motion } from 'framer-motion'
import { FocusSession } from '@/lib/storage'
import { VIBES } from '@/lib/vibes'

export default function SessionHistory({ sessions }: { sessions: FocusSession[] }) {
    if (sessions.length === 0) {
        return (
            <div className="flex h-40 items-center justify-center rounded-3xl border border-white/5 bg-white/[0.02]">
                <p className="text-sm text-white/40">Complete a focus session to see your history.</p>
            </div>
        )
    }

    // Only show the last 30 sessions to prevent infinite scrolling UI bloat
    const displaySessions = sessions.slice(0, 30)

    // Quick relative time formatter
    const timeAgo = (ts: number) => {
        const diff = Math.floor((Date.now() - ts) / 1000)
        if (diff < 60) return 'Just now'
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
        if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
        return `${Math.floor(diff / 86400)}d ago`
    }

    return (
        <div className="flex flex-col gap-3">
            {displaySessions.map((session, i) => {
                const vibe = VIBES[session.vibeId as keyof typeof VIBES]
                return (
                    <motion.div
                        key={session.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/[0.01] p-4 hover:bg-white/[0.03] transition-colors"
                    >
                        <div className="flex flex-col gap-1">
                            <span className="font-geist text-base text-white">
                                {session.taskName || 'Deep Work Session'}
                            </span>
                            <div className="flex items-center gap-2 text-xs text-white/40">
                                <span className="flex items-center gap-1">
                                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: vibe?.accent || '#fff' }} />
                                    {vibe?.name || 'Unknown Vibe'}
                                </span>
                                <span>•</span>
                                <span>{timeAgo(session.timestamp)}</span>
                            </div>
                        </div>

                        <div className="font-clash text-xl font-medium text-white/80">
                            {session.durationMinutes}
                            <span className="ml-1 text-sm text-white/30">min</span>
                        </div>
                    </motion.div>
                )
            })}
        </div>
    )
}
