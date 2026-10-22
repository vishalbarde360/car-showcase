const lines = [[46,200,1.3,0,.6],[53,140,1.0,.5,.5],[60,260,1.6,.2,.6],[67,120,.9,.9,.45],[74,220,1.4,.3,.55],[81,160,1.1,.7,.5],[88,280,1.7,.1,.6],[93,130,.9,1.1,.45],[56,90,.8,1.3,.4],[78,100,.8,1.5,.4]]
export default function Wind() {
  return (
    <div className="pointer-events-none absolute -inset-x-10 inset-y-0 z-0 overflow-hidden">
      {lines.map(([top, w, d, delay, o], i) => (
        <span key={i} className="wind absolute left-full h-[2px] rounded-full bg-gradient-to-l from-white to-transparent"
          style={{ top: `${top}%`, width: w, opacity: o, animationDuration: `${d}s`, animationDelay: `${delay}s` }} />
      ))}
    </div>
  )
}
