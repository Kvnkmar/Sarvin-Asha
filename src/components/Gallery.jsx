import { useState } from 'react'
import photo1 from '../assets/photo1.jpg'
import photo2 from '../assets/photo2.jpg'
import photo3 from '../assets/photo3.jpg'
import photo4 from '../assets/photo4.jpg'
import dsc06915 from '../assets/DSC06915.jpg'
import dsc06946 from '../assets/DSC06946.jpg'
import dsc06969 from '../assets/DSC06969.jpg'

const photos = [
  {
    src: dsc06915,
    alt: 'Sarvin Nair and Asha smiling together',
    span: 'col-span-2 md:col-span-3 row-span-2',
    position: 'center 42%',
  },
  {
    src: photo2,
    alt: 'Sarvin Nair and Asha embracing',
    span: 'col-span-1 row-span-1',
    position: 'center 35%',
  },
  {
    src: photo1,
    alt: 'Sarvin Nair and Asha together',
    span: 'col-span-1 row-span-1',
    position: 'center 45%',
  },
  {
    src: photo4,
    alt: 'Sarvin Nair and Asha in an embrace',
    span: 'col-span-1 row-span-1',
    position: 'center 35%',
  },
  {
    src: dsc06946,
    alt: 'Sarvin Nair and Asha showing their rings',
    span: 'col-span-1 row-span-1',
    position: 'center 55%',
  },
  {
    src: dsc06969,
    alt: 'A portrait of Sarvin Nair and Asha',
    span: 'col-span-1 row-span-1',
    position: 'center 35%',
  },
  {
    src: photo3,
    alt: 'Hands with wedding rings',
    span: 'col-span-1 row-span-1',
    position: 'center 58%',
  },
]

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null)

  return (
    <section id="gallery" className="py-32 bg-charcoal relative overflow-hidden">
      {/* Subtle top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20 fade-up">
          <p className="section-label mb-6" style={{ color: '#C9A84C' }}>Captured Moments</p>
          <h2 className="display-heading text-5xl md:text-6xl text-white mb-4">
            Our <span className="font-script font-light text-gold normal-case">Gallery</span>
          </h2>
          <p className="font-serif text-white/40 text-xl font-light italic">
            A glimpse into our love story
          </p>
        </div>

        {/* Symmetrical gallery grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[14rem] md:auto-rows-[16rem]">
          {photos.map((photo, i) => (
            <div
              key={i}
              className={`fade-in relative overflow-hidden cursor-pointer group ${photo.span}`}
              style={{ transitionDelay: `${i * 0.15}s` }}
              onClick={() => setLightbox(photo)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ objectPosition: photo.position }}
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/30 transition-colors duration-500 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-sans text-xs tracking-ultra uppercase text-white/80 font-light">
                  View
                </span>
              </div>
              {/* Gold corner on hover */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-gold/0 group-hover:border-gold/70 transition-colors duration-500" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-gold/0 group-hover:border-gold/70 transition-colors duration-500" />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center p-6 cursor-pointer"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-8 text-white/60 hover:text-gold font-sans text-xs tracking-ultra uppercase font-light transition-colors duration-300"
            onClick={() => setLightbox(null)}
          >
            Close {'\u00D7'}
          </button>
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            className="max-w-full max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </section>
  )
}
