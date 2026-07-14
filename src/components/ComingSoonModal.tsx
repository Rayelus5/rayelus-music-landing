import { useEffect, useState } from 'react'
import { FaSpotify } from 'react-icons/fa6'
import Modal from './Modal'
import { getRemaining, RELEASE_LABEL, type Remaining } from '../data/release'

const pad = (n: number) => String(n).padStart(2, '0')

function Countdown() {
  const [remaining, setRemaining] = useState<Remaining>(() => getRemaining())

  // Tick once per second. This only mounts while the modal is open, so the
  // interval stops as soon as it closes.
  useEffect(() => {
    const id = setInterval(() => setRemaining(getRemaining()), 1000)
    return () => clearInterval(id)
  }, [])

  const cells: { value: number; label: string }[] = [
    { value: remaining.days, label: 'Days' },
    { value: remaining.hours, label: 'Hrs' },
    { value: remaining.minutes, label: 'Min' },
    { value: remaining.seconds, label: 'Sec' },
  ]

  return (
    <div
      className="mt-6 flex justify-center gap-2 sm:gap-3"
      role="timer"
      aria-label={`${remaining.days} days, ${remaining.hours} hours, ${remaining.minutes} minutes until release`}
    >
      {cells.map((cell) => (
        <div
          key={cell.label}
          className="flex min-w-[62px] flex-col items-center rounded-xl border border-line bg-bg px-2 py-3 sm:min-w-[68px]"
        >
          <span className="font-display text-3xl leading-none tabular-nums text-ink sm:text-4xl">
            {pad(cell.value)}
          </span>
          <span className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">
            {cell.label}
          </span>
        </div>
      ))}
    </div>
  )
}

interface ComingSoonModalProps {
  open: boolean
  onClose: () => void
}

export default function ComingSoonModal({ open, onClose }: ComingSoonModalProps) {
  return (
    <Modal open={open} onClose={onClose} labelledBy="coming-title" describedBy="coming-desc">
      <div className="flex flex-col items-center px-6 pb-7 pt-10 text-center sm:px-8">
        <span className="flex size-14 items-center justify-center rounded-full border border-line text-glow">
          <FaSpotify size={26} aria-hidden />
        </span>

        <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.35em] text-ink-soft">
          Dropping {RELEASE_LABEL}
        </p>
        <h2 id="coming-title" className="mt-2 font-display text-3xl font-bold text-chrome">
          Not live yet
        </h2>
        <p id="coming-desc" className="mt-3 max-w-xs text-sm text-ink-soft">
          Rayelus goes live on socials and Spotify the moment ATLAS drops. Until then, preview
          the album right here.
        </p>

        <Countdown />

        <button
          type="button"
          onClick={onClose}
          className="mt-7 cursor-pointer rounded-full bg-brand px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-white transition-colors duration-200 hover:bg-brand-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-glow dark:text-bg"
        >
          Keep previewing
        </button>
      </div>
    </Modal>
  )
}
