# Front-end architecture

## Homepage routing
- `index.html`: mobile composition and no-JavaScript fallback, selected at 767 px and below.
- `tablet.html`: tablet composition, selected from 768–1099 px.
- `desktop.html`: desktop composition, selected at 1100 px and wider.
- `js/device-router.js` selects by viewport width, not physical-device identity. It preserves query strings and hash fragments.

## Current visual system — The Unwritten Folio
The homepage uses Edition 03's warm-paper, near-black, and vermilion palette with Archivo Black, Instrument Serif, DM Sans, and DM Mono. The visual language treats the site as a book object in progress: serial marks, folio labels, a concentric-circle diagram, a vermilion thread, and a deliberately unopened reading-room spread.

## Page-specific files
| Edition | Markup | Styles | Motion |
|---|---|---|---|
| Mobile | `index.html` | `css/mobile.css` | `js/mobile.js` |
| Tablet | `tablet.html` | `css/tablet.css` | `js/tablet.js` |
| Desktop | `desktop.html` | `css/desktop.css` | `js/desktop.js` |

Shared files:
- `css/edition-tokens.css`: reset, typography tokens, focus state, reduced-motion base.
- `js/device-router.js`: viewport routing.
- `js/edition-shared.js`: year, scroll progress, header state, and mobile menu.
- `js/experience.js`: active section navigation.

## Homepage content contract
The homepage has exactly five structural areas: hero, idea, reading room, colophon, and footer. The reading room remains empty until the author supplies rewritten chapters. Do not invent chapter titles, excerpts, character details, lore, or plot.

## Utility pages
- `404.html`: custom not-found page.
- `contact.html`: contact information; no form endpoint is configured.
- `privacy.html` and `terms.html`: draft policy pages.
- `thankyou.html` and `thank-you.html`: thank-you destination and compatibility route.
- `css/style.css`, `css/site-pages.css`, `js/site.js`, `js/404.js`: utility-page styles and behavior.

## Motion and accessibility
GSAP scripts are optional enhancements. Essential content remains in the document without GSAP. Scripts skip animation for reduced-motion and Save-Data preferences. Keep native scrolling, visible keyboard focus, semantic landmarks, and accessible navigation. The reading experience must not depend on animation.
