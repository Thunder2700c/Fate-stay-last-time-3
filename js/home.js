(() => {
'use strict';
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const bars=document.querySelector('.wave-bars');
if(bars){const count=window.innerWidth<680?42:86;bars.style.backgroundSize='9px 100%';bars.style.clipPath='polygon('+Array.from({length:count*2},(_,i)=>{const x=i/(count*2-1)*100;const y=i%2===0?((Math.sin(i*2.17)*.5+.5)*75+12):100-((Math.sin(i*2.17)*.5+.5)*75+12);return x+'% '+y+'%'}).join(',')+')';}
if(!window.gsap||reduce)return;
const gsap=window.gsap;
if(window.ScrollTrigger)gsap.registerPlugin(ScrollTrigger);
const intro=gsap.timeline({defaults:{ease:'power4.out'}});
intro.from('.opening-meta span',{y:12,opacity:0,duration:.55,stagger:.12})
.from('.pretitle',{y:15,opacity:0,duration:.45},'-=.15')
.from('.title-line',{yPercent:115,rotate:2,duration:1.05,stagger:.14},'-=.1')
.from('.title-under',{y:22,opacity:0,duration:.7},'-=.45')
.from('.title-art',{scale:.78,rotate:-18,opacity:0,duration:1.3,ease:'power3.out'},'-=1')
.from('.deck',{y:24,opacity:0,duration:.7},'-=.6')
.from('.opening-foot',{opacity:0,duration:.5},'-=.25');
gsap.to('.disc-outer',{rotate:360,duration:38,repeat:-1,ease:'none'});
gsap.to('.disc-mid',{rotate:-360,duration:56,repeat:-1,ease:'none'});
gsap.to('.disc-arm',{rotate:50,duration:2,ease:'power2.inOut',repeat:-1,yoyo:true,repeatDelay:3,transformOrigin:'100% 50%'});
gsap.to('.wave-bars',{xPercent:-8,duration:2.4,repeat:-1,yoyo:true,ease:'sine.inOut'});
gsap.to('.scroll-cue i',{x:40,duration:1.2,repeat:-1,yoyo:true,ease:'power1.inOut'});
if(window.ScrollTrigger){
gsap.to('.title-art',{y:-70,rotate:7,ease:'none',scrollTrigger:{trigger:'.opening',start:'top top',end:'bottom top',scrub:1}});
gsap.from('.interlude-line',{y:70,opacity:0,stagger:.18,duration:1,ease:'power3.out',scrollTrigger:{trigger:'.interlude',start:'top 72%',once:true}});
gsap.from('.track-head,.empty-track',{y:22,opacity:0,duration:.8,scrollTrigger:{trigger:'.track-head',start:'top 82%',once:true}});
gsap.from('.archive-empty > *',{y:35,opacity:0,stagger:.14,duration:.9,scrollTrigger:{trigger:'.archive-empty',start:'top 80%',once:true}});
gsap.from('.colophon-copy > *',{y:25,opacity:0,stagger:.1,duration:.8,scrollTrigger:{trigger:'.colophon',start:'top 75%',once:true}});
}
})();