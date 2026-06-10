const VENUE = {
  name: "D'Raksh Golden Ballroom",
  area: 'Ampang, Kuala Lumpur',
  address:
    'L1-01, Menara Maxisegar, Jalan Pandan Indah 4/5, Pandan Indah, 55100 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur',
  maps: 'https://www.google.com/maps/search/?api=1&query=D%27Raksh+Golden+Ballroom+Menara+Maxisegar+Pandan+Indah',
  waze: 'https://waze.com/ul?q=D%27Raksh%20Golden%20Ballroom%20Menara%20Maxisegar%20Pandan%20Indah&navigate=yes',
}

export default function Location() {
  return (
    <section id="location" className="py-32 bg-cream relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 text-center">
        {/* Header */}
        <div className="fade-up mb-14">
          <p className="section-label mb-6">How to Get There</p>
          <h2 className="display-heading text-5xl md:text-6xl mb-6">
            The <span className="font-serif italic font-light text-gold normal-case">Venue</span>
          </h2>
          <p className="font-serif text-charcoal/50 text-xl font-light italic">
            Click below for directions to the celebration
          </p>
        </div>

        {/* Venue card */}
        <div className="fade-up border border-gold/20 bg-white p-10 md:p-14 relative">
          <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-gold/40" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold/40" />

          <span className="text-2xl block mb-6">{'📍'}</span>

          <h3 className="font-subheading text-3xl md:text-4xl text-charcoal font-light mb-2">
            {VENUE.name}
          </h3>
          <p className="font-sans text-xs tracking-ultra uppercase text-gold/60 font-light mb-7">
            {VENUE.area}
          </p>
          <p className="font-serif text-charcoal/70 text-lg font-light leading-relaxed mb-10 max-w-xl mx-auto">
            {VENUE.address}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={VENUE.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="gold-btn"
            >
              <span>Open in Google Maps</span>
            </a>
            <a
              href={VENUE.waze}
              target="_blank"
              rel="noopener noreferrer"
              className="gold-btn"
            >
              <span>Open in Waze</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
