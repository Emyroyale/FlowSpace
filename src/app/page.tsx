'use client'

import Navbar from '@/components/shared/Navbar'
import VibeBackground from '@/components/shared/VibeBackground'
import GrainOverlay from '@/components/shared/GrainOverlay'
import Hero from '@/components/landing/Hero'
import SocialProof from '@/components/landing/SocialProof'
import FeatureCards from '@/components/landing/FeatureCards'
import VibePreview from '@/components/landing/VibePreview'
import PricingSection from '@/components/landing/PricingSection'
import Footer from '@/components/landing/Footer'

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <VibeBackground sceneOpacity={0.15} />
      <GrainOverlay />
      <Navbar />
      <Hero />
      <SocialProof />
      <FeatureCards />
      <VibePreview />
      <PricingSection />
      <Footer />
    </div>
  )
}
