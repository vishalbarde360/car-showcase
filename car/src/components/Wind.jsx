// Wind streaks: car chya var, khali ani maage right pasun left kade vahtat.
const lines = [
  // [top %, width px, duration s, delay s, opacity]
  [6, 220, 1.4, 0, .5], [14, 140, 1.1, .5, .35], [22, 260, 1.7, .2, .45],
  [30, 120, .9, .9, .3], [40, 200, 1.5, .3, .25], [52, 180, 1.2, .7, .25],
  [62, 150, 1.0, .1, .3], [70, 240, 1.6, .6, .45], [78, 130, .9, 1.1, .35],
  [86, 280, 1.8, .4, .5], [93, 170, 1.2, .8, .4], [18, 90, .8, 1.3, .3],
  [74, 100, .8, 1.5, .3], [34, 300, 2.0, 1.0, .2],
]

export default function Wind() {
  return (
    <div className="pointer-events-none absolute -inset-x-10 inset-y-0 z-0 overflow-hidden">
      {lines.map(([top, w, d, delay, o], i) => (
        <span
          key={i}
          className="wind absolute left-full h-[2px] rounded-full bg-gradient-to-l from-white/90 via-white/30 to-transparent"
          style={{ top: `${top}%`, width: w, opacity: o, animationDuration: `${d}s`, animationDelay: `${delay}s` }}
        />
      ))}
      {/* red tint streaks */}
      {[24, 68].map((t, i) => (
        <span key={t} className="wind absolute left-full h-[3px] w-56 rounded-full bg-gradient-to-l from-honda to-transparent blur-[1px]"
          style={{ top: `${t}%`, animationDuration: '1.3s', animationDelay: `${i * .6}s` }} />
      ))}
    </div>
  )
}