const families = [
  {
    role: 'The Groom',
    name: 'Sarvin',
    relation: 'Son of',
    parents: ['Mr. K. Chandren', 'Mrs. Nirmila Devi @ Prema'],
  },
  {
    role: 'The Bride',
    name: 'Asha',
    relation: 'Daughter of',
    parents: ['Late Mr. Muraletharan', 'Mrs. Barathi @ Santhi'],
  },
]

function FamilyCard({ family, index }) {
  return (
    <div
      className="fade-up text-center px-6"
      style={{ transitionDelay: `${index * 0.15}s` }}
    >
      <p className="section-label mb-5">{family.role}</p>
      <h3 className="font-subheading text-4xl md:text-5xl text-charcoal font-light mb-7">
        {family.name}
      </h3>
      <p className="font-sans text-xs tracking-ultra uppercase text-gold font-normal mb-5">
        {family.relation}
      </p>
      <div className="font-serif text-xl md:text-2xl text-charcoal/90 font-normal leading-relaxed">
        <p>{family.parents[0]}</p>
        <p className="text-gold/70 my-1 text-base font-serif italic">&amp;</p>
        <p>{family.parents[1]}</p>
      </div>
    </div>
  )
}

export default function Family() {
  return (
    <section id="family" className="py-32 bg-warm-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-20 fade-up">
          <p className="section-label mb-6">With Our Families&rsquo; Blessings</p>
          <h2 className="display-heading text-5xl md:text-6xl mb-6">
            Two Families,{' '}
            <span className="font-script font-light text-gold normal-case">One Union</span>
          </h2>
          <p className="font-serif text-charcoal/65 text-xl font-light italic">
            United in love and tradition
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 items-center relative">
          {/* Center divider with diamond */}
          <div className="hidden md:flex absolute left-1/2 top-0 bottom-0 -translate-x-1/2 flex-col items-center justify-center pointer-events-none">
            <span className="h-full w-px bg-gold/20" />
            <svg viewBox="0 0 24 24" className="w-5 h-5 absolute" aria-hidden="true">
              <path d="M12 2 L22 12 L12 22 L2 12 Z" fill="#FEFDFB" stroke="#C9A84C" strokeWidth="1" />
              <circle cx="12" cy="12" r="2" fill="#C9A84C" />
            </svg>
          </div>

          {families.map((family, i) => (
            <FamilyCard key={family.role} family={family} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
