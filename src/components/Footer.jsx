export default function Footer() {
  return (
    <footer className="bg-charcoal py-16 text-center relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="max-w-xl mx-auto px-6">
        <h2 className="font-display text-gold text-6xl mb-4">Sharvin Nair &amp; Asha</h2>
        <p className="font-sans text-xs tracking-ultra uppercase text-white/30 font-light mb-8">
          13 · September · 2026
        </p>

        <div className="flex items-center gap-4 justify-center mb-10">
          <span className="h-px w-16 bg-gold/20" />
          <span className="text-gold/40 text-sm">✦</span>
          <span className="h-px w-16 bg-gold/20" />
        </div>

        <p className="font-serif text-white/40 italic text-lg md:text-xl font-light leading-relaxed">
          Thank you for being part of our journey. Your love, blessings, and
          support have meant so much to us, and we cannot wait to celebrate this
          special day together.
        </p>
        <p className="font-script text-4xl text-gold/80 mt-6">
          With love, Sharvin &amp; Asha
        </p>

        <p className="font-sans text-xs text-white/20 font-light mt-12 tracking-wide">
          Made with love ♥ Kuala Lumpur, Malaysia
        </p>
      </div>
    </footer>
  )
}
