import { useEffect, useState, type CSSProperties } from 'react'
import { Link, NavLink, Route, Routes, useParams } from 'react-router-dom'
import { ArrowDown, ArrowLeft, ArrowRight, AudioLines, Bookmark, BookOpen, ChevronDown, Menu, Moon, Search, Settings2, Sun, X } from 'lucide-react'
import gsap from 'gsap'
import { chapters } from './data/chapters'

const FONT_OPTIONS = [
  ['Literata','Literata, Georgia, serif'],['Lora','Lora, Georgia, serif'],['Merriweather','Merriweather, Georgia, serif'],['Source Serif 4','Source Serif 4, Georgia, serif'],['Crimson Pro','Crimson Pro, Georgia, serif'],['Cormorant Garamond','Cormorant Garamond, Georgia, serif'],['EB Garamond','EB Garamond, Georgia, serif'],['Alegreya','Alegreya, Georgia, serif'],['Spectral','Spectral, Georgia, serif'],['Bitter','Bitter, Georgia, serif'],['DM Serif Display','DM Serif Display, Georgia, serif'],['Playfair Display','Playfair Display, Georgia, serif'],['Libre Baskerville','Libre Baskerville, Georgia, serif'],['PT Serif','PT Serif, Georgia, serif'],['Noto Serif','Noto Serif, Georgia, serif'],['Roboto Slab','Roboto Slab, Georgia, serif'],['Newsreader','Newsreader, Georgia, serif'],['Fraunces','Fraunces, Georgia, serif'],['Georgia','Georgia, serif'],['System Sans','Arial, sans-serif']
] as const

