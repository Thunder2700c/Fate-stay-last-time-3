# Front-end architecture

## Homepage routing

The root entry point is `index.html`, the mobile composition and no-JavaScript fallback. `js/device-router.js` selects one of three complete documents by viewport width:

| Viewport width | Document | Composition |
|---|---|---|
| 320–767 px | `index.html` | Mobile vertical poster and one-column sections |
| 768–1099 px | `tablet.html` | Tablet split editorial composition |
| 1100 px and wider | `desktop.html` | Desktop spread with side index rail |

The router uses `location.replace()`, preserves query/hash, and rechecks after resize. It selects by viewport width, not physical device identity. Without JavaScript, the root mobile document remains readable.

## Page-specific files

| Edition | Markup | Styles | Motion |
|---|---|---|---|
| Mobile | `index.html` | `css/mobile.css` | `js/mobile.js` |
| Tablet | `tablet.html` | `css/tablet.css` | `js/tablet.js` |
| Desktop | `desktop.html` | `css/desktop.css` | `js/desktop.js` |

Shared homepage files:
- `css/edition-tokens.css` — Edition 03 palette, typography, reset, reduced-motion rules, and shared keyboard focus.
- `js/device-router.js` — viewport routing.
- `js/edition-shared.js` — year labels, one RAF-batched scroll-progress/header update, and mobile menu.
- `js/experience.js` — active section state for the section navigation.
- `assets/favicon.svg` and `assets/og.svg` — site identity assets.

The homepage intentionally contains four content areas: hero, idea, reading room, and colophon, followed by the footer. The removed field guide, reader preference lab, FAQ, publication ledger, and other added editorial filler are not part of the current homepage.

## Utility pages

- `404.html` — custom noindex not-found page.
- `contact.html` — contact information; no private inbox or form endpoint is configured.
- `privacy.html` and `terms.html` — policy pages; terms remain a draft requiring legal review.
- `thankyou.html` — generic thank-you page; `thank-you.html` remains a compatibility redirect.
- `css/style.css` and `css/site-pages.css` — utility-page styling.
- `js/site.js` — utility-page shared behaviour.
- `js/404.js` — requested-path label and safe previous-page action.
- `robots.txt`, `sitemap.xml`, and `site.webmanifest` — crawler and install metadata.

## Content contract

The rewritten novel is the only canon. The old drafts and former sites are not source material for story facts. The reading room must remain explicitly empty until the author supplies rewritten chapters. Do not invent chapter names, excerpts, characters, or plot details.

The three homepage files use separate markup so each viewport can have its own composition. Keep shared story copy consistent while preserving each edition's distinct layout.

## Type and motion

The homepage uses Archivo Black, Instrument Serif, DM Sans, and DM Mono. GSAP and ScrollTrigger are loaded from jsDelivr. The page must remain readable and navigable if the CDN fails. Respect reduced-motion and Save-Data preferences; do not add motion merely to make the page appear busy.
