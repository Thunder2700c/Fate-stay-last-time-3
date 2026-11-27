import type { Metadata } from "next";
import Link from "next/link";
import { getChapters } from "@/lib/chapters";
import { PageTransition } from "@/components/page-transition";
import { PagefindSearch } from "@/components/pagefind-search";
import { ArchiveList } from "@/components/archive-list";
export const metadata:Metadata={title:"The Archive",description:"Browse every published chapter of Fate / Stay Last Time."};
export default function ArchivePage(){
  const chapters=getChapters();
  return <PageTransition><main className="archive-page">
    <section className="archive-intro"><p className="archive-label" data-scroll-reveal>F / SLT — THE CHAPTER ARCHIVE</p><h1 data-scroll-reveal>The <i>unwritten</i><br/>record.</h1><div className="archive-intro-foot" data-scroll-reveal><p>Every story leaves a trace.<br/>This is where you follow them.</p><span>ARCHIVE NO. 001<br/>ENGLISH EDITION</span></div></section>
    <PagefindSearch/><ArchiveList chapters={chapters}/>
    <footer className="site-footer"><Link href="/">F / SLT</Link><span>UNOFFICIAL FAN WORK</span><span>ENGLISH ARCHIVE</span></footer>
  </main></PageTransition>;
}
