'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SignupForm from '@/components/auth/SignupForm'
import LoginForm from '@/components/auth/LoginForm'
import Link from 'next/link'

export default function AuthPage() {
  const [mode, setMode] = useState<'signup' | 'login'>('signup')

  return (
    <main
      className="min-h-screen flex items-center justify-center px-6 py-12"
      style={{ background: 'linear-gradient(135deg, var(--color-base) 0%, #1a0d2e 100%)' }}
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="block text-center mb-8">
          <h1 className="font-display text-4xl tracking-widest gradient-text-dance">
            THE SYNC STUDIOS
          </h1>
        </Link>

        {/* Toggle */}
        <div className="flex bg-slate-800/50 rounded-full p-1 mb-8">
          {(['signup', 'login'] as const).map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className="flex-1 py-2 rounded-full text-sm font-semibold transition-all"
              style={{
                background: mode === m ? 'linear-gradient(90deg, var(--color-purple), var(--color-pink))' : 'transparent',
                color: mode === m ? '#fff' : '#64748b',
              }}
            >
              {m === 'signup' ? 'Join the Studios' : 'Sign In'}
            </button>
          ))}
        </div>

        {/* Form */}
        <div
          className="rounded-2xl p-8"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {mode === 'signup' ? <SignupForm /> : <LoginForm />}
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="text-center text-slate-600 text-xs mt-6">
          {mode === 'signup' ? 'Already have an account? ' : 'New here? '}
          <button
            onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            {mode === 'signup' ? 'Sign in' : 'Join the Studios'}
          </button>
        </p>
      </div>
    </main>
  )
}
