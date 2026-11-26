(function(){
'use strict';
var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var G = window.gsap || null;
var anim = !!G && !reduced;

/* loader */
var loader = document.getElementById('loader');
function lift(){ if(loader) loader.classList.add('gone'); }
window.addEventListener('load', function(){ setTimeout(lift, anim ? 700 : 150); });
setTimeout(lift, 2500);

/* scroll progress */
var pf = document.getElementById('prog-fill');
function prog(){
  var h = document.documentElement, max = h.scrollHeight - h.clientHeight;
  var p = max > 0 ? h.scrollTop / max : 0;
  if(pf) pf.style.width = (p * 100) + '%';
}
window.addEventListener('scroll', function(){ requestAnimationFrame(prog); }, {passive:true});
prog();

/* nav current-section state */
var navLinks = Array.prototype.slice.call(document.querySelectorAll('.links a[data-nav]'));
var sections = navLinks.map(function(a){ return document.getElementById(a.dataset.nav); }).filter(Boolean);
if('IntersectionObserver' in window && sections.length){
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){
        navLinks.forEach(function(a){ a.classList.toggle('active', a.dataset.nav === en.target.id); });
      }
    });
  }, {rootMargin:'-45% 0px -50% 0px', threshold:0});
  sections.forEach(function(s){ io.observe(s); });
}

function showAll(){
  document.querySelectorAll('.reveal').forEach(function(e){ e.style.opacity = 1; e.style.transform = 'none'; });
}

if(!anim){ showAll(); return; }

/* hero entrance */
G.set('.wordmark .ln>span', {yPercent:110});
G.timeline({delay:0.25})
  .to('.wordmark .ln>span', {yPercent:0, duration:1.05, ease:'power4.out', stagger:0.09})
  .from('.kick', {opacity:0, y:-10, duration:0.6}, 0)
  .from('.tag', {opacity:0, y:18, duration:0.8}, 0.55)
  .from('.hero-foot .btn', {opacity:0, y:18, duration:0.8}, 0.7)
  .from('.hero-meta', {opacity:0, duration:0.8}, 0.9);

/* hero grid parallax */
G.to('.hero-grid', {
  yPercent:14, ease:'none',
  scrollTrigger:{trigger:'.hero', start:'top top', end:'bottom top', scrub:0.6}
});
var hero = document.querySelector('.hero');
if(hero && window.matchMedia('(pointer:fine)').matches){
  hero.addEventListener('pointermove', function(e){
    var r = hero.getBoundingClientRect();
    var x = (e.clientX - r.left) / r.width - 0.5;
    var y = (e.clientY - r.top) / r.height - 0.5;
    G.to('.hero-glow', {xPercent:x*6, yPercent:y*6, duration:0.9, ease:'power2.out'});
  });
}

if(!window.ScrollTrigger){ showAll(); return; }
G.registerPlugin(ScrollTrigger);

/* pinned horizontal reel — desktop only, reverts cleanly on resize */
var track = document.querySelector('.reel-track');
var view = document.querySelector('.reel-view');
if(track && view){
  var distance = function(){ return Math.max(0, track.scrollWidth - view.clientWidth); };
  var mm = G.matchMedia();
  mm.add('(min-width: 901px)', function(){
    var tween = G.to(track, {
      x: function(){ return -distance(); },
      ease:'none',
      scrollTrigger:{
        trigger:'.reel',
        start:'top top',
        end: function(){ return '+=' + (distance() + window.innerHeight * 0.4); },
        pin:true,
        scrub:1,
        anticipatePin:1,
        invalidateOnRefresh:true
      }
    });
    return function(){ if(tween.scrollTrigger) tween.scrollTrigger.kill(); tween.kill(); G.set(track,{x:0}); };
  });
}

/* progressive reveals */
G.utils.toArray('.reveal').forEach(function(el){
  G.to(el, {opacity:1, y:0, duration:0.85, ease:'power2.out',
    scrollTrigger:{trigger:el, start:'top 88%', once:true}});
});

/* brief sticky column drift */
G.from('.brief-stick .big', {opacity:0.25, y:24, duration:1, ease:'power2.out',
  scrollTrigger:{trigger:'.brief', start:'top 70%', once:true}});

/* pull quote scrub */
G.from('.pull', {x:-24, opacity:0.25, duration:1, ease:'power2.out',
  scrollTrigger:{trigger:'.pull', start:'top 85%', end:'top 45%', scrub:0.5}});

window.addEventListener('load', function(){ ScrollTrigger.refresh(); });
})();
