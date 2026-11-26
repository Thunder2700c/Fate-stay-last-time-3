# Fate / Stay Last Time

A chapter-ready website for an independent novel being rewritten from page one.

## Homepage — Edition 03 / The Unwritten Folio
The homepage is intentionally limited to five areas: hero, idea, reading room, colophon, and footer. The reading room stays empty until the author supplies the rewritten chapters. No previous-draft story material is used.

### Three separate viewport compositions
| Width | Entry document | Design |
|---|---|---|
| 320–767 px | `index.html` | Mobile folio: vertical cover composition, compact navigation, one-column reading flow |
| 768–1099 px | `tablet.html` | Tablet spread: narrow issue rail, asymmetric title/artwork composition, two-page archive spread |
| 1100 px+ | `desktop.html` | Desktop publication: persistent index rail, large typographic stage, wide open-book archive |

Each viewport has dedicated HTML, CSS, and GSAP scripts. Shared routing and lightweight behavior remain separate. The router is width-based, not physical-device detection.

## Files
- `index.html`, `tablet.html`, `desktop.html` — homepage documents
- `css/edition-tokens.css`, `css/mobile.css`, `css/tablet.css`, `css/desktop.css` — design system and layouts
- `js/device-router.js`, `js/edition-shared.js`, `js/experience.js` — shared behavior
- `js/mobile.js`, `js/tablet.js`, `js/desktop.js` — device-specific motion
- `404.html`, `contact.html`, `privacy.html`, `terms.html`, `thankyou.html` — utility pages

## Design research
- [Readymag Websites of the Year 2025](https://readymag.com/readymag/websites-of-the-year-2025/) — poster modules, editorial desk compositions, and an immersive vertical reading piece.
- [Deep: Ransom Note case study](https://www.deep.co.uk/projects/ransom-note/) — expressive editorial design balanced with mobile-first usability and speed.
- [GSAP ScrollTrigger documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) — scroll-trigger behavior without scroll-jacking.
- [GSAP matchMedia documentation](https://gsap.com/docs/v3/GSAP/gsap.matchMedia%28%29/) — responsive and reduced-motion-aware animation setup.

## Local preview
Serve the repository root with a static HTTP server. The viewport router selects the matching edition by width. With JavaScript disabled, `index.html` remains readable.

## Honest verification status
This repository's design notes do not imply browser QA. Check actual browser rendering, keyboard interaction, router behavior, Vercel deployment, and phone/tablet/desktop layouts before production claims. Contact and policy pages still require their previously documented follow-up.
