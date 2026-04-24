import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import ProfileCard from '@/components/profile/ProfileCard'
import { Profile } from '@/lib/types'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ username: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params
  const supabase = await createClient()

  const { data } = await supabase
    .from('profiles')
    .select('full_name, role')
    .eq('username', username)
    .single()

  if (!data) return { title: 'Profile Not Found — The Sync Studios' }

  return {
    title: `${data.full_name} (${data.role}) — The Sync Studios`,
    description: `Connect with ${data.full_name} on The Sync Studios creative network.`,
  }
}

export default async function ProfilePage({ params }: Props) {
  const { username } = await params
  const supabase = await createClient()

  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single()

  if (!data) notFound()

  const profile = data as Profile

  return (
    <main
      className="min-h-screen px-6 py-12 flex flex-col items-center"
      style={{ background: 'linear-gradient(135deg, var(--color-base) 0%, #1a0d2e 100%)' }}
    >
      <div className="w-full max-w-md">
        <Link href="/" className="flex justify-center mb-10">
          <Image
            src="/logo.png"
            width={72}
            height={72}
            alt="The Sync Studios"
            className="drop-shadow-xl"
          />
        </Link>

        <ProfileCard profile={profile} showSyncButton={true} />
      </div>
    </main>
  )
}
