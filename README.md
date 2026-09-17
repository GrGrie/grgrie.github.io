# grgrie.com

Personal site, built with [Astro](https://astro.build) and published to GitHub Pages
at <https://grgrie.com> by `.github/workflows/deploy.yml` on every push to `main`.

```bash
npm ci
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
```

## Where things are

| What | File |
|---|---|
| Name, menu, footer links, "Sign in" address | `src/site.ts` |
| Front page text and news | `src/pages/index.astro` |
| CV | `src/pages/cv.md` (PDF: `public/GrigoryGrechkin-CV.pdf`) |
| Research | `src/pages/research.md` |
| Projects | one `.md` per project in `src/content/projects/`, images in `src/assets/projects/` |
| Look | `src/styles.css` |

## A new page from Markdown

Any `.md` file in `src/pages/` becomes a page at its path, e.g. `src/pages/notes.md` → `/notes/`:

```md
---
layout: ../layouts/Markdown.astro
title: Notes
---

Text here.
```

Add it to `nav` in `src/site.ts` if it should appear in the menu.

## Sign in

The "Sign in" button is a plain link to `https://home.grgrie.com`. That host is behind
TinyAuth on the home server, so the sign-in happens there; the site itself stays static.
