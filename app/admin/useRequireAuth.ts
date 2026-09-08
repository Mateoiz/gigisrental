'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import type { Session } from '@supabase/supabase-js'

/**
 * Matches the auth pattern used in app/admin/page.tsx (the bookings dashboard):
 * requires a live session AND that session's email to match
 * NEXT_PUBLIC_ADMIN_EMAIL. Redirects to /dshbrdlogin otherwise.
 *
 * Use at the top of every /admin/* page, e.g.:
 *   const { checked } = useRequireAuth()
 *   if (!checked) return null
 */
export function useRequireAuth() {
  const router = useRouter()
  const [session, setSession] = useState<Session | null>(null)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const verify = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session || session.user?.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
        router.replace('/dshbrdlogin')
        setChecked(true)
        return
      }

      setSession(session)
      setChecked(true)
    }

    verify()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (!newSession || newSession.user?.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
        setSession(null)
        router.replace('/dshbrdlogin')
      } else {
        setSession(newSession)
      }
    })

    return () => listener.subscription.unsubscribe()
  }, [router])

  return { session, checked }
}