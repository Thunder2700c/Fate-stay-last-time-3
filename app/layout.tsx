import type { Metadata,Viewport } from "next";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { ScrollEffects } from "@/components/scroll-effects";
import "./globals.css";
export const metadata:Metadata={
  title:{default:"Fate / Stay Last Time",template:"%s — Fate / Stay Last Time"},
  description:"An unofficial Fate fan story. Enter the archive and read the record as it unfolds.",
  applicationName:"Fate / Stay Last Time",
  openGraph:{title:"Fate / Stay Last Time",description:"An unofficial fan-created story from a different direction.",type:"website"}
};
export const viewport:Viewport={themeColor:"#09090d",colorScheme:"dark light"};
export default function RootLayout({children}:{children:ReactNode}){
  return <html lang="en"><head><link rel="stylesheet" href="/fonts/dm-sans.css"/><link rel="stylesheet" href="/fonts/dm-mono.css"/></head><body><SiteHeader/><ScrollEffects/>{children}</body></html>;
}
