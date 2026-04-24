'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { uploadAvatar } from '@/lib/supabase/storage'
import { Profile } from '@/lib/types'
import Button from '@/components/ui/Button'
import AvatarUpload from '@/components/ui/AvatarUpload'

interface EditProfileFormProps {
  profile: Profile
}

export default function EditProfileForm({ profile }: EditProfileFormProps) {
  const router = useRouter()
  const [bio, setBio] = useState(profile.bio ?? '')
  const [instagram, setInstagram] = useState(profile.instagram ?? '')
  const [calendlyUrl, setCalendlyUrl] = useState(profile.calendly_url ?? '')
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSaved(false)

    const supabase = createClient()
    let avatar_url = profile.avatar_url

    if (avatarFile) {
      try {
        avatar_url = await uploadAvatar(avatarFile, profile.id)
      } catch {
        setError('Avatar upload failed — try a smaller image (max 2 MB).')
        setLoading(false)
        return
      }
    }

    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        bio: bio.trim(),
        instagram: instagram.replace('@', '').trim(),
        calendly_url: calendlyUrl.trim(),
        avatar_url,
      })
      .eq('id', profile.id)

    if (updateError) {
      setError(updateError.message)
    } else {
      setSaved(true)
      router.refresh()
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSave} className="flex flex-col gap-6 max-w-lg">
      <AvatarUpload
        currentUrl={profile.avatar_url}
        name={profile.full_name}
        onChange={setAvatarFile}
      />

      <div>
        <label htmlFor="edit-bio" className="block text-sm text-slate-400 mb-1">
          Bio
        </label>
        <textarea
          id="edit-bio"
          value={bio}
          onChange={e => setBio(e.target.value)}
          rows={3}
          maxLength={280}
          placeholder="Tell the world what you create..."
          className="w-full rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none resize-none"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
        />
        <p className="text-xs text-slate-600 mt-1">{bio.length}/280</p>
      </div>

      <div>
        <label htmlFor="edit-instagram" className="block text-sm text-slate-400 mb-1">
          Instagram
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 select-none">@</span>
          <input
            id="edit-instagram"
            type="text"
            value={instagram.replace('@', '')}
            onChange={e => setInstagram(e.target.value)}
            placeholder="yourhandle"
            className="w-full rounded-xl pl-8 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
          />
        </div>
      </div>

      <div>
        <label htmlFor="edit-calendly" className="block text-sm text-slate-400 mb-1">
          Calendly URL
        </label>
        <input
          id="edit-calendly"
          type="url"
          value={calendlyUrl}
          onChange={e => setCalendlyUrl(e.target.value)}
          placeholder="https://calendly.com/yourname/30min"
          className="w-full rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
        />
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}
      {saved && <p className="text-sm" style={{ color: 'var(--color-cream)' }}>Profile saved ✓</p>}

      <Button type="submit" loading={loading}>Save Profile</Button>
    </form>
  )
}
