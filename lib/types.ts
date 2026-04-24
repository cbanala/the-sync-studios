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
  bio: string
  avatar_url: string
  instagram: string
  calendly_url: string
  is_admin: boolean
  created_at: string
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
