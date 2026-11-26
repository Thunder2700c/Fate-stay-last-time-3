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
