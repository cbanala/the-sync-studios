'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Button from '@/components/ui/Button'

const ROLES = [
  { value: 'dancer',        label: 'Dancer',        emoji: '💃' },
  { value: 'choreographer', label: 'Choreographer',  emoji: '✨' },
  { value: 'filmmaker',     label: 'Filmmaker',      emoji: '🎬' },
  { value: 'editor',        label: 'Editor',         emoji: '🎧' },
  { value: 'musician',      label: 'Musician',       emoji: '🎵' },
  { value: 'actor',         label: 'Actor',          emoji: '🎭' },
  { value: 'artist',        label: 'Visual Artist',  emoji: '🎨' },
] as const

type Role = typeof ROLES[number]['value']

export default function SignupForm() {
  const router = useRouter()
  const supabase = createClient()

  const [step, setStep] = useState<'details' | 'role'>('details')
  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<Role | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (step === 'details') { setStep('role'); return }
    if (!role) { setError('Please pick your creative role.'); return }

    setLoading(true)
    setError('')

    const { data, error: signUpError } = await supabase.auth.signUp({ email, password })

    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }

    if (data.user) {
      const { error: profileError } = await supabase.from('profiles').insert({
        id: data.user.id,
        username: username.toLowerCase().trim(),
        full_name: fullName.trim(),
        role,
      })

      if (profileError) {
        setError(profileError.message)
        setLoading(false)
        return
      }

      router.push('/dashboard')
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {step === 'details' ? (
        <>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              placeholder="Chethan Banala"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              placeholder="chethanb"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Password</label>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              placeholder="8+ characters"
            />
          </div>
          <Button type="submit">Next — Pick Your Role →</Button>
        </>
      ) : (
        <>
          <p className="text-slate-400 text-sm text-center">What best describes you?</p>
          <div className="grid grid-cols-2 gap-3">
            {ROLES.map(r => (
              <button
                key={r.value}
                type="button"
                onClick={() => setRole(r.value)}
                className="flex items-center gap-3 p-3 rounded-xl border transition-all text-left"
                style={{
                  background: role === r.value ? 'rgba(167,139,250,0.15)' : 'rgba(255,255,255,0.03)',
                  borderColor: role === r.value ? 'var(--color-purple)' : '#334155',
                }}
              >
                <span className="text-2xl">{r.emoji}</span>
                <span className="text-sm font-medium text-white">{r.label}</span>
              </button>
            ))}
          </div>
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <Button type="submit" loading={loading}>Enter the Studios ⚡</Button>
          <button type="button" onClick={() => setStep('details')} className="text-slate-500 text-sm hover:text-slate-300 transition-colors">
            ← Back
          </button>
        </>
      )}
    </form>
  )
}
