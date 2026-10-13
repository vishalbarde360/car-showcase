// Picks up every image dropped into src/assets/perfumes/ automatically.
// The file name (without extension) is the key, e.g. midnight-oud.png -> "midnight-oud".
const files = import.meta.glob('../assets/perfumes/*.{png,jpg,jpeg,webp,avif,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
})

export const productImages = Object.fromEntries(
  Object.entries(files).map(([path, url]) => [path.split('/').pop().replace(/\.[^.]+$/, ''), url]),
)

// PNG / WebP / AVIF / SVG can have a transparent background, JPG cannot.
export const hasAlpha = (url) => /\.(png|webp|avif|svg)(\?|$)/i.test(url)
