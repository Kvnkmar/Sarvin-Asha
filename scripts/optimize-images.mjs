// One-off asset optimizer: resizes the camera-export JPEGs (multi-MB) down to
// web-appropriate dimensions/quality. Originals are preserved in git history.
// Run with: node scripts/optimize-images.mjs
import sharp from 'sharp'
import { readdir, stat, unlink, rename } from 'node:fs/promises'
import path from 'node:path'

const ASSETS = 'src/assets'
const MAX_EDGE = 2000 // longest side, plenty for a full-bleed background
const QUALITY = 80

const kb = (n) => `${Math.round(n / 1024)}KB`

// 1) A dedicated, preloadable hero copy at a stable path (served from /public).
//    Built from the original before the in-place pass below recompresses it.
await sharp(path.join(ASSETS, 'DSC06915.jpg'))
  .rotate()
  .resize({ width: 1920, fit: 'inside', withoutEnlargement: true })
  .jpeg({ quality: QUALITY, mozjpeg: true })
  .toFile('public/hero.jpg')
console.log(`public/hero.jpg written (${kb((await stat('public/hero.jpg')).size)})`)

// 2) Compress every JPEG in src/assets in place.
const files = (await readdir(ASSETS)).filter((f) => /\.jpe?g$/i.test(f))
for (const f of files) {
  const p = path.join(ASSETS, f)
  const before = (await stat(p)).size
  const tmp = `${p}.opt`
  await sharp(p)
    .rotate()
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toFile(tmp)
  await unlink(p)
  await rename(tmp, p)
  const after = (await stat(p)).size
  console.log(`${f}: ${kb(before)} -> ${kb(after)}`)
}
