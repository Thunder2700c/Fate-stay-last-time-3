(() => {
  'use strict';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = navigator.connection && navigator.connection.saveData;
  if (!window.gsap || reduce || saveData) return;
  const gsap = window.gsap;
  if (window.ScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);
  gsap.defaults({ ease: 'power3.out', force3D: true });
  gsap.timeline()
    .from('.t-hero-topline span', { y: 10, autoAlpha: 0, duration: .35, stagger: .08 })
    .from('.t-title-block h1 > span', { yPercent: 90, autoAlpha: 0, duration: .78, stagger: .11 }, '-=.08')
    .from('.t-title-foot', { y: 14, autoAlpha: 0, duration: .42 }, '-=.3')
    .from('.t-art-board', { scale: .96, rotate: 2, autoAlpha: 0, duration: .78 }, '-=.35');
  if (!window.ScrollTrigger) return;
  ['.t-idea-grid', '.t-reading-head', '.t-reading-spread', '.t-about-copy'].forEach(selector => {
    gsap.utils.toArray(selector).forEach(element => gsap.fromTo(element, { y: 26, autoAlpha: 0 }, {
      y: 0, autoAlpha: 1, duration: .68,
      scrollTrigger: { trigger: element, start: 'top 86%', once: true }
    }));
  });
})();