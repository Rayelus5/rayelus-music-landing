import { motion } from 'motion/react'
import { FaInstagram, FaSoundcloud, FaSpotify, FaTiktok, FaYoutube } from 'react-icons/fa6'
import { SiApplemusic } from 'react-icons/si'
import { LuArrowUpRight } from 'react-icons/lu'
import { socials, type Social, type SocialId } from '../data/links'
import type { IconType } from 'react-icons'

const ICONS: Record<SocialId, IconType> = {
  spotify: FaSpotify,
  applemusic: SiApplemusic,
  instagram: FaInstagram,
  tiktok: FaTiktok,
  soundcloud: FaSoundcloud,
  youtube: FaYoutube,
}

const CARD =
  'flex items-center gap-4 rounded-xl border border-line bg-surface px-5 py-5 transition-colors duration-200'

function SocialCard({ social, index }: { social: Social; index: number }) {
  const Icon = ICONS[social.id]

  const inner = (
    <>
      <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-colors duration-200 group-hover:border-glow group-hover:text-glow">
        <Icon size={22} aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-medium tracking-wide text-ink">{social.name}</span>
        <span className="block truncate font-mono text-xs text-ink-soft">{social.handle}</span>
      </span>
    </>
  )

  const animation = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.4, delay: index * 0.05, ease: 'easeOut' },
  } as const

  // Coming soon (e.g. YouTube): a quiet, non-clickable card with a "Soon" badge.
  if (social.comingSoon) {
    return (
      <motion.div {...animation} aria-disabled className={`${CARD} cursor-default opacity-60`}>
        {inner}
        <span className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-ink-soft">
          Soon
        </span>
      </motion.div>
    )
  }

  return (
    <motion.a
      {...animation}
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group ${CARD} hover:border-glow focus-visible:outline-2 focus-visible:outline-glow`}
    >
      {inner}
      <LuArrowUpRight
        size={18}
        aria-hidden
        className="text-ink-soft transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-glow"
      />
    </motion.a>
  )
}

export default function SocialsSection() {
  return (
    <section id="follow" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:py-32">
      <p className="font-mono text-xs uppercase tracking-[0.35em] text-ink-soft">Everywhere else</p>
      <h2 className="mt-4 font-display text-3xl font-bold uppercase tracking-wide text-chrome sm:text-4xl">
        Follow the signal
      </h2>

      <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {socials.map((social, index) => (
          <SocialCard key={social.id} social={social} index={index} />
        ))}
      </div>
    </section>
  )
}
