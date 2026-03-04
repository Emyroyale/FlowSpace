'use client'

import { useState, KeyboardEvent } from 'react'
import { motion } from 'framer-motion'

interface TaskCommitmentProps {
  onSubmit: (task: string) => void
}

export default function TaskCommitment({ onSubmit }: TaskCommitmentProps) {
  const [task, setTask] = useState('')

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && task.trim()) {
      onSubmit(task.trim())
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md"
    >
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="What will you focus on?"
        className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-center font-geist text-lg text-white placeholder-white/30 outline-none transition-all focus:border-[var(--vibe-accent)] focus:ring-1 focus:ring-[var(--vibe-accent)]"
      />
    </motion.div>
  )
}
