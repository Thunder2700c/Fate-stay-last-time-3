# Fate / Stay Last Time

An independent novel website, rebuilt as an editorial reading experience.

## Edition 03 direction
Warm paper, near-black ink, vermilion red, expressive display typography, and an original unfinished-circle / red-thread motif. The novel is being rewritten from page one. The reading room intentionally stays empty until the author supplies the new chapters.

## Three dedicated homepage experiences

The entry point routes by viewport width:

| Viewport | Page | Composition |
|---|---|---|
| 320–767 px | index.html | Mobile poster layout and vertical reading flow |
| 768–1099 px | tablet.html | Tablet editorial spread |
| 1100 px+ | desktop.html | Desktop spread with section-index rail |

Each experience has its own HTML, CSS, and GSAP script. Shared tokens, viewport routing, and lightweight common behaviour live in separate files. The routing is width-based, not physical-device detection.

## Project handoff and logs

Before changing the project, read:
1. AGENTS.md — rules for any coding agent working in this repository.
2. PROJECT_LOG.md — latest state and next steps.
3. docs/ARCHITECTURE.md — page routing and file ownership.
4. docs/PERFORMANCE.md — animation/rendering rules and known performance findings.

Append dated factual work entries to docs/SESSION_LOG.md. Record changed files, checks actually run, checks not run, and unresolved issues. Never claim browser testing, profiling, deployment, or measured FPS without evidence.

## Performance approach

The homepage avoids the previous oversized SVG turbulence overlay and continuous scroll-scrubbed parallax. Scroll progress is a transform updated by one RAF-batched listener. GSAP motion focuses on transform and opacity, respects reduced motion, and remains optional: content is visible without the CDN.

GPU compositing is browser-controlled; CSS cannot guarantee that all rendering uses the GPU. Real Android profiling is still required before performance can be called verified.

## Run locally

Static site; no build step is required. Serve the repository root with any static HTTP server so relative assets and the three-page router work as intended. Open the page at different viewport widths to exercise the routing. With JavaScript disabled, index.html remains the mobile fallback.

## Project structure

- index.html, tablet.html, desktop.html — three home compositions
- css/edition-tokens.css — shared homepage design tokens
- css/mobile.css, css/tablet.css, css/desktop.css — page-specific layouts
- js/device-router.js — width-based page routing
- js/edition-shared.js — year, scroll progress, header state, and mobile menu
- js/mobile.js, js/tablet.js, js/desktop.js — page-specific GSAP motion
- css/style.css, js/site.js — shared utility-page foundation
- docs/ARCHITECTURE.md, docs/PERFORMANCE.md, docs/QA_CHECKLIST.md — implementation notes
- AGENTS.md, PROJECT_LOG.md, docs/SESSION_LOG.md — agent handoff and work history

## Before production

1. Confirm the final domain and absolute sitemap URLs.
2. Review privacy and terms content for the actual deployment and services.
3. Configure a real contact channel before advertising contact functionality.
4. Complete the manual QA checklist in docs/QA_CHECKLIST.md on phone, tablet portrait/landscape, and desktop.
