'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Button from '@/components/ui/Button'

export default function LoginForm() {
  const router = useRouter()
  const supabase = createClient()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error: loginError } = await supabase.auth.signInWithPassword({ email, password })

    if (loginError) {
      setError(loginError.message)
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-5">
      <div>
        <label htmlFor="login-email" className="block text-sm text-slate-400 mb-1">Email</label>
        <input
          id="login-email"
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label htmlFor="login-password" className="block text-sm text-slate-400 mb-1">Password</label>
        <input
          id="login-password"
          type="password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
          placeholder="Your password"
        />
      </div>
      {error && <p className="text-red-400 text-sm text-center">{error}</p>}
      <Button type="submit" loading={loading}>Sign In</Button>
    </form>
  )
}
