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
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function toggleRole(role: Role) {
    setSelectedRoles(prev =>
      prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (step === 'details') { setStep('role'); return }
    if (selectedRoles.length === 0) { setError('Pick at least one that describes you.'); return }

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
        role: selectedRoles[0],
        roles: selectedRoles,
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
      {error && <p className="text-red-400 text-sm text-center">{error}</p>}
      {step === 'details' ? (
        <>
          <div>
            <label htmlFor="signup-fullname" className="block text-sm text-slate-400 mb-1">Full Name</label>
            <input
              id="signup-fullname"
              type="text"
              required
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              className="w-full rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="signup-username" className="block text-sm text-slate-400 mb-1">Username</label>
            <input
              id="signup-username"
              type="text"
              required
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              placeholder="yourhandle"
            />
          </div>
          <div>
            <label htmlFor="signup-email" className="block text-sm text-slate-400 mb-1">Email</label>
            <input
              id="signup-email"
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="signup-password" className="block text-sm text-slate-400 mb-1">Password</label>
            <input
              id="signup-password"
              type="password"
              required
              minLength={8}
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
              placeholder="8+ characters"
            />
          </div>
          <Button type="submit">Next — Pick Your Roles →</Button>
        </>
      ) : (
        <>
          <div className="text-center">
            <p className="text-white font-semibold mb-1">What best describes you?</p>
            <p className="text-slate-500 text-xs">Select all that apply</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {ROLES.map(r => {
              const selected = selectedRoles.includes(r.value)
              return (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => toggleRole(r.value)}
                  className="flex items-center gap-3 p-3 rounded-xl border transition-all text-left"
                  style={{
                    background: selected ? 'rgba(237,224,196,0.12)' : 'rgba(255,255,255,0.03)',
                    borderColor: selected ? 'var(--color-cream)' : 'rgba(255,255,255,0.1)',
                  }}
                >
                  <span className="text-2xl">{r.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-white">{r.label}</span>
                  </div>
                  {selected && (
                    <span style={{ color: 'var(--color-cream)' }} className="text-xs font-bold flex-shrink-0">✓</span>
                  )}
                </button>
              )
            })}
          </div>
          {selectedRoles.length > 0 && (
            <p className="text-center text-xs" style={{ color: 'var(--color-cream)' }}>
              {selectedRoles.length} selected
            </p>
          )}
          <Button type="submit" loading={loading}>Enter the Studios ⚡</Button>
          <button type="button" onClick={() => setStep('details')} className="text-slate-500 text-sm hover:text-slate-300 transition-colors">
            ← Back
          </button>
        </>
      )}
    </form>
  )
}
