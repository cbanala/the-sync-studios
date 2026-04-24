'use client'

import { motion } from 'framer-motion'

const FEATURES = [
  {
    emoji: '💃',
    title: 'Dance Studio',
    description: 'Book Dance Cardio, Bollywood, Hip-Hop, and Contemporary classes. Pay online to secure your spot or reserve for in-person.',
    gradient: 'linear-gradient(135deg, #a78bfa22, #ec489922)',
    border: '#a78bfa44',
    label: 'Dance Quarter',
  },
  {
    emoji: '⚡',
    title: 'Sync Match',
    description: 'Explore a game-world map. Find dancers, filmmakers, musicians, and editors. Send a sync request. Chat. Schedule. Create.',
    gradient: 'linear-gradient(135deg, #06b6d422, #3b82f622)',
    border: '#06b6d444',
    label: 'The Map',
  },
  {
    emoji: '🎬',
    title: 'Film District',
    description: 'Directors find actors. Actors find crews. Editors find musicians. Every creative collaboration starts with one sync.',
    gradient: 'linear-gradient(135deg, #f9731622, #ef444422)',
    border: '#f9731644',
    label: 'Creative Network',
  },
  {
    emoji: '🎵',
    title: 'Music Alley',
    description: 'Musicians, producers, and sound engineers connect with the visuals they need. Make the track. Shoot the video.',
    gradient: 'linear-gradient(135deg, #06b6d422, #3b82f622)',
    border: '#3b82f644',
    label: 'Music Zone',
  },
  {
    emoji: '🎨',
    title: 'Art Studio',
    description: 'Visual artists and graphic designers sync with creators who need their eye. Concept becomes reality — together.',
    gradient: 'linear-gradient(135deg, #10b98122, #06b6d422)',
    border: '#10b98144',
    label: 'Art Zone',
  },
  {
    emoji: '🎭',
    title: 'Groups & Events',
    description: 'Form a crew. Start a project. Create a gig. Document every step. Your collaboration, captured and shared.',
    gradient: 'linear-gradient(135deg, #f59e0b22, #f9731622)',
    border: '#f59e0b44',
    label: 'Stage Corner',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="text-xs font-semibold tracking-[4px] uppercase mb-4" style={{ color: '#a78bfa' }}>
          What We Offer
        </p>
        <h2 className="font-display text-6xl md:text-7xl tracking-widest gradient-text-dance">
          THE STUDIOS
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURES.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="rounded-2xl p-6 flex flex-col gap-4 transition-transform hover:-translate-y-1"
            style={{
              background: feature.gradient,
              border: `1px solid ${feature.border}`,
            }}
          >
            <div className="text-4xl">{feature.emoji}</div>
            <div>
              <p className="text-xs font-semibold tracking-[3px] uppercase mb-2" style={{ color: '#64748b' }}>
                {feature.label}
              </p>
              <h3 className="font-display text-2xl tracking-wider text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
