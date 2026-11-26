# Agent working rules

This repository is a real novel website. Treat the files and current Git branch as the source of truth; never rely on a previous chat summary when the repository can be inspected.

## Required reading at the start of every task
1. Read this file.
2. Read PROJECT_LOG.md for the current handoff and branch state.
3. Read docs/ARCHITECTURE.md before changing routing, page structure, or shared assets.
4. Read docs/PERFORMANCE.md before changing animation, scrolling, or rendering.
5. Inspect the current files and GitHub PR/branch state. A log is a handoff, not proof that the code still matches it.

## Git and delivery
- Work on the active review branch unless the user explicitly asks for another branch.
- Do not merge a PR, push to main, or claim a production deployment without explicit authorization and actual confirmation.
- Check the current branch head before writing. Do not overwrite a newer change using a stale file SHA.
- Keep changes focused. Prefer one coherent commit when practical.
- After every substantial task, update PROJECT_LOG.md and append a factual entry to docs/SESSION_LOG.md.
- Record changed files, actual checks performed, checks not performed, known defects, and the new commit SHA when known.
- Never write “tested”, “profiled”, “fixed”, or “deployed” unless the corresponding action really happened.

## Design direction
- Preserve the Edition 03 identity: warm paper, near-black ink, vermilion red, oversized editorial type, Instrument Serif contrast, and the unfinished-circle/red-thread motif.
- Avoid generic template layouts, glassmorphism, ornamental UI with no purpose, and gratuitous animation.
- The mobile, tablet, and desktop experiences are intentionally separate compositions. Do not collapse them into one scaled layout without the user's approval.
- The reading room must remain honest and empty until the rewritten chapter text is supplied. Do not invent chapter titles, excerpts, or story facts.

## Performance and accessibility
- Read docs/PERFORMANCE.md before adding motion.
- Respect prefers-reduced-motion and the Save-Data hint. Keep page content readable if GSAP or its CDN is unavailable.
- Animate transform and opacity where possible. Avoid layout animation, continuous scroll scrubbing, full-screen SVG filters, large fixed texture layers, and permanent blanket will-change.
- Keep one scroll listener per page for shared progress/header behaviour; batch scroll work with requestAnimationFrame.
- Preserve semantic landmarks, keyboard navigation, visible focus, menu state, and working anchor links.
- Viewport routing is based on width, not a claim about the physical device. Keep breakpoints documented and test resizing/orientation changes.

## Final response format
State branch and PR, summarize actual code changes, list real checks, and call out anything that still needs real-device verification. Link the PR. Be direct about limitations.
