# Front-end architecture

## Page routing

The root entry point is index.html (mobile composition and no-JavaScript fallback). A small synchronous script, js/device-router.js, selects one of three complete documents from viewport width:

| Viewport width | Document | Purpose |
|---|---|---|
| 320–767 px | index.html | Mobile, vertical poster / one-column reading |
| 768–1099 px | tablet.html | Tablet editorial spread / split composition |
| 1100 px and wider | desktop.html | Desktop art-directed spread / side index rail |

The same router runs in all three documents. It uses location.replace() so a layout change does not add a history entry. It preserves the current hash and query string and checks again after viewport resizing. The route describes the viewport, not a physical-device detector; a narrow desktop browser can therefore receive the tablet composition.

## Page-specific files

| Experience | HTML | CSS | GSAP |
|---|---|---|---|
| Mobile | index.html | css/mobile.css | js/mobile.js |
| Tablet | tablet.html | css/tablet.css | js/tablet.js |
| Desktop | desktop.html | css/desktop.css | js/desktop.js |

Shared files:
- css/edition-tokens.css — shared color, typography, reset, and reduced-motion foundation.
- js/device-router.js — viewport-to-document routing.
- js/edition-shared.js — year, single scroll RAF, progress indicator, and mobile menu behaviour.

Utility pages retain their older css/style.css and js/site.js foundation. Do not change that system as a side effect of homepage work.

## Content contract

The three home pages currently repeat the same project copy so that each composition is free to change its markup. Keep the three versions synchronized when editing story copy. The reading room must remain empty until the author supplies rewritten chapters. Existing links to contact, privacy, and terms pages are intentional.

## Fonts and motion

All three pages use the same four-font editorial palette: Archivo Black, Instrument Serif, DM Sans, and DM Mono. GSAP and ScrollTrigger are loaded from jsDelivr. The page must remain understandable and navigable if those scripts or the font CDN do not load.
