(() => {
'use strict';
const $ = (s,r=document) => r.querySelector(s);
const menuButton=$('[data-menu-toggle]'), menu=$('[data-mobile-menu]'), bar=$('#page-progress-bar');
document.querySelectorAll('[data-year]').forEach(n=>n.textContent=new Date().getFullYear());
if(menuButton&&menu){
 const close=()=>{menuButton.setAttribute('aria-expanded','false');menu.classList.remove('is-open');menu.setAttribute('inert','');menuButton.setAttribute('aria-label','Open menu');};
 menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));menu.classList.toggle('is-open',open);if(open)menu.removeAttribute('inert');else menu.setAttribute('inert','');menuButton.setAttribute('aria-label',open?'Close menu':'Open menu');});
 menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});
}
let ticking=false;const progress=()=>{if(bar){const max=document.documentElement.scrollHeight-innerHeight;bar.style.width=(max>0?Math.min(100,scrollY/max*100):0)+'%';}ticking=false;};
addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(progress);ticking=true;}},{passive:true});progress();
const header=$('[data-header]');if(header){const update=()=>header.classList.toggle('is-scrolled',scrollY>24);addEventListener('scroll',update,{passive:true});update();}
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const animate=()=>{if(!window.gsap||reduced)return;if(window.ScrollTrigger)gsap.registerPlugin(ScrollTrigger);if($('.hero-copy'))gsap.fromTo('.hero-copy > *',{y:22,opacity:0},{y:0,opacity:1,duration:.8,stagger:.1,ease:'power3.out'});if($('.hero-art'))gsap.fromTo('.hero-art',{opacity:0,scale:.94},{opacity:1,scale:1,duration:1.2,ease:'power2.out',delay:.15});if(window.ScrollTrigger)gsap.utils.toArray('.intro-layout,.edition-stats,.empty-archive,.about-copy').forEach(el=>gsap.fromTo(el,{y:26,opacity:0},{y:0,opacity:1,duration:.8,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 86%',once:true}}));};
if(document.readyState==='complete')animate();else addEventListener('load',animate,{once:true});
const timeButton=$('[data-time-jump]');if(timeButton)timeButton.addEventListener('click',()=>{document.body.classList.toggle('time-accelerated');const on=document.body.classList.contains('time-accelerated');timeButton.textContent=on?'TIME ACCELERATION: ENGAGED':'ACCELERATE TIME ↗';});
})();