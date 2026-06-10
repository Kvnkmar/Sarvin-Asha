import storyPhoto from '../assets/DSC06969.jpg'
import './Story.css'

export default function Story() {
  return (
    <section id="story" className="story">
      <span className="story__watermark" aria-hidden="true">Forever</span>

      <div className="story__container">
        <div className="story__grid">
          <div className="story__image-wrap fade-in">
            <span className="story__frame" aria-hidden="true" />
            <img
              src={storyPhoto}
              alt="Sarvin Nair and Asha"
              className="story__image"
            />
            <div className="story__badge">
              <p className="story__badge-text">Est. 2026</p>
            </div>
          </div>

          <div className="story__text fade-up">
            <p className="story__eyebrow">Our Story</p>
            <h2 className="story__heading">
              Two souls,
              <span className="story__heading-accent">One Journey</span>
            </h2>

            <div className="story__body">
              <p>
                What began as a chance encounter blossomed into a love story
                written in the stars. Through shared laughter, quiet mornings,
                and a thousand little moments, Sarvin Nair and Asha discovered
                in each other a home.
              </p>
              <p>
                Now, surrounded by the people they love most, they invite you
                to witness the beginning of their forever &mdash; a celebration
                of love, family, and the beautiful journey ahead.
              </p>
            </div>

            <div className="story__signature" aria-hidden="true">
              <span className="story__signature-line" />
              <span className="story__signature-mark">S &amp; A</span>
              <span className="story__signature-line story__signature-line--right" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
