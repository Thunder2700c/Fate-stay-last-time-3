/* ═══════════════════════════════════════════════════════════════════════
   ARCHIVE//OS · home engine
   site.js already owns: nav .solid, #year, #mcta, #consent, contact form.
   This file owns everything else on the dashboard.

   [SWAP-STORY] ALL content is in DATA below. Replace titles, synopses,
   chapter names, word counts and excerpts with your manuscript. Add or
   remove chapters freely — every counter, chart, ring and filter
   recalculates. Give a chapter `url:'chapters/ch-1.html'` to link out
   instead of opening the inline reader.
   ═══════════════════════════════════════════════════════════════════════ */
(function(){
'use strict';
if(!document.getElementById('win')) return;   /* dashboard only */

var DATA = {
  fate:{
    code:'FSLT', glyph:'F', title:'Fate/Stay Last Time', by:'GURTEJ SINGH',
    path:'/archive/fate-stay-last-time/',
    syn:'A ruined shoe, a clip the whole internet laughed at, and a circle drawn in blood. A Master with no Command Seals calls two Servants into a world that already decided he was the joke.',
    chapters:[
      {t:'Cold Boot', w:2140, d:'MAR 02', x:[
        'The hall was too loud and the shoe was too new. Both facts had been true for three hours, and only one of them was about to matter.',
        'When the sole came away it did not tear. It gave up — a clean, dry surrender, the sound of something deciding it had never agreed to this in the first place. Six hundred people were mid-conversation. Two of them turned.']},
      {t:'The Laughing Billion', w:1880, d:'MAR 05', x:[
        'Numbers stop meaning anything somewhere past a million. Below that they are people. Above it they are weather.',
        'He watched the counter climb and understood, with a calm that frightened him more than panic would have, that there was no version of tomorrow in which this stopped.']},
      {t:'Blood as Ink', w:2310, d:'MAR 09', x:[
        'The basement had one bulb and no witnesses. He had read that a circle needed mercury, or crushed gems, or a lineage. He had none of those. He had a pocketknife and a very clear opinion about the world.',
        'The line he drew was not clean. It did not need to be. It needed to be meant.']},
      {t:'Two Answers', w:1960, d:'MAR 12', x:[
        'The light did not explode. It arrived, the way a verdict arrives — all at once and already decided.',
        'Two figures stood inside the ring. Neither looked surprised. That was the detail he would return to for years: not the gold, not the cold, but how completely unsurprised they were.']},
      {t:'No Seals, No Master', w:2420, d:'MAR 16', x:[
        '"You have no seals," the man in red said. It was not a question, and it was not a complaint. It was an inventory.',
        '"No," Gurtej said. "So nothing is forcing you to stay." He let that sit. "That is the only honest offer I have."']},
      {t:'The Golden Creditor', w:2650, d:'MAR 21', x:[
        'The King did not enter the room. The room reorganised itself around the fact of him.',
        'He looked at Gurtej the way a lender looks at a property: not with hatred, but with an estimate already completed.']},
      {t:'Forge Overflow', w:2180, d:'MAR 25', x:[
        'The sky came apart into gears, and the ground remembered every blade that had ever been buried in it.',
        'It was not a weapon. It was an accounting of a life, rendered in iron, and it was open for inspection.']},
      {t:'Mountain Anchor', w:2510, d:'MAR 29', x:[
        'They drove the keys into the stone and the mountain answered like something waking with a grudge.',
        'When it was over the archer stood solid again, and could not leave. Infinite power, one address.']},
      {t:'Flesh and Recoil', w:1990, d:'APR 03', x:[
        'The King of Knights swung, and the shock went up her arms and into her teeth, because bone is not a rumour any more.',
        'She did not cry out. She adjusted her stance by a centimetre and swung again, and that was somehow worse to watch.']},
      {t:'The Door Under London', w:2260, d:'APR 08', x:[
        'Below the platform the air stopped behaving like air. Tiles curved. Gravity leaned.',
        'Somewhere under all of it, something very old began to unlock, and he had exactly nothing left to pay with.']}
    ]
  },
  tgra:{
    code:'TGRA', glyph:'G', title:'The Gods Rank Awakening', by:'GURTEJ SINGH & HARMANJOT SINGH',
    path:'/archive/the-gods-rank-awakening/',
    syn:'The ladder of gods is public, ranked and merciless — and every rung is priced in names. One climber starts at zero and discovers the sky keeps a ledger of everyone who tried.',
    chapters:[
      {t:'Rank Zero', w:2050, d:'JAN 14', x:[
        'Everyone is issued a rank at birth. Most people never look at theirs twice. His was zero, which the registry treated as a rounding error.',
        'The clerk apologised the way people apologise for weather. Then she stamped it, and the stamp was the first thing in his life that had ever been permanent.']},
      {t:'The First Ladder', w:2380, d:'JAN 22', x:[
        'The ladder was not hidden. It stood in the middle of the district, plainly visible, and nobody used it, which he eventually understood was the point.',
        'The first rung cost him a memory he had not agreed to spend. He climbed anyway, and the second rung was already waiting.']},
      {t:'Names Written in Ash', w:1920, d:'FEB 02', x:[
        'Every climber before him had left a name on the wall. Most of the names had been scratched out by someone else.',
        'He counted forty-one. He did not know yet whether that was a warning or a queue.']},
      {t:'A God With Debts', w:2540, d:'FEB 11', x:[
        'The god who answered was not radiant. He was tired, and he owed somebody something, and he was very careful not to say who.',
        '"You want a rank," he said. "Everyone wants a rank. Nobody asks what the rank is for."']},
      {t:'The Silent Trial', w:2110, d:'FEB 19', x:[
        'The trial had no opponents, no clock and no instructions. It had a room, a chair, and a version of himself who had already given up.',
        'He lasted four hours before he understood that leaving was allowed, and that leaving was the test.']},
      {t:'The Weight of a Name', w:2290, d:'FEB 27', x:[
        'One of them had written the rule and the other had written the exception, and between them the world had a crack wide enough to climb through.',
        'A name is not a label. A name is a debt somebody else agreed to remember.']},
      {t:'Ascension Tax', w:2470, d:'MAR 07', x:[
        'The sky charges. It does not charge in coin, and it does not negotiate, and it always collects on the way up rather than the way down.',
        'He paid. He did not tell anyone what with, and the silence afterward was the loudest thing he had ever carried.']},
      {t:'What the Sky Owes', w:2730, d:'MAR 15', x:[
        'At the top there was no throne. There was a ledger, open, and his name was already in it — written in a hand he recognised as his own.',
        'The sky had never been the creditor. The sky had been the collateral, and somebody was about to come to collect.']}
    ]
  }
};

var $=function(s,c){return (c||document).querySelector(s);};
var $$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s));};
var G=window.gsap||null;
var RM=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var KEY='archiveos.v1';
var DEF={accent:'cyan',glow:100,size:17,vol:45,grain:true,scan:true,dense:false,motion:'full',sound:true};
var S={prefs:Object.assign({},DEF),progress:{},last:null};
try{var raw=JSON.parse(localStorage.getItem(KEY));if(raw){S.prefs=Object.assign({},DEF,raw.prefs||{});S.progress=raw.progress||{};S.last=raw.last||null;}}catch(e){}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}}
function motionOK(){return !!G && !RM && S.prefs.motion!=='off';}
function pad(n){return String(n).padStart(3,'0');}
function pctOf(id,i){return S.progress[id+':'+i]||0;}
function setPct(id,i,v){S.progress[id+':'+i]=v;S.last={id:id,i:i};save();}

