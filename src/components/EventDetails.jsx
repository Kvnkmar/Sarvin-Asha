const events = [
  {
    id: 'ceremony',
    label: 'The Ceremony',
    title: 'Wedding Ceremony',
    weekday: 'Sunday',
    day: '13',
    monthYear: 'September 2026',
    time: '10:00 AM – 12:00 PM',
    duration: 'Morning celebration',
    venue: "D'Raksh Golden Ballroom",
    address:
      'L1-01, Menara Maxisegar, Jalan Pandan Indah 4/5, Pandan Indah, 55100 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur',
    note: 'Please arrive 15 minutes early to be seated for the ceremony.',
    mapLink:
      'https://www.google.com/maps/search/?api=1&query=D%27Raksh+Golden+Ballroom+Menara+Maxisegar+Pandan+Indah',
    wazeLink:
      'https://waze.com/ul?q=D%27Raksh%20Golden%20Ballroom%20Menara%20Maxisegar%20Pandan%20Indah&navigate=yes',
  },
]

function RingsOrnament() {
  return (
    <svg
      viewBox="0 0 70 44"
      className="w-16 h-10 mx-auto"
      fill="none"
      stroke="#C9A84C"
      strokeWidth="1.3"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="27" cy="26" r="13.5" />
      <circle cx="43" cy="26" r="13.5" />
      <path d="M27 11.5 L30.5 16 L27 20 L23.5 16 Z" fill="#C9A84C" stroke="none" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21c4-4.6 6.5-8.1 6.5-11A6.5 6.5 0 0 0 5.5 10c0 2.9 2.5 6.4 6.5 11z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  )
}

function NoteIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <path d="M12 7.6h.01" />
    </svg>
  )
}

function DetailRow({ icon, label, children }) {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-2 mb-2.5 text-gold">
        <span className="shrink-0">{icon}</span>
        <p className="font-sans text-[0.7rem] tracking-ultra uppercase font-normal">
          {label}
        </p>
      </div>
      {children}
    </div>
  )
}

function EventCard({ event, index }) {
  return (
    <div
      className="fade-up relative"
      style={{ transitionDelay: `${index * 0.15}s` }}
    >
      <div className="relative bg-white border border-gold/30 shadow-[0_30px_70px_-35px_rgba(160,120,48,0.45)]">
        {/* Inset hairline frame */}
        <span className="pointer-events-none absolute inset-[10px] border border-gold/15" />

        {/* Corner accents */}
        <span className="pointer-events-none absolute -top-px -left-px w-9 h-9 border-t border-l border-gold/60" />
        <span className="pointer-events-none absolute -top-px -right-px w-9 h-9 border-t border-r border-gold/60" />
        <span className="pointer-events-none absolute -bottom-px -left-px w-9 h-9 border-b border-l border-gold/60" />
        <span className="pointer-events-none absolute -bottom-px -right-px w-9 h-9 border-b border-r border-gold/60" />

        <div className="relative px-8 py-14 md:px-16 md:py-16">
          {/* Header */}
          <div className="text-center">
            <RingsOrnament />
            <p className="section-label mt-6 mb-3">{event.label}</p>
            <h3 className="font-script text-4xl md:text-5xl text-charcoal font-light leading-tight">
              {event.title}
            </h3>
          </div>

          {/* Ornamental divider */}
          <div className="gold-divider w-44 mx-auto">
            <svg viewBox="0 0 24 24" className="w-3 h-3 text-gold shrink-0" fill="currentColor" aria-hidden="true">
              <path d="M12 2 L20 12 L12 22 L4 12 Z" />
            </svg>
          </div>

          {/* Date focal point */}
          <div className="flex items-stretch justify-center text-center">
            <div className="flex flex-col justify-center pr-5 md:pr-7">
              <span className="font-sans text-[0.7rem] tracking-ultra uppercase text-gold font-normal">
                {event.weekday}
              </span>
            </div>
            <div className="flex flex-col items-center justify-center px-5 md:px-7 border-x border-gold/25">
              <span className="font-serif text-6xl md:text-7xl text-gold font-light leading-none">
                {event.day}
              </span>
            </div>
            <div className="flex flex-col justify-center pl-5 md:pl-7">
              <span className="font-sans text-[0.7rem] tracking-ultra uppercase text-gold font-normal">
                {event.monthYear}
              </span>
            </div>
          </div>

          {/* Time */}
          <div className="text-center mt-6">
            <p className="font-serif text-xl md:text-2xl text-charcoal font-light tracking-wide">
              {event.time}
            </p>
            <p className="font-sans text-xs text-charcoal/55 mt-1.5 tracking-wide">{event.duration}</p>
          </div>

          {/* Details */}
          <div className="mt-12 space-y-8 max-w-md mx-auto">
            <DetailRow icon={<PinIcon />} label="Venue">
              <p className="font-serif text-xl text-charcoal font-medium">{event.venue}</p>
              <p className="font-serif text-base text-charcoal/75 font-light leading-relaxed mt-2">
                {event.address}
              </p>
            </DetailRow>

            <DetailRow icon={<NoteIcon />} label="Good to know">
              <p className="font-serif text-base italic text-charcoal/75 font-light leading-relaxed">
                {event.note}
              </p>
            </DetailRow>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mt-12 max-w-md mx-auto">
            <a
              href={event.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="gold-btn flex-1"
            >
              <span>Google Maps</span>
            </a>
            <a
              href={event.wazeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="gold-btn flex-1"
            >
              <span>Waze</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function EventDetails() {
  return (
    <section id="details" className="py-32 bg-cream relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-20 fade-up">
          <p className="section-label mb-6">Save the Date</p>
          <h2 className="display-heading text-5xl md:text-6xl mb-6">
            When &amp; <span className="font-script font-light text-gold normal-case">Where</span>
          </h2>
          <p className="font-serif text-charcoal/65 text-xl font-light italic">
            Sunday, the 13th of September, 2026
          </p>
        </div>

        {/* Event card */}
        <div className="max-w-2xl mx-auto">
          {events.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
