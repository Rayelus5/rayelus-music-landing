import clsx from 'clsx'
import { motion } from 'motion/react'
import { LuPause, LuPlay } from 'react-icons/lu'
import { tracks } from '../data/tracks'
import type { AudioPlayer } from '../hooks/useAudioPlayer'

// One block per second of preview: a 30-pixel progress bar,
// borrowing the pixel-dissolve motif from the cover.
const PROGRESS_CELLS = 30

function PixelProgress({ progress, duration }: { progress: number; duration: number }) {
  const filled = Math.floor((progress / duration) * PROGRESS_CELLS)
  return (
    <div className="flex gap-px" role="progressbar" aria-label="Preview progress" aria-valuemin={0} aria-valuemax={PROGRESS_CELLS} aria-valuenow={filled}>
      {Array.from({ length: PROGRESS_CELLS }, (_, i) => (
        <div
          key={i}
          className={clsx(
            'h-1.5 flex-1 transition-colors duration-150',
            i < filled ? 'bg-glow' : 'bg-line',
          )}
        />
      ))}
    </div>
  )
}

export default function TrackList({ player }: { player: AudioPlayer }) {
  const { currentN, playing, progress, duration, missingN, toggle } = player

  return (
    <div className="grid gap-x-10 gap-y-1 lg:grid-cols-2">
      {tracks.map((track, index) => {
        const isCurrent = currentN === track.n
        const isPlaying = isCurrent && playing
        const isMissing = missingN === track.n
        return (
          <motion.div
            key={track.n}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.35, delay: (index % 9) * 0.03, ease: 'easeOut' }}
          >
            <button
              type="button"
              onClick={() => toggle(track)}
              aria-label={`${isPlaying ? 'Pause' : 'Play'} preview of ${track.title}`}
              className={clsx(
                'group flex w-full cursor-pointer items-center gap-4 rounded-lg border px-4 py-3 text-left transition-colors duration-200',
                'focus-visible:outline-2 focus-visible:outline-glow',
                isCurrent
                  ? 'border-glow/60 bg-surface'
                  : 'border-transparent hover:border-line hover:bg-surface/60',
              )}
            >
              <span
                className={clsx(
                  'flex size-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-200',
                  isPlaying
                    ? 'border-glow bg-glow text-surface'
                    : 'border-line text-ink-soft group-hover:border-glow group-hover:text-glow',
                )}
              >
                {isPlaying ? <LuPause size={14} /> : <LuPlay size={14} className="translate-x-px" />}
              </span>

              <span className="font-mono text-xs text-ink-soft">
                {String(track.n).padStart(2, '0')}
              </span>

              <span className="min-w-0 flex-1">
                <span
                  className={clsx(
                    'block truncate font-medium tracking-wide transition-colors duration-200',
                    isCurrent ? 'text-glow' : 'text-ink',
                  )}
                >
                  {track.title}
                </span>
                {isCurrent && !isMissing && (
                  <span className="mt-1.5 block">
                    <PixelProgress progress={progress} duration={duration} />
                  </span>
                )}
                {isMissing && (
                  <span role="status" className="mt-1 block font-mono text-[11px] uppercase tracking-widest text-ink-soft">
                    Preview coming soon
                  </span>
                )}
              </span>

              <span aria-hidden className="font-mono text-xs text-ink-soft/70">
                {track.zh}
              </span>
            </button>
          </motion.div>
        )
      })}
    </div>
  )
}
