# Ivan Chaban: portfolio and CV

Single-page portfolio built with [Astro](https://astro.build) (static HTML at build time) and
[GSAP](https://gsap.com) for animation. Deployed to GitHub Pages.

## Commands

```sh
npm install
npm run dev      # local dev server
npm run build    # static build into dist/
npm run preview  # serve the built site
```

## Editing content

All text lives in `src/data/cv.ts` (profile, skills, experience, education, extras).

- **Download CV button**: put the file at `public/Ivan-Chaban-CV.pdf` and rebuild. The buttons
  appear automatically when the file exists.
- **Phone number**: hidden by default. Set `profile.phone` in `src/data/cv.ts` to show it.
- **Photo**: `src/assets/me.jpg`. Framing is controlled by `object-position` on `.strip img` in
  `src/styles/global.css`.

## Structure

- `src/pages/index.astro`: page composition, title and description
- `src/layouts/Base.astro`: `<head>`, SEO meta, Open Graph, JSON-LD
- `src/components/`: one component per section
- `src/scripts/hero.ts`: the skewed-strip photo animation
- `src/scripts/scroll.ts`: scroll reveals, progress bar, counters, active navigation
- `src/styles/print.css`: printing the page gives a plain single-column CV

The page is fully readable without JavaScript and respects `prefers-reduced-motion`.

## Deploy

`.github/workflows/deploy.yml` builds and publishes on every push to `master`.
In the repository settings, set **Pages → Source** to **GitHub Actions**.

If the repository is renamed or a custom domain is used, update `site` and `base` in
`astro.config.mjs` and the sitemap URL in `public/robots.txt`.
