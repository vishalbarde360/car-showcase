// Cards are built from the image files found in src/assets/cars (any file name works).
// If a file name contains a known model (city, civic, crv ...) its specs are filled in automatically.
const files = import.meta.glob('/src/**/*.{gif,png,jpg,jpeg,webp,avif,PNG,JPG,JPEG,WEBP}', { eager: true, query: '?url', import: 'default' })
const norm = s => s.toLowerCase().replace(/[^a-z0-9]/g, '')

const known = [
  { id: 'city', name: 'Honda City', tag: 'Sedan', power: '121 PS', mileage: '17-18 km/l', seats: 5, desc: 'Sharp, refined and quick — the city icon.' },
  { id: 'civic', name: 'Honda Civic', tag: 'Sedan', power: '158 PS', mileage: '16 km/l', seats: 5, desc: 'Low, wide stance built for the driver.' },
  { id: 'accord', name: 'Honda Accord', tag: 'Sedan', power: '212 PS (hybrid)', mileage: '23 km/l', seats: 5, desc: 'Executive comfort with hybrid efficiency.' },
  { id: 'elevate', name: 'Honda Elevate', tag: 'SUV', power: '121 PS', mileage: '15-16 km/l', seats: 5, desc: 'A bold compact SUV that stands tall.' },
  { id: 'crv', name: 'Honda CR-V', tag: 'SUV', power: '190 PS', mileage: '14 km/l', seats: 7, desc: 'Space and confidence for every road.' },
  { id: 'wrv', name: 'Honda WR-V', tag: 'SUV', power: '90 PS', mileage: '16-17 km/l', seats: 5, desc: 'Compact crossover with a sporty attitude.' },
  { id: 'amaze', name: 'Honda Amaze', tag: 'Sedan', power: '90 PS', mileage: '18 km/l', seats: 5, desc: 'Compact sedan, big on comfort.' },
  { id: 'jazz', name: 'Honda Jazz', tag: 'Hatchback', power: '90 PS', mileage: '18 km/l', seats: 5, desc: 'Compact, clever and full of fun.' },
]
const pretty = n => { const t = n.replace(/\(\d+\)/g, '').replace(/[-_]+/g, ' ').trim().replace(/\b\w/g, c => c.toUpperCase()); return /honda/i.test(t) ? t : 'Honda ' + t }

const imgs = Object.entries(files).map(([path, url]) => { const base = path.split('/').pop().replace(/\.[^.]+$/, ''); return { base, key: norm(base), url } })
const used = new Set()
let list = imgs.map(({ base, key, url }) => {
  const k = known.find(k => key.includes(k.id))
  if (k && !used.has(k.id)) { used.add(k.id); return { ...k, image: url, order: known.indexOf(k) } }
  return { id: key, name: pretty(base), tag: k ? k.tag : 'Honda', power: '—', mileage: '—', seats: '—', desc: 'Add details in src/data.js', image: url, order: 99 }
}).sort((a, b) => a.order - b.order)

if (!list.length) list = known.slice(0, 6) // no images yet → placeholders
console.info('[Honda showcase] images found:', imgs.map(i => i.base))
export const cars = list
export const pick = i => cars[i % cars.length]
export const byId = (id, fallback = 0) => {
  const found = cars.find(c => c.id.includes(id) || c.name.toLowerCase().includes(id))
  if (!found) console.warn(`"${id}" naavachi image sapadli nahi. Files:`, imgs.map(i => i.base))
  return found || pick(fallback)
}