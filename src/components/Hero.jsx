import heroPhoto from '../assets/DSC06915.jpg'
import './Hero.css'

export default function Hero({ guestName }) {
  return (
    <section id="hero" className="hero">
      <div
        className="hero__bg"
        style={{ backgroundImage: `url(${heroPhoto})` }}
        aria-hidden="true"
      />
      <div className="hero__overlay" aria-hidden="true" />

      <div className="hero__corner hero__corner--tl" aria-hidden="true" />
      <div className="hero__corner hero__corner--tr" aria-hidden="true" />
      <div className="hero__corner hero__corner--bl" aria-hidden="true" />
      <div className="hero__corner hero__corner--br" aria-hidden="true" />

      <div className="hero__content">
        <p className="hero__eyebrow">Together with their families</p>

        <h1 className="hero__names">
          <span className="hero__name">Sharvin Nair</span>
          <span className="hero__amp" aria-hidden="true">&amp;</span>
          <span className="hero__name">Asha</span>
        </h1>

        <div className="hero__ornament" aria-hidden="true">
          <span className="hero__line" />
          <svg viewBox="0 0 24 24" className="hero__diamond">
            <path
              d="M12 2 L22 12 L12 22 L2 12 Z"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1"
            />
            <circle cx="12" cy="12" r="2" fill="#D4AF37" />
          </svg>
          <span className="hero__line" />
        </div>

        <p className="hero__date">
          The Twenty-First of June, Two Thousand Twenty-Five
        </p>
        <p className="hero__location">Kuala Lumpur &middot; Malaysia</p>

        {guestName && (
          <p className="hero__guest">Dear {guestName}, you are invited</p>
        )}

        <a href="#rsvp" className="hero__cta">
          Kindly RSVP
        </a>
      </div>
    </section>
  )
}
