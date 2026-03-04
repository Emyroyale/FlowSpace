'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface AICheckInProps {
  taskName: string
}

export default function AICheckIn({ taskName }: AICheckInProps) {
  const [response, setResponse] = useState<'yes' | 'no' | null>(null)
  const [blocker, setBlocker] = useState('')

  return (
    <div className="w-full max-w-md space-y-4 text-center">
      <p className="font-geist text-lg text-white/80">
        Did you finish <span className="text-white font-medium">{taskName}</span>?
      </p>

      <AnimatePresence mode="wait">
        {response === null && (
          <motion.div
            key="buttons"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center justify-center gap-3"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setResponse('yes')}
              className="rounded-full px-6 py-2.5 text-sm font-medium text-black"
              style={{ backgroundColor: 'var(--vibe-accent)' }}
            >
              Yes, nailed it
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setResponse('no')}
              className="rounded-full border border-white/20 px-6 py-2.5 text-sm font-medium text-white/70 hover:bg-white/5"
            >
              Not quite
            </motion.button>
          </motion.div>
        )}

        {response === 'yes' && (
          <motion.p
            key="yes-response"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-white/60"
          >
            Great work! Take a well-deserved break.
          </motion.p>
        )}

        {response === 'no' && (
          <motion.div
            key="no-response"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <p className="text-sm text-white/60">
              No worries — progress is progress. What got in the way?
            </p>
            <input
              type="text"
              value={blocker}
              onChange={(e) => setBlocker(e.target.value)}
              placeholder="Optional — jot it down"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder-white/30 outline-none focus:border-[var(--vibe-accent)]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
