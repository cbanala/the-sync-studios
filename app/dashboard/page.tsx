import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Profile, ROLE_EMOJI } from '@/lib/types'

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
    console.error('Profile fetch error:', profileError.message)
  }

  const profile = data as Profile | null

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
          {profile && (
            <div className="flex items-center gap-3">
              <Link
                href={`/profile/${profile.username}`}
                className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
              >
                View Profile
              </Link>
              <Link
                href="/dashboard/edit"
                className="px-4 py-2 rounded-full text-sm font-semibold transition-all hover:brightness-110"
                style={{ background: 'var(--color-cream)', color: '#0d0d0d' }}
              >
                Edit Profile
              </Link>
            </div>
          )}
        </div>

        {profile && (
          <div
            className="rounded-2xl p-8 mb-8"
            style={{ background: 'rgba(237,224,196,0.06)', border: '1px solid rgba(237,224,196,0.2)' }}
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
            { href: '/map',    label: 'Enter the Map', emoji: '🗺️', color: '#EDE0C4' },
            { href: '/dance',  label: 'Dance Studio',  emoji: '💃', color: '#EDE0C4' },
            { href: '/groups', label: 'My Groups',     emoji: '⚡', color: '#EDE0C4' },
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
