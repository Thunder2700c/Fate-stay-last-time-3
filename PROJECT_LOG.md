# Project log and current handoff

Last updated: 2026-11-26 (Asia/Kolkata)

## Repository state
- Repository: https://github.com/Thunder2700c/Fate-stay-last-time-3
- Active branch: `main`
- Current homepage direction: Edition 03 — warm paper, near-black ink, vermilion red, expressive editorial typography, unfinished-circle/red-thread motif.
- Separate homepage compositions: `index.html` (mobile), `tablet.html`, and `desktop.html`.
- Viewport routing: mobile <=767 px; tablet 768–1099 px; desktop >=1100 px.
- Current homepage content boundary: hero, idea, reading room, colophon, footer.
- Reading room remains empty until the rewritten chapter text is supplied.

## Cleanup completed
- Removed all homepage content after the colophon boundary, including the added glossary/field-guide/FAQ/publication-ledger/reading-scenario filler.
- Removed obsolete field-guide and reader-lab stylesheet/script references from all three homepage editions.
- Deleted unused `js/field-guide.js` and `css/experience.css`.
- Reduced `js/experience.js` to active section-navigation state only.
- Added shared visible keyboard-focus styling in `css/edition-tokens.css`.

## Current homepage files
- `index.html`, `tablet.html`, `desktop.html`
- `css/edition-tokens.css`, `css/mobile.css`, `css/tablet.css`, `css/desktop.css`
- `js/device-router.js`, `js/edition-shared.js`, `js/experience.js`, `js/mobile.js`, `js/tablet.js`, `js/desktop.js`
- Shared SVG identity assets remain `assets/favicon.svg` and `assets/og.svg`.

## Utility pages
The repository also contains a custom 404, contact, privacy, terms, and thank-you pages. Contact has no configured form endpoint. Terms remain a draft and need legal review. The existence of a web manifest does not mean offline support has been implemented.

## Verification status
- [x] Re-fetched all three homepage HTML files from `main` after cleanup.
- [x] Confirmed no homepage references remain to `field-guide.js` or `experience.css`.
- [x] Confirmed shared keyboard-focus rule is present in `css/edition-tokens.css`.
- [x] Re-fetched the reduced `js/experience.js` and confirmed it only updates active section navigation.
- [ ] Full HTML validation not run.
- [ ] Browser rendering and menu/route interaction QA not run.
- [ ] Vercel deployment and live 404 response not verified after the latest commits.
- [ ] Real Android, tablet, and desktop performance profiling not run.
- [ ] Terms page requires legal review.

## Working rule
Work directly on `main`, inspect current file SHAs before writes, keep the four-section homepage boundary, and do not invent story material or claim checks that were not performed.