/* ── audio (synthesised, no files) ── */
var AC=null,master=null,armed=false;
function audio(){
  if(AC)return AC;
  var C=window.AudioContext||window.webkitAudioContext; if(!C)return null;
  AC=new C(); master=AC.createGain(); master.gain.value=S.prefs.sound?(S.prefs.vol/100)*0.9:0; master.connect(AC.destination);
  var g=AC.createGain(); g.gain.value=0.05;
  var lp=AC.createBiquadFilter(); lp.type='lowpass'; lp.frequency.value=240;
  var o1=AC.createOscillator(); o1.type='sine'; o1.frequency.value=55;
  var o2=AC.createOscillator(); o2.type='triangle'; o2.frequency.value=82.8;
  var lfo=AC.createOscillator(); lfo.frequency.value=0.06;
  var lg=AC.createGain(); lg.gain.value=55; lfo.connect(lg); lg.connect(lp.frequency);
  o1.connect(g); o2.connect(g); g.connect(lp); lp.connect(master);
  o1.start(); o2.start(); lfo.start();
  return AC;
}
function arm(){if(armed)return;armed=true;var c=audio();if(c&&c.state==='suspended')c.resume();}
function blip(f,dur,type,vol){
  if(!S.prefs.sound||!armed)return; var c=audio(); if(!c)return;
  var o=c.createOscillator(),g=c.createGain();
  o.type=type||'sine'; o.frequency.setValueAtTime(f,c.currentTime);
  g.gain.setValueAtTime(0,c.currentTime);
  g.gain.linearRampToValueAtTime(vol||0.09,c.currentTime+0.012);
  g.gain.exponentialRampToValueAtTime(0.0001,c.currentTime+(dur||0.16));
  o.connect(g); g.connect(master); o.start(); o.stop(c.currentTime+(dur||0.16)+0.05);
}
function chime(a,b){blip(a,0.22,'sine',0.08);setTimeout(function(){blip(b,0.3,'sine',0.06);},95);}
function applyVol(){if(master&&AC)master.gain.setTargetAtTime(S.prefs.sound?(S.prefs.vol/100)*0.9:0,AC.currentTime,0.15);}
document.addEventListener('pointerdown',arm,{once:true});
document.addEventListener('keydown',arm,{once:true});
var lastTick=0;
function tick(){var n=Date.now();if(n-lastTick<70)return;lastTick=n;blip(1750,0.035,'square',0.022);}

