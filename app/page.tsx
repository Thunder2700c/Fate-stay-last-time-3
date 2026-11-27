import Link from "next/link";
import { getChapters } from "@/lib/chapters";
import { HeroSceneLoader } from "@/components/hero-scene-loader";
import { HomeMotion } from "@/components/home-motion";
import { PageTransition } from "@/components/page-transition";
import { MobileHome } from "@/components/mobile-home";
import { TabletHome } from "@/components/tablet-home";
export default function HomePage(){
  const chapters=getChapters(),first=chapters[0],latest=chapters.at(-1);
  return <PageTransition><MobileHome chapters={chapters}/><TabletHome chapters={chapters}/><main className="home-page">
    <HomeMotion/>
    <section className="home-hero">
      <div className="hero-topline"><span>AN UNOFFICIAL FATE FAN STORY</span><span>ARCHIVE / 001 — ENGLISH</span></div>
      <div className="hero-copy">
        <p className="hero-eyebrow"><i/> AN ENDING WAS NEVER PROMISED</p>
        <h1 className="hero-title">Fate /<br/><em>Stay Last</em><br/><span>Time.</span></h1>
        <p className="hero-summary">Some stories are written in history.<br/>Others begin where history breaks.</p>
        <div className="hero-actions"><Link href="/archive/" className="action-primary">ENTER THE ARCHIVE <span>↗</span></Link>{first&&<Link href={`/read/${first.slug}/`} className="action-secondary">START WITH CHAPTER 01</Link>}</div>
      </div>
      <div className="hero-visual"><HeroSceneLoader/></div>
      <div className="hero-index">F–SLT <span>·</span> A DIFFERENT RECORD</div>
      <div className="hero-bottomline"><span>NO GRAIL WAR IS THE SAME TWICE</span><span>SCROLL TO ENTER ↓</span><span>© THE AUTHOR</span></div>
    </section>
    <section className="manifesto-section" id="about">
      <div className="section-index" data-scroll-reveal>01 / THE PREMISE</div>
      <div className="manifesto-copy" data-scroll-reveal><p className="section-kicker">A STORY OUTSIDE THE RECORD</p><h2>The world remembers<br/>what <i>it chooses.</i></h2><p>This is an unofficial fan-created story set in a different direction of the Fate universe. The archive gathers each chapter in one place, with a reading room built to make long sessions comfortable.</p><Link href="/archive/" className="underlined-link">FOLLOW THE RECORD <span>↗</span></Link></div>
      <div className="manifesto-mark" aria-hidden="true"><span>F</span><i>/</i><b>SLT</b><small>RECORD 001<br/>UNSEALED</small></div>
    </section>
    <section className="latest-section">
      <div className="latest-head"><div><p className="section-kicker">02 / THE READING ORDER</p><h2>First pages.<br/><i>Long shadows.</i></h2></div><Link href="/archive/" className="underlined-link">ALL CHAPTERS <span>↗</span></Link></div>
      {chapters.length>0?<div className="chapter-preview-grid">{chapters.slice(0,3).map((chapter,index)=><Link href={`/read/${chapter.slug}/`} className="preview-card" key={chapter.slug} data-scroll-reveal><span className="preview-number">{String(index+1).padStart(2,"0")} <i>/</i> CHAPTER</span><strong>{chapter.title}</strong><p>{chapter.excerpt}</p><span className="preview-open">OPEN CHAPTER ↗</span></Link>)}</div>:<div className="empty-archive">THE ARCHIVE IS WAITING FOR ITS FIRST CHAPTER.</div>}
      {latest&&<p className="latest-footnote">THE CURRENT RECORD RUNS THROUGH CHAPTER {String(latest.number).padStart(2,"0")} <span>·</span> {chapters.length} ENTRIES</p>}
    </section>
    <section className="author-section" data-scroll-reveal><span>03 / THE AUTHOR</span><div><small>A PERSONAL FAN PROJECT</small><p>Written by Gurtej — an independent fan work exploring another path through a universe of heroes, choices, and consequences.</p></div><span>F / SLT</span></section>
    <footer className="site-footer"><span>F / SLT</span><span>UNOFFICIAL FAN WORK · NOT AFFILIATED WITH TYPE-MOON</span><Link href="/archive/">OPEN THE ARCHIVE ↗</Link></footer>
  </main></PageTransition>;
}
