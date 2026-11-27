import { useEffect, useRef, useState } from 'react'
import { ArrowDownRight, ArrowLeft, ArrowRight, AudioLines, BookOpen, Menu, X } from 'lucide-react'
import { gsap } from 'gsap'

const chapters = [
  { no: '00', title: 'The shape of an ending', note: 'PROLOGUE · 08 MIN', tag: 'BEGIN HERE' },
  { no: '01', title: 'A promise with no witness', note: 'CHAPTER ONE · 14 MIN', tag: 'THE FIRST THREAD' },
  { no: '02', title: 'Where the light forgets', note: 'CHAPTER TWO · COMING SOON', tag: 'IN PROGRESS' },
]

function App() {
  const root = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [readerOpen, setReaderOpen] = useState(false)
  const [chapter, setChapter] = useState(0)
  const [soundOn, setSoundOn] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-kicker, .hero-title, .hero-copy, .hero-actions', {
        y: 28, opacity: 0, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.15
      })
      gsap.from('.orbital-art', { scale: 0.78, opacity: 0, rotate: -18, duration: 1.6, ease: 'power3.out' })
      gsap.to('.orbit-one', { rotate: 360, duration: 34, repeat: -1, ease: 'none' })
      gsap.to('.orbit-two', { rotate: -360, duration: 48, repeat: -1, ease: 'none' })
    }, root)
    return () => ctx.revert()
  }, [])

  const openReader = (index: number) => { setChapter(index); setReaderOpen(true) }
  const active = chapters[chapter]

  return <div className="site-shell" ref={root}>
    <div className="grain" aria-hidden="true" />
    <header className="topbar">
      <a className="brand" href="#top" aria-label="Fate Stay Last Time home"><span className="brand-mark">F<span>/</span></span><span className="brand-name">FATE <i>/</i> STAY<br/>LAST TIME</span></a>
      <div className="top-meta"><span>AN ORIGINAL WEB NOVEL</span><span className="meta-dot" /><span>VOL. 01 — THE UNFINISHED</span></div>
      <nav className={menuOpen ? 'nav-links nav-open' : 'nav-links'}>
        <a href="#story" onClick={() => setMenuOpen(false)}>THE STORY</a>
        <a href="#chapters" onClick={() => setMenuOpen(false)}>CHAPTERS</a>
        <a href="#world" onClick={() => setMenuOpen(false)}>THE WORLD</a>
      </nav>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X/> : <Menu/>}</button>
      <button className="sound-toggle" onClick={() => setSoundOn(!soundOn)}><AudioLines size={15}/><span>{soundOn ? 'SOUND ON' : 'SOUND OFF'}</span><i className={soundOn ? 'sound-dot live' : 'sound-dot'} /></button>
    </header>

    <main id="top">
      <section className="hero" id="story">
        <div className="hero-left">
          <div className="hero-kicker"><span className="cross">✳</span> A STORY BEYOND THE ENDING <span className="kicker-line" /></div>
          <h1 className="hero-title">FATE <em>/</em><br/><span>STAY</span><br/>LAST <i>TIME.</i></h1>
          <div className="hero-bottom">
            <p className="hero-copy">Some stories are written to reach an ending.<br/>Others begin where the ending breaks.</p>
            <div className="hero-actions">
              <button className="primary-button" onClick={() => openReader(0)}><BookOpen size={16}/> ENTER THE STORY <ArrowRight size={16}/></button>
              <a className="text-link" href="#chapters">EXPLORE THE ARCHIVE <ArrowDownRight size={15}/></a>
            </div>
          </div>
        </div>
        <div className="hero-art-wrap">
          <div className="art-index"><span>FIG. 001</span><span>THE POINT OF NO RETURN</span></div>
          <div className="orbital-art" aria-label="Abstract orbital artwork representing a fractured celestial body">
            <div className="orbit orbit-one"><span className="orbit-node" /></div>
            <div className="orbit orbit-two"><span className="orbit-node node-two" /></div>
            <div className="orb-core"><div className="core-light" /><div className="core-cut" /></div>
            <div className="art-crosshair cross-a" /><div className="art-crosshair cross-b" />
            <span className="art-coordinate coord-a">35° 41′ 22.2″ N</span><span className="art-coordinate coord-b">139° 41′ 30.1″ E</span>
            <span className="art-vertical">MEMORY IS A FORM OF GRAVITY</span>
          </div>
          <div className="art-caption"><span>AN INDEX OF THINGS LOST</span><span>01 — 03</span></div>
        </div>
        <div className="hero-side-note">SCROLL TO DESCEND <span>↓</span></div>
      </section>

      <section className="manifesto" id="world">
        <div className="section-label"><span>01 / THE PREMISE</span><span>READ BETWEEN THE LINES</span></div>
        <div className="manifesto-grid">
          <p className="manifesto-small">A NOTE FROM THE ARCHIVE<br/>— FILE NO. 0001</p>
          <h2>WHAT IF THE<br/><em>ENDING</em> WAS<br/>ONLY THE <span>BEGINNING?</span></h2>
          <div className="manifesto-aside"><span className="asterisk">✳</span><p>A world of impossible choices, unfinished promises, and the fragile distance between what happened and what should have.</p><a href="#chapters">FOLLOW THE THREAD <ArrowDownRight size={14}/></a></div>
        </div>
      </section>

      <section className="chapters-section" id="chapters">
        <div className="section-label"><span>02 / THE READING ROOM</span><span>THE ARCHIVE IS OPEN</span></div>
        <div className="chapter-heading"><h2>THE <em>CHAPTERS</em></h2><span>SELECT A THREAD TO FOLLOW ↘</span></div>
        <div className="chapter-list">
          {chapters.map((item, i) => <button className="chapter-row" key={item.no} onClick={() => openReader(i)}>
            <span className="chapter-no">{item.no}</span><span className="chapter-info"><small>{item.tag}</small><strong>{item.title}</strong><em>{item.note}</em></span><span className="chapter-open">{i === 2 ? 'SOON' : 'READ'} <ArrowUpRightIcon/></span>
          </button>)}
        </div>
        <div className="archive-foot"><span>THREE THREADS. ONE UNFINISHED STORY.</span><span>MORE PAGES WILL BE ADDED.</span></div>
      </section>

      <section className="closing">
        <div className="closing-mark">F<span>/</span></div>
        <p>THE STORY DOESN'T END<br/>WHEN YOU CLOSE THE PAGE.</p>
        <a href="#top">BACK TO THE BEGINNING ↑</a>
      </section>
    </main>
    <footer><span>© FATE / STAY LAST TIME</span><span>AN ORIGINAL FICTION PROJECT</span><span>MADE TO BE READ, NOT RUSHED.</span></footer>

    {readerOpen && <div className="reader-overlay" role="dialog" aria-modal="true" aria-label="Chapter reader">
      <div className="reader-top"><button onClick={() => setReaderOpen(false)}><ArrowLeft size={16}/> BACK TO THE ARCHIVE</button><span>F / S.L.T. — READER</span><button onClick={() => setReaderOpen(false)} aria-label="Close reader"><X/></button></div>
      <article className="reader-page"><div className="reader-kicker">VOLUME 01 <span>•</span> {active.note}</div><div className="reader-number">{active.no}</div><h2>{active.title}</h2>
        {chapter === 2 ? <p className="reader-placeholder">This chapter is still being written. The archive will open when the next thread is ready.</p> : <>
          <p className="reader-lead">There are moments that refuse to become memories. They remain somewhere between a heartbeat and the silence that follows it.</p>
          <p>The world has a way of pretending that every story knows where it is going. It gives things names, draws borders around the unknown, and calls the space beyond them impossible.</p>
          <p>But some things do not stay buried. Some promises do not dissolve. And somewhere, in the quiet after an ending, something is still waiting to begin.</p>
          <p className="reader-note">— THE ARCHIVE HAS MORE TO REVEAL.</p>
        </>}
        <div className="reader-controls"><button disabled={chapter === 0} onClick={() => setChapter(chapter - 1)}>← PREVIOUS</button><span>{active.no} / 02</span><button disabled={chapter === 2} onClick={() => setChapter(chapter + 1)}>NEXT CHAPTER →</button></div>
      </article>
    </div>}
  </div>
}

function ArrowUpRightIcon() { return <ArrowDownRight size={17} className="arrow-up-right" /> }

export default App