/* ── toasts + activity ── */
function toast(msg,kind){
  var box=$('#toasts'); if(!box)return;
  var el=document.createElement('div'); el.className='toast '+(kind||'info');
  el.innerHTML='<i></i><span></span>'; el.lastChild.textContent=msg;
  box.appendChild(el);
  while(box.children.length>3) box.removeChild(box.firstChild);
  if(motionOK()) G.fromTo(el,{x:-24,opacity:0},{x:0,opacity:1,duration:.42,ease:'power3.out'});
  setTimeout(function(){
    if(motionOK()) G.to(el,{x:-20,opacity:0,duration:.32,onComplete:function(){el.remove();}});
    else el.remove();
  },2900);
}
var feedEl=$('#feed');
function stamp(){var d=new Date();return [d.getHours(),d.getMinutes(),d.getSeconds()].map(function(n){return String(n).padStart(2,'0');}).join(':');}
function log(msg,kind){
  if(!feedEl)return;
  var el=document.createElement('div'); el.className='fitem '+(kind||'info');
  el.innerHTML='<time></time><p><b></b></p>';
  el.firstChild.textContent=stamp(); el.lastChild.firstChild.textContent=msg;
  feedEl.insertBefore(el,feedEl.firstChild);
  while(feedEl.children.length>14) feedEl.removeChild(feedEl.lastChild);
  if(motionOK()) G.fromTo(el,{opacity:0,x:-12},{opacity:1,x:0,duration:.4,ease:'power2.out'});
}

