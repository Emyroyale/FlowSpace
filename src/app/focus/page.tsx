'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useTimer } from '@/hooks/useTimer'
import { useYouTubePlayer } from '@/hooks/useYouTubePlayer'
import { useVibe } from '@/context/VibeContext'
import { VIBES } from '@/lib/vibes'
import TimerRing from '@/components/focus/TimerRing'
import TimerDisplay from '@/components/focus/TimerDisplay'
import TaskCommitment from '@/components/focus/TaskCommitment'
import VibeSelector from '@/components/focus/VibeSelector'
import VolumeSlider from '@/components/focus/VolumeSlider'
import FocusControls from '@/components/focus/FocusControls'
import TimerPresetSelector from '@/components/focus/TimerPresetSelector'
import ParticleBackground from '@/components/focus/ParticleBackground'
import GrainOverlay from '@/components/shared/GrainOverlay'
import VibeBackground from '@/components/shared/VibeBackground'
import { playVibeWhoosh, playBreakEndChime } from '@/lib/sounds'
import SessionComplete from '@/components/break/SessionComplete'
import AICheckIn from '@/components/break/AICheckIn'
import NextTaskInput from '@/components/break/NextTaskInput'
import BreakCountdown from '@/components/break/BreakCountdown'
import BreakActivities from '@/components/break/BreakActivities'
import { TIMER_PRESETS, TimerPreset } from '@/lib/timer'

