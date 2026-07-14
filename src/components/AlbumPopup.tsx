import { useEffect, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { FaSpotify } from 'react-icons/fa6'
import Modal from './Modal'
import { useReleaseGate } from './ReleaseGate'
import { ALBUM } from '../data/tracks'
import { spotify } from '../data/links'
import { isReleased, RELEASE_LABEL } from '../data/release'

const SESSION_KEY = 'rayelus-popup-seen'
const OPEN_DELAY_MS = 900

export default function AlbumPopup() {
  const [open, setOpen] = useState(false)
  const reducedMotion = useReducedMotion()
  const { shouldGate, openComingSoon } = useReleaseGate()
  const released = isReleased()

  // Show once per browsing session, after a short beat so the page paints first.
  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return
    const timer = setTimeout(() => setOpen(true), OPEN_DELAY_MS)
    return () => clearTimeout(timer)
  }, [])

  const close = () => {
    sessionStorage.setItem(SESSION_KEY, '1')
    setOpen(false)
  }

  const onSpotifyClick = (e: React.MouseEvent) => {
    close()
    if (shouldGate(spotify.album)) {
      e.preventDefault()
      openComingSoon()
    }
  }

  return (
    <Modal open={open} onClose={close} labelledBy="popup-title" describedBy="popup-desc">
      <div className="flex flex-col items-center px-6 pb-7 pt-10 text-center sm:px-8">
        {/* spinning disc, echoing the hero player */}
        <img
          src="/images/cd-disc.webp"
          alt=""
          aria-hidden
          width={900}
          height={900}
          draggable={false}
          className={`mb-5 size-28 drop-shadow-xl sm:size-32 ${reducedMotion ? '' : 'animate-disc'}`}
        />

        <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-ink-soft">
          {released ? 'Out now' : `Dropping ${RELEASE_LABEL}`}
        </p>
        <h2 id="popup-title" className="mt-2 font-display text-4xl font-bold tracking-tight text-chrome">
          {ALBUM.title}
        </h2>
        <p id="popup-desc" className="mt-3 max-w-xs text-sm text-ink-soft">
          The debut album by {ALBUM.artist} — {ALBUM.trackCount} electronic tracks.
          {released ? ' Listen to the full thing on Spotify.' : ' Preview it now, full album on Spotify at launch.'}
        </p>

        <a
          href={spotify.album}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onSpotifyClick}
          className="mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-spotify px-6 py-3.5 font-mono text-sm font-bold uppercase tracking-widest text-[#06131e] transition-transform duration-200 hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-glow"
        >
          <FaSpotify size={18} aria-hidden />
          Listen on Spotify
        </a>
        <button
          type="button"
          onClick={close}
          className="mt-3 cursor-pointer rounded-full px-4 py-2 font-mono text-xs uppercase tracking-widest text-ink-soft transition-colors duration-200 hover:text-ink focus-visible:outline-2 focus-visible:outline-glow"
        >
          Preview it first
        </button>
      </div>
    </Modal>
  )
}
