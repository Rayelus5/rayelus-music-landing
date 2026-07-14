// TODO(Rayelus): replace every REPLACE_ME with your real URLs before deploying.

export const spotify = {
  album: 'https://open.spotify.com/album/REPLACE_ME',
  artist: 'https://open.spotify.com/artist/REPLACE_ME',
} as const

export type SocialId = 'instagram' | 'tiktok' | 'soundcloud' | 'spotify' | 'youtube'

export interface Social {
  id: SocialId
  name: string
  handle: string
  url: string
}

export const socials: Social[] = [
  { id: 'instagram', name: 'Instagram', handle: '@rayelus', url: 'https://instagram.com/REPLACE_ME' },
  { id: 'tiktok', name: 'TikTok', handle: '@rayelus', url: 'https://tiktok.com/@REPLACE_ME' },
  { id: 'soundcloud', name: 'SoundCloud', handle: 'rayelus', url: 'https://soundcloud.com/REPLACE_ME' },
  { id: 'spotify', name: 'Spotify', handle: 'Rayelus', url: spotify.artist },
  { id: 'youtube', name: 'YouTube', handle: '@rayelus', url: 'https://youtube.com/@REPLACE_ME' },
]
