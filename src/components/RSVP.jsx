import { useState } from 'react'

const INITIAL_FORM = {
  name: '',
  email: '',
  attendance: '',
  guests: '1',
  dietary: '',
  message: '',
}

const submitRSVP = async (data) => {
  // API integration point — replace with real endpoint
  // e.g. await fetch('/api/rsvp', { method: 'POST', body: JSON.stringify(data) })
  console.log('RSVP submitted:', data)
  return new Promise((resolve) => setTimeout(resolve, 1200))
}

export default function RSVP({ guestName }) {
  const [form, setForm] = useState({
    ...INITIAL_FORM,
    name: guestName || '',
  })
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errors, setErrors] = useState({})

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email'
    if (!form.attendance) errs.attendance = 'Please select your attendance'
    return errs
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setStatus('loading')
    try {
      await submitRSVP(form)
      setStatus('success')
      setForm(INITIAL_FORM)
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <section id="rsvp" className="py-32 bg-cream">
        <div className="max-w-xl mx-auto px-6 text-center">
          <div className="fade-in">
            <span className="text-5xl block mb-8">✦</span>
            <p className="section-label mb-6">Thank you</p>
            <h2 className="font-subheading text-gold text-5xl mb-6">See you there!</h2>
            <p className="font-serif text-charcoal/60 text-xl font-light leading-relaxed">
              Your RSVP has been received. We can't wait to celebrate with you.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-12 font-sans text-xs tracking-ultra uppercase text-gold/60 font-light hover:text-gold transition-colors duration-300"
            >
              Submit another response
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="rsvp" className="py-32 bg-cream relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-script text-gold/5" style={{ fontSize: '40vw', lineHeight: 1 }}>RSVP</span>
      </div>

      <div className="max-w-2xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 fade-up">
          <p className="section-label mb-6">Kindly Reply</p>
          <h2 className="display-heading text-5xl md:text-6xl mb-6">
            Will you <span className="font-script font-light text-gold normal-case">Join Us?</span>
          </h2>
          <p className="font-serif text-charcoal/65 text-lg font-light italic">
            Your presence means the world to us
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="fade-up space-y-10">
          {/* Name */}
          <div>
            <label className="section-label block mb-3">Full Name *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
              className="wedding-input"
            />
            {errors.name && (
              <p className="font-sans text-xs text-red-400 mt-2">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="section-label block mb-3">Email Address *</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="wedding-input"
            />
            {errors.email && (
              <p className="font-sans text-xs text-red-400 mt-2">{errors.email}</p>
            )}
          </div>

          {/* Attendance */}
          <div>
            <label className="section-label block mb-3">Attendance *</label>
            <select
              name="attendance"
              value={form.attendance}
              onChange={handleChange}
              className="wedding-input wedding-select"
            >
              <option value="">Please select...</option>
              <option value="ceremony">Joyfully attending the ceremony</option>
              <option value="decline">Regretfully declining</option>
            </select>
            {errors.attendance && (
              <p className="font-sans text-xs text-red-400 mt-2">{errors.attendance}</p>
            )}
          </div>

          {/* Number of guests — only show if attending */}
          {form.attendance && form.attendance !== 'decline' && (
            <div>
              <label className="section-label block mb-3">Number of Guests</label>
              <select
                name="guests"
                value={form.guests}
                onChange={handleChange}
                className="wedding-input wedding-select"
              >
                {[1, 2, 3, 4].map((n) => (
                  <option key={n} value={String(n)}>
                    {n} {n === 1 ? 'guest' : 'guests'}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Dietary */}
          <div>
            <label className="section-label block mb-3">Dietary Requirements</label>
            <input
              type="text"
              name="dietary"
              value={form.dietary}
              onChange={handleChange}
              placeholder="Vegetarian, vegan, allergies, etc."
              className="wedding-input"
            />
          </div>

          {/* Message */}
          <div>
            <label className="section-label block mb-3">A Message for the Couple</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Share your wishes..."
              rows={3}
              className="wedding-input resize-none"
              style={{ borderBottom: '1px solid #C9A84C44' }}
            />
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-5 border border-gold text-gold font-sans text-xs tracking-ultra uppercase font-light hover:bg-gold hover:text-white transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
            >
              <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                {status === 'loading' ? 'Sending...' : 'Send RSVP'}
              </span>
              <span className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>

            {status === 'error' && (
              <p className="font-sans text-xs text-red-400 text-center mt-4">
                Something went wrong. Please try again.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}
