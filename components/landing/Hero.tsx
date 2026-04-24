'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import FloatingSprite from '@/components/ui/FloatingSprite'

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 text-center"
      style={{ background: 'linear-gradient(135deg, var(--color-base) 0%, #1a0d2e 100%)' }}
    >
      {/* Floating sprites background */}
      <FloatingSprite role="dancer"        style={{ top: '10%',  left: '8%'   }} size={64} />
      <FloatingSprite role="filmmaker"     style={{ top: '15%',  right: '10%' }} size={56} />
      <FloatingSprite role="musician"      style={{ top: '60%',  left: '5%'   }} size={48} />
      <FloatingSprite role="editor"        style={{ bottom: '20%', right: '8%'}} size={52} />
      <FloatingSprite role="actor"         style={{ top: '40%',  right: '6%'  }} size={44} />
      <FloatingSprite role="artist"        style={{ bottom: '15%', left: '12%'}} size={60} />
      <FloatingSprite role="choreographer" style={{ top: '25%',  left: '20%'  }} size={40} />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 max-w-4xl"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xs font-semibold tracking-[6px] uppercase mb-6"
          style={{ color: 'var(--color-purple)' }}
        >
          Ideas → Reality · Concept → Creation
        </motion.p>

        <h1
          className="font-display text-7xl md:text-[10rem] leading-none tracking-widest mb-6 gradient-text-hero"
        >
          THE SYNC<br />STUDIOS
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          The creative network where dancers, filmmakers, musicians, editors,
          and artists find each other — and build something real together.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/auth"
            className="px-10 py-4 rounded-full font-semibold text-white text-lg transition-all hover:-translate-y-1 hover:brightness-110"
            style={{ background: 'linear-gradient(90deg, var(--color-purple), var(--color-pink))' }}
          >
            Enter the Studios ⚡
          </Link>
          <Link
            href="#features"
            className="px-10 py-4 rounded-full font-semibold text-slate-300 text-lg border border-slate-600 hover:border-slate-400 transition-all hover:-translate-y-1"
          >
            See How It Works
          </Link>
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--color-base))' }}
      />
    </section>
  )
}
