import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { getChapter,getChapters } from "@/lib/chapters";
import { mdxComponents } from "@/lib/mdx-components";
import { ReaderFrame } from "@/components/reader-frame";
import { PageTransition } from "@/components/page-transition";
type Props={params:Promise<{slug:string}>};
export function generateStaticParams(){return getChapters().map(chapter=>({slug:chapter.slug}));}
export const dynamicParams=false;
export async function generateMetadata({params}:Props):Promise<Metadata>{
  const {slug}=await params,chapter=getChapter(slug);
  if(!chapter)return {title:"Chapter not found"};
  return {title:chapter.title,description:chapter.excerpt,openGraph:{title:chapter.title,description:chapter.excerpt,type:"article"}};
}
export default async function ChapterPage({params}:Props){
  const {slug}=await params,chapter=getChapter(slug);if(!chapter)notFound();
  const {content}=await compileMDX({source:chapter.source,components:mdxComponents});
  const all=getChapters(),previous=all.find(item=>item.number===chapter.number-1),next=all.find(item=>item.number===chapter.number+1);
  return <PageTransition><main className="chapter-page">
    <div className="chapter-font-styles" aria-hidden="true">{chapter.fonts.map(font=><link rel="stylesheet" href={`/fonts/${font}.css`} key={font}/>)}</div>
    <ReaderFrame slug={chapter.slug} number={chapter.number} title={chapter.title}>
      <header className="chapter-meta-block"><span>{chapter.mood}</span><time dateTime={chapter.date}>{chapter.date}</time></header>
      {content}
      <nav className="chapter-pagination" aria-label="Chapter navigation">
        {previous?<Link href={`/read/${previous.slug}/`}><small>PREVIOUS</small><span>← {previous.title}</span></Link>:<span/>}
        {next?<Link href={`/read/${next.slug}/`} className="chapter-next"><small>NEXT CHAPTER</small><span>{next.title} →</span></Link>:<Link href="/archive/" className="chapter-next"><small>END OF ARCHIVE</small><span>Return to index →</span></Link>}
      </nav>
    </ReaderFrame>
  </main></PageTransition>;
}
