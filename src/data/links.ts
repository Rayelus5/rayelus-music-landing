export const spotify = {
  album: 'https://open.spotify.com/intl-es/album/1YRhBnIjXioSdwILsGByLg?si=PM5YfqH4Ts6zWrHwo1qXxg',
  artist: 'https://open.spotify.com/intl-es/artist/4y1rkDQ51l6H4ePmXjFDE1',
} as const

export const appleMusic = 'https://music.apple.com/es/artist/rayelus/6790814505'

export type SocialId = 'spotify' | 'applemusic' | 'instagram' | 'tiktok' | 'soundcloud' | 'youtube'

export interface Social {
  id: SocialId
  name: string
  handle: string
  /** Absent while the profile isn't live yet (see `comingSoon`). */
  url?: string
  comingSoon?: boolean
}

export const socials: Social[] = [
  { id: 'spotify', name: 'Spotify', handle: 'Rayelus', url: spotify.artist },
  { id: 'applemusic', name: 'Apple Music', handle: 'Rayelus', url: appleMusic },
  { id: 'instagram', name: 'Instagram', handle: '@rayelus.es', url: 'https://www.instagram.com/rayelus.es/' },
  { id: 'tiktok', name: 'TikTok', handle: '@rayelus5', url: 'https://www.tiktok.com/@rayelus5' },
  { id: 'soundcloud', name: 'SoundCloud', handle: 'rayelus', url: 'https://soundcloud.com/rayelus' },
  { id: 'youtube', name: 'YouTube', handle: 'Coming soon', comingSoon: true },
]
