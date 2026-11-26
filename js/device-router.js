(() => {
  'use strict';
  const choose = () => {
    const width = window.innerWidth || document.documentElement.clientWidth;
    return width <= 767 ? 'index.html' : width <= 1099 ? 'tablet.html' : 'desktop.html';
  };
  const current = () => {
    const file = location.pathname.split('/').pop();
    return file || 'index.html';
  };
  const moveIfNeeded = () => {
    const target = choose();
    if (current() !== target) {
      const next = new URL(target, document.baseURI);
      next.search = location.search;
      next.hash = location.hash;
      location.replace(next.href);
    }
  };
  moveIfNeeded();
  let queued = false;
  addEventListener('resize', () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; moveIfNeeded(); });
  }, { passive: true });
})();