'use client'

import { useUser } from '@clerk/nextjs'

/**
 * Returns whether the currently signed-in user is a paid subscriber.
 * Paid users are listed in NEXT_PUBLIC_PAID_USER_IDS (comma-separated).
 * If the env var is empty/unset, all authenticated users are treated as paid.
 */
export function usePaidUser(): { isPaid: boolean; isLoaded: boolean } {
    const { user, isLoaded } = useUser()

    if (!isLoaded) return { isPaid: false, isLoaded: false }
    if (!user) return { isPaid: false, isLoaded: true }

    const allowlist = process.env.NEXT_PUBLIC_PAID_USER_IDS ?? ''
    const isPro = user.publicMetadata?.isPro === true

    if (isPro) {
        return { isPaid: true, isLoaded: true }
    }

    if (!allowlist.trim()) {
        // No list set → all authenticated users are paid (dev mode)
        return { isPaid: true, isLoaded: true }
    }

    const paidIds = allowlist.split(',').map((id) => id.trim())
    return { isPaid: paidIds.includes(user.id), isLoaded: true }
}
