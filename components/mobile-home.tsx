"use client";
import Link from "next/link";
import {useEffect,useMemo,useState} from "react";
import {getChapters} from "@/lib/chapters";
type Chapter=ReturnType<typeof getChapters>[number];
export function MobileHome({chapters}:{chapters:Chapter[]}){
 const [resumeSlug,setResumeSlug]=useState<string>("");
 const resume=useMemo(()=>chapters.find(c=>c.slug===resumeSlug)||chapters.at(-1)||chapters[0],[chapters,resumeSlug]);
 useEffect(()=>{
  try{
   const saved=JSON.parse(localStorage.getItem("fslt-progress")||"{}") as Record<string,number>;
   const best=chapters.filter(c=>(saved[c.slug]||0)>0).sort((a,b)=>(saved[b.slug]||0)-(saved[a.slug]||0))[0];
   if(best)setResumeSlug(best.slug);
  }catch{/* A clean start is fine when local storage is unavailable. */}
 },[chapters]);
 const progress=resume?(()=>{try{return Math.round(JSON.parse(localStorage.getItem("fslt-progress")||"{}")[resume.slug]||0)}catch{return 0}})():0;
 return <main className="mobile-home" id="mobile-top">
  <header className="mobile-masthead"><Link href="/" className="mobile-brand"><b>F / SLT</b><small>A STORY IN PROGRESS</small></Link><span>VOL. 01 <i>✳</i></span></header>
  <section className="mobile-cover">
   <div className="mobile-cover-art" role="img" aria-label="Snow-covered mountain beneath a crimson night sky"/>
   <div className="mobile-cover-copy"><small>AN ENDING WAS NEVER PROMISED</small><h1>Fate / Stay<br/><em>Last Time.</em></h1><p>Some stories begin where history breaks.</p>
    <Link href="/archive/" className="mobile-enter">ENTER THE ARCHIVE <span>↗</span></Link>
   </div>
   <div className="mobile-cover-index">RECORD 001 <span>·</span> ENGLISH EDITION</div>
  </section>
  {resume&&<section className="mobile-resume-wrap"><div className="mobile-section-label"><span>YOUR READING ROOM</span><span>LAST OPENED</span></div><Link href={`/read/${resume.slug}/`} className="mobile-resume-card">
   <div className="mobile-resume-top"><span>CONTINUE READING</span><span>{String(resume.number).padStart(2,"0")} / {String(chapters.length).padStart(2,"0")}</span></div>
   <h2>{resume.title}</h2><div className="mobile-progress-track"><i style={{width:`${progress}%`}}/></div>
   <div className="mobile-resume-bottom"><span>{progress?progress+"% COMPLETE":"READY WHEN YOU ARE"}</span><b>RESUME ↗</b></div>
  </Link></section>}
  <section className="mobile-recent"><div className="mobile-section-heading"><div><small>THE READING ORDER</small><h2>First pages.<br/><em>Long shadows.</em></h2></div><Link href="/archive/">ALL CHAPTERS ↗</Link></div>
   <div className="mobile-chapter-stack">{chapters.slice(0,3).map(c=><Link href={`/read/${c.slug}/`} key={c.slug} className="mobile-chapter-row"><span className="mobile-chapter-no">{String(c.number).padStart(2,"0")}</span><span className="mobile-chapter-info"><b>{c.title}</b><small>{c.excerpt}</small></span><span className="mobile-chapter-arrow">↗</span></Link>)}</div>
  </section>
  <section className="mobile-about" id="mobile-about"><small>AN INDEPENDENT FAN PROJECT</small><p>A different record of heroes, choices, and consequences.</p><Link href="/archive/">READ THE STORY ↗</Link></section>
  <nav className="mobile-bottom-nav" aria-label="Mobile navigation"><Link href="/" aria-current="page"><span>⌂</span><small>HOME</small></Link><Link href="/archive/"><span>▤</span><small>CHAPTERS</small></Link><Link href="/archive/"><span>⌕</span><small>SEARCH</small></Link><Link href="#mobile-about"><span>◌</span><small>ABOUT</small></Link></nav>
 </main>;
}
