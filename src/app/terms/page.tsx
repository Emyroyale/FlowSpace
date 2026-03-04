'use client'

import Navbar from '@/components/shared/Navbar'
import VibeBackground from '@/components/shared/VibeBackground'
import GrainOverlay from '@/components/shared/GrainOverlay'
import Footer from '@/components/landing/Footer'

export default function TermsOfService() {
    return (
        <div className="relative min-h-screen overflow-hidden">
            <VibeBackground sceneOpacity={0.15} />
            <GrainOverlay />
            <Navbar />

            <main className="mx-auto max-w-4xl px-6 py-32 relative z-10 text-white/80 font-geist">
                <h1 className="font-clash text-4xl font-bold text-white mb-8">Terms of Service</h1>

                <div className="space-y-8 text-lg leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-clash text-white mb-4">1. Acceptance of Terms</h2>
                        <p>
                            By accessing or using FlowSpace, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-clash text-white mb-4">2. Description of Service</h2>
                        <p>
                            FlowSpace provides a focus timer tool with ambient music integrations designed to improve productivity. We reserve the right to modify or discontinue the service at any time without notice.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-clash text-white mb-4">3. User Accounts</h2>
                        <p>
                            You are responsible for safeguarding the password and authentication methods you use to access FlowSpace. You agree not to disclose your password to any third party and to take sole responsibility for any activities or actions under your account.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-clash text-white mb-4">4. Prohibited Uses</h2>
                        <p>
                            You may not use FlowSpace for any illegal or unauthorized purpose. You must not, in the use of the Service, violate any laws in your jurisdiction. Any violation of these terms may result in immediate termination of your account.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-clash text-white mb-4">5. Contact Information</h2>
                        <p>
                            If you have any questions about these Terms, please contact us at hello@flowspace.app.
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
