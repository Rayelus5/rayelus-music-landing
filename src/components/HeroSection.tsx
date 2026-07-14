import { motion } from 'motion/react'
import { FaSpotify } from 'react-icons/fa6'
import CDPlayer from './CDPlayer'
import TrackList from './TrackList'
import { useReleaseGate } from './ReleaseGate'
import { ALBUM, tracks } from '../data/tracks'
import { spotify } from '../data/links'
import { isReleased, RELEASE_LABEL } from '../data/release'
import type { AudioPlayer } from '../hooks/useAudioPlayer'

export default function HeroSection({ player }: { player: AudioPlayer }) {
  const currentTrack = tracks.find((t) => t.n === player.currentN)
  const { shouldGate, openComingSoon } = useReleaseGate()

  const onSpotifyClick = (e: React.MouseEvent) => {
    if (shouldGate(spotify.album)) {
      e.preventDefault()
      openComingSoon()
    }
  }

  return (
    <section id="album" className="mx-auto max-w-6xl px-4 pt-28 sm:px-6 lg:pt-36">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-ink-soft">
            Debut album · {isReleased() ? 'Out now' : RELEASE_LABEL}
          </p>
          <h1 className="mt-4 font-display text-6xl font-bold tracking-tight text-chrome sm:text-7xl lg:text-8xl">
            {ALBUM.title}
          </h1>
          <p className="mt-6 max-w-md text-lg text-ink-soft">
            {ALBUM.trackCount} electronic tracks by {ALBUM.artist}. Preview every song right
            here — 30 seconds each, the best part of each one.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => player.toggle(currentTrack ?? tracks[0])}
              className="cursor-pointer rounded-full bg-brand px-7 py-3.5 font-mono text-sm font-bold uppercase tracking-widest text-white transition-colors duration-200 hover:bg-brand-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-glow dark:text-bg"
            >
              {player.playing ? 'Pause preview' : 'Play the previews'}
            </button>
            <a
              href={spotify.album}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onSpotifyClick}
              className="flex items-center gap-2 rounded-full border border-line px-7 py-3.5 font-mono text-sm font-bold uppercase tracking-widest text-ink transition-colors duration-200 hover:border-glow hover:text-glow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-glow"
            >
              <FaSpotify size={16} aria-hidden />
              Listen on Spotify
            </a>
          </div>

          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.25em] text-ink-soft/70" aria-live="polite">
            {currentTrack
              ? `Now previewing — ${String(currentTrack.n).padStart(2, '0')} ${currentTrack.title} ${currentTrack.zh}`
              : `18 songs · Produced by ${ALBUM.artist} · ${ALBUM.year}`}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
        >
          <CDPlayer playing={player.playing} />
        </motion.div>
      </div>

      <div className="mt-20 lg:mt-28">
        <div className="mb-8 flex items-baseline justify-between gap-4">
          <h2 className="font-display text-xl font-bold uppercase tracking-[0.15em] sm:text-2xl">
            Preview the album
          </h2>
          <p className="hidden font-mono text-xs uppercase tracking-widest text-ink-soft sm:block">
            Tap any track
          </p>
        </div>
        <TrackList player={player} />
      </div>

      <div className="h-24" />
    </section>
  )
}
