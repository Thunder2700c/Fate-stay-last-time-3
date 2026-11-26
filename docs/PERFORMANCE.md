# Rendering and animation performance

## What “GPU accelerated” means here

A web page cannot reliably force every operation onto the GPU. The browser decides which elements become compositor layers and whether an operation is composited or repainted. The practical target is to keep frequent animation work to transform and opacity, avoid repeated layout and paint, and limit the number and size of promoted layers.

Do not add translateZ(0) or will-change to every element. Layer promotion has memory and compositing costs, particularly on phones. Use force3D for GSAP transforms when appropriate and apply will-change only to the specific element while it is actively animating; remove it on completion.

## Findings from the previous homepage implementation

These are code-inspection findings, not measured profiler results:

1. The paper-grain layer was fixed over the viewport with inset:-50% and an SVG feTurbulence filter. It covered a very large area and could trigger expensive filter/raster work.
2. Both js/site.js and js/home.js registered scroll listeners that updated the same page-progress element, duplicating work on the homepage.
3. js/home.js used a scrubbed ScrollTrigger animation on the hero visual, doing additional updates throughout scroll.
4. The old homepage used a full SVG drawing animation; SVG stroke changes repaint the SVG while they animate. It was not necessary to preserve that effect.

## Current implementation rules

- The oversized filtered grain layer has been removed from the active homepage compositions.
- Homepage progress uses transform: scaleX(...), not repeated width changes.
- Only js/edition-shared.js owns homepage scroll progress/header updates; it batches work into one requestAnimationFrame.
- Per-device GSAP scripts animate entrance and one-time section reveals. They do not use a continuous scrubbed parallax effect.
- GSAP effects use transform/opacity properties and force3D; will-change is applied only during active reveal animations and cleared afterward.
- Mobile animations skip when prefers-reduced-motion, Save-Data, or a low-memory hint is present. Tablet and desktop respect reduced motion and Save-Data.
- The page has no WebGL, autoplay video, heavy canvas, or animated full-screen noise filter.
- If GSAP fails to load, content remains in normal document flow and is still readable.

## Verification still required

A code review cannot establish actual frame rate or GPU use on the user's phone. Before calling performance complete:
1. Open the deployed branch preview on the target Android phone, not only desktop emulation.
2. Test first paint, first-screen entrance, normal scrolling, menu open/close, orientation changes, and return-from-background.
3. Use Chrome DevTools Performance (or Android remote debugging) to inspect long tasks, frame drops, paint flashing, layout shifts, and layer count.
4. Compare the same page with animations disabled. If scrolling still stutters, inspect fonts, image decode, network timing, and browser/device thermal state separately.
5. Repeat on tablet portrait/landscape and desktop at the documented breakpoints.
6. Record device/browser, viewport, test steps, and observed result in docs/SESSION_LOG.md.

Do not write a numerical FPS claim without an actual measurement.
