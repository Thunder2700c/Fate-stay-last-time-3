# Fate / Stay Last Time

A responsive, chapter-ready website for an independent novel being rewritten from a clean foundation.

## Art direction — Edition 03
- Experimental print/editorial identity: warm paper, near-black ink, and a sharp vermilion accent.
- Original inline SVG illustration built around an unfinished circle and a red thread motif.
- Oversized kinetic typography and scroll-driven narrative transitions using GSAP + ScrollTrigger.
- Dedicated mobile composition and full-screen touch navigation, not a scaled desktop layout.
- Reading room intentionally empty until rewritten chapters are supplied.
- Existing custom 404, legal and contact pages retain the shared site foundation.

## Structure
- `index.html` — homepage and future reading-room entry
- `404.html` — custom error experience
- `contact.html`, `thank-you.html` — contact placeholders
- `privacy.html`, `terms.html` — draft policy pages
- `css/home.css` — homepage art direction and responsive layouts
- `css/style.css` — shared styles for utility pages
- `js/site.js` — shared navigation, progress and common behaviour
- `js/main.js` — homepage anchor behaviour and future chapter hook
- `js/home.js` — homepage GSAP choreography
- `assets/favicon.svg`, `assets/og.svg` — site vector assets

## Run locally
Static site; no build step required. Open `index.html` or serve the repository root with any static HTTP server.

## New chapters
The reading room is intentionally empty. When rewritten chapters arrive, add them as new source material and render them through one reusable chapter template. Do not import story text or lore from earlier websites.

## Motion and performance
GSAP and ScrollTrigger load from jsDelivr. If the CDN is unavailable, content remains visible and usable. Motion is disabled for users who request reduced motion. The page avoids WebGL and autoplay video until real content justifies their cost.

## Before production
1. Confirm the final domain and add absolute URLs to sitemap.xml.
2. Review the draft privacy and terms pages for the actual deployment and services.
3. Configure a real contact channel before advertising contact functionality.
4. Test mobile, tablet portrait, tablet landscape, laptop and wide desktop on real browsers.
5. Run accessibility, link and performance checks.