/* ── preferences ── */
var ACC={cyan:['#00f0ff','#7c5cff','#04121a'],gold:['#ffd700','#ff2d95','#1a1200'],violet:['#7c5cff','#38bdf8','#0d0820'],magenta:['#ff2d95','#ffb020','#1a0413']};
function fillRange(el){var mn=+el.min,mx=+el.max;el.style.setProperty('--p',((el.value-mn)/(mx-mn)*100)+'%');}
function applyPrefs(){
  var p=S.prefs,a=ACC[p.accent]||ACC.cyan,r=document.documentElement;
  r.style.setProperty('--accent',a[0]); r.style.setProperty('--accent-2',a[1]); r.style.setProperty('--accent-ink',a[2]);
  r.style.setProperty('--glow',(p.glow/100).toFixed(2));
  r.style.setProperty('--grain',p.grain?0.055:0);
  r.style.setProperty('--scan',p.scan?0.30:0);
  r.style.setProperty('--reader-size',p.size+'px');
  r.setAttribute('data-density',p.dense?'compact':'cozy');
  r.setAttribute('data-motion',p.motion);
  $$('.sw').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.a===p.accent));});
  $('#pGlow').value=p.glow; $('#vGlow').textContent=p.glow+'%'; fillRange($('#pGlow'));
  $('#pSize').value=p.size; $('#vSize').textContent=p.size+'px'; fillRange($('#pSize'));
  $('#pVol').value=p.vol; $('#vVol').textContent=p.vol+'%'; fillRange($('#pVol'));
  $('#pGrain').setAttribute('aria-checked',String(p.grain));
  $('#pScan').setAttribute('aria-checked',String(p.scan));
  $('#pDense').setAttribute('aria-checked',String(p.dense));
  $('#pSound').setAttribute('aria-checked',String(p.sound));
  $('#pMotion').value=p.motion;
  var sb=$('#sndBtn');
  sb.classList.toggle('off',!p.sound);
  sb.setAttribute('aria-pressed',String(p.sound));
  sb.setAttribute('aria-label',p.sound?'Mute all sound':'Unmute sound');
  $('#sndTxt').textContent=p.sound?'SOUND ON':'SOUND OFF';
  applyVol();
  if(G&&window.ScrollTrigger) ScrollTrigger.refresh();
}
function setPref(k,v,quiet){S.prefs[k]=v;save();applyPrefs();if(!quiet)tick();}
$$('.sw').forEach(function(b){b.addEventListener('click',function(){setPref('accent',b.dataset.a);toast('Accent channel → '+b.dataset.a.toUpperCase(),'acc');});});
$('#pGlow').addEventListener('input',function(){setPref('glow',+this.value,true);});
$('#pSize').addEventListener('input',function(){setPref('size',+this.value,true);});
$('#pVol').addEventListener('input',function(){setPref('vol',+this.value,true);});
[['pGrain','grain'],['pScan','scan'],['pDense','dense'],['pSound','sound']].forEach(function(pair){
  $('#'+pair[0]).addEventListener('click',function(){
    setPref(pair[1],!S.prefs[pair[1]]);
    if(pair[1]==='sound'&&S.prefs.sound){arm();chime(520,780);}
  });
});
$('#pMotion').addEventListener('change',function(){setPref('motion',this.value);toast('Motion profile → '+this.value.toUpperCase(),'info');});
$('#sndBtn').addEventListener('click',function(){
  setPref('sound',!S.prefs.sound);
  if(S.prefs.sound){arm();chime(520,780);}
  toast(S.prefs.sound?'Audio engine online':'Audio muted',S.prefs.sound?'ok':'warn');
});
$('#pRandom').addEventListener('click',function(){
  var k=Object.keys(ACC);
  S.prefs.accent=k[Math.floor(Math.random()*k.length)];
  S.prefs.glow=60+Math.floor(Math.random()*90);
  S.prefs.dense=Math.random()>0.6;
  save();applyPrefs();chime(660,990);toast('Profile randomized','acc');log('PREFS randomized','warn');
});
$('#pReset').addEventListener('click',function(){
  S.prefs=Object.assign({},DEF);save();applyPrefs();blip(300,0.24,'sine',0.08);
  toast('Defaults restored','warn');log('PREFS reset to defaults','warn');
});
$('#pExport').addEventListener('click',function(){
  try{
    var blob=new Blob([JSON.stringify(S,null,2)],{type:'application/json'});
    var url=URL.createObjectURL(blob),a=document.createElement('a');
    a.href=url;a.download='archive-os-profile.json';a.click();
    setTimeout(function(){URL.revokeObjectURL(url);},1500);
    chime(880,1180);toast('Profile exported','ok');log('PROFILE exported as JSON','ok');
  }catch(e){toast('Export blocked by browser','warn');}
});

/* ── stats + chart ── */
var allCh=[];
Object.keys(DATA).forEach(function(k){DATA[k].chapters.forEach(function(c,i){allCh.push({id:k,i:i,c:c});});});
function refreshStats(){
  var words=0,read=0;
  allCh.forEach(function(o){words+=o.c.w;if(pctOf(o.id,o.i)>=100)read++;});
  $('#sModules').textContent=Object.keys(DATA).length;
  $('#sLogs').textContent=allCh.length;
  $('#sWords').innerHTML=(words/1000).toFixed(1)+'<i>k</i>';
  $('#sRead').innerHTML=Math.round(read/allCh.length*100)+'<i>%</i>';
  $('#sSync').textContent=read?'just now':'awaiting access';
  Object.keys(DATA).forEach(function(k){
    var n=DATA[k].chapters.length,done=0;
    DATA[k].chapters.forEach(function(c,i){if(pctOf(k,i)>=100)done++;});
    var p=Math.round(done/n*100);
    var bar=$('[data-prog="'+k+'"]'),txt=$('[data-progtxt="'+k+'"]');
    if(bar)bar.style.width=p+'%';
    if(txt)txt.textContent=p+'% ACCESSED · '+done+'/'+n;
  });
}
var HUES=['#00f0ff','#ffd700','#7c5cff','#ff2d95','#3dff9e','#38bdf8'];
function buildChart(){
  var top=allCh.slice().sort(function(a,b){return b.c.w-a.c.w;}).slice(0,6);
  var max=top[0].c.w,box=$('#chart'); box.innerHTML='';
  $('#chartTotal').textContent=top.reduce(function(s,o){return s+o.c.w;},0).toLocaleString()+' W';
  top.forEach(function(o,n){
    var row=document.createElement('div'); row.className='bar-row';
    var col=HUES[n%HUES.length];
    row.innerHTML='<span class="bar-lab"></span><span class="bar-val"></span><span class="bar-track"><i class="bar-fill"></i></span>';
    row.children[0].textContent=DATA[o.id].code+' · '+o.c.t;
    row.children[1].textContent=o.c.w.toLocaleString()+' w';
    row.children[1].style.color=col;
    var f=row.querySelector('.bar-fill');
    f.style.backgroundColor=col; f.dataset.w=(o.c.w/max*100).toFixed(1);
    box.appendChild(row);
  });
}
function animChart(){
  $$('.bar-fill').forEach(function(f,i){
    setTimeout(function(){f.style.width=f.dataset.w+'%';},motionOK()?i*90:0);
  });
}

