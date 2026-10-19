// Sample catalogue. Replace with real products (or an API) later.
const base = [
  { id: 'nilufer-original', name: 'Nilufer Original', categories: ['unisex', 'luxury'], price: 3200, rating: 4.9, tag: 'Bestseller', shape: 'classic',
    liquid: ['#c9732a', '#6a2a0c'], glass: '#3a1608', cap: ['#fff1c2', '#d9a93f', '#7a5112'],
    notes: { top: 'Bergamot', heart: 'White lotus', base: 'Amber' }, blurb: 'Warm amber over a soft white lotus.' },
  { id: 'midnight-oud', name: 'Midnight Oud', categories: ['men', 'oud'], price: 4200, rating: 4.8, shape: 'slim',
    liquid: ['#5b3a2a', '#1d0f08'], glass: '#120805', cap: ['#e9e2d0', '#9c9482', '#4a443a'],
    notes: { top: 'Saffron', heart: 'Oud', base: 'Leather' }, blurb: 'Smoked wood and dark leather after sunset.' },
  { id: 'white-lotus', name: 'White Lotus', categories: ['women'], price: 2800, rating: 4.7, tag: 'New', shape: 'round',
    liquid: ['#f6e6dc', '#d9b3a6'], glass: '#8d6a5f', cap: ['#fff6dc', '#e2bd62', '#8a6420'],
    notes: { top: 'Pear', heart: 'Lotus', base: 'Musk' }, blurb: 'Clean petals and pale musk, light as mist.' },
  { id: 'royal-saffron', name: 'Royal Saffron', categories: ['luxury', 'unisex'], price: 5600, rating: 4.9, shape: 'classic',
    liquid: ['#f0b83a', '#a8641a'], glass: '#5a3508', cap: ['#fff4cf', '#e0b04a', '#7a5112'],
    notes: { top: 'Saffron', heart: 'Rose', base: 'Sandalwood' }, blurb: 'Golden threads of saffron on creamy sandalwood.' },
  { id: 'amber-dusk', name: 'Amber Dusk', categories: ['men'], price: 3400, rating: 4.6, shape: 'slim',
    liquid: ['#e0823a', '#8a3a12'], glass: '#4a1c08', cap: ['#fff1c2', '#d9a93f', '#7a5112'],
    notes: { top: 'Orange peel', heart: 'Cardamom', base: 'Amber' }, blurb: 'Spiced citrus fading into resin.' },
  { id: 'rose-mirage', name: 'Rose Mirage', categories: ['women'], price: 3000, rating: 4.7, shape: 'round',
    liquid: ['#e89aa8', '#a8455a'], glass: '#5a1e2e', cap: ['#fff1e8', '#d9a0a0', '#7a3a4a'],
    notes: { top: 'Raspberry', heart: 'Damask rose', base: 'Patchouli' }, blurb: 'A desert rose with a sweet, dusty edge.' },
  { id: 'smoked-vetiver', name: 'Smoked Vetiver', categories: ['men', 'unisex'], price: 2900, rating: 4.5, shape: 'classic',
    liquid: ['#8a9a5a', '#2f3a1a'], glass: '#1a2208', cap: ['#f3f0d6', '#b8b078', '#5a5424'],
    notes: { top: 'Grapefruit', heart: 'Vetiver', base: 'Smoke' }, blurb: 'Green roots and a thread of campfire.' },
  { id: 'velvet-oud', name: 'Velvet Oud', categories: ['oud', 'luxury'], price: 6200, rating: 5.0, tag: 'Limited', shape: 'slim',
    liquid: ['#8a2a3a', '#3a0a14'], glass: '#200509', cap: ['#fff1c2', '#d9a93f', '#7a5112'],
    notes: { top: 'Plum', heart: 'Aged oud', base: 'Vanilla' }, blurb: 'Deep wine, aged oud and a soft vanilla finish.' },
  { id: 'jasmine-veil', name: 'Jasmine Veil', categories: ['women'], price: 2600, rating: 4.6, shape: 'round',
    liquid: ['#f7ecc8', '#d8c07a'], glass: '#8a7438', cap: ['#fffbe8', '#e8cf80', '#8a6a20'],
    notes: { top: 'Mandarin', heart: 'Jasmine', base: 'Cedar' }, blurb: 'Night jasmine behind a thin veil of citrus.' },
  { id: 'sandal-noir', name: 'Sandal Noir', categories: ['men', 'oud'], price: 3800, rating: 4.8, shape: 'classic',
    liquid: ['#6a4a3a', '#24150e'], glass: '#150a06', cap: ['#f0e6d0', '#b09a6a', '#5a4a24'],
    notes: { top: 'Black pepper', heart: 'Sandalwood', base: 'Oud' }, blurb: 'Creamy sandalwood cut with black pepper.' },
  { id: 'neroli-dawn', name: 'Neroli Dawn', categories: ['unisex'], price: 2700, rating: 4.5, tag: 'New', shape: 'round',
    liquid: ['#f2f0a8', '#b8c46a'], glass: '#5e6a24', cap: ['#fffbe8', '#d8d078', '#7a7424'],
    notes: { top: 'Neroli', heart: 'Orange blossom', base: 'White tea' }, blurb: 'First light on orange blossom and tea leaves.' },
  { id: 'imperial-musk', name: 'Imperial Musk', categories: ['luxury', 'women'], price: 7400, rating: 4.9, shape: 'slim',
    liquid: ['#9a7ac8', '#3a1e6a'], glass: '#1c0e38', cap: ['#fff1c2', '#d9a93f', '#7a5112'],
    notes: { top: 'Iris', heart: 'Violet', base: 'Royal musk' }, blurb: 'Powdery iris wrapped in rich, velvety musk.' },
]

