(function(){
'use strict';
var nav=document.getElementById('nav');
function navState(){ if(nav) nav.classList.toggle('solid', document.documentElement.scrollTop>40); }
window.addEventListener('scroll',function(){requestAnimationFrame(navState);},{passive:true});
navState();

var y=document.getElementById('year'); if(y) y.textContent=new Date().getFullYear();

var mcta=document.getElementById('mcta');
if(mcta){
  function mctaState(){ var h=document.documentElement; mcta.classList.toggle('show', h.scrollTop>window.innerHeight*0.7); }
  window.addEventListener('scroll',function(){requestAnimationFrame(mctaState);},{passive:true});
  mctaState();
}

var KEY='fslt.consent', banner=document.getElementById('consent');
function loadAnalytics(){
  if(document.getElementById('va-script')) return;
  var s=document.createElement('script'); s.id='va-script'; s.defer=true; s.src='/_vercel/insights/script.js';
  document.head.appendChild(s);
}
var consent=null; try{consent=localStorage.getItem(KEY);}catch(e){}
if(consent==='granted') loadAnalytics();
if(banner){
  if(!consent) banner.hidden=false;
  var yes=document.getElementById('consent-yes'), no=document.getElementById('consent-no');
  if(yes) yes.addEventListener('click',function(){try{localStorage.setItem(KEY,'granted');}catch(e){} loadAnalytics(); banner.hidden=true;});
  if(no) no.addEventListener('click',function(){try{localStorage.setItem(KEY,'denied');}catch(e){} banner.hidden=true;});
}

var form=document.getElementById('contact-form');
if(form){
  function setErr(input,err,msg){
    if(msg){ err.textContent=msg; err.hidden=false; input.setAttribute('aria-invalid','true'); return false; }
    err.hidden=true; input.removeAttribute('aria-invalid'); return true;
  }
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var name=document.getElementById('c-name'), email=document.getElementById('c-email'), msg=document.getElementById('c-msg');
    var okN=setErr(name,document.getElementById('e-name'), name.value.trim().length>=2?'':'A name of at least 2 characters.');
    var okE=setErr(email,document.getElementById('e-email'), /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())?'':'A valid email so I can reply.');
    var okM=setErr(msg,document.getElementById('e-msg'), msg.value.trim().length>=10?'':'Say a little more — at least 10 characters.');
    if(!okN||!okE||!okM) return;
    var title=encodeURIComponent('Site message — '+name.value.trim());
    var body=encodeURIComponent(msg.value.trim()+'\n\n— '+name.value.trim()+' ('+email.value.trim()+')');
    window.open('https://github.com/Thunder2700c/Fate-stay-last-time-3/issues/new?title='+title+'&body='+body,'_blank','noopener');
    window.location.href='thank-you.html';
  });
}
})();
