'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EMOJI_QUESTIONS, EmojiQuestion, getRandomQuestions } from '@/data/emoji-quiz'

interface EmojiGameProps {
    onGoBack: () => void
}

export default function EmojiGame({ onGoBack }: EmojiGameProps) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [questions, setQuestions] = useState<EmojiQuestion[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [score, setScore] = useState(0)
    const [showResult, setShowResult] = useState(false)
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

    const startGame = () => {
        // Pick 10 random questions
        setQuestions(getRandomQuestions(10))
        setCurrentIndex(0)
        setScore(0)
        setShowResult(false)
        setIsPlaying(true)
        setSelectedAnswer(null)
        setIsCorrect(null)
    }

    const handleAnswer = (answer: string) => {
        if (selectedAnswer) return // prevent double clicking

        const currentQ = questions[currentIndex]
        const correct = answer === currentQ.answer

        setSelectedAnswer(answer)
        setIsCorrect(correct)

        if (correct) {
            setScore(s => s + 1)
        }

        setTimeout(() => {
            if (currentIndex < questions.length - 1) {
                setCurrentIndex(i => i + 1)
                setSelectedAnswer(null)
                setIsCorrect(null)
            } else {
                setShowResult(true)
            }
        }, 1200)
    }

    if (!isPlaying) {
        return (
            <div className="flex flex-col items-center gap-6">
                <h3 className="font-geist text-xl text-white">🤔 Guess the Emoji</h3>
                <p className="text-white/60 text-center text-sm max-w-[250px]">
                    10 random AI generated questions. Can you guess the movie, phrase, or brand from the emojis?
                </p>
                <div className="flex gap-4">
                    <button
                        onClick={onGoBack}
                        className="rounded-full border border-white/20 px-6 py-2.5 text-sm font-medium text-white/70 hover:bg-white/5 transition-colors"
                    >
                        Back
                    </button>
                    <button
                        onClick={startGame}
                        className="rounded-full px-6 py-2.5 text-sm font-medium text-black transition-transform hover:scale-105 active:scale-95"
                        style={{ backgroundColor: 'var(--vibe-accent)' }}
                    >
                        Play Now
                    </button>
                </div>
            </div>
        )
    }

    if (showResult) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-6"
            >
                <h3 className="font-geist text-2xl text-white">Game Over!</h3>
                <div className="text-center space-y-2">
                    <p className="text-4xl font-bold" style={{ color: 'var(--vibe-accent)' }}>
                        {score} / 10
                    </p>
                    <p className="text-white/60 text-sm">
                        {score === 10 ? 'Flawless victory! 🏆' :
                            score >= 7 ? 'Great job! 🌟' :
                                score >= 4 ? 'Not bad! 👍' : 'Better luck next time! 😅'}
                    </p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={onGoBack}
                        className="rounded-full border border-white/20 px-6 py-2.5 text-sm font-medium text-white/70 hover:bg-white/5 transition-colors"
                    >
                        Done
                    </button>
                    <button
                        onClick={startGame}
                        className="rounded-full px-6 py-2.5 text-sm font-medium text-black transition-transform hover:scale-105 active:scale-95"
                        style={{ backgroundColor: 'var(--vibe-accent)' }}
                    >
                        Play Again
                    </button>
                </div>
            </motion.div>
        )
    }

    const currentQ = questions[currentIndex]

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-[320px]">
            <div className="flex w-full justify-between items-center text-xs text-white/40">
                <span>Question {currentIndex + 1} of 10</span>
                <span>Score: {score}</span>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentQ.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center gap-8 w-full"
                >
                    <div className="text-5xl tracking-widest bg-black/20 px-6 py-4 rounded-2xl border border-white/5 text-center">
                        {currentQ.emojis}
                    </div>

                    <div className="grid grid-cols-2 gap-3 w-full">
                        {currentQ.options.map((option) => {
                            const isSelected = selectedAnswer === option
                            const isActualAnswer = option === currentQ.answer

                            let bgColor = 'bg-white/5'
                            let borderColor = 'border-white/10'
                            let textColor = 'text-white/80'

                            if (selectedAnswer) {
                                if (isActualAnswer) {
                                    bgColor = 'bg-green-500/20'
                                    borderColor = 'border-green-500/50'
                                    textColor = 'text-green-400'
                                } else if (isSelected) {
                                    bgColor = 'bg-red-500/20'
                                    borderColor = 'border-red-500/50'
                                    textColor = 'text-red-400'
                                } else {
                                    bgColor = 'bg-transparent'
                                    textColor = 'text-white/30'
                                }
                            }

                            return (
                                <button
                                    key={option}
                                    onClick={() => handleAnswer(option)}
                                    disabled={!!selectedAnswer}
                                    className={`p-3 rounded-xl border text-sm font-medium transition-all ${bgColor} ${borderColor} ${textColor} ${!selectedAnswer ? 'hover:bg-white/10 active:scale-95' : ''}`}
                                >
                                    {option}
                                </button>
                            )
                        })}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}
