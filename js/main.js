(function(){
'use strict';
var reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var G=window.gsap||null, anim=!!G&&!reduced, NS='http://www.w3.org/2000/svg';

var loader=document.getElementById('loader');
function lift(){ if(loader) loader.classList.add('gone'); }
window.addEventListener('load',function(){ setTimeout(lift, anim?900:200); });
setTimeout(lift,2600);

function el(t,a){var e=document.createElementNS(NS,t);for(var k in a)e.setAttribute(k,a[k]);return e;}
var host=document.getElementById('array');
if(host){
  var svg=el('svg',{viewBox:'0 0 600 600'}), rot=el('g',{id:'array-rot'});
  svg.appendChild(rot); host.appendChild(svg);
  var GOLD='#c9a24b',CRIM='#d43a2f';
  function ring(r,w,o){return el('circle',{cx:300,cy:300,r:r,fill:'none',stroke:GOLD,'stroke-width':w,opacity:o,class:'draw'});}
  rot.appendChild(ring(282,1.2,.85));rot.appendChild(ring(250,0.8,.5));rot.appendChild(ring(208,1,.7));rot.appendChild(ring(120,0.8,.55));rot.appendChild(ring(40,1,.8));
  for(var i=0;i<72;i++){var a=i/72*Math.PI*2,long=(i%6===0),r1=long?232:242,r2=250;
    rot.appendChild(el('line',{x1:300+Math.cos(a)*r1,y1:300+Math.sin(a)*r1,x2:300+Math.cos(a)*r2,y2:300+Math.sin(a)*r2,stroke:GOLD,'stroke-width':long?1.2:0.6,opacity:long?.8:.4,class:'draw'}));}
  function tri(d){var p=[];for(var j=0;j<3;j++){var ang=(d+j*120-90)*Math.PI/180;p.push((300+Math.cos(ang)*180)+','+(300+Math.sin(ang)*180));}
    return el('polygon',{points:p.join(' '),fill:'none',stroke:CRIM,'stroke-width':1.3,opacity:.85,class:'draw'});}
  rot.appendChild(tri(0));rot.appendChild(tri(60));
  for(var v=0;v<6;v++){var av=(v*60-90)*Math.PI/180,vx=300+Math.cos(av)*180,vy=300+Math.sin(av)*180;
    rot.appendChild(el('circle',{cx:vx,cy:vy,r:11,fill:'none',stroke:GOLD,'stroke-width':1,opacity:.8,class:'draw'}));
    var ar=(v*60-60)*Math.PI/180;
    rot.appendChild(el('line',{x1:300+Math.cos(ar)*150,y1:300+Math.sin(ar)*150,x2:300+Math.cos(ar)*168,y2:300+Math.sin(ar)*168,stroke:CRIM,'stroke-width':1.4,opacity:.7,class:'draw'}));}
}

var fill=document.getElementById('wick-fill'),dot=document.getElementById('wick-dot');
function ember(){var h=document.documentElement,max=h.scrollHeight-h.clientHeight,p=max>0?h.scrollTop/max:0;
  if(fill)fill.style.height=(p*100)+'%'; if(dot)dot.style.top='calc('+(p*100)+'% - 4px)';}
window.addEventListener('scroll',function(){requestAnimationFrame(ember);},{passive:true}); ember();

document.querySelectorAll('#wordmark .ln').forEach(function(ln){
  var txt=ln.textContent; ln.textContent='';
  for(var c=0;c<txt.length;c++){var s=document.createElement('span');s.textContent=txt[c]===' '?'\u00A0':txt[c];ln.appendChild(s);}
});
function showAll(){document.querySelectorAll('.reveal').forEach(function(e){e.style.opacity=1;e.style.transform='none';});}

if(anim&&host){
  var draws=svg.querySelectorAll('.draw');
  draws.forEach(function(d){var L=d.getTotalLength();d.style.strokeDasharray=L;d.style.strokeDashoffset=L;});
  G.to(draws,{strokeDashoffset:0,duration:2.2,ease:'power2.inOut',stagger:{each:0.012,from:'start'}});
  G.to('#array-rot',{rotation:360,transformOrigin:'50% 50%',duration:240,ease:'none',repeat:-1});
  G.from('#wordmark .ln span',{yPercent:110,opacity:0,duration:1,ease:'power3.out',stagger:0.03,delay:0.4});
  G.from('.hero .kicker',{opacity:0,y:-12,duration:0.8,delay:0.2});
  G.from('.hero .sub',{opacity:0,y:16,duration:1,delay:1.1});
  G.from('.hero .cta',{opacity:0,y:16,duration:1,delay:1.3});
  G.from('.hero .cue',{opacity:0,duration:1,delay:1.6});
  document.querySelector('.hero').addEventListener('pointermove',function(e){
    var r=this.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-0.5,y=(e.clientY-r.top)/r.height-0.5;
    G.to('#array',{xPercent:x*3,yPercent:y*3,duration:0.8,ease:'power2.out'});
  });
  if(window.ScrollTrigger){
    G.registerPlugin(ScrollTrigger);
    var pl=document.querySelectorAll('.oath .pline');
    G.set(pl,{opacity:0.12,y:24});
    G.timeline({scrollTrigger:{trigger:'.oath',start:'top top',end:'+=160%',pin:'.oath .stage',scrub:0.6}})
      .to(pl,{opacity:1,y:0,stagger:0.5,ease:'power2.out',duration:1});
    G.utils.toArray('.reveal').forEach(function(elm){
      G.to(elm,{opacity:1,y:0,duration:0.9,ease:'power2.out',scrollTrigger:{trigger:elm,start:'top 86%',once:true}});
    });
    G.from('.read .pull',{scale:0.94,opacity:0.3,duration:1,ease:'power2.out',scrollTrigger:{trigger:'.read .pull',start:'top 80%',end:'top 40%',scrub:0.5}});
  } else { showAll(); }
} else { showAll(); }
})();
