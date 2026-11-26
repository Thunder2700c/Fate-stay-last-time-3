(() => {
  'use strict';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = navigator.connection && navigator.connection.saveData;
  if (!window.gsap || reduce || saveData) return;
  const gsap = window.gsap;
  if (window.ScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);
  gsap.defaults({ ease: 'power3.out', force3D: true });
  gsap.timeline()
    .from('.t-meta span', { y: 10, autoAlpha: 0, duration: .35, stagger: .06 })
    .from('.t-side-index,.t-kicker', { y: 14, autoAlpha: 0, duration: .4, stagger: .08 }, '-=.12')
    .from('.t-title>span', { yPercent: 110, autoAlpha: 0, duration: .8, stagger: .11 }, '-=.05')
    .from('.t-deck', { y: 15, autoAlpha: 0, duration: .45 }, '-=.35')
    .from('.t-art', { x: 18, scale: .97, autoAlpha: 0, duration: .8 }, '-=.4')
    .from('.t-art [data-thread]', { autoAlpha: 0, duration: .5 }, '-=.2')
    .from('.t-art [data-knot]', { scale: 0, transformOrigin: '50% 50%', duration: .3, stagger: .1 }, '-=.12');
  if (!window.ScrollTrigger) return;
  ['.t-idea-grid h2', '.t-idea-copy', '.t-reading-heading', '.t-reading-card', '.t-about-copy'].forEach(selector => {
    gsap.utils.toArray(selector).forEach(element => gsap.fromTo(element, { y: 26, autoAlpha: 0 }, {
      y: 0, autoAlpha: 1, duration: .72, force3D: true,
      scrollTrigger: { trigger: element, start: 'top 86%', once: true },
      onStart: () => { element.style.willChange = 'transform, opacity'; },
      onComplete: () => { element.style.willChange = 'auto'; }
    }));
  });
})();