import { useRef } from 'react'
import { motion, useAnimationFrame, useMotionValue, useReducedMotion } from 'motion/react'

interface CDPlayerProps {
  playing: boolean
}

const IDLE_SPEED = 10 // deg/s — the disc never fully rests, like a player on standby
const PLAY_SPEED = 130

export default function CDPlayer({ playing }: CDPlayerProps) {
  const rotation = useMotionValue(0)
  const speed = useRef(IDLE_SPEED)
  const reducedMotion = useReducedMotion()

  useAnimationFrame((_, delta) => {
    const target = reducedMotion ? 0 : playing ? PLAY_SPEED : IDLE_SPEED
    // ease toward the target speed so play/pause feels like real disc inertia
    speed.current += (target - speed.current) * Math.min(1, delta / 600)
    rotation.set((rotation.get() + (speed.current * delta) / 1000) % 360)
  })

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[420px] select-none sm:max-w-[480px]">
      {/* soft cyan glow behind the disc, stronger while playing */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-full bg-glow blur-3xl transition-opacity duration-700"
        style={{ opacity: playing ? 0.45 : 0.18 }}
      />
      <motion.img
        src="/images/cd-disc.webp"
        alt="ATLAS compact disc: a satellite view of Earth in blues, half dissolved into pixels"
        width={900}
        height={900}
        draggable={false}
        className="relative w-full drop-shadow-2xl"
        style={{ rotate: rotation }}
      />
    </div>
  )
}
