# Nilufer - perfume website (React + Vite + Tailwind CSS)

## Run
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Pages
| Route | File |
|---|---|
| `/` | src/pages/Home.jsx (hero) |
| `/collections` | src/pages/Collections.jsx |
| `/perfume/:id` | src/pages/PerfumeDetails.jsx |
| `/category/:slug` | src/pages/Category.jsx |
| `/about` | src/pages/About.jsx (starts with New Collection section) |
| `/contact` | src/pages/Contact.jsx (form is a demo, connect a backend) |
| `/favorites` | src/pages/Favorites.jsx (liked perfumes, saved in the browser) |

## Edit content
- Perfumes: src/data/perfumes.js
- Real bottle photos: drop them in src/assets/perfumes/ (file name = perfume id, see README.txt there). Missing photos fall back to the drawn SVG bottle.
- Portrait photo in New Collection: set `MODEL_PHOTO` in src/components/NewCollection.jsx
- Colors, fonts, animations: `@theme` block in src/index.css

## Home sections (src/components/home/)
Hero slider (src/components/Hero.jsx), MarqueeStrip, Bestsellers, ShopByCategory,
ScentFinder, NilueferWay, JoinList (newsletter form is a demo, connect a mailing-list service).
Global: sticky Navbar, Footer, ScrollUI (progress bar + back-to-top).

## Docker
```bash
docker build -t nilufer-frontend .
docker run -d -p 8080:80 --name nilufer nilufer-frontend   # http://localhost:8080
```
