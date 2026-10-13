import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Reveal from '../components/Reveal'
import SplitText from '../components/SplitText'
import Petals from '../components/Petals'
import { perfumes } from '../data/perfumes'

/* ------------------------------ content ------------------------------ */
// Placeholder details: replace with your real address, phone and email.
const info = [
  {
    title: 'Visit the studio',
    lines: ['Nilufer Studio, 12 Lotus Lane', 'Your City, India'],
    icon: <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Zm0-8.500a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />,
  },
  {
    title: 'Call us',
    lines: ['+91 98765 43210'],
    href: 'tel:+919876543210',
    icon: <path d="M5 4h4l2 5-2.5 1.500a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2Z" />,
  },
  {
    title: 'Write to us',
    lines: ['hello@nilufer.in'],
    href: 'mailto:hello@nilufer.in',
    icon: <path d="M4 6h16v12H4V6Zm0 0 8 7 8-7" />,
  },
  {
    title: 'Opening hours',
    lines: ['Monday to Saturday', '10 am to 7 pm'],
    icon: <path d="M12 7v5l3 2M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z" />,
  },
]

const topics = ['Perfume enquiry', 'Gifting and bulk', 'Collaboration', 'Something else']

const faqs = [
  { q: 'Can I try a scent before buying a full bottle?', a: 'Yes. We offer small discovery samples of every blend, so you can wear a scent for a few days before choosing your favorite.' },
  { q: 'How long does a bottle last?', a: 'A 100 ml bottle usually lasts three to six months with regular use. Stored away from sunlight and heat, it stays beautiful for years.' },
  { q: 'Do you make custom or private blends?', a: 'We do, in small numbers each season. Tell us what you have in mind through the form and our perfumer will reply with ideas.' },
  { q: 'Can you help me choose a gift?', a: 'Of course. Share who it is for and what they enjoy, and we will suggest two or three scents and wrap them by hand.' },
]

const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

/* ------------------------------ pieces ------------------------------ */

function Field({ label, error, children, className = '' }) {
  return (
    <div className={'relative ' + (error ? 'animate-shake ' : '') + className}>
      {children}
      <label className="pointer-events-none absolute -top-3.5 left-0 text-xs text-gold-deep transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-ink/60 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-gold-deep">
        {label}
      </label>
      <span className="absolute bottom-0 left-0 h-px w-0 bg-gold-deep transition-all duration-500 peer-focus:w-full" />
      {error && <p role="alert" className="mt-2 animate-rise text-xs text-[#a3361e]">{error}</p>}
    </div>
  )
}

const inputCls =
  'peer w-full border-b bg-transparent pb-2 pt-3 text-base outline-none transition-colors duration-300 placeholder-transparent focus:border-gold-deep '

