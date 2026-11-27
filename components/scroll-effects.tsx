"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ScrollEffects(){
  useEffect(()=>{
    if(window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const context=gsap.context(()=>{
      gsap.utils.toArray<HTMLElement>("[data-scroll-reveal]").forEach((element)=>{
        gsap.fromTo(element,{autoAlpha:0,y:26},{autoAlpha:1,y:0,duration:.85,ease:"power3.out",scrollTrigger:{trigger:element,start:"top 88%",once:true}});
      });
      gsap.utils.toArray<HTMLElement>("[data-scroll-line]").forEach((element)=>{
        gsap.fromTo(element,{scaleX:0,transformOrigin:"left center"},{scaleX:1,duration:1.15,ease:"power2.inOut",scrollTrigger:{trigger:element,start:"top 92%",once:true}});
      });
    });
    return ()=>context.revert();
  },[]);
  return null;
}