/* ── window · logs · reader ── */
var win=$('#win'),panel=$('#winPanel'),logsEl=$('#logs'),reader=$('#reader');
var cur=null,filter='all',query='',sortBy='asc',openIdx=-1,lastFocus=null,readerOpen=false;
function statusOf(id,i){var p=pctOf(id,i);return p>=100?'read':(p>0?'part':'new');}
function labelOf(s){return s==='read'?'READ':s==='part'?'IN PROGRESS':'UNREAD';}
function visible(){
  var list=DATA[cur].chapters.map(function(c,i){return {c:c,i:i};});
  if(query){var q=query.toLowerCase();list=list.filter(function(o){return o.c.t.toLowerCase().indexOf(q)>-1||('ch-'+pad(o.i+1)).indexOf(q)>-1;});}
  if(filter!=='all')list=list.filter(function(o){return statusOf(cur,o.i)===filter;});
  if(sortBy==='asc')list.sort(function(a,b){return a.i-b.i;});
  else if(sortBy==='desc')list.sort(function(a,b){return b.i-a.i;});
  else if(sortBy==='title')list.sort(function(a,b){return a.c.t.localeCompare(b.c.t);});
  else list.sort(function(a,b){return b.c.w-a.c.w;});
  return list;
}
function renderLogs(animate){
  var list=visible(); logsEl.innerHTML='';
  if(!list.length){
    var e=document.createElement('div'); e.className='empty';
    e.innerHTML='<b>NO MATCHING LOGS</b>Adjust the filter or clear the search field.';
    logsEl.appendChild(e); return;
  }
  list.forEach(function(o){
    var st=statusOf(cur,o.i);
    var b=document.createElement('button'); b.className='log'; b.type='button';
    b.innerHTML='<span class="log-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/></svg></span>'+
      '<span><span class="log-id"></span><span class="log-name"></span></span>'+
      '<span class="log-meta"></span><span class="log-st '+st+'"></span>';
    b.querySelector('.log-id').textContent='CH-'+pad(o.i+1)+' · '+o.c.d;
    b.querySelector('.log-name').textContent=o.c.t;
    b.querySelector('.log-meta').textContent=o.c.w.toLocaleString()+' W · '+Math.max(1,Math.round(o.c.w/230))+' MIN';
    b.querySelector('.log-st').textContent=labelOf(st);
    b.addEventListener('click',function(){openChapter(o.i);});
    b.addEventListener('mouseenter',tick);
    logsEl.appendChild(b);
  });
  if(animate&&motionOK()) G.fromTo($$('.log',logsEl),{opacity:0,y:14},{opacity:1,y:0,duration:.4,stagger:.035,ease:'power2.out'});
}
function railUpdate(){
  var d=DATA[cur],n=d.chapters.length,done=0,words=0;
  d.chapters.forEach(function(c,i){if(pctOf(cur,i)>=100)done++;words+=c.w;});
  var p=Math.round(done/n*100);
  $('#railTitle').textContent=d.title; $('#railBy').textContent=d.by; $('#railSyn').textContent=d.syn;
  $('#railCover').dataset.glyph=d.glyph;
  $('#railLogs').textContent=n+' FILES';
  $('#railWords').textContent=words.toLocaleString();
  $('#railTime').textContent=Math.round(words/230)+' MIN';
  $('#ringPct').textContent=p+'%';
  $('#ringFg').style.strokeDashoffset=String(163.4*(1-p/100));
}
function openModule(id,quiet){
  if(!DATA[id]||win.classList.contains('open'))return;
  cur=id; filter='all'; query=''; sortBy='asc'; openIdx=-1; readerOpen=false;
  lastFocus=document.activeElement;
  $('#q').value=''; $('#sort').value='asc';
  $$('.fchip').forEach(function(c){c.setAttribute('aria-pressed',String(c.dataset.f==='all'));});
  win.dataset.id=id; win.classList.add('open'); document.body.classList.add('locked');
  $('#winName').textContent=DATA[id].code+' · '+DATA[id].title.toUpperCase();
  $('#winPath').textContent=DATA[id].path;
  $('#winRail').classList.toggle('compact',window.innerWidth<=900);
  reader.classList.remove('on'); reader.style.transform='translateX(100%)';
  railUpdate(); renderLogs(false); logsEl.scrollTop=0;
  arm(); if(!quiet)chime(430,660);
  log('MOUNT '+DATA[id].code+' · '+DATA[id].chapters.length+' logs','acc');
  toast(DATA[id].title+' mounted','acc');
  if(motionOK()){
    G.set(panel,{scale:.94,y:26,opacity:0});
    G.timeline()
      .fromTo($('#winScrim'),{opacity:0},{opacity:1,duration:.35,ease:'power2.out'},0)
      .to(panel,{scale:1,y:0,opacity:1,duration:.55,ease:'power3.out'},0.05)
      .fromTo($$('.log',logsEl),{opacity:0,y:16},{opacity:1,y:0,duration:.4,stagger:.03,ease:'power2.out'},0.22);
  }else if(G){ G.set(panel,{scale:1,y:0,opacity:1}); }
  setTimeout(function(){$('#q').focus();},motionOK()?420:60);
}
function closeModule(){
  if(!win.classList.contains('open'))return;
  blip(300,0.2,'sine',0.06);
  var fin=function(){
    win.classList.remove('open'); document.body.classList.remove('locked');
    reader.classList.remove('on'); readerOpen=false; cur=null;
    if(lastFocus&&lastFocus.focus)lastFocus.focus();
  };
  if(motionOK()){
    G.timeline({onComplete:fin})
      .to(panel,{scale:.95,y:18,opacity:0,duration:.32,ease:'power2.in'})
      .to($('#winScrim'),{opacity:0,duration:.3},0.04);
  }else fin();
}
function syncMark(){
  var done=pctOf(cur,openIdx)>=100,b=$('#rMark');
  b.textContent=done?'✓ READ':'MARK AS READ';
  b.classList.toggle('done',done);
}
function openChapter(i){
  var d=DATA[cur],c=d.chapters[i];
  if(c.url){window.location.href=c.url;return;}
  openIdx=i; readerOpen=true;
  $('#readerId').textContent='CH-'+pad(i+1);
  $('#readerTitle').textContent=c.t;
  $('#readerMeta').textContent=d.code+' · '+c.d+' · '+c.w.toLocaleString()+' WORDS · '+Math.max(1,Math.round(c.w/230))+' MIN READ';
  var body=$('#readerBody'); body.innerHTML='';
  c.x.forEach(function(p){var el=document.createElement('p');el.textContent=p;body.appendChild(el);});
  $('#readerScroll').scrollTop=0;
  var pv=$('#rPrev'),nx=$('#rNext');
  pv.disabled=i===0; pv.style.opacity=i===0?.35:1;
  nx.disabled=i===d.chapters.length-1; nx.style.opacity=i===d.chapters.length-1?.35:1;
  syncMark();
  reader.classList.add('on');
  arm(); blip(720,0.14,'triangle',0.06);
  if(pctOf(cur,i)<100) setPct(cur,i,Math.max(pctOf(cur,i),35));
  railUpdate(); refreshStats(); renderLogs(false);
  log('ACCESS CH-'+pad(i+1)+' · '+c.t,'ok');
  if(motionOK()){
    G.fromTo(reader,{xPercent:100},{xPercent:0,duration:.5,ease:'power3.out'});
    G.fromTo($$('#readerBody p'),{opacity:0,y:14},{opacity:1,y:0,duration:.5,stagger:.07,delay:.16,ease:'power2.out'});
  }else{ reader.style.transform='translateX(0)'; }
  setTimeout(function(){$('#readerBack').focus();},motionOK()?380:40);
}
function closeReader(){
  if(!readerOpen)return;
  readerOpen=false; blip(360,0.14,'sine',0.05);
  var fin=function(){reader.classList.remove('on');reader.style.transform='translateX(100%)';renderLogs(true);};
  if(motionOK()) G.to(reader,{xPercent:100,duration:.38,ease:'power2.in',onComplete:fin});
  else fin();
}
$('#readerBack').addEventListener('click',closeReader);
$('#rPrev').addEventListener('click',function(){if(openIdx>0)openChapter(openIdx-1);});
$('#rNext').addEventListener('click',function(){if(openIdx<DATA[cur].chapters.length-1)openChapter(openIdx+1);});
$('#rMark').addEventListener('click',function(){
  var done=pctOf(cur,openIdx)>=100;
  setPct(cur,openIdx,done?0:100);
  syncMark(); railUpdate(); refreshStats(); renderLogs(false);
  if(!done){chime(880,1320);toast('Log marked as read','ok');log('VERIFY CH-'+pad(openIdx+1),'ok');}
  else{blip(300,0.16,'sine',0.06);toast('Log reset to unread','warn');}
});
$('#readerScroll').addEventListener('scroll',function(){
  if(!readerOpen||openIdx<0)return;
  var el=this,max=el.scrollHeight-el.clientHeight;
  if(max<=0)return;
  var p=Math.min(100,Math.round(el.scrollTop/max*100));
  if(p>pctOf(cur,openIdx)){
    setPct(cur,openIdx,p);
    if(p>=96){syncMark();railUpdate();refreshStats();}
  }
},{passive:true});
$('#q').addEventListener('input',function(){query=this.value.trim();renderLogs(false);});
$('#sort').addEventListener('change',function(){sortBy=this.value;renderLogs(true);tick();});
$$('.fchip').forEach(function(c){
  c.addEventListener('click',function(){
    filter=c.dataset.f;
    $$('.fchip').forEach(function(o){o.setAttribute('aria-pressed',String(o===c));});
    renderLogs(true); tick();
  });
});
$('#winX').addEventListener('click',closeModule);
$('#winScrim').addEventListener('click',closeModule);
$$('.mod').forEach(function(m){
  m.addEventListener('click',function(){openModule(m.dataset.id);});
  m.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();openModule(m.dataset.id);}});
  m.addEventListener('mouseenter',tick);
});
$('#heroOpen').addEventListener('click',function(){openModule('fate');});
$('#hsLink').addEventListener('click',function(e){e.preventDefault();openModule('tgra');});
$('#resumeBtn').addEventListener('click',function(){
  if(S.last&&DATA[S.last.id]){
    var t=S.last; openModule(t.id,true);
    setTimeout(function(){openChapter(t.i);},140);
  }else openModule('fate');
});
document.addEventListener('keydown',function(e){
  if(e.key==='Escape'){
    if(readerOpen)closeReader();
    else if(win.classList.contains('open'))closeModule();
    else $('#mobNav').classList.remove('open');
  }
  if(win.classList.contains('open')&&e.key==='Tab'){
    var f=$$('button, input, select, a[href]',panel).filter(function(el){return el.offsetParent!==null&&!el.disabled;});
    if(!f.length)return;
    var first=f[0],last=f[f.length-1];
    if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
    else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
  }
});
window.addEventListener('resize',function(){
  if(win.classList.contains('open')) $('#winRail').classList.toggle('compact',window.innerWidth<=900);
});

