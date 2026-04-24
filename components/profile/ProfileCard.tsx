import Image from 'next/image'
import { Profile, ROLE_EMOJI, ROLE_COLOR } from '@/lib/types'

interface ProfileCardProps {
  profile: Profile
  showSyncButton?: boolean
}

export default function ProfileCard({ profile, showSyncButton = true }: ProfileCardProps) {
  const color = ROLE_COLOR[profile.role]

  return (
    <div
      className="rounded-2xl p-8 w-full"
      style={{ background: `${color}11`, border: `1px solid ${color}33` }}
    >
      {/* Header: avatar + name + role */}
      <div className="flex items-center gap-5 mb-6">
        <div
          className="relative w-20 h-20 rounded-full flex-shrink-0 flex items-center justify-center text-3xl overflow-hidden"
          style={{ background: `${color}33`, border: `2px solid ${color}66` }}
        >
          {profile.avatar_url ? (
            <Image
              src={profile.avatar_url}
              alt={profile.full_name}
              fill
              className="object-cover"
            />
          ) : (
            <span aria-hidden="true">{ROLE_EMOJI[profile.role]}</span>
          )}
        </div>
        <div>
          <h1 className="font-display text-3xl tracking-wider text-white leading-none mb-1">
            {profile.full_name}
          </h1>
          <p className="text-sm mb-2" style={{ color: 'var(--color-text-muted)' }}>
            @{profile.username}
          </p>
          <span
            className="inline-block px-3 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider"
            style={{
              background: `${color}22`,
              color,
              border: `1px solid ${color}44`,
            }}
          >
            {ROLE_EMOJI[profile.role]} {profile.role}
          </span>
        </div>
      </div>

      {/* Bio */}
      {profile.bio && (
        <p className="text-slate-300 text-sm leading-relaxed mb-6">{profile.bio}</p>
      )}

      {/* Links + actions */}
      <div className="flex flex-col gap-3">
        {profile.instagram && (
          <a
            href={`https://instagram.com/${profile.instagram.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors w-fit"
          >
            <span aria-hidden="true">📸</span>
            <span>@{profile.instagram.replace('@', '')}</span>
          </a>
        )}

        {profile.calendly_url && (
          <a
            href={profile.calendly_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:brightness-110"
            style={{ background: `linear-gradient(90deg, ${color}, ${color}bb)` }}
          >
            <span aria-hidden="true">📅</span> Schedule a Sync
          </a>
        )}

        {showSyncButton && (
          <button
            type="button"
            className="flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold transition-all hover:-translate-y-0.5 hover:brightness-110"
            style={{ background: 'var(--color-cream)', color: '#0d0d0d' }}
          >
            ⚡ Sync
          </button>
        )}
      </div>
    </div>
  )
}
