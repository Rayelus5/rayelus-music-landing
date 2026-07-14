import { LuMoon, LuSun } from 'react-icons/lu'
import type { Theme } from '../hooks/useTheme'

interface HeaderProps {
  theme: Theme
  onToggleTheme: () => void
}

const NAV = [
  { href: '#album', label: 'Album' },
  { href: '#spotify', label: 'Spotify' },
  { href: '#follow', label: 'Follow' },
]

export default function Header({ theme, onToggleTheme }: HeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-baseline gap-2">
          <span className="font-display text-sm font-bold tracking-[0.2em] text-chrome">
            RAYELUS
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-widest text-ink-soft sm:inline">
            atlas · 2026
          </span>
        </a>

        <nav className="flex items-center gap-1 sm:gap-2" aria-label="Site sections">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hidden rounded px-3 py-2 font-mono text-xs uppercase tracking-widest text-ink-soft transition-colors duration-200 hover:text-ink focus-visible:outline-2 focus-visible:outline-glow sm:inline-block"
            >
              {item.label}
            </a>
          ))}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            className="ml-2 flex size-11 cursor-pointer items-center justify-center rounded-full border border-line text-ink transition-colors duration-200 hover:border-glow hover:text-glow focus-visible:outline-2 focus-visible:outline-glow"
          >
            {theme === 'light' ? <LuMoon size={18} /> : <LuSun size={18} />}
          </button>
        </nav>
      </div>
    </header>
  )
}
