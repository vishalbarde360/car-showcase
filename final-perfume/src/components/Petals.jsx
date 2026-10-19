const petals = [
  { left: '5%', top: '78%', size: 12, dur: 11, delay: 0 },
  { left: '16%', top: '90%', size: 8, dur: 14, delay: 3 },
  { left: '28%', top: '70%', size: 11, dur: 12, delay: 6 },
  { left: '40%', top: '92%', size: 9, dur: 16, delay: 1 },
  { left: '55%', top: '80%', size: 14, dur: 13, delay: 8 },
  { left: '66%', top: '94%', size: 9, dur: 15, delay: 4 },
  { left: '77%', top: '72%', size: 12, dur: 12, delay: 9 },
  { left: '88%', top: '88%', size: 10, dur: 14, delay: 5 },
  { left: '94%', top: '66%', size: 8, dur: 17, delay: 2 },
]

// Slowly drifting gold petals for hero backgrounds.
export default function Petals() {
  return petals.map((p, i) => (
    <span
      key={i}
      aria-hidden="true"
      className="pointer-events-none absolute animate-drift rounded-[50%_0_50%_0] bg-gradient-to-br from-sand-light to-gold opacity-0"
      style={{
        left: p.left,
        top: p.top,
        width: p.size,
        height: p.size,
        animationDuration: `${p.dur}s`,
        animationDelay: `${p.delay}s`,
      }}
    />
  ))
}
