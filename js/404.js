(() => {
  'use strict';

  const requestedPath = document.querySelector('[data-requested-path]');
  const backButton = document.querySelector('[data-go-back]');

  if (requestedPath) {
    requestedPath.textContent = 'REQUESTED ROUTE / ' + (window.location.pathname || '/');
  }

  if (!backButton) return;

  backButton.addEventListener('click', () => {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    window.location.assign('index.html');
  });
})();
