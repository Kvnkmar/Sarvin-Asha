import { useEffect } from 'react'
import { useScrollAnimation } from './utils/hooks'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Story from './components/Story'
import Countdown from './components/Countdown'
import EventDetails from './components/EventDetails'
import Family from './components/Family'
import Gallery from './components/Gallery'
import RSVP from './components/RSVP'
import Location from './components/Location'
import Footer from './components/Footer'
import MusicToggle from './components/MusicToggle'

function getGuestName() {
  const params = new URLSearchParams(window.location.search)
  return params.get('name') || ''
}

export default function App() {
  // Initialize scroll-triggered animations
  useScrollAnimation()

  const guestName = getGuestName()

  // Re-run observer whenever DOM updates
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const elements = document.querySelectorAll('.fade-up, .fade-in')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  })

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero guestName={guestName} />
      <Story />
      <Countdown />
      <EventDetails />
      <Family />
      <Gallery />
      <RSVP guestName={guestName} />
      <Location />
      <Footer />
      <MusicToggle />
    </div>
  )
}
