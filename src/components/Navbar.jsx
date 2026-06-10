import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'Our Story', href: '#story' },
  { label: 'When & Where', href: '#details' },
  { label: 'Family', href: '#family' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'RSVP', href: '#rsvp' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Solid bar when scrolled OR when the mobile menu is open
  const solid = scrolled || menuOpen
  const linkBase =
    'font-sans text-xs tracking-ultra uppercase font-light transition-colors duration-300 hover:text-gold'

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        solid
          ? 'bg-cream/95 backdrop-blur-sm border-b border-gold/10 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          className="font-script text-3xl text-gold animate-shimmer leading-none"
        >
          S & A
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`${linkBase} ${scrolled ? 'text-charcoal/60' : 'text-white/85'}`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-px transition-all duration-300 ${solid ? 'bg-charcoal' : 'bg-white'} ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
          />
          <span
            className={`block w-6 h-px transition-all duration-300 ${solid ? 'bg-charcoal' : 'bg-white'} ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block w-6 h-px transition-all duration-300 ${solid ? 'bg-charcoal' : 'bg-white'} ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${menuOpen ? 'max-h-72' : 'max-h-0'}`}
      >
        <div className="px-6 py-4 bg-cream/98 border-t border-gold/10 flex flex-col gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-sans text-xs tracking-ultra uppercase text-charcoal/60 hover:text-gold transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
