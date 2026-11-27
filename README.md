# Fate / Stay Last Time

A fresh, frontend-only novel website built with React, Vite and TypeScript.

## Stack
- React + TypeScript + Vite
- GSAP for interface motion
- React Router for distinct pages
- Browser local storage for reading progress, bookmarks and preferences
- Chapter data in `src/data/chapters.ts`

## Publish a chapter from your phone
1. Open `src/data/chapters.ts` in GitHub.
2. Add a chapter object and paragraphs to the `chapters` array.
3. Commit to `main`.
4. Vercel builds and publishes it.

## Vercel
Framework: Vite · Build command: `npm run build` · Output directory: `dist`.

No backend is required. Reading progress and bookmarks stay in each reader's browser and do not sync between devices.

No original plot, character biography, or chapter text is invented here. Replace the marked sample chapter with the author's actual writing before publication.
