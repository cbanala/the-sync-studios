'use client'

interface FloatingSpriteProp {
  role: 'dancer' | 'filmmaker' | 'musician' | 'editor' | 'actor' | 'artist' | 'choreographer'
  style?: React.CSSProperties
  size?: number
}

const ROLE_EMOJI: Record<FloatingSpriteProp['role'], string> = {
  dancer: '💃',
  filmmaker: '🎬',
  musician: '🎵',
  editor: '🎧',
  actor: '🎭',
  artist: '🎨',
  choreographer: '✨',
}

const ROLE_COLOR: Record<FloatingSpriteProp['role'], string> = {
  dancer: '#a78bfa',
  filmmaker: '#f97316',
  musician: '#06b6d4',
  editor: '#3b82f6',
  actor: '#f59e0b',
  artist: '#10b981',
  choreographer: '#ec4899',
}

const ROLE_DURATION: Record<FloatingSpriteProp['role'], number> = {
  dancer: 6, filmmaker: 8, musician: 5, editor: 9, actor: 7, artist: 4, choreographer: 6,
}
const ROLE_DELAY: Record<FloatingSpriteProp['role'], number> = {
  dancer: 0, filmmaker: 1.5, musician: 0.8, editor: 2.4, actor: 1.2, artist: 2.0, choreographer: 0.4,
}

export default function FloatingSprite({ role, style, size = 56 }: FloatingSpriteProp) {
  const duration = ROLE_DURATION[role]
  const delay = ROLE_DELAY[role]

  return (
    <div
      style={{
        ...style,
        width: size,
        height: size,
        borderRadius: 12,
        backgroundColor: ROLE_COLOR[role] + '33',
        border: `2px solid ${ROLE_COLOR[role]}66`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.5,
        animation: `float ${duration}s ease-in-out ${delay}s infinite`,
        position: 'absolute',
        backdropFilter: 'blur(4px)',
      }}
    >
      {ROLE_EMOJI[role]}
    </div>
  )
}
