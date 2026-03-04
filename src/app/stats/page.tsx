import Link from 'next/link'
import Navbar from '@/components/shared/Navbar'
import StatCard from '@/components/stats/StatCard'
import VibeChart from '@/components/stats/VibeChart'
import SessionHistory from '@/components/stats/SessionHistory'
import { getStats, getSessions } from '@/lib/storage'
import { VIBES } from '@/lib/vibes'

export default async function StatsPage() {
    const stats = await getStats()
    const sessions = await getSessions()
    const accent = VIBES.coffee.accent // Default for server side context since they are just stats

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] pt-24 pb-20">
            <Navbar />

            <main className="mx-auto max-w-5xl px-6">
                <header className="mb-12 flex items-center justify-between">
                    <div>
                        <h1 className="font-clash text-4xl font-bold text-white md:text-5xl">Your Progress</h1>
                        <p className="mt-2 font-geist text-lg text-white/50">Tracking every minute of deep work.</p>
                    </div>
                    <Link
                        href="/focus"
                        className="hidden sm:flex rounded-full px-5 py-2 text-sm font-medium text-black transition-all hover:scale-105 items-center gap-2"
                        style={{ backgroundColor: accent }}
                    >
                        Start Focusing
                        <span aria-hidden="true">&rarr;</span>
                    </Link>
                </header>

                <div className="space-y-12">
                    {/* Summary Cards */}
                    <section className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
                        <StatCard
                            label="Total Sessions"
                            value={stats.totalSessions}
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                            }
                        />
                        <StatCard
                            label="Minutes Focused"
                            value={stats.totalMinutes}
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                            }
                        />
                        <StatCard
                            label="Current Streak"
                            value={`${stats.currentStreak} day${stats.currentStreak === 1 ? '' : 's'}`}
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"></path></svg>
                            }
                        />
                        <StatCard
                            label="Longest Streak"
                            value={`${stats.longestStreak} day${stats.longestStreak === 1 ? '' : 's'}`}
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                            }
                        />
                    </section>

                    <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
                        {/* Left Column: Vibe Distribution */}
                        <section>
                            <h2 className="mb-6 font-clash text-2xl font-semibold text-white">Vibe Breakdown</h2>
                            <VibeChart sessions={sessions} />
                        </section>

                        {/* Right Column: Session History */}
                        <section>
                            <h2 className="mb-6 font-clash text-2xl font-semibold text-white">Recent Sessions</h2>
                            <SessionHistory sessions={sessions} />
                        </section>
                    </div>
                </div>
            </main>
        </div>
    )
}