/* ── chrome ── */
function clock(){
  var d=new Date(),el=$('#clock');
  if(el)el.textContent=[d.getHours(),d.getMinutes(),d.getSeconds()].map(function(n){return String(n).padStart(2,'0');}).join(':');
}
clock(); setInterval(clock,1000);
$('#burger').addEventListener('click',function(){
  var o=$('#mobNav').classList.toggle('open');
  this.setAttribute('aria-expanded',String(o)); tick();
});
$$('#mobNav a').forEach(function(a){
  a.addEventListener('click',function(){
    $('#mobNav').classList.remove('open');
    $('#burger').setAttribute('aria-expanded','false');
  });
});
var navLinks=$$('[data-nav]');
var secs=['dashboard','modules','prefs','metrics','about'].map(function(id){return document.getElementById(id);}).filter(Boolean);
if('IntersectionObserver' in window){
  var io=new IntersectionObserver(function(en){
    en.forEach(function(x){
      if(x.isIntersecting) navLinks.forEach(function(a){a.classList.toggle('on',a.dataset.nav===x.target.id);});
    });
  },{rootMargin:'-45% 0px -50% 0px'});
  secs.forEach(function(s){io.observe(s);});
}
/* legacy anchors from the unchanged subpages */
var LEGACY={oath:'modules',bound:'modules',frags:'modules',reading:'modules',colo:'about',top:'dashboard'};
if(location.hash){
  var k=location.hash.slice(1);
  if(LEGACY[k]){
    var t=document.getElementById(LEGACY[k]);
    if(t){history.replaceState(null,'','#'+LEGACY[k]);setTimeout(function(){t.scrollIntoView({behavior:'smooth'});},140);}
  }
}

