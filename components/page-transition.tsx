"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
export function PageTransition({children}:{children:ReactNode}){
  return <motion.div className="page-transition" initial={{opacity:0,y:10,filter:"blur(4px)"}} animate={{opacity:1,y:0,filter:"blur(0px)"}} transition={{duration:.55,ease:[.22,1,.36,1]}}>{children}</motion.div>;
}
