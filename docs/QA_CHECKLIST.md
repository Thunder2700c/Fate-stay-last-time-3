# Manual QA checklist

## Routing and composition
- [ ] 360 × 800 phone viewport opens the mobile composition.
- [ ] 768–1099 px viewport opens the tablet composition.
- [ ] 1100 px and wider opens the desktop composition.
- [ ] Resizing/rotating across breakpoints selects the right composition.
- [ ] Directly opening a non-matching edition redirects correctly.
- [ ] With JavaScript disabled, the root mobile page remains readable.

## Homepage content and navigation
- [ ] Homepage contains only hero, idea, reading room, colophon, and footer.
- [ ] No removed field-guide, reader-lab, FAQ, publication-ledger, or reading-scenario markup has returned.
- [ ] Every section navigation link resolves to an existing section.
- [ ] Active section state updates while scrolling.
- [ ] Mobile menu opens, closes, closes on Escape, and closes after selecting a link.
- [ ] Skip link and visible keyboard focus work.
- [ ] Contact, privacy, and terms links resolve.

## Motion and accessibility
- [ ] Hero entrance and section reveals work when GSAP is available.
- [ ] Content remains visible if GSAP/ScrollTrigger is blocked.
- [ ] Reduced-motion disables non-essential motion.
- [ ] Save-Data disables non-essential motion.
- [ ] Interactive controls have accessible names and keyboard focus remains visible.

## Real-device verification
- [ ] Phone: check first paint, hero entrance, scrolling, and menu interaction.
- [ ] Tablet: check portrait and landscape.
- [ ] Desktop: check common laptop and wide-screen widths.
- [ ] Inspect overflow, layout shifts, long tasks, paint, and frame drops with browser tools.
- [ ] Record device, browser, viewport, test steps, and observations in the session log.
- [ ] Do not claim FPS, GPU use, thermal performance, or deployment success without direct evidence.

## Utility pages and metadata
- [ ] Unknown paths show the custom 404 on the deployed static host.
- [ ] 404 home link returns to the homepage.
- [ ] 404 previous-page action safely falls back to home.
- [ ] Requested path is rendered as text, not injected HTML.
- [ ] Contact page does not imply a message was submitted.
- [ ] Privacy notice accurately describes local storage and third-party resources.
- [ ] Terms page remains marked as a draft pending legal review.
- [ ] Thank-you page does not claim a form was submitted.
- [ ] Sitemap, robots.txt, and web manifest parse and use the production domain.
