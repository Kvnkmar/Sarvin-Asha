(function () {
  'use strict';

  /* =============================================
     SCROLL REVEAL — fade + slight upward motion
     ============================================= */
  const revealEls = document.querySelectorAll('.reveal');
  const heroEls = document.querySelectorAll('.hero .reveal');

  // Hero items animate via CSS keyframes on load — mark visible to skip observer
  heroEls.forEach((el) => el.classList.add('is-visible'));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach((el) => {
      if (!el.classList.contains('is-visible')) observer.observe(el);
    });
  } else {
    // Fallback: just show everything
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* =============================================
     RSVP FORM — minimal handler
     ============================================= */
  const form = document.getElementById('rsvpForm');
  const success = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      // Replace with real submission (fetch to your endpoint) when ready
      form.querySelectorAll('input, button').forEach((el) => (el.disabled = true));
      if (success) success.hidden = false;
    });
  }
})();
