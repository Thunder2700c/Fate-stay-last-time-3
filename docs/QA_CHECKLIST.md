# Manual QA checklist

## Route and composition
- [ ] 360 × 800 or similar phone viewport opens index.html.
- [ ] 768–1099 px viewport opens tablet.html.
- [ ] 1100 px and wider opens desktop.html.
- [ ] Resizing or rotating across a breakpoint switches to the correct document.
- [ ] Directly opening a non-matching document redirects to the correct one.
- [ ] With JavaScript disabled, the mobile root page remains readable.

## Interaction
- [ ] Skip link works with keyboard.
- [ ] All section links land on the right section.
- [ ] Mobile menu opens, closes, closes on Escape, and closes after selecting a link.
- [ ] Contact, privacy, and terms links still resolve.
- [ ] Progress indicator follows scroll without horizontal layout shift.

## Motion and accessibility
- [ ] Hero entrance and section reveals work when GSAP is available.
- [ ] Content remains visible if GSAP/ScrollTrigger is blocked.
- [ ] Reduced-motion mode disables non-essential motion.
- [ ] Save-Data disables non-essential motion.
- [ ] Keyboard focus remains visible and controls have accessible names.

## Real-device performance
- [ ] Phone: no visible stutter during hero entrance, scroll, or menu animation.
- [ ] Tablet portrait and landscape: correct composition and smooth scroll.
- [ ] Desktop: no layout overflow at common laptop and wide-screen sizes.
- [ ] Inspect with browser performance tools and record evidence; do not infer GPU acceleration from CSS alone.


## Reader experience additions
- [ ] Reader tone buttons switch the preview between paper, sepia, and night.
- [ ] Text size slider updates the specimen and its output label.
- [ ] Line-spacing slider updates the specimen.
- [ ] Reading width and font selectors update the specimen.
- [ ] Preferences persist after reload and reset to defaults.
- [ ] Storage-disabled/private contexts still allow in-page controls to work.
- [ ] FAQ details open and close with keyboard and pointer.
- [ ] Active section navigation updates as the reader scrolls.
- [ ] Back-to-top appears after scrolling and respects reduced motion.
- [ ] The reader preview clearly states that its sample is not novel text.


## Expanded homepage field guide
- [ ] Each homepage has more than 1,000 source lines of actual semantic content.
- [ ] Search filters field notes by visible text.
- [ ] Subject filter narrows field notes to the selected category.
- [ ] Reset clears both search and subject filters.
- [ ] Empty search results display a clear no-match message.
- [ ] Device-specific reading scenarios appear in the correct edition.
- [ ] Every new field-guide section anchor resolves.

## Utility pages and metadata
- [ ] Unknown paths display the custom 404 page on the deployed static host.
- [ ] The 404 home link returns to the homepage.
- [ ] The 404 previous-page action falls back to home when no prior history exists.
- [ ] The requested path is displayed as text, not injected as HTML.
- [ ] Contact page does not imply that a message was submitted.
- [ ] Copy-project-address control reports success or shows the address fallback.
- [ ] Privacy notice accurately describes localStorage and third-party resources.
- [ ] Terms page remains marked as a draft pending legal review.
- [ ] thankyou.html does not claim that a form was submitted.
- [ ] thank-you.html redirects to thankyou.html.
- [ ] robots.txt points to the production sitemap.
- [ ] sitemap.xml parses and contains only canonical public pages.
- [ ] site.webmanifest parses as JSON and has same-origin relative start_url and scope.
- [ ] Utility pages use the shared Edition 03 utility-page CSS.