/* ── magnetic cards ── */
if(window.matchMedia('(pointer:fine)').matches){
  $$('.mod').forEach(function(m){
    m.addEventListener('pointermove',function(e){
      if(!motionOK())return;
      var r=m.getBoundingClientRect();
      var x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      G.to(m,{x:x*7,y:y*7,rotateX:-y*2.2,rotateY:x*2.2,transformPerspective:900,duration:.55,ease:'power2.out'});
    });
    m.addEventListener('pointerleave',function(){
      if(G)G.to(m,{x:0,y:0,rotateX:0,rotateY:0,duration:.7,ease:'elastic.out(1,.6)'});
    });
  });
}

/* ── boot + entrance ── */
function showAll(){$$('.reveal').forEach(function(e){e.style.opacity=1;e.style.transform='none';});}
function entrance(){
  refreshStats(); animChart();
  if(!motionOK()){showAll();return;}
  G.set('.hero-h1 .ln>span',{yPercent:110});
  G.timeline()
    .to('.hero-h1 .ln>span',{yPercent:0,duration:1,ease:'power4.out',stagger:.1},0)
    .fromTo('#dashboard .reveal',{opacity:0,y:24},{opacity:1,y:0,duration:.8,stagger:.09,ease:'power2.out'},.15);
  if(window.ScrollTrigger){
    G.registerPlugin(ScrollTrigger);
    $$('.reveal').forEach(function(el){
      if(el.closest('#dashboard'))return;
      G.fromTo(el,{opacity:0,y:26},{opacity:1,y:0,duration:.85,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 88%',once:true}});
    });
    var st={trigger:document.body,start:'top top',end:'bottom bottom'};
    G.to('.orb.a',{yPercent:22,ease:'none',scrollTrigger:Object.assign({scrub:1.2},st)});
    G.to('.orb.b',{yPercent:-18,ease:'none',scrollTrigger:Object.assign({scrub:1.6},st)});
    G.to('.mesh',{yPercent:10,ease:'none',scrollTrigger:Object.assign({scrub:2},st)});
  }else showAll();
}
function boot(){
  var el=$('#boot'),logEl=$('#bootLog'),bar=$('#bootBar'),arc=$('#bootArc'),done=false;
  function finish(){
    if(done)return; done=true;
    el.classList.add('done');
    setTimeout(function(){el.style.display='none';},800);
    entrance();
    log('SYSTEM online · '+Object.keys(DATA).length+' modules mounted','ok');
    chime(520,880);
  }
  $('#bootSkip').addEventListener('click',finish);
  if(!motionOK()){el.style.display='none';entrance();return;}
  var lines=[['mounting archive volumes','OK'],['indexing '+allCh.length+' data logs','OK'],['calibrating render layers','OK'],['audio engine standby','OK'],['operator profile loaded','READY']];
  var tl=G.timeline({onComplete:finish});
  tl.to(bar,{width:'100%',duration:2.5,ease:'power1.inOut'},0)
    .to(arc,{strokeDashoffset:0,duration:2.5,ease:'power1.inOut'},0);
  lines.forEach(function(l,i){
    tl.call(function(){
      var p=document.createElement('div');
      p.innerHTML='<span></span> <b></b>';
      p.firstChild.textContent='› '+l[0]+' ';
      p.lastChild.textContent='['+l[1]+']';
      logEl.appendChild(p);
      G.fromTo(p,{opacity:0,x:-8},{opacity:1,x:0,duration:.3});
      blip(1200+i*90,0.04,'square',0.02);
      while(logEl.children.length>4) logEl.removeChild(logEl.firstChild);
    },null,0.35+i*0.44);
  });
  setTimeout(finish,4800);
}

/* ── init ── */
applyPrefs(); buildChart(); refreshStats();
log('BOOT sequence complete','ok');
log('ARCHIVE index built · '+allCh.length+' logs','info');
log('OPERATOR profile restored','acc');
boot();
window.addEventListener('load',function(){if(window.ScrollTrigger)ScrollTrigger.refresh();});
})();
