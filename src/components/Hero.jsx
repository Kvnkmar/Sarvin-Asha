import './Hero.css'

// Served from /public at a stable path and preloaded in index.html, so the
// browser fetches it immediately rather than waiting for the JS bundle.
const heroPhoto = `${import.meta.env.BASE_URL}hero.jpg`

const MANDALA_SPOKES = [0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5]
const MANDALA_PETALS = [0, 45, 90, 135, 180, 225, 270, 315]

export default function Hero({ guestName }) {
  return (
    <section id="hero" className="hero">
      <div
        className="hero__bg"
        style={{ backgroundImage: `url(${heroPhoto})` }}
        aria-hidden="true"
      />
      <div className="hero__overlay" aria-hidden="true" />

      <svg className="hero__mandala" viewBox="0 0 400 400" aria-hidden="true">
        <g fill="none" stroke="#D4AF37" strokeWidth="0.4">
          <circle cx="200" cy="200" r="190" />
          <circle cx="200" cy="200" r="155" />
          <circle cx="200" cy="200" r="115" />
          <circle cx="200" cy="200" r="75" />
          <circle cx="200" cy="200" r="35" />
          <g transform="translate(200,200)">
            {MANDALA_SPOKES.map((deg) => (
              <line
                key={`spoke-${deg}`}
                x1="0"
                y1="-190"
                x2="0"
                y2="190"
                transform={`rotate(${deg})`}
              />
            ))}
          </g>
          <g transform="translate(200,200)">
            {MANDALA_PETALS.map((deg) => (
              <path
                key={`petal-${deg}`}
                d="M0,-155 Q35,-115 0,-75 Q-35,-115 0,-155 Z"
                transform={`rotate(${deg})`}
              />
            ))}
          </g>
        </g>
      </svg>

      <div className="hero__corner hero__corner--tl" aria-hidden="true" />
      <div className="hero__corner hero__corner--tr" aria-hidden="true" />
      <div className="hero__corner hero__corner--bl" aria-hidden="true" />
      <div className="hero__corner hero__corner--br" aria-hidden="true" />

      <div className="hero__content">
        <p className="hero__eyebrow">Together with their families</p>

        <h1 className="hero__title">
          <span className="hero__name">Sarvin Nair</span>
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

        <p className="hero__invitation">
          Request the honour of your presence
        </p>

        <p className="hero__details">
          13 September 2026 &bull; 10:00 AM &ndash; 12:00 PM &bull; D&rsquo;Raksh Golden Ballroom
        </p>

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
