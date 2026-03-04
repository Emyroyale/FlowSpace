import React from 'react'
import { Music2, CloudRain, Coffee, Brain, Waves } from 'lucide-react'

export type VibeId = 'landing' | 'lofi' | 'rain' | 'coffee' | 'binaural'

export interface VibeConfig {
  id: VibeId
  label: string
  icon: React.ReactNode
  bg: string
  bgGradient: string
  accent: string
  glow: string
  youtubeId: string
}

export const VIBES: Record<VibeId, VibeConfig> = {
  landing: {
    id: 'landing',
    label: 'FlowSpace',
    icon: <Waves className="w-8 h-8" />,
    bg: '#020617', // Slate 950
    bgGradient: 'radial-gradient(ellipse 70% 55% at 50% 55%, #0B1E36 0%, #040D1A 55%, #020617 100%)',
    accent: '#0ea5e9', // Cyan 500
    glow: '#0ea5e940',
    youtubeId: '',
  },
  lofi: {
    id: 'lofi',
    label: 'Lofi Hip Hop',
    icon: <Music2 className="w-8 h-8" />,
    bg: '#1A1208',
    bgGradient: 'radial-gradient(ellipse 70% 55% at 50% 55%, #2A1A0A 0%, #0F0A04 55%, #080604 100%)',
    accent: '#F5A623',
    glow: '#F5A62340',
    youtubeId: 'jfKfPfyJRdk',
  },
  rain: {
    id: 'rain',
    label: 'Rain & Nature',
    icon: <CloudRain className="w-8 h-8" />,
    bg: '#08121A',
    bgGradient: 'radial-gradient(ellipse 70% 55% at 50% 40%, #0D2236 0%, #060E18 55%, #030810 100%)',
    accent: '#4A9EBF',
    glow: '#4A9EBF40',
    youtubeId: 'mPZkdNFkNps',
  },
  coffee: {
    id: 'coffee',
    label: 'Coffee Shop',
    icon: <Coffee className="w-8 h-8" />,
    bg: '#150E08',
    bgGradient: 'radial-gradient(ellipse 70% 55% at 50% 50%, #241408 0%, #120A04 55%, #080502 100%)',
    accent: '#C4813A',
    glow: '#C4813A40',
    youtubeId: 'h2zkV-l_TbY',
  },
  binaural: {
    id: 'binaural',
    label: 'ADHD Focus',
    icon: <Brain className="w-8 h-8" />,
    bg: '#100B1A',
    bgGradient: 'radial-gradient(ellipse 70% 55% at 50% 45%, #1E0F38 0%, #0D0818 55%, #060410 100%)',
    accent: '#8B5CF6',
    glow: '#8B5CF640',
    youtubeId: 'yi3sWa9Aeo4',
  },
}

export const VIBE_IDS: VibeId[] = ['lofi', 'rain', 'coffee', 'binaural']
