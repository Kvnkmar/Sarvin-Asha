import { useState, useEffect } from 'react'
import { useCountdown } from '../utils/hooks'

const WEDDING_DATE = '2026-09-13T10:00:00'

function TimeUnit({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <span className="font-subheading text-5xl md:text-7xl text-charcoal font-light tabular-nums leading-none">
          {String(value).padStart(2, '0')}
        </span>
        <div className="absolute -bottom-1 left-0 right-0 h-px bg-gold/30" />
      </div>
      <span className="font-sans text-xs tracking-ultra uppercase text-gold/70 font-light mt-4">
        {label}
      </span>
    </div>
  )
}

export default function Countdown() {
  const getTimeLeft = useCountdown(WEDDING_DATE)
  const [timeLeft, setTimeLeft] = useState(getTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const isPast = timeLeft.total <= 0

  return (
    <section className="py-28 bg-charcoal relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 79px, #C9A84C 79px, #C9A84C 80px), repeating-linear-gradient(90deg, transparent, transparent 79px, #C9A84C 79px, #C9A84C 80px)',
        }} />
      </div>

      {/* Glowing gold orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gold/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="fade-up">
          <p className="section-label mb-4" style={{ color: '#C9A84C' }}>
            {isPast ? 'We are married!' : 'Counting down to'}
          </p>
          <h2 className="font-display text-5xl md:text-6xl text-white mb-16">
            {isPast ? 'Thank you for celebrating with us' : (
              <>The <span className="font-serif italic font-light text-gold normal-case">big day</span></>
            )}
          </h2>
        </div>

        {!isPast && (
          <div className="fade-up grid grid-cols-4 gap-4 md:gap-12 max-w-2xl mx-auto">
            <TimeUnit value={timeLeft.days} label="Days" />

            {/* Separator */}
            <div className="hidden md:flex items-center justify-center text-gold/40 font-serif text-4xl -mx-6">:</div>

            <TimeUnit value={timeLeft.hours} label="Hours" />

            <div className="hidden md:flex items-center justify-center text-gold/40 font-serif text-4xl -mx-6">:</div>

            <TimeUnit value={timeLeft.minutes} label="Minutes" />

            <div className="hidden md:flex items-center justify-center text-gold/40 font-serif text-4xl -mx-6">:</div>

            <TimeUnit value={timeLeft.seconds} label="Seconds" />
          </div>
        )}

        <div className="fade-in mt-16">
          <p className="font-serif text-white/40 italic text-xl">
            "A great love is a lot like a good marriage. You don't always understand it, but it's not supposed to make sense to anybody except the two people involved."
          </p>
          <p className="font-sans text-xs tracking-ultra uppercase text-gold/40 font-light mt-4">— Anonymous</p>
        </div>
      </div>
    </section>
  )
}
