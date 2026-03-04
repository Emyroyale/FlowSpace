'use server'

import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'

export interface FocusSession {
    id: string
    timestamp: number
    durationMinutes: number
    vibeId: string
    taskName?: string
}

export async function getSessions(): Promise<FocusSession[]> {
    const { userId } = await auth()

    if (!userId) {
        return []
    }

    try {
        const sessions = await prisma.session.findMany({
            where: {
                userId,
                completed: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return sessions.map(s => ({
            id: s.id,
            timestamp: s.createdAt.getTime(),
            durationMinutes: s.durationMins,
            vibeId: s.vibeId,
            taskName: s.taskName || undefined
        }))
    } catch (e) {
        console.error('Failed to parse focus sessions:', e)
        return []
    }
}

export async function getStats() {
    const sessions = await getSessions()

    const totalSessions = sessions.length
    const totalMinutes = sessions.reduce((acc, curr) => acc + curr.durationMinutes, 0)

    // Calculate streaks (consecutive days with at least one session)
    let currentStreak = 0
    let longestStreak = 0

    if (sessions.length > 0) {
        const daysWithSessions = new Set(
            sessions.map(s => {
                const d = new Date(s.timestamp)
                return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
            })
        )

        const sortedDays = Array.from(daysWithSessions).sort((a, b) => new Date(b).getTime() - new Date(a).getTime())

        // Calculate current streak (counting backwards from today/yesterday)
        let streakCount = 0
        let dateToCheck = new Date()
        // Need to reset time part for accurate day comparison
        dateToCheck.setHours(0, 0, 0, 0)

        const todayStr = `${dateToCheck.getFullYear()}-${dateToCheck.getMonth()}-${dateToCheck.getDate()}`
        dateToCheck.setDate(dateToCheck.getDate() - 1)
        const yesterdayStr = `${dateToCheck.getFullYear()}-${dateToCheck.getMonth()}-${dateToCheck.getDate()}`

        let dayIndex = 0
        // Streak is active if they worked today OR yesterday
        if (sortedDays[0] === todayStr || sortedDays[0] === yesterdayStr) {
            let currentCheckDate = new Date(sortedDays[0])
            while (dayIndex < sortedDays.length) {
                const dStr = `${currentCheckDate.getFullYear()}-${currentCheckDate.getMonth()}-${currentCheckDate.getDate()}`
                if (sortedDays[dayIndex] === dStr) {
                    streakCount++
                    dayIndex++
                    currentCheckDate.setDate(currentCheckDate.getDate() - 1)
                } else {
                    break
                }
            }
        }
        currentStreak = streakCount

        // Calculate absolute longest streak mathematically
        longestStreak = 0
        let tempStreak = 1
        for (let i = 0; i < sortedDays.length - 1; i++) {
            const d1 = new Date(sortedDays[i])
            const d2 = new Date(sortedDays[i + 1])
            const diffTime = Math.abs(d1.getTime() - d2.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
                tempStreak++
            } else {
                longestStreak = Math.max(longestStreak, tempStreak)
                tempStreak = 1
            }
        }
        // Final check for the last calculated tempStreak
        longestStreak = Math.max(longestStreak, tempStreak, currentStreak)

        // If there is only 1 day with a session, both streaks are 1
        if (sortedDays.length === 1) {
            longestStreak = 1
        }
    }

    return {
        totalSessions,
        totalMinutes,
        currentStreak,
        longestStreak
    }
}
