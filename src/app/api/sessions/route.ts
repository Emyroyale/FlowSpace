import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import prisma from '@/lib/prisma'

// Allow users to save a completed focus session
export async function POST(req: Request) {
    const { userId } = await auth()

    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const { durationMins, vibeId, taskName } = await req.json()

        const session = await prisma.session.create({
            data: {
                userId,
                durationMins,
                vibeId,
                taskName: taskName || null,
                completed: true, // We only hit this API when a session is completed
            }
        })

        return NextResponse.json({ session }, { status: 201 })
    } catch (error) {
        console.error('Error saving session:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

// Allow users to fetch their session history
export async function GET() {
    const { userId } = await auth()

    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        // Fetch all sessions for this user, newest first
        const sessions = await prisma.session.findMany({
            where: {
                userId: userId,
                completed: true
            },
            orderBy: {
                createdAt: 'desc'
            },
            take: 100 // Reasonable limit for now
        })

        return NextResponse.json({ sessions }, { status: 200 })
    } catch (error) {
        console.error('Error fetching sessions:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
