# Fate / Stay Last Time

A static, phone-editable chapter website for an unofficial Fate fan story. Add or edit one MDX file per chapter in GitHub; the archive, reader route, and search index are generated at build time.

## Stack and static-host constraints

- Next.js App Router with `output: "export"`; the finished website is in `out/`.
- MDX chapters and YAML frontmatter live in `content/chapters/`.
- GSAP + ScrollTrigger handle scroll entrances and chapter effects.
- Framer Motion handles page and inline transitions.
- React Three Fiber is dynamically loaded only in the homepage hero. It is skipped for reduced-motion, low-memory, low-core, or data-saving devices.
- Pagefind creates a local static search index after export.
- localStorage stores bookmarks, reading progress, and preferences in the current browser only.

There is no backend, login, synced reading progress, server action, or shared comments system. Those need a server/database and are intentionally not simulated.

## Add a chapter from GitHub mobile

1. Open `content/chapters/`.
2. Create a file such as `11-the-next-record.mdx`.
3. Paste the template below and write your chapter.
4. Commit to `main`. The new route and archive row are generated automatically from the filename and frontmatter.

```mdx
---
title: "The Next Record"
number: 11
date: "2026-11-27"
mood: "Uneasy / anticipation"
fonts:
  - cinzel
  - im-fell-english
---

## Hour 90: A New Threshold

The next chapter begins here.

<Chant font="cinzel">
Let the record open.
Let the silence answer.
</Chant>

<Seal />

<SystemWindow title="SYSTEM MESSAGE">
The record has changed.
</SystemWindow>

<Divider type="rift" />

<Reveal>
A passage can be revealed by scrolling into view or tapping it.
</Reveal>
```

Use a unique filename with lowercase letters, digits, and hyphens. `number` controls reading order. Use a real `YYYY-MM-DD` date. The `fonts` list is optional; only the display fonts listed there are linked on that chapter.

## MDX component tags

Props are optional unless shown. Invalid font names fall back safely; unknown divider types use `fracture`.

| Tag | Effect |
| --- | --- |
| `<Chant font="cinzel">...</Chant>` | Incantation with a chapter display font |
| `<Seal />` | Command seal that briefly glows and fades |
| `<Shake>...</Shake>` | One impact shake as the passage enters view |
| `<Reveal>...</Reveal>` | Text revealed on scroll or tap |
| `<SystemWindow>...</SystemWindow>` | Game-style status/message frame; optional `title`, `status` |
| `<NobleName>...</NobleName>` | Dramatic name/title treatment |
| `<Whisper>...</Whisper>` | Quiet text and low-motion reveal |
| `<Scream>...</Scream>` | High-impact text treatment |
| `<Divider type="rift" />` | Scene break: `fracture`, `ash`, `rift`, `silence`, `static` |

## Fonts

`lib/fonts.json` is the single font catalog: **8 reader fonts + 14 display fonts + 2 UI fonts**. All are packaged from open-license Fontsource distributions under the SIL Open Font License 1.1. The catalog records each family, role, and source package.

The build script copies only Latin-subset WOFF2 assets into the generated `public/fonts/` folder and creates a small CSS file per family. Font files are self-hosted by the exported site, not requested from Google Fonts at runtime. The generated folder is not committed.

- Reader CSS loads on chapter pages; the reader's font selector changes the chosen family.
- Chapter display CSS is linked only on the chapter whose frontmatter lists that font.
- To add/remove a family, update `lib/fonts.json` and the dependency list in `package.json`. Use the catalog slug in frontmatter. Keep the license attribution accurate.

## Search

The `build` script runs Next.js export, then Pagefind against `out/`. The search UI imports that local index in the browser. No external search service or account is used.

## Run and build

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
npm run build
```

The generated static site is `out/`. Vercel settings are included in `vercel.json`: Next.js framework, `npm run build`, output directory `out`.

## Folder map

- `app/` — homepage, archive, chapter route, global layout
- `components/` — header, motion, low-end-aware 3D hero, reader controls, MDX effects
- `content/chapters/` — one `.mdx` file per chapter
- `lib/chapters.ts` — chapter metadata and static route source
- `lib/fonts.json` — all reader/display/UI fonts
- `scripts/copy-fonts.mjs` — WOFF2 self-hosting step
- `public/fonts/` — generated fonts and CSS, not committed
- `out/` — generated static export, not committed

## Fan-work notice

Fate and its original characters/settings belong to their respective rights holders. This is an unofficial, non-commercial fan project and is not affiliated with or endorsed by Type-Moon.
