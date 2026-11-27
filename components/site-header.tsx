"use client";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function SiteHeader(){
  const [open,setOpen]=useState(false);
  return <header className="site-header">
    <Link href="/" className="brand-mark" aria-label="Fate Stay Last Time home"><span className="brand-glyph">F</span><span className="brand-slash">/</span><span className="brand-tail">SLT</span></Link>
    <div className="header-edition">AN UNOFFICIAL FAN STORY <span>·</span> ENGLISH ARCHIVE</div>
    <nav className="header-nav" aria-label="Main navigation"><Link href="/archive/">The archive</Link><Link href="/#about">The premise</Link></nav>
    <button className="menu-toggle" type="button" onClick={()=>setOpen(v=>!v)} aria-expanded={open} aria-label="Toggle navigation"><span/><span/></button>
    <AnimatePresence>{open&&<motion.nav className="mobile-menu" initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} aria-label="Mobile navigation"><Link href="/archive/" onClick={()=>setOpen(false)}>The archive <b>↗</b></Link><Link href="/#about" onClick={()=>setOpen(false)}>The premise <b>↗</b></Link></motion.nav>}</AnimatePresence>
  </header>;
}
