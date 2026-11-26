(() => {
  'use strict';

  const storageKey = 'fslt-reader-preferences-v1';
  const defaults = { tone: 'paper', size: 17, leading: 1.8, width: 'comfortable', font: 'serif' };
  const labs = [...document.querySelectorAll('[data-reader-lab]')];

  function readPreferences() {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
      return { ...defaults, ...saved };
    } catch {
      return { ...defaults };
    }
  }

  function savePreferences(state) {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      // The controls still work for this page if storage is unavailable.
    }
  }

  function applyLab(lab, state) {
    lab.dataset.tone = state.tone;
    lab.style.setProperty('--preview-size', state.size + 'px');
    lab.style.setProperty('--preview-leading', state.leading);
    lab.style.setProperty('--preview-width', state.width === 'narrow' ? '42ch' : state.width === 'wide' ? '72ch' : '58ch');
    lab.style.setProperty('--preview-font', state.font === 'sans' ? 'var(--sans)' : 'var(--serif)');

    lab.querySelectorAll('[data-tone-choice]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.toneChoice === state.tone));
    });
    const size = lab.querySelector('[data-size]');
    const leading = lab.querySelector('[data-leading]');
    const width = lab.querySelector('[data-width]');
    const font = lab.querySelector('[data-font]');
    if (size) size.value = String(state.size);
    if (leading) leading.value = String(state.leading);
    if (width) width.value = state.width;
    if (font) font.value = state.font;
    const output = lab.querySelector('[data-size-output]');
    if (output) output.textContent = state.size + ' px';
  }

  labs.forEach(lab => {
    const state = readPreferences();
    applyLab(lab, state);

    lab.addEventListener('click', event => {
      const toneButton = event.target.closest('[data-tone-choice]');
      if (!toneButton || !lab.contains(toneButton)) return;
      state.tone = toneButton.dataset.toneChoice;
      applyLab(lab, state);
      savePreferences(state);
    });

    lab.addEventListener('input', event => {
      if (event.target.matches('[data-size]')) state.size = Number(event.target.value);
      if (event.target.matches('[data-leading]')) state.leading = Number(event.target.value);
      applyLab(lab, state);
      savePreferences(state);
    });

    lab.addEventListener('change', event => {
      if (event.target.matches('[data-width]')) state.width = event.target.value;
      if (event.target.matches('[data-font]')) state.font = event.target.value;
      applyLab(lab, state);
      savePreferences(state);
    });

    const reset = lab.querySelector('[data-reset-reader]');
    if (reset) reset.addEventListener('click', () => {
      Object.assign(state, defaults);
      applyLab(lab, state);
      savePreferences(state);
    });
  });

  const sections = [...document.querySelectorAll('main section[id]')];
  const navLinks = [...document.querySelectorAll('[data-section-nav] a[href^="#"]')];
  if ('IntersectionObserver' in window && sections.length && navLinks.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => {
          const active = link.hash === '#' + entry.target.id;
          if (active) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-25% 0px -60% 0px', threshold: 0 });
    sections.forEach(section => observer.observe(section));
  }

  const topButton = document.querySelector('[data-back-to-top]');
  if (topButton) {
    const updateTopButton = () => topButton.classList.toggle('is-visible', window.scrollY > 600);
    window.addEventListener('scroll', updateTopButton, { passive: true });
    updateTopButton();
    topButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }));
  }

  document.querySelectorAll('[data-current-year]').forEach(node => {
    node.textContent = String(new Date().getFullYear());
  });
})();
