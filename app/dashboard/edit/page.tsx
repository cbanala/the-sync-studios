import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import EditProfileForm from '@/components/profile/EditProfileForm'
import { Profile } from '@/lib/types'

export default async function EditProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth')

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error || !data) redirect('/dashboard')

  const profile = data as Profile

  return (
    <main
      className="min-h-screen px-6 py-12"
      style={{ background: 'var(--color-base)' }}
    >
      <div className="max-w-2xl mx-auto">
        <div className="mb-10">
          <Link
            href="/dashboard"
            className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
          >
            ← Dashboard
          </Link>
        </div>

        <h1 className="font-display text-4xl tracking-widest gradient-text-dance mb-2">
          EDIT PROFILE
        </h1>
        <p className="text-slate-500 text-sm mb-8">
          {profile.full_name} · @{profile.username} · {profile.role}
        </p>

        <EditProfileForm profile={profile} />
      </div>
    </main>
  )
}
