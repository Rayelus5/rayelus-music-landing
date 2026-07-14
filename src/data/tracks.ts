export interface Track {
  n: number
  title: string
  zh: string
  src: string
}

export const ALBUM = {
  title: 'ATLAS',
  artist: 'Rayelus',
  year: 2026,
  trackCount: 18,
} as const

const track = (n: number, title: string, zh: string, slug: string): Track => ({
  n,
  title,
  zh,
  src: `/audio/${String(n).padStart(2, '0')}-${slug}.mp3`,
})

export const tracks: Track[] = [
  track(1, 'ATLAS', '第一', 'atlas'),
  track(2, 'NOSTALGIA', '第二', 'nostalgia'),
  track(3, 'LATINO2000', '第三', 'latino2000'),
  track(4, 'NEW GALAXY', '第四', 'new-galaxy'),
  track(5, 'IRON BELLS', '第五', 'iron-bells'),
  track(6, 'LOBOTOMIC', '第六', 'lobotomic'),
  track(7, 'HERE HE COMES', '第七', 'here-he-comes'),
  track(8, 'RUN RUN RUN', '第八', 'run-run-run'),
  track(9, 'LOST TRACK', '第九', 'lost-track'),
  track(10, 'DISCO DISCO PARTY', '第十', 'disco-disco-party'),
  track(11, 'MELODICTRANCE', '第十一', 'melodictrance'),
  track(12, 'OH MY GOD', '第十二', 'oh-my-god'),
  track(13, 'HEAVY PIANO', '第十三', 'heavy-piano'),
  track(14, 'FLOW', '第十四', 'flow'),
  track(15, 'ARE YOU READY', '第十五', 'are-you-ready'),
  track(16, 'CHIPWORLD', '第十六', 'chipworld'),
  track(17, 'GENESIS', '第十七', 'genesis'),
  track(18, 'THE END', '第十八', 'the-end'),
]
