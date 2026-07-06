import { useEffect, useState } from 'react'
import { RSVP_ENDPOINT, RSVP_CONFIGURED } from '../config'

// Google Apps Script Web Apps don't send CORS headers, so a normal cross-origin
// fetch() can't read the response. JSONP (a <script> load) isn't subject to
// CORS, so we ask the script to wrap its JSON in a callback we define. The
// script only returns messages the couple has approved (see rsvp-apps-script.gs).
let jsonpCounter = 0

function loadApprovedMessages() {
  return new Promise((resolve, reject) => {
    if (!RSVP_CONFIGURED) {
      resolve([])
      return
    }

    const callbackName = `__wishes_cb_${jsonpCounter++}`
    const script = document.createElement('script')
    let timer

    const cleanup = () => {
      delete window[callbackName]
      script.remove()
      if (timer) clearTimeout(timer)
    }

    window[callbackName] = (data) => {
      cleanup()
      resolve(Array.isArray(data) ? data : [])
    }

    script.onerror = () => {
      cleanup()
      reject(new Error('Failed to load messages'))
    }

    timer = setTimeout(() => {
      cleanup()
      reject(new Error('Timed out loading messages'))
    }, 12000)

    const sep = RSVP_ENDPOINT.includes('?') ? '&' : '?'
    script.src = `${RSVP_ENDPOINT}${sep}callback=${callbackName}`
    document.body.appendChild(script)
  })
}

function WishCard({ wish, index }) {
  return (
    <figure
      className="fade-up h-full flex flex-col justify-center bg-cream border border-gold/10 px-6 py-8 text-center"
      style={{ transitionDelay: `${Math.min(index, 6) * 0.08}s` }}
    >
      <span className="font-script text-gold/50 text-4xl leading-none block mb-2" aria-hidden="true">
        &ldquo;
      </span>
      <blockquote className="font-serif text-charcoal/80 text-base md:text-lg font-light italic leading-relaxed">
        {wish.message}
      </blockquote>
      {wish.name && (
        <figcaption className="section-label mt-5 not-italic">
          {wish.name}
        </figcaption>
      )}
    </figure>
  )
}

export default function Wishes() {
  const [wishes, setWishes] = useState([])
  const [status, setStatus] = useState('loading') // loading | ready | error

  useEffect(() => {
    let active = true
    loadApprovedMessages()
      .then((data) => {
        if (!active) return
        // Newest wishes first.
        setWishes([...data].reverse())
        setStatus('ready')
      })
      .catch(() => {
        if (active) setStatus('error')
      })
    return () => {
      active = false
    }
  }, [])

  const hasWishes = status === 'ready' && wishes.length > 0

  return (
    <section id="wishes" className="py-32 bg-warm-white relative overflow-hidden">
      {/* Decorative background flourish */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-script text-gold/5" style={{ fontSize: '30vw', lineHeight: 1 }}>
          &amp;
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 fade-up">
          <p className="section-label mb-6">From the Heart</p>
          <h2 className="display-heading text-5xl md:text-6xl mb-6">
            Words of{' '}
            <span className="font-script font-light text-gold normal-case">Warm Wishes</span>
          </h2>
          <p className="font-serif text-charcoal/65 text-lg font-light italic">
            Blessings and messages from those we love
          </p>
        </div>

        {/* Wishes wall */}
        {hasWishes && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishes.map((wish, i) => (
              <WishCard key={i} wish={wish} index={i} />
            ))}
          </div>
        )}

        {/* Loading / empty / error states — kept quiet and graceful */}
        {status === 'loading' && (
          <p className="text-center font-serif text-charcoal/40 text-lg font-light italic fade-in">
            Gathering messages&hellip;
          </p>
        )}

        {status === 'ready' && wishes.length === 0 && (
          <div className="text-center fade-up">
            <span className="ornament block mb-6">&#10086;</span>
            <p className="font-serif text-charcoal/50 text-xl font-light italic">
              No messages just yet &mdash; share the first one with your RSVP above.
            </p>
          </div>
        )}

        {status === 'error' && (
          <p className="text-center font-serif text-charcoal/40 text-lg font-light italic fade-in">
            Messages couldn&rsquo;t be loaded right now.
          </p>
        )}
      </div>
    </section>
  )
}
