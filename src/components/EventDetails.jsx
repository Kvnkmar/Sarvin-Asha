const events = [
  {
    id: 'ceremony',
    icon: '\uD83D\uDC8D',
    title: 'Wedding Ceremony',
    time: '10:00 AM \u2013 12:00 PM',
    duration: 'Morning celebration',
    venue: "D'Raksh Golden Ballroom",
    address:
      'L1-01, Menara Maxisegar, Jalan Pandan Indah 4/5, Pandan Indah, 55100 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur',
    note: 'Please arrive 15 minutes early to be seated for the ceremony.',
    mapLink:
      'https://www.google.com/maps/search/?api=1&query=D%27Raksh+Golden+Ballroom+Menara+Maxisegar+Pandan+Indah',
  },
]

function EventCard({ event, index }) {
  return (
    <div
      className="fade-up group relative"
      style={{ transitionDelay: `${index * 0.15}s` }}
    >
      <div className="border border-gold/20 p-10 md:p-14 relative overflow-hidden hover:border-gold/50 transition-colors duration-500 bg-white">
        {/* Background hover fill */}
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Top left decorative corner */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-gold/40" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold/40" />

        <div className="relative z-10">
          {/* Icon & label */}
          <div className="flex items-center gap-4 mb-8">
            <span className="text-2xl">{event.icon}</span>
            <div className="h-px flex-1 bg-gold/20" />
          </div>

          <p className="section-label mb-3">Event {String(event.id)}</p>
          <h3 className="font-subheading text-3xl md:text-4xl text-charcoal font-light mb-8">
            {event.title}
          </h3>

          <div className="space-y-5 mb-8">
            <div className="flex items-start gap-5">
              <span className="font-sans text-xs tracking-ultra uppercase text-gold/60 font-light pt-0.5 w-20 shrink-0">
                Time
              </span>
              <div>
                <p className="font-serif text-xl text-charcoal font-light">{event.time}</p>
                <p className="font-sans text-xs text-charcoal/40 mt-1">{event.duration}</p>
              </div>
            </div>

            <div className="flex items-start gap-5">
              <span className="font-sans text-xs tracking-ultra uppercase text-gold/60 font-light pt-0.5 w-20 shrink-0">
                Venue
              </span>
              <p className="font-serif text-xl text-charcoal font-light">{event.venue}</p>
            </div>

            <div className="flex items-start gap-5">
              <span className="font-sans text-xs tracking-ultra uppercase text-gold/60 font-light pt-0.5 w-20 shrink-0">
                Address
              </span>
              <p className="font-serif text-charcoal/70 font-light leading-relaxed">{event.address}</p>
            </div>

            <div className="flex items-start gap-5">
              <span className="font-sans text-xs tracking-ultra uppercase text-gold/60 font-light pt-0.5 w-20 shrink-0">
                Note
              </span>
              <p className="font-serif italic text-charcoal/60 font-light">{event.note}</p>
            </div>
          </div>

          <a
            href={event.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-gold font-sans text-xs tracking-ultra uppercase font-light hover:gap-5 transition-all duration-300 group/link"
          >
            <span>View on Map</span>
            <span className="text-lg leading-none">{'\u2192'}</span>
          </a>
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
            When &amp; <span className="font-serif italic font-light text-gold normal-case">Where</span>
          </h2>
          <p className="font-serif text-charcoal/50 text-xl font-light italic">
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
