'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import EmojiGame from './EmojiGame'

const PHYSICAL_POSTS = [
    { id: '1', title: 'Get Moving', text: 'Do 5 push-ups or jumping jacks.' },
    { id: '2', title: 'Hydrate', text: 'Go drink a glass of water.' },
    { id: '3', title: 'Fuel Up', text: 'Grab a quick, healthy snack.' },
    { id: '4', title: 'Stretch It Out', text: 'Stand up and touch your toes 3 times.' },
    { id: '5', title: 'Rest Your Eyes', text: 'Look at something 20 feet away for 20 seconds.' }
]

export default function BreakActivities() {
    const [activeTab, setActiveTab] = useState<'hub' | 'emoji'>('hub')

    // Pick a random physical activity on mount
    const [randomPrompt] = useState(() =>
        PHYSICAL_POSTS[Math.floor(Math.random() * PHYSICAL_POSTS.length)]
    )

    return (
        <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-6 min-h-[300px] flex items-center justify-center">
            <AnimatePresence mode="wait">
                {activeTab === 'hub' ? (
                    <motion.div
                        key="hub"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="w-full flex flex-col gap-6"
                    >
                        {/* Physical Activity Card */}
                        <div className="bg-black/20 rounded-xl p-5 border border-white/5 text-center">
                            <h4 className="font-geist text-white/80 font-medium mb-1">
                                {randomPrompt.title}
                            </h4>
                            <p className="text-white/50 text-sm">
                                {randomPrompt.text}
                            </p>
                        </div>

                        {/* Games Section */}
                        <div className="flex flex-col gap-3 text-center">
                            <p className="text-sm font-medium text-white/40 uppercase tracking-wider">
                                Mini Games
                            </p>

                            <button
                                onClick={() => setActiveTab('emoji')}
                                className="group relative overflow-hidden rounded-xl bg-black/20 p-5 border border-white/5 hover:border-[var(--vibe-accent)]/50 transition-all text-left flex items-center gap-4"
                            >
                                <div className="text-3xl bg-white/5 p-3 rounded-lg group-hover:scale-110 transition-transform">
                                    🤔
                                </div>
                                <div>
                                    <h4 className="font-geist text-white/90 font-medium group-hover:text-[var(--vibe-accent)] transition-colors">
                                        Guess the Emoji
                                    </h4>
                                    <p className="text-white/50 text-xs mt-1">
                                        10 random AI questions. Can you guess them all?
                                    </p>
                                </div>
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="game"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="w-full relative"
                    >
                        <EmojiGame onGoBack={() => setActiveTab('hub')} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
