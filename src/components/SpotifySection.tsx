import { motion } from 'motion/react'
import { FaSpotify } from 'react-icons/fa6'
import { spotify } from '../data/links'

export default function SpotifySection() {
  return (
    <section id="spotify" className="relative overflow-hidden">
      {/* booklet artwork as backdrop, veiled in deep blue for contrast */}
      <img
        src="/images/booklet-inner.webp"
        alt=""
        aria-hidden
        loading="lazy"
        width={1600}
        height={813}
        className="absolute inset-0 size-full object-cover"
      />
      <div aria-hidden className="absolute inset-0 bg-[#0a2540]/85" />
      {/* section emerges from the page background where the CD sinks under it */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-bg to-transparent"
      />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative mx-auto max-w-3xl px-4 py-28 text-center sm:px-6 lg:py-36"
      >
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-[#8fc7e8]">
          The full versions
        </p>
        <h2 className="mt-4 font-display text-3xl font-bold uppercase leading-tight tracking-wide text-white sm:text-5xl">
          30 seconds is just the intro
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-[#c9e3f5]">
          Every preview here cuts off right when it gets good. The full 18 tracks of ATLAS
          live on Spotify — and following Rayelus means the next release finds you first.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={spotify.album}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-full bg-spotify px-8 py-4 font-mono text-sm font-bold uppercase tracking-widest text-[#06131e] transition-transform duration-200 hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <FaSpotify size={20} aria-hidden />
            Open ATLAS on Spotify
          </a>
          <a
            href={spotify.artist}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/40 px-8 py-4 font-mono text-sm font-bold uppercase tracking-widest text-white transition-colors duration-200 hover:border-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Follow Rayelus
          </a>
        </div>
      </motion.div>
    </section>
  )
}