function useStored<T>(key:string, initial:T):[T,(value:T)=>void] {
  const [value,setValue] = useState<T>(()=>{try{const saved=localStorage.getItem(key);return saved?JSON.parse(saved) as T:initial}catch{return initial}})
  const update=(next:T)=>{setValue(next);try{localStorage.setItem(key,JSON.stringify(next))}catch{}}
  return [value,update]
}
function Header({compact=false}:{compact?:boolean}) {
  const [open,setOpen]=useState(false)
  return <header className={`topbar ${compact?'topbar-compact':''}`}>
    <Link className="wordmark" to="/" aria-label="Fate Stay Last Time home"><span>F</span><i>/</i>SLT</Link>
    <nav className="desktop-nav"><NavLink to="/">The threshold</NavLink><NavLink to="/index">The archive</NavLink></nav>
    <div className="topbar-right"><span className="edition-tag">AN UNOFFICIAL FAN STORY</span><button className="icon-button mobile-menu-trigger" onClick={()=>setOpen(!open)} aria-label="Toggle menu">{open?<X/>:<Menu/>}</button><Link className="nav-enter" to="/index">ENTER THE ARCHIVE <ArrowRight size={14}/></Link></div>
    {open&&<div className="mobile-nav"><Link to="/" onClick={()=>setOpen(false)}>The threshold</Link><Link to="/index" onClick={()=>setOpen(false)}>The archive</Link></div>}
  </header>
}
function Landing() {
  const [tilt,setTilt]=useState({x:0,y:0})
  useEffect(()=>{const ctx=gsap.context(()=>{gsap.fromTo('.hero-kicker,.hero-title,.hero-deck,.hero-bottomline',{y:32,opacity:0},{y:0,opacity:1,duration:1.1,stagger:.14,ease:'power3.out',delay:.2});gsap.to('.orbit-planet',{rotate:360,duration:80,repeat:-1,ease:'none'})});return()=>ctx.revert()},[])
  return <main className="landing-shell" onPointerMove={e=>{if(e.pointerType==='touch')return;const r=e.currentTarget.getBoundingClientRect();setTilt({x:(e.clientX-r.left)/r.width-.5,y:(e.clientY-r.top)/r.height-.5})}}>
    <Header/>
    <section className="landing-hero">
      <div className="hero-coordinate">37° 33' 18.4&quot; N<br/>A STORY OUTSIDE THE RECORD</div>
      <div className="hero-art" style={{transform:`perspective(1200px) rotateY(${tilt.x*3}deg) rotateX(${-tilt.y*3}deg)`}}>
        <div className="art-veil"/><div className="art-sun"/><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orbit-planet"/>
        <div className="art-vertical">THE LAST RECORD / UNSEALED</div>
        <div className="art-index">F–00<br/>ARCHIVE OF AN<br/>UNWRITTEN END</div>
      </div>
      <div className="hero-copy desktop-stage">
        <p className="hero-kicker"><span className="red-dot"/> A DIFFERENT FATE UNIVERSE <span className="kicker-line"/></p>
        <h1 className="hero-title">Fate <em>Stay</em><br/><span>Last Time.</span></h1>
        <p className="hero-deck">Some stories are written in history.<br/>Others begin where history breaks.</p>
        <Link className="begin-link" to="/index"><span className="begin-icon"><ArrowDown size={17}/></span><span>STEP INTO THE STORY</span><small>OPEN THE ARCHIVE</small></Link>
      </div>
      <div className="tablet-stage">
        <div className="tablet-stage-label">F / SLT — AN ALTERNATE FATE UNIVERSE</div>
        <div className="tablet-stage-title">A story<br/><i>outside</i> the record.</div>
        <p>Some stories are written in history.<br/>Others begin where history breaks.</p>
        <Link to="/index" className="tablet-stage-link">OPEN THE ARCHIVE <ArrowRight size={16}/></Link>
        <span className="tablet-stage-index">ARCHIVE 001 · ENGLISH EDITION</span>
      </div>
      <div className="mobile-stage">
        <div className="mobile-stage-kicker"><span/> AN ALTERNATE FATE UNIVERSE</div>
        <h1>Fate /<br/><i>Stay Last</i><br/>Time.</h1>
        <p>A fan-created story.<br/>A different direction.</p>
        <Link to="/index"><span>ENTER THE ARCHIVE</span><ArrowDown size={17}/></Link>
        <small>UNOFFICIAL FAN WORK · F / SLT</small>
      </div>
      <div className="hero-side-note">AN INDEPENDENT FAN-CREATED STORY<br/>UNOFFICIAL / NOT AFFILIATED WITH TYPE-MOON</div>
      <div className="hero-bottomline"><span>FATE / STAY LAST TIME</span><span>THE BEGINNING IS A CHOICE</span><span>SCROLL TO EXPLORE ↓</span></div>
    </section>
    <section className="threshold-section">
      <div className="threshold-number">01 / THE PREMISE</div>
      <div className="threshold-content"><p className="section-overline">A STORY IN ANOTHER DIRECTION</p><h2>Not the end<br/>you <i>remember.</i></h2><p className="threshold-body">An unofficial fan-created story set in a different Fate universe. Enter the archive to discover the chapters as they are written.</p><Link to="/index" className="text-arrow">EXPLORE THE STORY <ArrowRight size={15}/></Link></div>
      <div className="threshold-aside"><div className="seal-sketch">✳</div><span>THE RECORD<br/>IS INCOMPLETE</span></div>
    </section>
    <section className="author-strip"><span>02 / THE AUTHOR</span><div><small>AN INDEPENDENT FAN CREATION</small><p>Written by Gurtej. A personal fan project exploring a different direction in the Fate universe.</p></div><span>F / SLT</span></section>
    <footer className="site-footer"><span>F / SLT</span><span>AN UNOFFICIAL FAN WORK</span><span>© THE AUTHOR</span></footer>
  </main>
}
function IndexPage() {
  const [query,setQuery]=useState('')
  const [playing,setPlaying]=useState(false)
  const [savedOnly,setSavedOnly]=useState(false)
  const [bookmarks]=useStored<string[]>('fslt-bookmarks',[])
  const filtered=chapters.filter(c=>(!savedOnly||bookmarks.includes(c.slug))&&(c.title+' '+c.subtitle+' '+c.number).toLowerCase().includes(query.toLowerCase()))
  const [progress]=useStored<Record<string,number>>('fslt-progress',{})
  return <main className="archive-shell">
    <Header compact/>
    <section className="archive-intro"><p className="micro-label reveal">F / SLT — THE CHAPTER ARCHIVE</p><h1 className="archive-title reveal">The <i>unwritten</i><br/>record.</h1><div className="archive-intro-bottom reveal"><p>Every story leaves a trace.<br/>This is where you follow them.</p><span>ARCHIVE NO. 001<br/>ENGLISH EDITION</span></div></section>
    <section className="archive-console">
      <div className="console-head"><div><span className="console-dot"/> READING SEQUENCE</div><span>{String(filtered.length).padStart(2,'0')} ENTRIES</span></div>
      <div className="player-strip"><div className="player-art"><AudioLines size={24}/></div><div className="player-meta"><small>NOW BROWSING</small><strong>Fate / Stay Last Time</strong><span>CHAPTER INDEX · READING ARCHIVE</span></div><button className={`play-button ${playing?'is-playing':''}`} onClick={()=>setPlaying(!playing)} aria-label="Toggle archive animation"><span>{playing?'Ⅱ':'▶'}</span></button><div className="player-wave" aria-hidden="true">{Array.from({length:34},(_,i)=><i key={i} style={{height:`${8+(i*17%27)}px`}}/>)}</div></div>
      <div className="archive-tools"><label className="search-box"><Search size={16}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search chapters or titles..." aria-label="Search chapters"/></label><button className={`saved-filter ${savedOnly?'active':''}`} onClick={()=>setSavedOnly(!savedOnly)}><Bookmark size={13}/> SAVED ONLY</button></div>
      <div className="track-list">{filtered.map((c,i)=><Link to={`/read/${c.slug}`} className="track-row" key={c.slug}><span className="track-no">{String(i+1).padStart(2,'0')}</span><span className="track-symbol">✳</span><span className="track-title"><strong>{c.title}</strong><small>{c.subtitle}</small></span><span className="track-duration">{progress[c.slug]?Math.round(progress[c.slug])+'% READ':c.readTime}</span><span className="track-arrow"><ArrowRight size={17}/></span></Link>)}
        {filtered.length===0&&<p className="empty-search">No chapters match that search.</p>}
      </div>
      <div className="archive-foot"><span>END OF CURRENT ARCHIVE</span><span>NEW ENTRIES APPEAR HERE</span></div>
    </section>
    <footer className="site-footer"><span>F / SLT</span><span>AN UNOFFICIAL FAN WORK</span><span><Link to="/">RETURN TO THRESHOLD ↑</Link></span></footer>
  </main>
}
function Reader() {
  const {slug=''}=useParams()
  const chapter=chapters.find(c=>c.slug===slug)
  const idx=chapters.findIndex(c=>c.slug===slug)
  const [theme,setTheme]=useStored('fslt-theme','night')
  const [font,setFont]=useStored('fslt-font','Literata')
  const [size,setSize]=useStored('fslt-size',19)
  const [line,setLine]=useStored('fslt-line',1.85)
  const [bookmarks,setBookmarks]=useStored<string[]>('fslt-bookmarks',[])
  const [,setProgress]=useStored<Record<string,number>>('fslt-progress',{})
  const [settings,setSettings]=useState(false)
  const [showChapters,setShowChapters]=useState(false)
  const [scrollPct,setScrollPct]=useState(0)
  useEffect(()=>{const fn=()=>{const max=document.documentElement.scrollHeight-window.innerHeight;const p=max>0?Math.min(100,Math.max(0,window.scrollY/max*100)):0;setScrollPct(p);if(chapter){let all:Record<string,number>={};try{all=JSON.parse(localStorage.getItem('fslt-progress')||'{}')}catch{};setProgress({...all,[chapter.slug]:p})}};window.addEventListener('scroll',fn,{passive:true});return()=>window.removeEventListener('scroll',fn)},[chapter?.slug])
  useEffect(()=>{window.scrollTo(0,0)},[slug])
  if(!chapter)return <main className="not-found"><Header compact/><h1>That page is not in this archive.</h1><Link to="/index">Return to the index <ArrowRight/></Link></main>
  const saved=bookmarks.includes(chapter.slug)
  const toggleBookmark=()=>setBookmarks(saved?bookmarks.filter(x=>x!==chapter.slug):[...bookmarks,chapter.slug])
  const prev=chapters[idx-1],next=chapters[idx+1]
  return <main className={`reader-shell theme-${theme}`} style={{'--reader-font':FONT_OPTIONS.find(f=>f[0]===font)?.[1]||'Georgia,serif','--reader-size':size+'px','--reader-line':line} as CSSProperties}>
    <div className="reading-progress"><span style={{width:scrollPct+'%'}}/></div>
    <header className="reader-top"><Link to="/index" className="reader-back"><ArrowLeft size={16}/><span>ARCHIVE</span></Link><span className="reader-brand">F / SLT</span><div className="reader-actions"><button className="reader-tool" onClick={toggleBookmark} aria-label={saved?'Remove bookmark':'Bookmark chapter'}><Bookmark size={18} fill={saved?'currentColor':'none'}/></button><button className="reader-tool" onClick={()=>setSettings(!settings)} aria-label="Reading settings"><Settings2 size={18}/></button></div></header>
    {settings&&<aside className="reader-settings"><div className="settings-heading"><strong>READING ROOM</strong><button onClick={()=>setSettings(false)} aria-label="Close settings"><X size={17}/></button></div><label>THEME<div className="theme-choices"><button className={theme==='night'?'selected':''} onClick={()=>setTheme('night')}><Moon size={15}/> Night</button><button className={theme==='paper'?'selected':''} onClick={()=>setTheme('paper')}><Sun size={15}/> Paper</button><button className={theme==='violet'?'selected':''} onClick={()=>setTheme('violet')}>✳ Violet</button></div></label><label>TYPEFACE<select value={font} onChange={e=>setFont(e.target.value)}>{FONT_OPTIONS.map(f=><option key={f[0]} value={f[0]}>{f[0]}</option>)}</select></label><label>TEXT SIZE <span>{size}px</span><input type="range" min="15" max="27" value={size} onChange={e=>setSize(Number(e.target.value))}/></label><label>LINE SPACING <span>{line.toFixed(2)}</span><input type="range" min="1.45" max="2.2" step=".05" value={line} onChange={e=>setLine(Number(e.target.value))}/></label><button className="reset-settings" onClick={()=>{setTheme('night');setFont('Literata');setSize(19);setLine(1.85)}}>RESET READING SETTINGS</button></aside>}
    <div className="reader-layout"><aside className="reader-rail"><span>F / SLT</span><span>CHAPTER<br/>{chapter.number}</span><span>{String(scrollPct).padStart(2,'0')}%</span></aside><article className="reading-column"><div className="chapter-overline">{chapter.phase} <span>✳</span> CHAPTER {chapter.number} · {chapter.readTime.toUpperCase()}</div><h1 className="chapter-title">{chapter.title}</h1><p className="chapter-subtitle">{chapter.subtitle}</p><div className="chapter-rule"><span>✳</span></div><div className="chapter-body">{chapter.paragraphs.map((p,i)=>p==='---'?<div className="chapter-scene-break" key={i}><span>✳</span></div>:p.startsWith('## ')?<h2 className="chapter-section-heading" key={i}>{p.slice(3)}</h2>:p.startsWith('@@')?<div className="chapter-dialogue" key={i}><small>{p.slice(2).split('|')[0]}</small><p>{p.slice(2).split('|').slice(1).join('|')}</p></div>:p.startsWith('!!')?<p className="chapter-sound" key={i}>{p.slice(2)}</p>:p.startsWith('~')?<p className="chapter-thought" key={i}>{p.slice(1)}</p>:<p key={i}>{p}</p>)}</div><div className="chapter-end"><span>✳</span><small>END OF CHAPTER {chapter.number}</small></div><div className="reader-bottom-actions"><button onClick={()=>setShowChapters(!showChapters)}><BookOpen size={16}/> CHAPTER LIST <ChevronDown size={14}/></button><button onClick={toggleBookmark}><Bookmark size={16} fill={saved?'currentColor':'none'}/>{saved?'SAVED':'SAVE'}</button></div>{showChapters&&<div className="reader-chapter-list">{chapters.map(c=><Link key={c.slug} to={'/read/'+c.slug}>{c.number} — {c.title}</Link>)}</div>}<div className="chapter-navigation">{prev?<Link to={'/read/'+prev.slug}><small>PREVIOUS</small><span><ArrowLeft size={16}/>{prev.title}</span></Link>:<span/>}{next?<Link to={'/read/'+next.slug} className="next-chapter"><small>NEXT CHAPTER</small><span>{next.title}<ArrowRight size={16}/></span></Link>:<Link to="/index" className="next-chapter"><small>END OF ARCHIVE</small><span>Return to index <ArrowRight size={16}/></span></Link>}</div></article></div>
    <div className="reader-footer"><Link to="/index">F / SLT — ARCHIVE</Link><span>YOUR PROGRESS IS SAVED ON THIS DEVICE</span></div>
  </main>
}
export default function App(){return <Routes><Route path="/" element={<Landing/>}/><Route path="/index" element={<IndexPage/>}/><Route path="/read/:slug" element={<Reader/>}/><Route path="*" element={<Landing/>}/></Routes>}
