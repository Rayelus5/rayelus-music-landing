import { motion } from 'motion/react'
import { FaSpotify } from 'react-icons/fa6'
import CDPlayer from './CDPlayer'
import TrackList from './TrackList'
import { ALBUM, tracks } from '../data/tracks'
import { spotify } from '../data/links'
import { isReleased, RELEASE_LABEL } from '../data/release'
import type { AudioPlayer } from '../hooks/useAudioPlayer'

export default function HeroSection({ player }: { player: AudioPlayer }) {
  const currentTrack = tracks.find((t) => t.n === player.currentN)

  return (
    <section id="album" className="relative overflow-hidden">
      {/* Centered hero pitch */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mx-auto flex max-w-3xl flex-col items-center px-4 pt-28 text-center sm:px-6 sm:pt-32 lg:pt-40"
      >
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-ink-soft">
          Debut album · {isReleased() ? 'Out now' : RELEASE_LABEL}
        </p>
        <h1 className="mt-5 font-display text-7xl font-bold tracking-tight text-chrome sm:text-8xl">
          {ALBUM.title}
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-ink-soft">
          {ALBUM.trackCount} electronic tracks by {ALBUM.artist}. Preview every song right
          here — 30 seconds each, the best part of each one.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
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

      {/* Tracklist */}
      <div className="mx-auto mt-20 max-w-6xl px-4 sm:px-6 lg:mt-28">
        <div className="mb-8 text-center">
          <h2 className="font-display text-xl font-bold uppercase tracking-[0.15em] sm:text-2xl">
            Preview the album
          </h2>
          <p className="mt-2 font-mono text-xs uppercase tracking-widest text-ink-soft">
            Tap any track
          </p>
        </div>
        <TrackList player={player} />
      </div>

      {/* Giant spinning CD at the fold — top half visible, lower half sinks into
          the background and tucks under the next section. Click to play/pause. */}
      <div className="relative mt-20 sm:mt-28">
        <div className="relative mx-auto h-[min(44vw,360px)] w-[min(88vw,720px)]">
          <button
            type="button"
            onClick={() => player.toggle(currentTrack ?? tracks[0])}
            aria-label={player.playing ? 'Pause preview' : 'Play preview'}
            className="absolute inset-x-0 top-0 cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-glow"
          >
            <CDPlayer playing={player.playing} />
          </button>
        </div>
        {/* dissolve the disc into the background near the fold */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-b from-transparent to-bg"
        />
      </div>
    </section>
  )
}
