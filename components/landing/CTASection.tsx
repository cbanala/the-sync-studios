'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="py-24 px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto"
      >
        <h2 className="font-display text-6xl md:text-7xl tracking-widest mb-6 gradient-text-dance">
          READY TO SYNC?
        </h2>
        <p className="text-slate-400 text-lg mb-10 leading-relaxed">
          Join The Sync Studios. Pick your role. Enter the map.
          Find your creative partner. Build something real.
        </p>
        <Link
          href="/auth"
          className="inline-block px-12 py-5 rounded-full font-semibold text-white text-xl transition-all hover:-translate-y-1 hover:brightness-110"
          style={{ background: 'linear-gradient(90deg, #a78bfa, #ec4899, #f97316)' }}
        >
          Enter the Studios ⚡
        </Link>
        <p className="text-slate-600 text-sm mt-6">
          Free to join. No credit card required.
        </p>
      </motion.div>
    </section>
  )
}
