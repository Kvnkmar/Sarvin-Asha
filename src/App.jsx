import { useEffect, useRef, useState } from 'react'
import { useScrollAnimation } from './utils/hooks'
import weddingSong from './assets/audio/wedding-song.mp3'

import EntryOverlay from './components/EntryOverlay'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Story from './components/Story'
import Countdown from './components/Countdown'
import EventDetails from './components/EventDetails'
import Family from './components/Family'
import Gallery from './components/Gallery'
import RSVP from './components/RSVP'
import Wishes from './components/Wishes'
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

  // The audio element lives here so both the entry overlay (which provides the
  // first user gesture) and the floating toggle can control the same track.
  const audioRef = useRef(null)
  const [entered, setEntered] = useState(false)

  // Keep the page dark behind the overlay; revert to the stylesheet's
  // warm-white background (by clearing the inline override) once entered.
  useEffect(() => {
    document.body.style.backgroundColor = entered ? '' : '#0a0406'
  }, [entered])

  const handleEnter = () => {
    setEntered(true)
    // The click on the overlay is the user gesture browsers require, so this
    // play() call is allowed and the song starts immediately on entry.
    audioRef.current?.play().catch(() => {})
  }

  return (
    <div className="min-h-screen">
      <audio ref={audioRef} src={weddingSong} loop preload="auto" />
      <EntryOverlay open={!entered} onEnter={handleEnter} />

      <Navbar />
      <Hero guestName={guestName} entered={entered} />
      <Story />
      <Family />
      <Countdown />
      <EventDetails />
      <Gallery />
      <RSVP guestName={guestName} />
      <Wishes />
      <Footer />
      <MusicToggle audioRef={audioRef} />
    </div>
  )
}
