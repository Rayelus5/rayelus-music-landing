// Echo of the artwork's half-pixelated dissolve: a strip of squares that
// fades out like the album cover does. Deterministic pattern, no randomness.
const CELLS = 40

export default function PixelDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div aria-hidden className="flex overflow-hidden" style={{ transform: flip ? 'scaleX(-1)' : undefined }}>
      {Array.from({ length: CELLS }, (_, i) => {
        // opacity decays across the strip with a small interference wobble
        const decay = 1 - i / CELLS
        const wobble = 0.5 + 0.5 * Math.sin(i * 2.4)
        const opacity = Math.max(0, decay * (0.25 + 0.75 * wobble))
        return (
          <div
            key={i}
            className="aspect-square flex-1 bg-brand"
            style={{ opacity: Number(opacity.toFixed(2)) }}
          />
        )
      })}
    </div>
  )
}
