(() => {
  'use strict';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = navigator.connection && navigator.connection.saveData;
  if (!window.gsap || reduce || saveData) return;
  const gsap = window.gsap;
  if (window.ScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);
  gsap.defaults({ ease: 'power3.out', force3D: true });
  gsap.timeline()
    .from('.d-meta span', { y: 10, autoAlpha: 0, duration: .35, stagger: .08 })
    .from('.d-title-line', { yPercent: 110, autoAlpha: 0, duration: .86, stagger: .13 }, '-=.1')
    .from('.d-deck', { y: 18, autoAlpha: 0, duration: .5 }, '-=.38')
    .from('.d-art', { scale: .96, rotate: 1, autoAlpha: 0, duration: .95 }, '-=.55')
    .from('.d-art [data-thread]', { autoAlpha: 0, duration: .55 }, '-=.2')
    .from('.d-art [data-knot]', { scale: 0, transformOrigin: '50% 50%', duration: .32, stagger: .12 }, '-=.12');
  if (!window.ScrollTrigger) return;
  ['.d-statement-title', '.d-statement-copy', '.d-archive-art', '.d-archive-copy', '.d-colophon-copy'].forEach(selector => {
    gsap.utils.toArray(selector).forEach(element => gsap.fromTo(element, { y: 30, autoAlpha: 0 }, {
      y: 0, autoAlpha: 1, duration: .8, force3D: true,
      scrollTrigger: { trigger: element, start: 'top 84%', once: true },
      onStart: () => { element.style.willChange = 'transform, opacity'; },
      onComplete: () => { element.style.willChange = 'auto'; }
    }));
  });
})();