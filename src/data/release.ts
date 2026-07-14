// ATLAS drops on July 20, 2026 (local time). Until then — or while any link is
// still a REPLACE_ME placeholder — the social/Spotify CTAs show a countdown
// instead of navigating. After release with real URLs filled in, they just work.
export const RELEASE_DATE = new Date(2026, 6, 20, 0, 0, 0)

// Human label ("July 20") derived from the date so every mention stays in sync.
export const RELEASE_LABEL = RELEASE_DATE.toLocaleDateString('en-US', {
  month: 'long',
  day: 'numeric',
})

export function isReleased(now: number = Date.now()): boolean {
  return now >= RELEASE_DATE.getTime()
}

export interface Remaining {
  days: number
  hours: number
  minutes: number
  seconds: number
  done: boolean
}

export function getRemaining(now: number = Date.now()): Remaining {
  const ms = Math.max(0, RELEASE_DATE.getTime() - now)
  const totalSeconds = Math.floor(ms / 1000)
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    done: ms === 0,
  }
}
