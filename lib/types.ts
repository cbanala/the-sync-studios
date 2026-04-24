export type Role =
  | 'dancer'
  | 'filmmaker'
  | 'musician'
  | 'editor'
  | 'actor'
  | 'artist'
  | 'choreographer'

export interface Profile {
  id: string
  username: string
  full_name: string
  role: Role
  roles: Role[]
  bio: string
  avatar_url: string
  instagram: string
  calendly_url: string
  is_admin: boolean
  created_at: string
}

export interface RoomSuggestion {
  label: string
  emoji: string
  description: string
  href: string
}

export const ROLE_ROOM: Record<Role, RoomSuggestion> = {
  dancer:        { label: 'Dance Studio',    emoji: '💃', description: 'Movement, freestyle, choreography',      href: '/rooms/dance' },
  choreographer: { label: 'Rehearsal Space', emoji: '✨', description: 'Blocking, direction, performance',       href: '/rooms/rehearsal' },
  filmmaker:     { label: 'Film Room',       emoji: '🎬', description: 'Shoots, direction, cinematography',     href: '/rooms/film' },
  editor:        { label: 'Edit Suite',      emoji: '🎧', description: 'Post-production, color, cuts',          href: '/rooms/edit' },
  musician:      { label: 'Music Studio',    emoji: '🎵', description: 'Recording, composition, production',    href: '/rooms/music' },
  actor:         { label: 'Acting Studio',   emoji: '🎭', description: 'Scene work, improv, auditions',         href: '/rooms/acting' },
  artist:        { label: 'Visual Lab',      emoji: '🎨', description: 'Design, illustration, concept art',     href: '/rooms/art' },
}

export const ROLE_EMOJI: Record<Role, string> = {
  dancer: '💃',
  filmmaker: '🎬',
  musician: '🎵',
  editor: '🎧',
  actor: '🎭',
  artist: '🎨',
  choreographer: '✨',
}

export const ROLE_COLOR: Record<Role, string> = {
  dancer: '#a78bfa',
  filmmaker: '#f97316',
  musician: '#06b6d4',
  editor: '#3b82f6',
  actor: '#f59e0b',
  artist: '#10b981',
  choreographer: '#ec4899',
}
