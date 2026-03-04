'use client'

import Navbar from '@/components/shared/Navbar'
import VibeBackground from '@/components/shared/VibeBackground'
import GrainOverlay from '@/components/shared/GrainOverlay'
import Footer from '@/components/landing/Footer'

export default function PrivacyPolicy() {
    return (
        <div className="relative min-h-screen overflow-hidden">
            <VibeBackground sceneOpacity={0.15} />
            <GrainOverlay />
            <Navbar />

            <main className="mx-auto max-w-4xl px-6 py-32 relative z-10 text-white/80 font-geist">
                <h1 className="font-clash text-4xl font-bold text-white mb-8">Privacy Policy</h1>

                <div className="space-y-8 text-lg leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-clash text-white mb-4">1. Information We Collect</h2>
                        <p>
                            We collect information you provide directly to us when you create an account, use FlowSpace, or interact with our services. This includes your email address, session data, and app preferences.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-clash text-white mb-4">2. How We Use Your Information</h2>
                        <p>
                            We use the information we collect to provide, maintain, and improve our services, communicate with you, and personalize your experience. We do not sell your personal data to third parties.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-clash text-white mb-4">3. Data Security</h2>
                        <p>
                            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. We rely on industry leaders for our infrastructure to ensure your data is secure.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-clash text-white mb-4">4. Third-Party Services</h2>
                        <p>
                            We use third-party services such as Clerk for authentication and Stripe for payment processing. These services have their own privacy policies governing the data they collect and process on our behalf.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-clash text-white mb-4">5. Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at emy@royaleautomation.com.
                        </p>
                        <p className="mt-4 text-sm text-white/50">
                            Last updated: {new Date().toLocaleDateString()}
                        </p>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    )
}
