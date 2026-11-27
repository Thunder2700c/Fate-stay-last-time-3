"use client";
import Link from "next/link";
import { useEffect,useMemo,useState } from "react";
import type { ChapterMeta } from "@/lib/chapters";
export function ArchiveList({chapters}:{chapters:ChapterMeta[]}){
  const [bookmarks,setBookmarks]=useState<string[]>([]),[progress,setProgress]=useState<Record<string,number>>({}),[savedOnly,setSavedOnly]=useState(false);
  useEffect(()=>{try{setBookmarks(JSON.parse(localStorage.getItem("fslt-bookmarks")||"[]"));setProgress(JSON.parse(localStorage.getItem("fslt-progress")||"{}"));}catch{/* Empty local library when storage is blocked. */}},[]);
  const visible=useMemo(()=>savedOnly?chapters.filter(chapter=>bookmarks.includes(chapter.slug)):chapters,[chapters,bookmarks,savedOnly]);
  return <section className="archive-list-section">
    <div className="archive-list-head"><span>READING SEQUENCE</span><span>{String(visible.length).padStart(2,"0")} / {String(chapters.length).padStart(2,"0")} ENTRIES</span></div>
    <div className="archive-filter-bar"><span>{savedOnly?"YOUR SAVED CHAPTERS":"THE COMPLETE RECORD"}</span><button type="button" className={savedOnly?"saved-filter active":"saved-filter"} onClick={()=>setSavedOnly(value=>!value)}>◇ {savedOnly?"SHOW ALL CHAPTERS":"SHOW SAVED ONLY"}</button></div>
    <div className="archive-list">
      {visible.map(chapter=>{const amount=Math.round(progress[chapter.slug]||0);return <Link href={`/read/${chapter.slug}/`} className="archive-row" key={chapter.slug}><span className="archive-row-number">{String(chapter.number).padStart(2,"0")}</span><span className="archive-row-copy"><strong>{chapter.title}</strong><small>{chapter.mood} <i>·</i> {chapter.date}</small></span><span className="archive-row-status">{amount>0?`${amount}% READ`:"NOT OPENED"}</span><span className="archive-row-arrow">↗</span></Link>;})}
      {visible.length===0&&<p className="empty-archive">{savedOnly?"Nothing saved here yet. Bookmark a chapter while reading.":"No chapters found. Add a .mdx file to content/chapters."}</p>}
    </div>
    <div className="archive-list-foot"><span>END OF CURRENT RECORD</span><span>NEW CHAPTERS JOIN THE SEQUENCE AUTOMATICALLY</span></div>
  </section>;
}
