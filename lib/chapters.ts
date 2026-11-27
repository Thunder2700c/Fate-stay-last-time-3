import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import fontCatalog from "./fonts.json";

export type ChapterMeta={slug:string;title:string;number:number;date:string;mood:string;fonts:string[];excerpt:string};
export type ChapterFile=ChapterMeta&{source:string};
const directory=path.join(process.cwd(),"content","chapters");
const displaySlugs=new Set(fontCatalog.fonts.filter(font=>font.role==="display").map(font=>font.slug));

function readChapter(fileName:string):ChapterFile{
  const source=fs.readFileSync(path.join(directory,fileName),"utf8");
  const parsed=matter(source),data=parsed.data as Record<string,unknown>;
  const slug=fileName.replace(/\.mdx?$/,"");
  const title=typeof data.title==="string"?data.title:"Untitled chapter";
  const number=Number(data.number)||0;
  const date=typeof data.date==="string"?data.date:"2026-11-27";
  const mood=typeof data.mood==="string"?data.mood:"Unclassified";
  const requested=Array.isArray(data.fonts)?data.fonts:[];
  const explicit=requested.filter((font):font is string=>typeof font==="string"&&displaySlugs.has(font));
  const chantRequests=[...parsed.content.matchAll(/<Chant\b[^>]*\bfont=["']([^"']+)["']/gi)].map(match=>match[1]);
  if(/<Chant(?:\s|>)/i.test(parsed.content)&&chantRequests.length===0)chantRequests.push("cinzel");
  const chantFonts=chantRequests.map(request=>{
    const match=fontCatalog.fonts.find(font=>font.role==="display"&&(font.slug===request||font.family.toLowerCase()===request.toLowerCase()));
    return match?.slug??"cinzel";
  });
  const fonts=[...new Set([...explicit,...chantFonts])].filter(font=>displaySlugs.has(font));
  const excerpt=parsed.content.replace(/<[^>]+>/g," ").replace(/[#*_~`]/g,"").replace(/\s+/g," ").trim().slice(0,190);
  return {slug,title,number,date,mood,fonts,excerpt,source:parsed.content};
}
export function getChapters():ChapterMeta[]{
  if(!fs.existsSync(directory))return [];
  return fs.readdirSync(directory).filter(file=>file.endsWith(".mdx")).map(readChapter).sort((a,b)=>a.number-b.number).map(({source:_source,...meta})=>meta);
}
export function getChapter(slug:string):ChapterFile|null{
  if(!/^[a-z0-9-]+$/.test(slug)||!fs.existsSync(directory))return null;
  const file=`${slug}.mdx`;
  if(!fs.existsSync(path.join(directory,file)))return null;
  return readChapter(file);
}
