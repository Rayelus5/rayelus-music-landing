import { useCallback, useEffect, useRef, useState } from 'react'
import type { Track } from '../data/tracks'

export interface AudioPlayer {
  /** Track number currently loaded, or null when nothing is loaded */
  currentN: number | null
  playing: boolean
  /** Seconds elapsed in the current preview */
  progress: number
  /** Real clip duration once metadata loads (falls back to 30) */
  duration: number
  /** Track number whose preview file is unavailable (cleared automatically) */
  missingN: number | null
  toggle: (track: Track) => void
}

const FALLBACK_DURATION = 30
const FADE_IN_MS = 700
const PAUSE_FADE_MS = 250
// The clip's own ending fades over its final stretch, like a DJ closing the fader
const TAIL_FADE_SECONDS = 1.5

export function useAudioPlayer(): AudioPlayer {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const missingTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const fadeRaf = useRef<number | undefined>(undefined)
  const fadeGuard = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const [currentN, setCurrentN] = useState<number | null>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(FALLBACK_DURATION)
  const [missingN, setMissingN] = useState<number | null>(null)

  const cancelFade = useCallback(() => {
    if (fadeRaf.current !== undefined) cancelAnimationFrame(fadeRaf.current)
    fadeRaf.current = undefined
    clearTimeout(fadeGuard.current)
  }, [])

  const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)

  const fadeTo = useCallback(
    (audio: HTMLAudioElement, target: number, ms: number, onDone?: () => void) => {
      cancelFade()
      const from = audio.volume
      const start = performance.now()
      const finish = () => {
        cancelFade()
        // clamp: floating-point can nudge the target a hair outside [0,1]
        audio.volume = clamp01(target)
        onDone?.()
      }
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / ms)
        audio.volume = clamp01(from + (target - from) * t)
        if (t < 1) {
          fadeRaf.current = requestAnimationFrame(step)
        } else {
          finish()
        }
      }
      fadeRaf.current = requestAnimationFrame(step)
      // Safety net: requestAnimationFrame is paused while the tab is hidden, so
      // guarantee we still reach the target volume (audio would otherwise stay
      // silent if the user backgrounds the tab mid-fade).
      fadeGuard.current = setTimeout(finish, ms + 120)
    },
    [cancelFade],
  )

  useEffect(() => {
    return () => {
      cancelFade()
      audioRef.current?.pause()
      clearTimeout(missingTimer.current)
    }
  }, [cancelFade])

  const flagMissing = useCallback(
    (n: number) => {
      cancelFade()
      setPlaying(false)
      setCurrentN(null)
      setMissingN(n)
      clearTimeout(missingTimer.current)
      missingTimer.current = setTimeout(() => setMissingN(null), 4000)
    },
    [cancelFade],
  )

  const toggle = useCallback(
    (track: Track) => {
      if (!audioRef.current) {
        audioRef.current = new Audio()
        audioRef.current.preload = 'none'
        if (import.meta.env.DEV) {
          ;(window as unknown as { __atlasAudio?: HTMLAudioElement }).__atlasAudio =
            audioRef.current
        }
      }
      const audio = audioRef.current

      if (currentN === track.n) {
        if (playing) {
          // fade out quickly, then actually pause — no hard cut
          setPlaying(false)
          fadeTo(audio, 0, PAUSE_FADE_MS, () => audio.pause())
        } else {
          audio
            .play()
            .then(() => {
              setPlaying(true)
              fadeTo(audio, 1, FADE_IN_MS)
            })
            .catch(() => flagMissing(track.n))
        }
        return
      }

      cancelFade()
      audio.pause()
      audio.src = track.src
      audio.currentTime = 0
      audio.volume = 0
      setCurrentN(track.n)
      setProgress(0)
      setDuration(FALLBACK_DURATION)
      audio.onloadedmetadata = () => {
        if (Number.isFinite(audio.duration) && audio.duration > 0) setDuration(audio.duration)
      }
      audio.ontimeupdate = () => {
        setProgress(audio.currentTime)
        // hand volume control to the tail fade once the clip approaches its end
        const remaining = audio.duration - audio.currentTime
        if (Number.isFinite(remaining) && remaining <= TAIL_FADE_SECONDS && !audio.paused) {
          cancelFade()
          audio.volume = Math.max(0, Math.min(1, remaining / TAIL_FADE_SECONDS))
        }
      }
      audio.onended = () => {
        setPlaying(false)
        setProgress(0)
      }
      audio.onerror = () => flagMissing(track.n)
      audio
        .play()
        .then(() => {
          setPlaying(true)
          fadeTo(audio, 1, FADE_IN_MS)
        })
        .catch(() => flagMissing(track.n))
    },
    [currentN, playing, fadeTo, cancelFade, flagMissing],
  )

  return { currentN, playing, progress, duration, missingN, toggle }
}
