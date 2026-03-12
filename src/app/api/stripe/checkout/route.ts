import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { stripe } from '@/lib/stripe'

export async function POST(req: Request) {
    try {
        const { userId } = await auth()

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const { origin } = new URL(req.url)

        // Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            mode: 'subscription',
            // Dynamically define the product here so the user doesn't have to manually create one in the dashboard!
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'FlowSpace Pro',
                            description: 'Unlimited focus sessions, all ambient vibes, and detailed analytics.',
                        },
                        unit_amount: 900, // $9.00
                        recurring: {
                            interval: 'month',
                        },
                    },
                    quantity: 1,
                },
            ],
            // We pass the Clerk User ID here so the webhook knows exactly who paid
            client_reference_id: userId,
            metadata: {
                userId,
            },
            // Redirect back to these pages
            success_url: `${origin}/focus?success=true`,
            cancel_url: `${origin}/#pricing`,
        })

        return NextResponse.json({ url: session.url })
    } catch (error) {
        console.error('[STRIPE_CHECKOUT]', error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}
