import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import ComingSoonModal from './ComingSoonModal'
import { isReleased } from '../data/release'

interface ReleaseGateValue {
  /** True when a link should show the countdown instead of navigating. */
  shouldGate: (url: string) => boolean
  openComingSoon: () => void
}

const ReleaseGateContext = createContext<ReleaseGateValue | null>(null)

export function ReleaseGateProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  const openComingSoon = useCallback(() => setOpen(true), [])
  // Gate before release, and also whenever a URL is still an unfilled placeholder
  // (so a forgotten REPLACE_ME never sends a visitor to a broken link).
  const shouldGate = useCallback(
    (url: string) => !isReleased() || url.includes('REPLACE_ME'),
    [],
  )

  return (
    <ReleaseGateContext.Provider value={{ shouldGate, openComingSoon }}>
      {children}
      <ComingSoonModal open={open} onClose={() => setOpen(false)} />
    </ReleaseGateContext.Provider>
  )
}

export function useReleaseGate(): ReleaseGateValue {
  const value = useContext(ReleaseGateContext)
  if (!value) throw new Error('useReleaseGate must be used within ReleaseGateProvider')
  return value
}
