import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Profile, ROLE_EMOJI, ROLE_COLOR, ROLE_ROOM } from '@/lib/types'

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

  // Build room suggestions from all selected roles (deduplicated by href)
  const activeRoles: Profile['role'][] = profile
    ? (profile.roles?.length ? profile.roles : [profile.role])
    : []

  const suggestedRooms = Array.from(
    new Map(activeRoles.map(r => [ROLE_ROOM[r].href, { ...ROLE_ROOM[r], role: r }])).values()
  )

  return (
    <main
      className="min-h-screen px-6 py-12"
      style={{ background: 'var(--color-base)' }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Nav */}
        <div className="flex items-center justify-between mb-12">
          <Link href="/">
            <Image src="/logo.png" width={56} height={56} alt="The Sync Studios" />
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

        {/* Welcome card */}
        {profile && (
          <div
            className="rounded-2xl p-8 mb-10"
            style={{ background: 'rgba(237,224,196,0.06)', border: '1px solid rgba(237,224,196,0.2)' }}
          >
            <div className="flex flex-wrap gap-2 mb-3">
              {activeRoles.map(r => (
                <span
                  key={r}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
                  style={{
                    background: `${ROLE_COLOR[r]}22`,
                    color: ROLE_COLOR[r],
                    border: `1px solid ${ROLE_COLOR[r]}44`,
                  }}
                >
                  {ROLE_EMOJI[r]} {r}
                </span>
              ))}
            </div>
            <h2 className="font-display text-4xl tracking-wider text-white mb-1">
              Welcome, {profile.full_name}
            </h2>
            <p className="text-slate-400 text-sm tracking-widest uppercase">
              @{profile.username}
            </p>
          </div>
        )}

        {/* Rooms for you */}
        {suggestedRooms.length > 0 && (
          <div className="mb-10">
            <h3 className="text-xs font-semibold tracking-[4px] uppercase mb-4" style={{ color: 'var(--color-cream)' }}>
              Rooms for You
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {suggestedRooms.map(room => {
                const color = ROLE_COLOR[room.role]
                return (
                  <Link
                    key={room.href}
                    href={room.href}
                    className="flex flex-col gap-2 p-5 rounded-2xl border transition-all hover:-translate-y-1"
                    style={{ borderColor: `${color}44`, background: `${color}0d` }}
                  >
                    <span className="text-3xl">{room.emoji}</span>
                    <span className="font-semibold text-white text-sm">{room.label}</span>
                    <span className="text-xs text-slate-500">{room.description}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {/* Explore */}
        <div>
          <h3 className="text-xs font-semibold tracking-[4px] uppercase mb-4" style={{ color: 'var(--color-cream)' }}>
            Explore
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { href: '/map',    label: 'The Map',   emoji: '🗺️', description: 'Find creatives near you' },
              { href: '/groups', label: 'My Groups',  emoji: '⚡', description: 'Collabs and crews' },
            ].map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-4 p-5 rounded-2xl border transition-all hover:-translate-y-1"
                style={{ borderColor: 'rgba(237,224,196,0.2)', background: 'rgba(237,224,196,0.04)' }}
              >
                <span className="text-3xl">{item.emoji}</span>
                <div>
                  <p className="font-semibold text-white text-sm">{item.label}</p>
                  <p className="text-xs text-slate-500">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
