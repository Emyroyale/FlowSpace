'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface StatCardProps {
    label: string
    value: string | number
    icon: ReactNode
}

export default function StatCard({ label, value, icon }: StatCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col rounded-3xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-md"
        >
            <div className="flex items-center gap-3 text-white/50 mb-3">
                <div className="scale-75">{icon}</div>
                <span className="text-sm font-medium uppercase tracking-wider">{label}</span>
            </div>
            <div className="font-clash text-4xl font-bold text-white">{value}</div>
        </motion.div>
    )
}
