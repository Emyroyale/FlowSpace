'use client'

import Link from 'next/link'
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-black/20">
      <Link href="/" className="font-clash text-xl font-bold text-white">
        FlowSpace
      </Link>
      <div className="flex items-center gap-4">
        {/* Show Login button when signed out */}
        <SignedOut>
          <SignInButton mode="modal">
            <button className="text-sm text-white/60 hover:text-white transition-colors">
              Login
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Link
              href="/focus"
              className="rounded-full px-5 py-2 text-sm font-medium text-black transition-all hover:scale-105"
              style={{ backgroundColor: 'var(--vibe-accent)' }}
            >
              Start Focusing Free
            </Link>
          </SignUpButton>
        </SignedOut>

        {/* Show user avatar + focus button when signed in */}
        <SignedIn>
          <Link
            href="/stats"
            className="rounded-full border border-white/20 px-4 py-1.5 text-sm font-medium text-white/70 transition-all hover:border-white/40 hover:text-white hover:bg-white/5"
          >
            Stats
          </Link>
          <Link
            href="/focus"
            className="rounded-full px-5 py-2 text-sm font-medium text-black transition-all hover:scale-105"
            style={{ backgroundColor: 'var(--vibe-accent)' }}
          >
            Go to Focus
          </Link>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </nav>
  )
}
