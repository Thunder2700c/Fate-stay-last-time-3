# Fate / Stay Last Time

A static, phone-editable chapter website for an unofficial Fate fan story. Add or edit one MDX file per chapter in GitHub; the archive, reader route, and search index are generated at build time.

## Stack and static-host limits

- Next.js App Router with `output: "export"`; the finished website is in `out/`.
- MDX chapters and YAML frontmatter live in `content/chapters/`.
- GSAP + ScrollTrigger handle scroll entrances and chapter effects.
- Framer Motion handles page and inline transitions.
- React Three Fiber is dynamically loaded only in the homepage hero; skipped for reduced-motion, low-memory, low-core, and data-saving devices.
- Pagefind creates a local static search index after export.
- localStorage stores bookmarks, saved reading position, and reader preferences in the current browser only.

There is no backend, login, cross-device sync, server action, or shared comments system. Reading data stays in the browser that created it.

## Add a chapter from GitHub mobile

1. Open `content/chapters/`.
2. Create a file such as `11-the-next-record.mdx`.
3. Paste the template and write your chapter.
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

Use a unique filename with lowercase letters, digits, and hyphens. `number` controls reading order. Use a real `YYYY-MM-DD` date. `fonts` is an optional list of display-font slugs. Fonts explicitly named by `Chant` are also loaded for that chapter automatically.

## MDX component tags

All tags are optional-prop friendly and have safe defaults. Invalid font names fall back to Cinzel; unknown divider types use `fracture`.

| Tag | Use |
| --- | --- |
| `<Chant font="cinzel">...</Chant>` | Incantation using a chapter display font |
| `<Seal />` | Command seal that briefly glows and fades |
| `<Shake>...</Shake>` | One impact shake as the passage enters view |
| `<Reveal>...</Reveal>` | Passage revealed on scroll or tap |
| `<SystemWindow>...</SystemWindow>` | Game-style status/message frame; optional `title` and `status` |
| `<NobleName>...</NobleName>` | Dramatic name/title treatment |
| `<Whisper>...</Whisper>` | Quiet text motion |
| `<Scream>...</Scream>` | High-impact text motion |
| `<Divider type="rift" />` | Scene break: `fracture`, `ash`, `rift`, `silence`, `static` |
| `<SocialPost platform="INSTAGRAM / REELS" author="COUSIN" caption="..." views="10,000+" />` | In-story social post with reactions and reach metadata |
| `<MessageThread title="GROUP NAME" platform="WHATSAPP">` with `<MessageBubble author="CLASSMATE">...</MessageBubble>` | In-story group or private-message thread |
| `<LiveChat>` with `<ChatLine author="VIEWER">...</ChatLine>` | Live-stream chat messages |
| `<StoryImage src="https://images.unsplash.com/..." alt="..." caption="..." />` | Responsive photographic scene image; use licensed assets and descriptive alt text |

## Fonts

`lib/fonts.json` is the single catalog: **8 reader fonts + 14 display fonts + 2 UI fonts**. Each entry lists its family, role, Fontsource package, and SIL Open Font License 1.1 license. The license URL is at the top of the file.

Before dev/build, `scripts/copy-fonts.mjs` copies Latin-subset WOFF2 assets into the generated `public/fonts/` folder and writes one CSS file per family with `font-display: swap`. The exported site self-hosts these assets; it does not request the fonts from Google Fonts at runtime. The generated folder is not committed.

- The reader font CSS loads only on chapter pages and the reader can change between the 8 families.
- Each chapter loads the display-font CSS listed in its own frontmatter (plus any font explicitly named in a `Chant` tag).
- To add/remove a family, update `lib/fonts.json` and the matching dependency in `package.json`. Keep the license attribution accurate.

## Search and reader features

Pagefind indexes the exported chapter HTML after Next.js builds. The archive search imports the local index. Bookmarks, read progress, theme, and font preferences are stored locally; the archive's “saved only” filter reads the same bookmark list. These do not sync between browsers or phones.

## Run and build

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
npm run build
```

The generated website is in `out/`. Connect the repository to Vercel and select the **Next.js** framework preset. Keep Vercel's detected Build Command and Output Directory settings rather than adding an Output Directory override; Next.js handles its static-export output automatically.

## Folder map

- `app/` — homepage, archive, chapter route, global layout
- `components/` — header, motion, low-end-aware 3D hero, reader controls, MDX effects
- `content/chapters/` — one editable `.mdx` file per chapter
- `lib/chapters.ts` — chapter metadata and static route source
- `ASSET_SOURCES.md` — photographic asset credits and license notes
- `lib/fonts.json` — all reader, display, and UI fonts
- `scripts/copy-fonts.mjs` — WOFF2 self-hosting step
- `public/fonts/` — generated fonts and CSS, not committed
- `out/` — generated static export, not committed

## Fan-work notice

Fate and its original characters/settings belong to their respective rights holders. This is an unofficial, non-commercial fan project and is not affiliated with or endorsed by Type-Moon.
