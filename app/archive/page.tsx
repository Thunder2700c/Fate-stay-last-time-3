import type { Metadata } from "next";
import Link from "next/link";
import { getChapters } from "@/lib/chapters";
import { PageTransition } from "@/components/page-transition";
import { PagefindSearch } from "@/components/pagefind-search";
export const metadata:Metadata={title:"The Archive",description:"Browse every published chapter of Fate / Stay Last Time."};
export default function ArchivePage(){
  const chapters=getChapters();
  return <PageTransition><main className="archive-page">
    <section className="archive-intro"><p className="archive-label" data-scroll-reveal>F / SLT — THE CHAPTER ARCHIVE</p><h1 data-scroll-reveal>The <i>unwritten</i><br/>record.</h1><div className="archive-intro-foot" data-scroll-reveal><p>Every story leaves a trace.<br/>This is where you follow them.</p><span>ARCHIVE NO. 001<br/>ENGLISH EDITION</span></div></section>
    <PagefindSearch/>
    <section className="archive-list-section"><div className="archive-list-head"><span>READING SEQUENCE</span><span>{String(chapters.length).padStart(2,"0")} ENTRIES</span></div>
      <div className="archive-list">{chapters.map(chapter=><Link href={`/read/${chapter.slug}/`} className="archive-row" key={chapter.slug}><span className="archive-row-number">{String(chapter.number).padStart(2,"0")}</span><span className="archive-row-copy"><strong>{chapter.title}</strong><small>{chapter.mood} <i>·</i> {chapter.date}</small></span><span className="archive-row-arrow">↗</span></Link>)}{chapters.length===0&&<p className="empty-archive">No chapters found. Add a .mdx file to content/chapters.</p>}</div>
      <div className="archive-list-foot"><span>END OF CURRENT RECORD</span><span>NEW CHAPTERS JOIN THE SEQUENCE AUTOMATICALLY</span></div>
    </section><footer className="site-footer"><Link href="/">F / SLT</Link><span>UNOFFICIAL FAN WORK</span><span>ENGLISH ARCHIVE</span></footer>
  </main></PageTransition>;
}
