import { createServerSupabase } from './supabase-server'

export interface UserProfile {
  id: string
  email: string
  full_name: string | null
  phone: string | null
  avatar_url: string | null
  loyalty_points: number
  tier: 'bronze' | 'silver' | 'gold' | 'diamond'
}

// Server-only: get current user + profile
export async function getCurrentUser() {
  const supabaseServer = await createServerSupabase()
  const { data: { user } } = await supabaseServer.auth.getUser()
  if (!user) return null

  const { data: profile } = await supabaseServer
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle()

  return {
    ...user,
    profile: profile as UserProfile | null,
  } as any
}