'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { VibeId, VIBES } from '@/lib/vibes'

interface VibeContextType {
  activeVibe: VibeId
  setActiveVibe: (vibe: VibeId) => void
}

export const VibeContext = createContext<VibeContextType>({
  activeVibe: 'landing',
  setActiveVibe: () => { },
})

export function VibeProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  // The vibe they will actually use when they enter the focus timer
  const [focusVibe, setFocusVibe] = useState<VibeId>('lofi')

  // Purely for the landing page preview UI
  const [landingPreviewVibe, setLandingPreviewVibe] = useState<VibeId>('landing')

  // When on the landing page, we display either the landing brand theme OR the vibe they clicked to preview.
  const activeVibe = pathname === '/' ? landingPreviewVibe : focusVibe

  // Handle vibe changes seamlessly depending on where the user is
  const handleSetVibe = (vibe: VibeId) => {
    if (pathname === '/') {
      setLandingPreviewVibe(vibe)
      // Save their preview selection for when they click "Go to Focus"
      if (vibe !== 'landing') setFocusVibe(vibe)
    } else {
      if (vibe !== 'landing') setFocusVibe(vibe)
    }
  }

  // Update CSS variables
  useEffect(() => {
    const vibe = VIBES[activeVibe]
    const root = document.documentElement
    root.style.setProperty('--vibe-bg', vibe.bg)
    root.style.setProperty('--vibe-accent', vibe.accent)
    root.style.setProperty('--vibe-glow', vibe.glow)
  }, [activeVibe])

  // Reset landing preview when navigating AWAY from the landing page
  useEffect(() => {
    if (pathname !== '/') {
      setLandingPreviewVibe('landing')
    }
  }, [pathname])

  return (
    <VibeContext.Provider value={{ activeVibe, setActiveVibe: handleSetVibe }}>
      {children}
    </VibeContext.Provider>
  )
}

export const useVibe = () => useContext(VibeContext)