export const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'rating', label: 'Top rated' },
  { value: 'name', label: 'Name: A to Z' },
]

export const formatPrice = (n) => '₹' + n.toLocaleString('en-IN')

// Longer details used on the perfume page
const extra = {
  'nilufer-original': { description: 'Our signature scent. Bright bergamot opens onto a calm white lotus heart, then melts into warm amber and soft musk. It is the blend that started everything, and still the one we wear ourselves.', ingredients: ['Bergamot', 'White lotus', 'Amber resin', 'White musk', 'Cedarwood'], moods: ['warm', 'floral'], longevity: 4, projection: 3, season: 'All year' },
  'midnight-oud': { description: 'Dark, smoky and quietly confident. Saffron sparks over aged oud, then settles into smooth leather. Made for evenings, long dinners and cooler weather.', ingredients: ['Saffron', 'Aged oud', 'Leather accord', 'Black amber', 'Cypriol'], moods: ['woody', 'warm'], longevity: 5, projection: 4, season: 'Autumn, winter' },
  'white-lotus': { description: 'Light as morning mist. Juicy pear and clean lotus petals rest on a skin-like musk. Easy to wear, easy to love, and gentle enough for every day.', ingredients: ['Pear', 'Lotus petals', 'Water lily', 'White musk', 'Blonde woods'], moods: ['floral', 'fresh'], longevity: 3, projection: 2, season: 'Spring, summer' },
  'royal-saffron': { description: 'Golden threads of saffron and damask rose over creamy sandalwood. Rich without being heavy, it is our most gifted bottle for celebrations.', ingredients: ['Saffron', 'Damask rose', 'Sandalwood', 'Amber', 'Vanilla'], moods: ['warm', 'floral'], longevity: 5, projection: 4, season: 'Autumn, winter' },
  'amber-dusk': { description: 'Spiced orange peel and cardamom fade into glowing amber and tonka bean, like the last light of a warm evening.', ingredients: ['Orange peel', 'Cardamom', 'Labdanum', 'Amber', 'Tonka bean'], moods: ['warm'], longevity: 4, projection: 3, season: 'Autumn' },
  'rose-mirage': { description: 'A desert rose with a sweet, dusty edge. Raspberry and pink pepper lift the petals before patchouli grounds everything.', ingredients: ['Raspberry', 'Damask rose', 'Pink pepper', 'Patchouli', 'Praline'], moods: ['floral', 'warm'], longevity: 4, projection: 3, season: 'All year' },
  'smoked-vetiver': { description: 'Green roots, crisp grapefruit and a thread of campfire smoke. Fresh and grounded, it suits long walks and quiet mornings.', ingredients: ['Grapefruit', 'Vetiver', 'Birch smoke', 'Cedar', 'Oakmoss'], moods: ['woody', 'fresh'], longevity: 4, projection: 3, season: 'Spring, autumn' },
  'velvet-oud': { description: 'Our most intense blend. Deep plum and aged oud sit on a soft vanilla and benzoin base. A little goes a long way, and it lingers for hours.', ingredients: ['Plum', 'Aged oud', 'Rose', 'Vanilla', 'Benzoin'], moods: ['woody', 'warm'], longevity: 5, projection: 5, season: 'Winter' },
  'jasmine-veil': { description: 'Night jasmine behind a thin veil of citrus. Soft, romantic and slightly creamy, with a clean cedar finish.', ingredients: ['Mandarin', 'Night jasmine', 'Orange blossom', 'Cedar', 'Soft musk'], moods: ['floral', 'fresh'], longevity: 3, projection: 3, season: 'Spring, summer' },
  'sandal-noir': { description: 'Creamy sandalwood cut with black pepper and a wisp of incense. Warm, smooth and distinctly masculine without shouting.', ingredients: ['Black pepper', 'Sandalwood', 'Oud', 'Incense', 'Vetiver'], moods: ['woody'], longevity: 4, projection: 3, season: 'Autumn, winter' },
  'neroli-dawn': { description: 'First light on orange blossom and white tea leaves. Bright, clean and calm, it is the easiest summer scent we make.', ingredients: ['Neroli', 'Orange blossom', 'White tea', 'Petitgrain', 'Light musk'], moods: ['fresh', 'floral'], longevity: 3, projection: 2, season: 'Summer' },
  'imperial-musk': { description: 'Powdery iris and violet wrapped in rich, velvety musk. Luxurious and enveloping, a scent that feels like soft cashmere.', ingredients: ['Iris', 'Violet', 'Royal musk', 'Ambrette', 'Sandalwood'], moods: ['floral', 'warm'], longevity: 5, projection: 4, season: 'All year' },
}

export const perfumes = base.map((p) => ({ ...p, ...extra[p.id] }))

export const sizes = [
  { ml: 30, factor: 0.45 },
  { ml: 50, factor: 0.65 },
  { ml: 100, factor: 1 },
]
export const priceFor = (perfume, size) => Math.round((perfume.price * size.factor) / 10) * 10

export const longevityLabels = ['1 to 2 hours', '3 to 4 hours', '5 to 6 hours', '7 to 9 hours', '10+ hours']
export const projectionLabels = ['Intimate', 'Soft', 'Moderate', 'Strong', 'Room-filling']

export const categoryInfo = {
  men: { title: 'For him', text: 'Woods, spice and smoke. Confident blends that start bold and settle into something warm.' },
  women: { title: 'For her', text: 'Petals, fruit and soft musk. Graceful blends that feel light on arrival and linger beautifully.' },
  unisex: { title: 'For everyone', text: 'Scents that ignore labels. Balanced, easy to share and made to suit any skin.' },
  oud: { title: 'The oud house', text: 'Aged oud, resin and smoke from old perfumery traditions. Deep, rich and unforgettable.' },
  luxury: { title: 'Luxury', text: 'Our rarest ingredients in our smallest batches. Gifts worth keeping and scents worth saving for.' },
}