/* Home button — extracted so it can use its own useState hook */
function HomeButton({ isRunning, accent }: { isRunning: boolean; accent: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      animate={{ opacity: isRunning ? 0.15 : 0.7 }}
      whileHover={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="absolute left-5 top-5 z-50"
    >
      <Link
        href="/"
        title="Back to Home"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="flex items-center gap-2 rounded-full px-3 py-2 backdrop-blur-sm transition-colors"
        style={{ color: hovered ? accent : 'rgba(255,255,255,0.7)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        <span className="text-sm font-medium">Home</span>
      </Link>
    </motion.div>
  )
}


export default function FocusPage() {
  const [task, setTask] = useState('')
  const [nextTask, setNextTask] = useState('')
  const [volume, setVolume] = useState(50)
  const [timerSize, setTimerSize] = useState(320)
  // Default to Classic (25 min) — index 1 in the sorted presets
  const [selectedPreset, setSelectedPreset] = useState<TimerPreset>(
    () => TIMER_PRESETS.find((p) => p.label === 'Classic') ?? TIMER_PRESETS[0]
  )
  const [breakTab, setBreakTab] = useState<'overview' | 'activities'>('overview')

  useEffect(() => {
    const updateSize = () => setTimerSize(window.innerWidth < 768 ? 256 : 320)
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  const { activeVibe } = useVibe()

  const timer = useTimer({ vibeId: activeVibe, taskName: task })
  const player = useYouTubePlayer('yt-player', VIBES[activeVibe].youtubeId)

  // Sync volume whenever slider changes
  useEffect(() => {
    if (player.isReady) {
      player.setVolume(volume)
    }
  }, [volume, player.isReady])

  // Play or pause music based on timer status
  useEffect(() => {
    if (!player.isReady) return
    if (timer.status === 'running' || timer.status === 'break') {
      player.play()
      player.setVolume(volume)
    } else {
      // paused, idle, complete — stop music
      player.pause()
    }
  }, [timer.status, player.isReady])

  // Switch YouTube video when vibe changes
  const handleVibeChange = (vibeId: typeof activeVibe) => {
    playVibeWhoosh()
    player.switchVideo(VIBES[vibeId].youtubeId)
  }

  // Apply preset to timer
  const handlePresetSelect = (preset: TimerPreset) => {
    setSelectedPreset(preset)
    timer.setWorkMinutes(preset.workMinutes)
    timer.setBreakMinutes(preset.breakMinutes)
  }

  const handleStart = (taskOverride?: string) => {
    // Use provided task, current task state, or a friendly default
    const resolvedTask = (taskOverride ?? task.trim()) || 'Focus session'
    if (!task.trim()) setTask(resolvedTask)
    timer.start()
  }

  const handleTaskSubmit = (taskName: string) => {
    setTask(taskName)
    // Start the timer immediately when task is committed via Enter
    timer.start()
  }

  // When break ends, carry over next task
  useEffect(() => {
    if (timer.status === 'idle' && nextTask) {
      setTask(nextTask)
      setNextTask('')
    }
  }, [timer.status, nextTask])

  // Track previous status for break→idle transition
  const prevStatusRef = useRef(timer.status)
  useEffect(() => {
    if (prevStatusRef.current === 'break' && timer.status === 'idle') {
      playBreakEndChime()
    }
    prevStatusRef.current = timer.status
  }, [timer.status])

  const isRunning = timer.status === 'running'
  const isBreakPhase = timer.status === 'complete' || timer.status === 'break'

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <VibeBackground />
      <ParticleBackground />
      <GrainOverlay />

      {/* Home button */}
      <HomeButton isRunning={isRunning} accent={VIBES[activeVibe].accent} />

      {/* Hidden YouTube player */}
      <div
        id="yt-player"
        className="pointer-events-none absolute h-px w-px opacity-0"
      />

      <AnimatePresence mode="wait">
        {!isBreakPhase ? (
          <motion.div
            key="focus"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 flex flex-col items-center gap-8"
          >
            {/* Session count */}
            <motion.div
              animate={{ opacity: isRunning ? 0.2 : 1 }}
              transition={{ duration: 0.4 }}
              className="text-sm text-white/50"
            >
              {timer.sessionCount > 0 && (
                <span>Session {timer.sessionCount + 1}</span>
              )}
            </motion.div>

            {/* Timer */}
            <div className="relative flex items-center justify-center">
              <TimerRing
                remainingSeconds={timer.remainingSeconds}
                totalSeconds={timer.totalSeconds}
                size={timerSize}
                isRunning={isRunning}
                isComplete={timer.status === 'complete'}
              />
              <div className="absolute">
                <TimerDisplay remainingSeconds={timer.remainingSeconds} />
              </div>
            </div>

            {/* Task text */}
            <AnimatePresence mode="wait">
              {timer.status === 'idle' && !task ? (
                <TaskCommitment key="input" onSubmit={handleTaskSubmit} />
              ) : (
                <motion.p
                  key="task"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isRunning ? 0.4 : 0.6 }}
                  exit={{ opacity: 0 }}
                  className="font-geist text-base text-white/60"
                >
                  {task}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Controls */}
            <FocusControls
              status={timer.status}
              onStart={handleStart}
              onPause={timer.pause}
              onResume={timer.resume}
              onEnd={timer.skip}
            />

            {/* Bottom bar */}
            <motion.div
              animate={{ opacity: isRunning ? 0.2 : 1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-4"
            >
              {/* Timer preset selector */}
              <TimerPresetSelector
                selectedPreset={selectedPreset}
                onSelect={handlePresetSelect}
                disabled={timer.status !== 'idle'}
              />

              <div className="flex items-center gap-6">
                <VibeSelector onVibeChange={handleVibeChange} />
                <VolumeSlider volume={volume} onChange={setVolume} />
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="break"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 flex flex-col items-center gap-8"
          >
            <SessionComplete sessionCount={timer.sessionCount} />

            {timer.status === 'break' && (
              <>
                <div className="flex gap-2 p-1 bg-white/5 rounded-full border border-white/10 mb-2">
                  <button
                    onClick={() => setBreakTab('overview')}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${breakTab === 'overview'
                      ? 'bg-white/10 text-white'
                      : 'text-white/40 hover:text-white/60'
                      }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setBreakTab('activities')}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${breakTab === 'activities'
                      ? 'bg-white/10 text-white'
                      : 'text-white/40 hover:text-white/60'
                      }`}
                  >
                    Activities
                  </button>
                </div>

                {breakTab === 'overview' ? (
                  <div className="flex flex-col items-center gap-6 w-full max-w-md">
                    <AICheckIn taskName={task} />
                    <NextTaskInput value={nextTask} onChange={setNextTask} />
                  </div>
                ) : (
                  <BreakActivities />
                )}

                <BreakCountdown
                  remainingSeconds={timer.remainingSeconds}
                  totalSeconds={timer.totalSeconds}
                  onSkip={timer.skip}
                />

                <Link
                  href="/stats"
                  className="mt-4 text-sm font-medium text-white/40 hover:text-white transition-colors flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10"></line>
                    <line x1="12" y1="20" x2="12" y2="4"></line>
                    <line x1="6" y1="20" x2="6" y2="14"></line>
                  </svg>
                  View your Stats
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
