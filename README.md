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
- css/experience.css — reader preferences, searchable field guide, and editorial sections
- css/site-pages.css — shared visual system for error, contact, and policy pages
- js/device-router.js — width-based page routing
- js/edition-shared.js — year, scroll progress, header state, and mobile menu
- js/mobile.js, js/tablet.js, js/desktop.js — page-specific GSAP motion
- js/experience.js — local reader-preview preferences, active section navigation, and back-to-top control
- js/field-guide.js — search and subject filtering for device-specific field notes
- js/404.js — requested-route display and previous-page navigation
- css/style.css, css/site-pages.css, js/site.js — utility-page foundation and Edition 03 utility-page skin
- 404.html — custom noindex error page
- contact.html, privacy.html, terms.html — project contact and draft policy pages
- thankyou.html — general thank-you page (no form submission is implied)
- thank-you.html — compatibility redirect to thankyou.html
- robots.txt, sitemap.xml, site.webmanifest — crawler, canonical URL, and web-app metadata
- docs/ARCHITECTURE.md, docs/PERFORMANCE.md, docs/QA_CHECKLIST.md — implementation notes
- AGENTS.md, PROJECT_LOG.md, docs/SESSION_LOG.md — agent handoff and work history

## Before production

1. Confirm the production domain and submit the canonical sitemap in Search Console.
2. Obtain legal review of the draft privacy and terms pages for the actual operator and services.
3. Configure a real contact channel before advertising contact functionality.
4. Complete the manual QA checklist in docs/QA_CHECKLIST.md on phone, tablet portrait/landscape, and desktop.
A responsive, chapter-ready website for a novel being rewritten from a clean foundation.

## Current project direction

- An editorial, cinematic reading experience with a distinctive visual identity—not a generic template or a collection of decorative effects.
- Mobile is a first-class design target, not a shrunken desktop layout.
- Layout, navigation, typography, pacing and interaction should be deliberately considered across phone, tablet and desktop.
- The reading-room archive remains empty until rewritten chapters are supplied.
- No previous-draft story text, character profiles, or lore has been imported.

## Design and implementation workflow

**Research first. Inspect, compare, then implement.** Do not start changing the interface based only on a vague visual idea or a single screenshot.

Before a substantial design or UI change:

1. **Inspect this repository and the live site.** Read the current HTML, CSS, JavaScript, assets, existing project notes and deployment state. Identify what already works and what must be preserved.
2. **Build a reference set.** Review multiple relevant live websites, award galleries, design case studies and creator breakdowns. Choose references for specific reasons—editorial composition, typography, navigation, transitions, storytelling, responsive behavior or interaction—not just because they look impressive.
3. **Study behavior, not only screenshots.** Open the references and examine their navigation, hover/tap states, scroll behavior, transitions, loading, responsive changes and content hierarchy. Record what was actually inspected; do not claim a behavior was tested if only a static image or article was viewed.
4. **Compare device experiences separately.** Review phone, tablet and desktop layouts at representative viewport sizes. Check touch reach, tap targets, reading comfort, line length, spacing, image crop, navigation and orientation changes. Do not assume desktop patterns will work on mobile.
5. **Verify implementation details.** Use official documentation for browser APIs and libraries (especially GSAP), and validate HTML/CSS/JavaScript behavior against browser standards. Treat third-party tutorials as examples, not authoritative specifications.
6. **Make a design decision before coding.** Summarize the chosen direction, the useful reference patterns, what will be adapted rather than copied, trade-offs, and expected responsive behavior.
7. **Implement in small, coherent changes.** Preserve the novel's editorial identity and existing working functionality. Avoid adding WebGL, canvas, large video backgrounds, scroll-jacking or continuous animation without a clear user-facing reason and a measured performance budget.
8. **Test and report honestly.** Check syntax, links, navigation, responsive breakpoints, keyboard use, reduced-motion behavior and real browser rendering. Test on an actual phone when possible. Clearly separate what is Verified, Inferred and Untested; never claim device performance or visual QA without doing it.
9. **Record the work.** Update the project/session log with sources reviewed, observations, implementation decisions, files changed, checks performed, results and remaining limitations.

### Reference and technical sources

These are starting points, not a fixed style guide. For each task, find additional references relevant to the specific design problem.

