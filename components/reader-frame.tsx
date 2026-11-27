"use client";
import Link from "next/link";
import type { ReactNode,CSSProperties } from "react";
import { useEffect,useState } from "react";
import fontCatalog from "@/lib/fonts.json";
type Theme="void"|"paper"|"violet";
const readerFonts=fontCatalog.fonts.filter(font=>font.role==="reader");
export function ReaderFrame({slug,number,title,children}:{slug:string;number:number;title:string;children:ReactNode}){
  const [theme,setTheme]=useState<Theme>("void"),[font,setFont]=useState("literata"),[size,setSize]=useState(19),[progress,setProgress]=useState(0),[saved,setSaved]=useState(false),[settingsOpen,setSettingsOpen]=useState(false),[hydrated,setHydrated]=useState(false);
  useEffect(()=>{
    try{
      const prefs=JSON.parse(localStorage.getItem("fslt-reader-prefs")||"{}") as {theme?:Theme;font?:string;size?:number};
      if(["paper","violet","void"].includes(prefs.theme||""))setTheme(prefs.theme as Theme);
      if(readerFonts.some(item=>item.slug===prefs.font))setFont(prefs.font!);
      if(typeof prefs.size==="number")setSize(Math.min(25,Math.max(16,prefs.size)));
      const bookmarks=JSON.parse(localStorage.getItem("fslt-bookmarks")||"[]") as string[];
      setSaved(bookmarks.includes(slug));
    }catch{/* Safe defaults when storage is unavailable. */}
    setHydrated(true);
  },[slug]);
  useEffect(()=>{if(!hydrated)return;try{localStorage.setItem("fslt-reader-prefs",JSON.stringify({theme,font,size}));}catch{/* Storage is optional. */}},[hydrated,theme,font,size]);
  useEffect(()=>{
    let link=document.getElementById("fslt-reader-font") as HTMLLinkElement|null;
    if(!link){link=document.createElement("link");link.id="fslt-reader-font";link.rel="stylesheet";document.head.appendChild(link);}
    link.href=`/fonts/${font}.css`;
  },[font]);
  useEffect(()=>{
    try{
      const stored=JSON.parse(localStorage.getItem("fslt-progress")||"{}") as Record<string,number>;
      const savedPosition=Math.max(0,Math.min(100,stored[slug]||0));
      setProgress(savedPosition);
      if(savedPosition>0){
        const first=requestAnimationFrame(()=>requestAnimationFrame(()=>{
          const max=document.documentElement.scrollHeight-window.innerHeight;
          window.scrollTo(0,Math.round(max*savedPosition/100));
        }));
        return()=>cancelAnimationFrame(first);
      }
    }catch{/* Continue at the top when progress cannot be read. */}
  },[slug]);
  useEffect(()=>{
    let ticking=false;
    const update=()=>{
      if(ticking)return;ticking=true;
      window.requestAnimationFrame(()=>{
        const max=document.documentElement.scrollHeight-window.innerHeight;
        const value=max>0?Math.max(0,Math.min(100,window.scrollY/max*100)):0;
        setProgress(value);
        try{const stored=JSON.parse(localStorage.getItem("fslt-progress")||"{}") as Record<string,number>;stored[slug]=value;localStorage.setItem("fslt-progress",JSON.stringify(stored));}catch{/* Continue without saved progress. */}
        ticking=false;
      });
    };
    window.addEventListener("scroll",update,{passive:true});update();return()=>window.removeEventListener("scroll",update);
  },[slug]);
  function toggleBookmark(){
    try{const list=JSON.parse(localStorage.getItem("fslt-bookmarks")||"[]") as string[];const next=saved?list.filter(item=>item!==slug):[...new Set([...list,slug])];localStorage.setItem("fslt-bookmarks",JSON.stringify(next));setSaved(!saved);}catch{setSaved(!saved);}
  }
  return <div className={`reader-shell theme-${theme}`} style={{"--reader-size":`${size}px`,"--reader-family":`"${readerFonts.find(item=>item.slug===font)?.family||"Literata"}", Georgia, serif`} as CSSProperties}>
    <div className="reader-progress"><span style={{width:`${progress}%`}}/></div>
    <div className="reader-toolbar"><Link href="/archive/" className="reader-back">← <span>ARCHIVE</span></Link><span className="reader-wordmark">F / SLT <i>·</i> {String(number).padStart(2,"0")}</span><div className="reader-actions"><button type="button" className={saved?"tool-button is-saved":"tool-button"} onClick={toggleBookmark} aria-label={saved?"Remove bookmark":"Bookmark chapter"}>{saved?"◆":"◇"}</button><button type="button" className="tool-button" onClick={()=>setSettingsOpen(v=>!v)} aria-expanded={settingsOpen} aria-label="Reading settings">Aa</button></div></div>
    {settingsOpen&&<aside className="reader-settings"><div className="settings-title"><span>READING ROOM</span><button onClick={()=>setSettingsOpen(false)} aria-label="Close settings">×</button></div>
      <label>PAGE TONE<select value={theme} onChange={e=>setTheme(e.target.value as Theme)}><option value="void">Void / dark</option><option value="paper">Paper / warm</option><option value="violet">Violet / dusk</option></select></label>
      <label>TYPEFACE<select value={font} onChange={e=>setFont(e.target.value)}>{readerFonts.map(item=><option value={item.slug} key={item.slug}>{item.family}</option>)}</select></label>
      <label>TEXT SIZE <span>{size}px</span><input type="range" min="16" max="25" value={size} onChange={e=>setSize(Number(e.target.value))}/></label>
      <button className="settings-reset" onClick={()=>{setTheme("void");setFont("literata");setSize(19);}}>RESET PREFERENCES</button>
    </aside>}
    <div className="reader-title-block"><span className="reader-overline">CHAPTER {String(number).padStart(2,"0")} <i>·</i> FATE / STAY LAST TIME</span><h1>{title}</h1><p>Scroll at your own pace. Your place is remembered on this device.</p><div className="reader-title-rule"><span>✳</span></div></div>
    <article className="chapter-prose" data-pagefind-body>{children}</article>
    <div className="reader-endmark"><span>✳</span><small>END OF CHAPTER {String(number).padStart(2,"0")}</small></div>
    <div className="reader-footline"><Link href="/archive/">RETURN TO THE ARCHIVE ↗</Link><span>LOCAL READING PROGRESS · {Math.round(progress)}%</span></div>
  </div>;
}
