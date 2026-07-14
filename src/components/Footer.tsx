import { ALBUM } from '../data/tracks'

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-10 text-center sm:flex-row sm:justify-between sm:px-6 sm:text-left">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink-soft">
          {ALBUM.title} · {ALBUM.trackCount} songs · Produced by {ALBUM.artist}
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink-soft/70">
          © {ALBUM.year} {ALBUM.artist} · All rights reserved
        </p>
      </div>
    </footer>
  )
}
