import { useRef, useState } from 'react'
import Reveal from '../Reveal'
import Petals from '../Petals'

const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

export default function JoinList() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | sent
  const timer = useRef(null)

  const submit = (e) => {
    e.preventDefault()
    if (!emailOk(email)) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    setStatus('sending')
    // TODO: send `email` to your mailing-list service (Mailchimp, Brevo, etc.)
    timer.current = setTimeout(() => setStatus('sent'), 1200)
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-6 pt-28 md:px-10">
      <Reveal from="zoom">
        <div className="relative overflow-hidden rounded-3xl bg-amber-deep px-6 py-16 text-center text-sand-light sm:py-20">
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 animate-ping-slow rounded-full border border-gold/40" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 animate-ping-slow rounded-full border border-gold/30 [animation-delay:1.2s]" aria-hidden="true" />
          <Petals />

          <p className="relative mb-3 text-sm font-light text-gold">The Nilufer list</p>
          <h2 className="relative mx-auto max-w-[20ch] font-luxe text-4xl font-medium leading-tight sm:text-6xl">Be first to meet our next blend</h2>
          <p className="relative mx-auto mt-5 max-w-[46ch] font-light leading-relaxed text-[#e3d5b6]">New scents, small-batch releases and the occasional story from the studio. Never more than once a month.</p>

          {status === 'sent' ? (
            <div className="relative mt-10 flex animate-rise flex-col items-center">
              <div className="relative grid h-16 w-16 place-items-center rounded-full border border-gold">
                <span className="absolute inset-0 animate-ping-slow rounded-full border border-gold/60" />
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c9a45c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 13l4 4L19 7" pathLength="1" strokeDasharray="1" className="animate-draw" />
                </svg>
              </div>
              <p className="mt-4 font-luxe text-3xl font-medium">You are on the list</p>
              <button type="button" onClick={() => { setStatus('idle'); setEmail('') }} className="group relative mt-3 text-sm text-[#e3d5b6]">
                Use a different email
                <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="relative mx-auto mt-10 max-w-lg">
              <div className={'flex flex-col gap-3 sm:flex-row ' + (error ? 'animate-shake' : '')}>
                <label className="group relative flex-1">
                  <span className="sr-only">Email address</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError('') }}
                    placeholder="Your email address"
                    autoComplete="email"
                    aria-invalid={!!error}
                    className="w-full border-b border-sand-light/40 bg-transparent px-1 py-3 text-base text-sand-light outline-none transition-colors duration-300 placeholder:text-sand-light/60 focus:border-gold"
                  />
                  <span className="absolute bottom-0 left-0 h-px w-0 bg-gold transition-all duration-500 group-focus-within:w-full" />
                </label>
                <button type="submit" disabled={status === 'sending'} className="group relative overflow-hidden bg-sand-light px-8 py-3 text-sm text-amber-deep transition-all duration-500 hover:shadow-[0_18px_30px_-14px_rgba(0,0,0,0.7)] disabled:cursor-wait">
                  <span className="absolute inset-y-0 left-0 w-1/3 animate-shimmer bg-gold/30" />
                  <span className="relative inline-flex items-center gap-2">
                    {status === 'sending' ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-amber-deep/30 border-t-amber-deep" />
                        Joining
                      </>
                    ) : (
                      'Join the list'
                    )}
                  </span>
                </button>
              </div>
              {error && <p role="alert" className="mt-3 animate-rise text-left text-sm text-[#ffb59f]">{error}</p>}
            </form>
          )}
        </div>
      </Reveal>
    </section>
  )
}
