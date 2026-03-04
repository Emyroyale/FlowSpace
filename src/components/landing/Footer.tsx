'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useVibe } from '@/context/VibeContext'
import { VIBES } from '@/lib/vibes'

export default function Footer() {
  const { activeVibe } = useVibe()
  const vibe = VIBES[activeVibe]

  return (
    <footer className="w-full border-t border-white/5 bg-black/40 px-6 py-12 md:py-20 mt-20 relative overflow-hidden">
      {/* Subtle glow bleeding up from bottom edge */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[200px] w-full max-w-4xl rounded-full blur-[100px] opacity-10 pointer-events-none"
        style={{ backgroundColor: vibe.accent }}
      />

      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-4 lg:gap-8">

          <div className="md:col-span-2">
            <Link href="/" className="font-clash text-2xl font-bold text-white mb-4 block">
              FlowSpace
            </Link>
            <p className="font-geist text-white/50 max-w-sm mb-6">
              A deeply personal, distraction-free environment for focusing on what actually matters. No ads. No algorithms.
            </p>
            <div className="flex bg-white/5 border border-white/10 rounded-full max-w-sm p-1">
              <input
                type="email"
                placeholder="Join the newsletter"
                className="bg-transparent border-none focus:ring-0 text-sm font-geist text-white placeholder:text-white/30 px-4 w-full"
              />
              <button
                className="rounded-full px-4 py-2 text-xs font-semibold text-black hover:brightness-110 transition-all"
                style={{ backgroundColor: vibe.accent }}
              >
                Subscribe
              </button>
            </div>
          </div>

          <div>
            <h4 className="font-clash text-lg font-semibold text-white mb-6 tracking-wide">Product</h4>
            <ul className="space-y-4 font-geist text-sm text-white/50">
              <li><Link href="/focus" className="hover:text-white transition-colors">Start Focusing</Link></li>
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#vibes" className="hover:text-white transition-colors">Vibes</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-clash text-lg font-semibold text-white mb-6 tracking-wide">Connect</h4>
            <ul className="space-y-4 font-geist text-sm text-white/50">
              <li><a href="https://www.linkedin.com/in/emy-kirugo-b40a78381" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a></li>
              <li><a href="https://github.com/Emyroyale/FlowSpace" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 font-geist text-xs text-white/40">
          <p>© {new Date().getFullYear()} FlowSpace. Built by Royale Automation.</p>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: vibe.accent }}></span>
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: vibe.accent }}></span>
            </span>
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  )
}
