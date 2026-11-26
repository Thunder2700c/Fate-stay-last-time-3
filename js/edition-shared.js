(() => {
  'use strict';
  const bar = document.querySelector('#page-progress-bar');
  const header = document.querySelector('[data-header]');
  document.querySelectorAll('[data-year]').forEach(node => { node.textContent = String(new Date().getFullYear()); });
  let ticking = false;
  const update = () => {
    const range = document.documentElement.scrollHeight - innerHeight;
    const progress = range > 0 ? Math.max(0, Math.min(1, scrollY / range)) : 0;
    if (bar) bar.style.transform = 'scaleX(' + progress + ')';
    if (header) header.classList.toggle('is-scrolled', scrollY > 18);
    ticking = false;
  };
  addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }, { passive: true });
  update();
  const button = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-mobile-menu]');
  if (button && menu) {
    const close = () => {
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-label', 'Open menu');
      menu.classList.remove('is-open');
      menu.setAttribute('inert', '');
    };
    button.addEventListener('click', () => {
      const open = button.getAttribute('aria-expanded') !== 'true';
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      menu.classList.toggle('is-open', open);
      if (open) menu.removeAttribute('inert'); else menu.setAttribute('inert', '');
    });
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', close));
    document.addEventListener('keydown', event => { if (event.key === 'Escape') close(); });
  }
})();