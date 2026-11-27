"use client";
import { useEffect } from "react";
import gsap from "gsap";
export function HomeMotion(){
  useEffect(()=>{
    if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
    const context=gsap.context(()=>{
      gsap.fromTo(".hero-eyebrow, .hero-title, .hero-summary, .hero-actions",{y:28,autoAlpha:0},{y:0,autoAlpha:1,duration:.9,stagger:.12,ease:"power3.out",delay:.12});
      gsap.fromTo(".hero-scene-stage",{autoAlpha:0,scale:.97},{autoAlpha:1,scale:1,duration:1.25,ease:"power2.out",delay:.28});
    });
    return ()=>context.revert();
  },[]);
  return null;
}