function FaqItem({ item, open, onToggle }) {
  return (
    <div className="border-b border-gold/40">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="group flex w-full items-center justify-between gap-6 py-5 text-left"
      >
        <span className="font-luxe text-2xl font-medium text-amber-deep transition-colors duration-300 group-hover:text-gold-deep">{item.q}</span>
        <span className={'relative grid h-8 w-8 shrink-0 place-items-center rounded-full border border-gold-deep/50 transition-all duration-500 group-hover:bg-gold/25 ' + (open ? 'rotate-180 bg-gold/25' : '')}>
          <span className="absolute h-px w-3 bg-gold-deep" />
          <span className={'absolute h-3 w-px bg-gold-deep transition-transform duration-500 ' + (open ? 'scale-y-0' : '')} />
        </span>
      </button>
      <div className={'grid transition-all duration-500 ease-out ' + (open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0')}>
        <div className="overflow-hidden">
          <p className="max-w-[60ch] pb-6 font-light leading-[1.8]">{item.a}</p>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------- page -------------------------------- */

export default function Contact() {
  const [params] = useSearchParams()
  const fromPerfume = perfumes.find((p) => p.id === params.get('perfume'))

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    topic: fromPerfume ? topics[0] : topics[0],
    perfume: fromPerfume?.id ?? '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent
  const [openFaq, setOpenFaq] = useState(0)
  const heroRef = useRef(null)
  const glowRef = useRef(null)
  const formRef = useRef(null)
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }

  const validate = () => {
    const er = {}
    if (form.name.trim().length < 2) er.name = 'Please tell us your name.'
    if (!emailOk(form.email)) er.email = 'Please enter a valid email address.'
    if (form.message.trim().length < 10) er.message = 'Please write at least a short sentence.'
    return er
  }

  const submit = (e) => {
    e.preventDefault()
    const er = validate()
    setErrors(er)
    if (Object.keys(er).length) {
      formRef.current.querySelector('[data-invalid="true"]')?.focus()
      return
    }
    setStatus('sending')
    // TODO: send `form` to your backend or a form service (Formspree, EmailJS, etc.)
    timer.current = setTimeout(() => setStatus('sent'), 1400)
  }

  const reset = () => {
    setForm({ name: '', email: '', phone: '', topic: topics[0], perfume: '', message: '' })
    setErrors({})
    setStatus('idle')
  }

  const onHeroMove = (e) => {
    const r = heroRef.current.getBoundingClientRect()
    glowRef.current.style.setProperty('--mx', `${e.clientX - r.left}px`)
    glowRef.current.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <div className="text-ink">
      {/* ============ HEADER ============ */}
      <section ref={heroRef} onMouseMove={onHeroMove} className="relative overflow-hidden px-6 pb-14 pt-16 text-center md:px-10">
        <div ref={glowRef} className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_300px_at_var(--mx,50%)_var(--my,30%),rgba(201,164,92,0.25),transparent)]" />
        <Petals />
        <p className="relative mb-5 animate-rise text-sm font-light" style={{ animationDelay: '100ms' }}>
          <Link to="/" className="group inline-block">
            Home
            <span className="block h-px w-0 bg-gold-deep transition-all duration-300 group-hover:w-full" />
          </Link>
          <span className="mx-2 text-gold-deep">/</span>
          Contact
        </p>
        <h1 className="relative font-luxe text-[clamp(3rem,8vw,6.5rem)] font-medium leading-[0.95] text-gold-deep">
          <SplitText text="Let's talk scent" delay={250} />
        </h1>
        <p className="relative mx-auto mt-6 max-w-[50ch] animate-rise font-light leading-relaxed" style={{ animationDelay: '1100ms' }}>
          Questions about a blend, a gift or a custom bottle? Send us a note and we will write back within a day.
        </p>
      </section>

      {/* ============ INFO + FORM ============ */}
      <section className="mx-auto grid max-w-6xl gap-12 px-6 pb-20 md:px-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
        {/* info */}
        <div className="space-y-4">
          {info.map((it, i) => {
            const Wrapper = it.href ? 'a' : 'div'
            return (
              <Reveal key={it.title} from="left" delay={i * 130}>
                <Wrapper
                  href={it.href}
                  className="group flex items-center gap-5 rounded-2xl border border-gold/40 bg-sand-light/70 p-5 transition-all duration-500 hover:translate-x-2 hover:border-gold-deep/60 hover:shadow-[0_22px_36px_-22px_rgba(90,36,16,0.5)]"
                >
                  <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-full bg-amber-deep text-gold transition-transform duration-500 group-hover:rotate-[360deg] group-hover:scale-110">
                    <span className="absolute inset-0 animate-ping-slow rounded-full border border-gold/50" />
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      {it.icon}
                    </svg>
                  </span>
                  <span>
                    <span className="block font-luxe text-2xl font-medium leading-tight text-amber-deep">{it.title}</span>
                    {it.lines.map((l) => (
                      <span key={l} className="block text-sm font-light">{l}</span>
                    ))}
                  </span>
                </Wrapper>
              </Reveal>
            )
          })}

          {/* stylised map */}
          <Reveal from="left" delay={600}>
            <div className="group relative h-44 overflow-hidden rounded-2xl border border-gold/40 bg-gradient-to-br from-sand-light to-sand">
              <svg viewBox="0 0 400 176" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <g fill="none" stroke="#c9a45c" strokeOpacity="0.55" strokeWidth="1.5">
                  <path d="M-10 120C80 100 140 140 230 104S340 70 420 90" />
                  <path d="M60 -10C80 50 120 80 110 190" />
                  <path d="M250 -10C240 40 280 90 270 190" />
                  <path d="M-10 40C100 50 160 20 260 44S360 40 420 20" />
                </g>
                <g fill="#c9a45c" fillOpacity="0.22">
                  <rect x="150" y="60" width="50" height="30" rx="4" />
                  <rect x="300" y="110" width="60" height="34" rx="4" />
                  <rect x="20" y="130" width="46" height="28" rx="4" />
                </g>
              </svg>
              <div className="absolute left-[56%] top-[46%] -translate-x-1/2 -translate-y-1/2">
                <span className="absolute left-1/2 top-full h-3 w-3 -translate-x-1/2 -translate-y-1/2 animate-ping-slow rounded-full bg-gold-deep/50" />
                <svg viewBox="0 0 24 32" width="34" height="44" className="relative animate-float text-amber-deep drop-shadow-[0_8px_8px_rgba(90,36,16,0.35)]" aria-hidden="true">
                  <path d="M12 31S1 19.5 1 11.500a11 11 0 0 1 22 0C23 19.5 12 31 12 31Z" fill="currentColor" />
                  <circle cx="12" cy="11.5" r="4.5" fill="#efe4c9" />
                </svg>
              </div>
              <p className="absolute bottom-3 left-4 text-xs font-light">Nilufer Studio</p>
            </div>
          </Reveal>
        </div>

        {/* form */}
        <Reveal from="right">
          <div className="relative overflow-hidden rounded-3xl border border-gold/40 bg-sand-light/70 p-7 sm:p-10">
            {status === 'sent' ? (
              <div className="flex min-h-[460px] animate-rise flex-col items-center justify-center text-center">
                <div className="relative grid h-24 w-24 place-items-center">
                  <span className="absolute inset-0 animate-ping-slow rounded-full border border-gold-deep/50" />
                  <span className="absolute inset-0 rounded-full bg-amber-deep" />
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#c9a45c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative" aria-hidden="true">
                    <path d="M5 13l4 4L19 7" pathLength="1" strokeDasharray="1" className="animate-draw" />
                  </svg>
                </div>
                <h2 className="mt-8 font-luxe text-4xl font-medium text-amber-deep">Thank you, {form.name.split(' ')[0]}</h2>
                <p className="mt-3 max-w-[38ch] font-light leading-relaxed">Your message is on its way. We will reply to {form.email} within a day.</p>
                <button type="button" onClick={reset} className="group relative mt-8 text-sm">
                  Send another message
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gold-deep transition-transform duration-500 group-hover:scale-x-100" />
                </button>
                {[12, 28, 46, 64, 82].map((l, i) => (
                  <span key={l} aria-hidden="true" className="pointer-events-none absolute top-0 animate-fall rounded-[50%_0_50%_0] bg-gradient-to-br from-[#fdeadd] to-gold opacity-0" style={{ left: `${l}%`, width: 10 + (i % 3) * 3, height: 10 + (i % 3) * 3, animationDelay: `${i * 0.35}s`, animationIterationCount: 2 }} />
                ))}
              </div>
            ) : (
              <form ref={formRef} onSubmit={submit} noValidate>
                <h2 className="font-luxe text-4xl font-medium text-amber-deep">Send an enquiry</h2>
                <p className="mt-2 text-sm font-light">Fields marked with * are needed.</p>

                {fromPerfume && (
                  <p className="mt-5 inline-flex animate-rise items-center gap-2 rounded-full bg-gold/25 px-4 py-1.5 text-sm">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-gold-deep" />
                    About {fromPerfume.name}
                  </p>
                )}

                {/* topic chips */}
                <fieldset className="mt-8">
                  <legend className="mb-3 text-xs text-gold-deep">What is this about?</legend>
                  <div className="flex flex-wrap gap-2">
                    {topics.map((t) => (
                      <button
                        key={t}
                        type="button"
                        aria-pressed={form.topic === t}
                        onClick={() => setForm((f) => ({ ...f, topic: t }))}
                        className={
                          'rounded-full border px-4 py-1.5 text-sm transition-all duration-300 hover:-translate-y-0.5 ' +
                          (form.topic === t ? 'border-amber-deep bg-amber-deep text-sand-light shadow-[0_10px_18px_-10px_rgba(90,36,16,0.7)]' : 'border-gold-deep/40 hover:border-gold-deep hover:bg-gold/20')
                        }
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <div className="mt-10 grid gap-x-8 gap-y-9 sm:grid-cols-2">
                  <Field label="Your name *" error={errors.name}>
                    <input id="name" value={form.name} onChange={set('name')} placeholder=" " autoComplete="name" data-invalid={!!errors.name} aria-invalid={!!errors.name} className={inputCls + (errors.name ? 'border-[#a3361e]' : 'border-gold-deep/40')} />
                  </Field>
                  <Field label="Email *" error={errors.email}>
                    <input id="email" type="email" value={form.email} onChange={set('email')} placeholder=" " autoComplete="email" data-invalid={!!errors.email && !errors.name} aria-invalid={!!errors.email} className={inputCls + (errors.email ? 'border-[#a3361e]' : 'border-gold-deep/40')} />
                  </Field>
                  <Field label="Phone (optional)">
                    <input id="phone" type="tel" value={form.phone} onChange={set('phone')} placeholder=" " autoComplete="tel" className={inputCls + 'border-gold-deep/40'} />
                  </Field>

                  <div className="relative">
                    <label htmlFor="perfume" className="absolute -top-3.5 left-0 text-xs text-gold-deep">Perfume (optional)</label>
                    <select id="perfume" value={form.perfume} onChange={set('perfume')} className="w-full cursor-pointer appearance-none border-b border-gold-deep/40 bg-transparent pb-2 pt-3 text-base outline-none transition-colors focus:border-gold-deep">
                      <option value="">Not sure yet</option>
                      {perfumes.map((p) => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                    <svg width="12" height="12" viewBox="0 0 12 12" className="pointer-events-none absolute bottom-3 right-1" aria-hidden="true">
                      <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>

                  <Field label="Your message *" error={errors.message} className="sm:col-span-2">
                    <textarea
                      id="message"
                      rows={4}
                      value={form.message}
                      onChange={set('message')}
                      placeholder=" "
                      data-invalid={!!errors.message && !errors.name && !errors.email}
                      aria-invalid={!!errors.message}
                      className={inputCls + 'resize-none ' + (errors.message ? 'border-[#a3361e]' : 'border-gold-deep/40')}
                    />
                  </Field>
                </div>

                <div className="mt-10 flex items-center justify-between gap-4">
                  <p className="text-xs font-light">We only use your details to reply to you.</p>
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="group relative overflow-hidden bg-amber-deep px-9 py-3 text-sm text-sand-light transition-all duration-500 hover:shadow-[0_18px_30px_-14px_rgba(90,36,16,0.8)] disabled:cursor-wait"
                  >
                    <span className="absolute inset-y-0 left-0 w-1/3 animate-shimmer bg-white/15" />
                    <span className="relative inline-flex items-center gap-2">
                      {status === 'sending' ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-sand-light/40 border-t-sand-light" />
                          Sending
                        </>
                      ) : (
                        <>
                          Send message
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-500 group-hover:translate-x-1.5 group-hover:-translate-y-1" aria-hidden="true">
                            <path d="M3 11.5 21 3l-8.5 18-2.5-7.500L3 11.500Z" />
                          </svg>
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </section>

      {/* ============ FAQ ============ */}
      <section className="mx-auto max-w-3xl px-6 pb-24 md:px-10">
        <Reveal className="mb-8 text-center">
          <h2 className="font-luxe text-4xl font-medium text-amber-deep sm:text-5xl">Good to know</h2>
        </Reveal>
        <Reveal delay={150}>
          <div className="border-t border-gold/40">
            {faqs.map((f, i) => (
              <FaqItem key={f.q} item={f} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? -1 : i)} />
            ))}
          </div>
        </Reveal>
      </section>
    </div>
  )
}
