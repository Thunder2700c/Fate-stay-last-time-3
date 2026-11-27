"use client";
import { useState, type FormEvent } from "react";
type Item={url:string;title:string;excerpt:string};
type PFResult={data:()=>Promise<Item>};
type PFModule={search:(query:string)=>Promise<{results:PFResult[]}>};
export function PagefindSearch(){
  const [query,setQuery]=useState("");const [results,setResults]=useState<Item[]>([]);const [searched,setSearched]=useState(false);const [busy,setBusy]=useState(false);
  async function submit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();const term=query.trim();if(!term){setResults([]);setSearched(false);return;}
    setBusy(true);setSearched(true);
    try{const path="/pagefind/pagefind.js";const pagefind=await import(/* webpackIgnore: true */ path) as PFModule;const response=await pagefind.search(term);setResults(await Promise.all(response.results.slice(0,8).map(r=>r.data())));}
    catch{setResults([]);}finally{setBusy(false);}
  }
  return <section className="archive-search" aria-label="Search the novel">
    <form onSubmit={submit} className="search-form"><label htmlFor="chapter-search">SEARCH THE RECORD</label><div className="search-input-row"><input id="chapter-search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="A character, phrase, event…"/><button type="submit" disabled={busy}>{busy?"SEARCHING":"SEARCH ↗"}</button></div></form>
    {searched&&<div className="search-results" aria-live="polite">{results.length===0?<p>No matching passages found. Try another phrase.</p>:results.map(item=><a className="search-result" href={item.url} key={item.url}><strong>{item.title}</strong><span dangerouslySetInnerHTML={{__html:item.excerpt}}/></a>)}</div>}
  </section>;
}
