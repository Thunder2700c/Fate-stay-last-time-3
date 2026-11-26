(() => {
'use strict';
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const bar=document.querySelector('#page-progress-bar');
const update=()=>{if(!bar)return;const max=document.documentElement.scrollHeight-innerHeight;bar.style.width=(max>0?Math.min(100,scrollY/max*100):0)+'%';};
let pending=false;addEventListener('scroll',()=>{if(!pending){requestAnimationFrame(()=>{update();pending=false;});pending=true;}},{passive:true});update();
const menuButton=document.querySelector('[data-menu-toggle]'),menu=document.querySelector('[data-mobile-menu]');
if(menuButton&&menu){const close=()=>{menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Open menu');menu.classList.remove('is-open');menu.setAttribute('inert','');};menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close menu':'Open menu');menu.classList.toggle('is-open',open);if(open)menu.removeAttribute('inert');else menu.setAttribute('inert','');});menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));document.addEventListener('keydown',e=>{if(e.key==='Escape')close();});}
if(!window.gsap||reduced)return;
const gsap=window.gsap;if(window.ScrollTrigger)gsap.registerPlugin(window.ScrollTrigger);
const intro=gsap.timeline({defaults:{ease:'power4.out'}});
intro.from('.hero-topline span',{y:12,opacity:0,duration:.45,stagger:.08})
.from('.hero-index span',{opacity:0,y:12,duration:.35,stagger:.08},'-=.2')
.from('.hero-kicker',{opacity:0,x:-15,duration:.45},'-=.1')
.from('.hero-word',{yPercent:115,rotate:1,duration:.9,stagger:.13},'-=.1')
.from('.hero-bottomline',{y:18,opacity:0,duration:.55},'-=.45')
.from('.hero-visual',{opacity:0,scale:.92,rotate:7,duration:1.1,ease:'power3.out'},'-=.65')
.from('.hero-footer',{opacity:0,duration:.4},'-=.35');
gsap.fromTo('.thread-path',{strokeDashoffset:1300},{strokeDashoffset:0,duration:2.4,ease:'power2.inOut',delay:.65});
if(window.ScrollTrigger){
gsap.to('.hero-visual',{y:-45,rotate:-2,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1}});
gsap.from('.statement-body h2 > *',{y:75,opacity:0,stagger:.16,duration:.95,ease:'power3.out',scrollTrigger:{trigger:'.statement',start:'top 62%',once:true}});
gsap.from('.statement-foot',{y:25,opacity:0,duration:.8,scrollTrigger:{trigger:'.statement-foot',start:'top 88%',once:true}});
gsap.from('.archive-head > *',{y:28,opacity:0,stagger:.12,duration:.8,scrollTrigger:{trigger:'.archive-head',start:'top 80%',once:true}});
gsap.from('.book-art',{y:30,rotate:-13,opacity:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:'.archive-empty',start:'top 78%',once:true}});
gsap.from('.archive-copy > *',{y:20,opacity:0,stagger:.09,duration:.65,scrollTrigger:{trigger:'.archive-copy',start:'top 82%',once:true}});
gsap.from('.about-right > *',{y:24,opacity:0,stagger:.1,duration:.7,scrollTrigger:{trigger:'.about',start:'top 75%',once:true}});
}
})();