- [Awwwards — Mobile Excellence Guidelines (PDF)](https://www.awwwards.com/mobile-excellence-guidelines.pdf): mobile usability, performance, tap targets, viewport sizing and multi-device experience.
- [Awwwards — The Paper Portfolio / Niccolo Miranda](https://assets.awwwards.com/awards/gallery/2023/07/HOT-RIGHT-NOW-BOOK-2023.pdf): editorial/newspaper art direction and typography as part of the concept.
- [Awwwards — PWA book, Designing Installed Experiences](https://pwa-book.awwwards.com/chapter-5): mobile navigation ergonomics and cross-device interaction considerations.
- [Codegrid — ScrollTrigger team-page breakdown](https://www.youtube.com/watch?v=HWoKkkPVJ9A): a creator walkthrough that separates structure, styling and animation implementation.
- [GSAP documentation](https://gsap.com/docs/v3/): official API reference for timelines, animation behavior and plugins.
- [GSAP matchMedia()](https://gsap.com/docs/v3/GSAP/gsap.matchMedia%28%29/): responsive animation setup and cleanup across media-query changes.
- [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/): scroll-linked animation behavior, refresh handling and responsive setups.
- [MDN — Using media queries for accessibility](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Using_for_accessibility): reduced-motion and accessibility considerations.
- [MDN — CSS performance](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Performance/CSS): animation cost and performance guidance.

### Evidence labels

Use these labels in project notes and completion reports:

- **Verified** — directly checked in official documentation, inspected in a live reference, or successfully tested in the actual project.
- **Inferred** — a reasoned conclusion based on available evidence, but not directly confirmed.
- **Untested** — implemented or proposed but not validated in the relevant browser/device/runtime.

Do not treat an award, tutorial, screenshot, simulated test or successful build as proof that the live site behaves correctly on every device.

## Repository structure

- `index.html` — current homepage and chapter archive
- `404.html` — custom MADE IN HEAVEN error experience
- `contact.html`, `thank-you.html` — contact placeholders
- `privacy.html`, `terms.html` — draft policy pages
- `css/style.css` — current responsive design system
- `js/site.js` — shared navigation, progress and motion
- `js/main.js` — homepage behavior and future chapter hook
- `assets/favicon.svg`, `assets/og.svg` — original vector artwork

Always inspect the current `main` tree before relying on this file list; update this section whenever the structure changes.

## Source-first design notes

For substantial design work, record:

- The design question and user experience goal.
- At least three relevant references when the task reasonably permits.
- What was observed on each reference: composition, UI, interaction, responsive behavior and motion.
- Which ideas are being adapted and why they suit this novel.
- Which details remain assumptions or require browser/device testing.

Do not reproduce another site's identity, assets, copy or exact composition. Use references to understand design techniques and interaction patterns, then create an original solution for this project.

## Motion, accessibility and performance

- GSAP and ScrollTrigger are tools, not a reason to animate everything.
- Prefer purposeful, short interactions and reveal choreography over constant movement.
- Preserve native scrolling and predictable navigation.
- Respect `prefers-reduced-motion`; essential content must remain visible and usable if animation is disabled or the animation CDN fails.
- Prefer efficient animation properties such as `transform` and `opacity` where appropriate, but do not claim that a property is automatically GPU-accelerated on every device.
- Avoid persistent `will-change`, oversized fixed effects, unnecessary scroll listeners and expensive effects on low-powered phones.
- Validate performance with browser tooling and real-device checks before making performance claims.

## Git workflow

- **Use `main` as the working branch by default.**
- Make project changes and commits directly on `main`.
- Do not create feature branches or pull requests unless the user explicitly asks for them.
- Before editing, inspect the current branch and working tree/repository state so existing work is not overwritten.
- Commit coherent, tested changes with descriptive messages.
- Never report a change as committed or deployed until the relevant operation has actually succeeded.

## New chapters

The archive is intentionally empty. When rewritten chapters arrive, add them as new source material and render them through one reusable chapter template. Do not import story text or lore from earlier websites.

## Before production

1. Confirm the final domain and add absolute URLs to `sitemap.xml`.
2. Review the draft privacy and terms pages for the actual deployment and services.
3. Configure a real contact channel before advertising contact functionality.
4. Test phone, tablet portrait, tablet landscape, laptop and wide desktop layouts in real browsers.
5. Run accessibility, link, HTML and performance checks.
6. Verify the production deployment separately from any preview deployment.
