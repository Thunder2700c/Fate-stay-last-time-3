(() => {
'use strict';
// The archive deliberately contains no imported draft material.
// New chapter records will be connected here after the rewritten source is supplied.
const archive=document.querySelector('[data-chapter-count]');
if(archive)archive.dataset.chapterCount='0';
document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',event=>{const target=document.querySelector(link.getAttribute('href'));if(!target)return;event.preventDefault();target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});}));
})();