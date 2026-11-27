import Link from "next/link";
import type { getChapters } from "@/lib/chapters";
type Chapter=ReturnType<typeof getChapters>[number];

export function TabletHome({chapters}:{chapters:Chapter[]}){
 const current=chapters[3]||chapters.at(-1)||chapters[0];
 return <main className="tablet-home">
  <header className="tablet-masthead">
   <Link href="/" className="tablet-wordmark"><b>FATE / STAY LAST TIME</b><small>AN ORIGINAL WEB NOVEL · VOL. 01</small></Link>
   <nav><a href="#tablet-story">THE STORY</a><Link href="/archive/">CHAPTERS</Link><a href="#tablet-about">ABOUT</a><span>☼</span></nav>
  </header>
  <section className="tablet-hero" id="tablet-story">
   <div className="tablet-copy">
    <small className="tablet-eyebrow">A STORY ABOUT FATE, MEMORY &amp; THE THINGS WE CANNOT CHANGE</small>
    <h1>Some endings<br/>are written<br/><i>before the beginning.</i></h1>
    <p>A quiet signal. A road swallowed by snow. And a choice that should never have been made.</p>
    <Link href={current?"/read/"+current.slug+"/":"/archive/"} className="tablet-enter">ENTER THE STORY <span>↗</span></Link>
   </div>
   <div className="tablet-art" role="img" aria-label="A crimson moon above dark mountain silhouettes">
    <span className="tablet-art-edition">VOL. 01 / THE FIRST FRACTURE</span><span className="tablet-art-title">F / S L T</span>
   </div>
  </section>
  <section className="tablet-lower">
   {current&&<Link href={"/read/"+current.slug+"/"} className="tablet-continue"><small>CONTINUE READING / {String(current.number).padStart(2,"0")} OF {String(chapters.length).padStart(2,"0")}</small><strong>{current.title}</strong><span className="tablet-progress"><i/></span><b>RESUME ↗</b></Link>}
   <div className="tablet-index"><small>THE CHAPTER INDEX</small>{chapters.slice(0,4).map(c=><Link href={"/read/"+c.slug+"/"} key={c.slug}><span>{String(c.number).padStart(2,"0")}</span>{c.title}<i>↗</i></Link>)}<Link href="/archive/" className="tablet-all">VIEW FULL ARCHIVE ↗</Link></div>
  </section>
  <footer className="tablet-footer" id="tablet-about"><span>F / SLT</span><span>AN INDEPENDENT FAN PROJECT · ENGLISH EDITION</span><Link href="/archive/">OPEN THE ARCHIVE ↗</Link></footer>
 </main>;
}
