# Fate / Stay Last Time

A responsive, chapter-ready website for a novel being rewritten from a clean foundation.

## Direction
- Three deliberately art-directed layouts: desktop, tablet, and mobile.
- Cinematic editorial homepage with original SVG orbital artwork.
- Empty reading-room archive reserved for new chapters.
- Custom 404 — MADE IN HEAVEN page with a rotating time dial and interactive time-acceleration effect.
- GSAP + ScrollTrigger for restrained reveals, with CSS fallbacks.
- Reduced-motion support and accessible navigation.
- No previous-draft story text, character profiles, or lore has been imported.

## Structure
- index.html — homepage and chapter archive
- 404.html — custom error experience
- contact.html, thank-you.html — contact placeholders
- privacy.html, terms.html — draft policy pages
- css/style.css — responsive design system
- js/site.js — shared navigation, progress and motion
- js/main.js — homepage behaviour and future chapter hook
- assets/favicon.svg, assets/og.svg — original vector artwork

## Run locally
Static site; no build step required. Open index.html or serve the repository root with any static HTTP server.

## New chapters
The archive is intentionally empty. When rewritten chapters arrive, add them as new source material and render them through one reusable chapter template. Do not import story text or lore from earlier websites.

## Motion and performance
GSAP and ScrollTrigger load from jsDelivr. If the CDN is unavailable, content remains visible and usable. Motion is disabled for users who request reduced motion. Test on real mobile devices before adding heavy WebGL or autoplay video.

## Before production
1. Confirm the final domain and add absolute URLs to sitemap.xml.
2. Review the draft privacy and terms pages for the actual deployment and services.
3. Configure a real contact channel before advertising contact functionality.
4. Test mobile, tablet portrait, tablet landscape, laptop and wide desktop.
5. Run accessibility, link and performance checks.
