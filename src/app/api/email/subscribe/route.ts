import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const { email } = await req.json()

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
        }

        const apiKey = process.env.BREVO_API_KEY
        const listId = Number(process.env.BREVO_LIST_ID)

        // If no Brevo key is configured, just accept gracefully (dev mode)
        if (!apiKey) {
            console.warn('[Email] BREVO_API_KEY not set — simulating success for:', email)
            return NextResponse.json({ ok: true })
        }

        const res = await fetch('https://api.brevo.com/v3/contacts', {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'api-key': apiKey,
            },
            body: JSON.stringify({
                email,
                listIds: listId ? [listId] : [],
                updateEnabled: true, // re-subscribe if they had unsubscribed
            }),
        })

        if (res.status === 204 || res.status === 201 || res.ok) {
            return NextResponse.json({ ok: true })
        }

        const error = await res.json()
        console.error('[Email] Brevo error:', error)

        // Brevo returns 400 "Contact already exist" — treat as success
        if (res.status === 400 && error?.code === 'duplicate_parameter') {
            return NextResponse.json({ ok: true })
        }

        return NextResponse.json({ error: error.message ?? 'Failed' }, { status: res.status })
    } catch (err) {
        console.error('[Email] Unexpected error:', err)
        return NextResponse.json({ error: 'Internal error' }, { status: 500 })
    }
}
