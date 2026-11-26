(() => {
  'use strict';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = navigator.connection && navigator.connection.saveData;
  if (!window.gsap || reduce || saveData) return;
  const gsap = window.gsap;
  if (window.ScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);
  gsap.defaults({ ease: 'power3.out', force3D: true });
  gsap.timeline()
    .from('.d-hero-top span', { y: 10, autoAlpha: 0, duration: .35, stagger: .08 })
    .from('.d-title-block h1 > span', { yPercent: 90, autoAlpha: 0, duration: .82, stagger: .12 }, '-=.08')
    .from('.d-deck', { y: 15, autoAlpha: 0, duration: .45 }, '-=.32')
    .from('.d-visual', { scale: .96, rotate: 2, autoAlpha: 0, duration: .82 }, '-=.38');
  if (!window.ScrollTrigger) return;
  ['.d-idea-grid', '.d-reading-header', '.d-reading-object', '.d-about-content'].forEach(selector => {
    gsap.utils.toArray(selector).forEach(element => gsap.fromTo(element, { y: 28, autoAlpha: 0 }, {
      y: 0, autoAlpha: 1, duration: .72,
      scrollTrigger: { trigger: element, start: 'top 85%', once: true }
    }));
  });
})();