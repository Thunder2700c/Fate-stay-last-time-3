(() => {
  'use strict';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = navigator.connection && navigator.connection.saveData;
  if (!window.gsap || reduce || saveData) return;
  const gsap = window.gsap;
  if (window.ScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);
  gsap.defaults({ ease: 'power3.out', force3D: true });
  gsap.timeline()
    .from('.m-hero-meta span', { y: 10, autoAlpha: 0, duration: .35, stagger: .07 })
    .from('.m-hero-overline', { y: 12, autoAlpha: 0, duration: .35 }, '-=.12')
    .from('.m-title > span', { yPercent: 90, autoAlpha: 0, duration: .7, stagger: .1 }, '-=.08')
    .from('.m-hero-art', { y: 18, scale: .97, autoAlpha: 0, duration: .65 }, '-=.28')
    .from('.m-hero-foot', { y: 12, autoAlpha: 0, duration: .4 }, '-=.25');
  if (!window.ScrollTrigger) return;
  ['.m-idea-layout', '.m-idea-foot', '.m-reading-intro', '.m-folio', '.m-about h2', '.m-about-bottom'].forEach(selector => {
    gsap.utils.toArray(selector).forEach(element => gsap.fromTo(element, { y: 22, autoAlpha: 0 }, {
      y: 0, autoAlpha: 1, duration: .62,
      scrollTrigger: { trigger: element, start: 'top 88%', once: true }
    }));
  });
})();