(() => {
  'use strict';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = navigator.connection && navigator.connection.saveData;
  const lowMemory = navigator.deviceMemory && navigator.deviceMemory <= 4;
  if (!window.gsap || reduce || saveData || lowMemory) return;
  const gsap = window.gsap;
  if (window.ScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);
  gsap.defaults({ ease: 'power3.out', force3D: true });
  const intro = gsap.timeline();
  intro.from('.m-kicker span', { y: 10, autoAlpha: 0, duration: .35, stagger: .06 })
    .from('.m-index', { y: 12, autoAlpha: 0, duration: .4 }, '-=.12')
    .from('.m-title > span', { yPercent: 110, autoAlpha: 0, duration: .72, stagger: .1 }, '-=.05')
    .from('.m-hero-bottom', { y: 14, autoAlpha: 0, duration: .45 }, '-=.35')
    .from('.m-art', { y: 18, scale: .97, autoAlpha: 0, duration: .7 }, '-=.3')
    .from('.m-art [data-thread]', { autoAlpha: 0, duration: .45 }, '-=.18')
    .from('.m-art [data-knot]', { scale: 0, transformOrigin: '50% 50%', duration: .28, stagger: .08 }, '-=.12');
  if (!window.ScrollTrigger) return;
  ['.m-idea h2', '.m-idea-foot', '.m-reading h2', '.m-book-wrap', '.m-reading-copy', '.m-about h2', '.m-about>p'].forEach(selector => {
    gsap.utils.toArray(selector).forEach(element => gsap.fromTo(element, { y: 22, autoAlpha: 0 }, {
      y: 0, autoAlpha: 1, duration: .65, force3D: true,
      scrollTrigger: { trigger: element, start: 'top 88%', once: true },
      onStart: () => { element.style.willChange = 'transform, opacity'; },
      onComplete: () => { element.style.willChange = 'auto'; }
    }));
  });
})();