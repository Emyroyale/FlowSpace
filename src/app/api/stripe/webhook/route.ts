import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { clerkClient } from '@clerk/nextjs/server'
import Stripe from 'stripe'

export async function POST(req: Request) {
    const body = await req.text()
    const signature = (await headers()).get('Stripe-Signature') as string

    let event: Stripe.Event

    try {
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
        if (!webhookSecret) {
            console.warn('STRIPE_WEBHOOK_SECRET is missing. Bypassing signature verification for testing.')
            event = JSON.parse(body) as Stripe.Event
        } else {
            event = stripe.webhooks.constructEvent(
                body,
                signature,
                webhookSecret
            )
        }
    } catch (error: any) {
        console.error('Webhook signature verification failed.', error.message)
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
    }

    const session = event.data.object as Stripe.Checkout.Session

    // Listen for the completed checkout event
    if (event.type === 'checkout.session.completed') {
        // Retrieve the user ID we passed into client_reference_id during checkout creation
        const userId = session.client_reference_id || session.metadata?.userId

        if (!userId) {
            console.error('No user ID found in session')
            return new NextResponse('Webhook Error: No user ID', { status: 400 })
        }

        // Update the Clerk user so the frontend instantly knows they are Pro
        try {
            const clerk = await clerkClient()
            await clerk.users.updateUserMetadata(userId, {
                publicMetadata: {
                    isPro: true,
                }
            })
            console.log(`Successfully upgraded user ${userId} to Pro`)
        } catch (error) {
            console.error('Error updating Clerk user metadata:', error)
            return new NextResponse('Error upgrading user', { status: 500 })
        }
    }

    // Handle successful subscriptions continuing (if we needed more complex logic later)
    if (event.type === 'invoice.payment_succeeded') {
        // Usually handled by checkout.session.completed on first buy, but keeps them active on renewals
    }

    return new NextResponse('Webhook OK', { status: 200 })
}
