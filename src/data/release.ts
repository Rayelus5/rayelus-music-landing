// ATLAS drops on July 20, 2026 (local time). Used only for release-aware copy
// ("July 20" before release → "Out now" after) in the hero and welcome popup.
export const RELEASE_DATE = new Date(2026, 6, 20, 0, 0, 0)

// Human label ("July 20") derived from the date so every mention stays in sync.
export const RELEASE_LABEL = RELEASE_DATE.toLocaleDateString('en-US', {
  month: 'long',
  day: 'numeric',
})

export function isReleased(now: number = Date.now()): boolean {
  return now >= RELEASE_DATE.getTime()
}
