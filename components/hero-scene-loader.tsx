"use client";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
const Scene=dynamic(()=>import("./hero-scene"),{ssr:false,loading:()=> <div className="hero-scene-fallback" aria-hidden="true"/>});
export function HeroSceneLoader(){
  const [enabled,setEnabled]=useState(false);
  useEffect(()=>{
    const browser=navigator as Navigator & {deviceMemory?:number;connection?:{saveData?:boolean}};
    const lowMemory=typeof browser.deviceMemory==="number"&&browser.deviceMemory<=4;
    const lowCpu=typeof navigator.hardwareConcurrency==="number"&&navigator.hardwareConcurrency<=4;
    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(!lowMemory&&!lowCpu&&!browser.connection?.saveData&&!reduced);
  },[]);
  return <div className="hero-scene-stage" aria-label="Photographic mountain landscape with a suspended ruin"><img className="hero-photograph" src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1800&q=85" alt="A mountain peak beneath a star-filled night sky" loading="eager" fetchPriority="high"/><div className="hero-photo-shade" aria-hidden="true"/><div className="hero-scene-fallback" aria-hidden="true"/>{enabled&&<Suspense fallback={null}><Scene/></Suspense>}<span className="scene-coordinate">37° 33′ 18.4″ N<br/>THE RECORD IS FRACTURED</span><span className="scene-caption">RECONSTRUCTION / 001</span></div>;
}
