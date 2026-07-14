// Converts the album artwork in "contenido visual/" into optimized web assets.
// Run with: npm run optimize-images
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'

const SRC = 'contenido visual'
const OUT = 'public/images'

await mkdir(OUT, { recursive: true })

const jobs = [
  // The bare CD disc — hero player artwork (keeps transparency)
  { in: 'cd-dvd-blu-ray.png', out: 'cd-disc.webp', width: 900 },
  { in: 'cd-dvd-blu-ray.png', out: 'cd-disc-sm.webp', width: 320 },
  // Full cover (disc on blue background) — dark-mode backdrop / social
  { in: 'ATLAS_cover.png', out: 'atlas-cover.webp', width: 1200 },
  // Booklet panels — tracklist artwork, Spotify section backdrop
  { in: 'diptico1-4.png', out: 'booklet-front.webp', width: 1600 },
  { in: 'diptico2-3.png', out: 'booklet-inner.webp', width: 1600 },
]

for (const job of jobs) {
  const input = path.join(SRC, job.in)
  const output = path.join(OUT, job.out)
  const info = await sharp(input)
    .resize({ width: job.width, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(output)
  console.log(`${output} — ${info.width}x${info.height}, ${(info.size / 1024).toFixed(0)} KB`)
}

// OG image: 1200x630 center-crop of the cover
const og = await sharp(path.join(SRC, 'ATLAS_cover.png'))
  .resize(1200, 630, { fit: 'cover', position: 'centre' })
  .webp({ quality: 82 })
  .toFile(path.join(OUT, 'atlas-cover-og.webp'))
console.log(`${path.join(OUT, 'atlas-cover-og.webp')} — ${og.width}x${og.height}, ${(og.size / 1024).toFixed(0)} KB`)

// Favicon from the bare disc
const fav = await sharp(path.join(SRC, 'cd-dvd-blu-ray.png'))
  .resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile(path.join(OUT, 'favicon.png'))
console.log(`${path.join(OUT, 'favicon.png')} — ${fav.width}x${fav.height}, ${(fav.size / 1024).toFixed(0)} KB`)

console.log('Done.')
