(() => {
  'use strict';

  // Keep the section index in sync with the page; no reader-lab or field-guide
  // behaviour belongs on this deliberately short landing page.
  const sections = [...document.querySelectorAll('main section[id]')];
  const navLinks = [...document.querySelectorAll('[data-section-nav] a[href^="#"]')];

  if (!('IntersectionObserver' in window) || !sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        if (link.hash === '#' + entry.target.id) {
          link.setAttribute('aria-current', 'location');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    });
  }, { rootMargin: '-25% 0px -60% 0px', threshold: 0 });

  sections.forEach(section => observer.observe(section));
})();
