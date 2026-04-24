import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

interface Profile {
  id: string
  username: string
  full_name: string
  role: 'dancer' | 'filmmaker' | 'musician' | 'editor' | 'actor' | 'artist' | 'choreographer'
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth')

  const { data, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (profileError && profileError.code !== 'PGRST116') {
    // PGRST116 = row not found (new user, profile not yet created) — handle gracefully
    console.error('Profile fetch error:', profileError.message)
  }

  const profile = data as Profile | null

  const ROLE_EMOJI: Record<Profile['role'], string> = {
    dancer: '💃', choreographer: '✨', filmmaker: '🎬',
    editor: '🎧', musician: '🎵', actor: '🎭', artist: '🎨',
  }

  return (
    <main
      className="min-h-screen px-6 py-12"
      style={{ background: 'var(--color-base)' }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <Link href="/">
            <Image
              src="/logo.png"
              width={56}
              height={56}
              alt="The Sync Studios"
            />
          </Link>
        </div>

        {profile && (
          <div
            className="rounded-2xl p-8 mb-8"
            style={{ background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.2)' }}
          >
            <p className="text-4xl mb-3">{ROLE_EMOJI[profile.role]}</p>
            <h2 className="font-display text-4xl tracking-wider text-white mb-1">
              Welcome, {profile.full_name}
            </h2>
            <p className="text-slate-400 text-sm tracking-widest uppercase">
              @{profile.username} · {profile.role}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { href: '/map',    label: 'Enter the Map', emoji: '🗺️', color: '#a78bfa' },
            { href: '/dance',  label: 'Dance Studio',  emoji: '💃', color: '#ec4899' },
            { href: '/groups', label: 'My Groups',     emoji: '⚡', color: '#06b6d4' },
          ].map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-4 p-5 rounded-2xl border transition-all hover:-translate-y-1"
              style={{ borderColor: item.color + '44', background: item.color + '11' }}
            >
              <span className="text-3xl">{item.emoji}</span>
              <span className="font-semibold text-white">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
