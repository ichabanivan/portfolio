# Ivan Chaban: CV site

**Live:** https://ichabanivan.github.io/

Single-page CV built with [Astro](https://astro.build) (static HTML at build time),
[React](https://react.dev) components, [vanilla-extract](https://vanilla-extract.style) styling and
[GSAP](https://gsap.com) animation. Deployed to GitHub Pages with GitHub Actions.

## Requirements

- Node.js 26 (LTS)

## Commands

```sh
npm install
npm run dev      # local dev server
npm run build    # static build into dist/
npm run preview  # serve the built site
```

## Editing content

All text lives in `src/data/cv.ts` (profile, skills, experience, education, certifications,
languages, volunteering).

- **Download CV buttons**: link to the PDF export of the Google Doc in `profile.cvDoc`. To ship a
  fixed copy instead, put the file at `public/Ivan-Chaban-CV.pdf`; it takes priority.
- **Header CV link**: opens the Google Doc in `profile.cvDoc`.
- **Years in the industry**: calculated from the start date of the earliest role in `experience`
  and refreshed in the browser, so it never needs a manual update.
- **Phone number**: hidden by default. Set `profile.phone` to show it.
- **Certificates and diplomas**: entries in `certifications` and the `diploma` key on each
  `education` item. Scans are mapped in `src/lib/documents.ts`, resized at build time and shown
  uncropped in the thumbnails and the lightbox. Certificates with a `url` get a
  "Verify credential" link.
- **Company logos**: SVGs in `src/assets/logos/`, mapped in `src/lib/documents.ts`. A role without
  a `logo` shows only the company name.
- **Photo**: `src/assets/portrait.jpg`. Framing is set by `objectPosition` on the strip `<img>` in
  `src/components/Hero.tsx`.

## Structure

- `src/pages/index.astro`: page composition, title, description and CV link.
- `src/layouts/Base.astro`: `<head>`, SEO meta, Open Graph, JSON-LD (`src/lib/jsonld.ts`).
- `src/components/`: one React component per section, rendered to static HTML at build time.
  Two are hydrated after the first paint with the custom `client:afterpaint` directive
  (`src/lib/after-paint-directive.ts`):
  - `Hero.tsx`: pointer and scroll movement of the photo strips (`useGSAP`). The hero intro
    itself is CSS keyframes in `src/ui/intro.css.ts`, so it plays without JavaScript.
  - `Lightbox.tsx`: modal `<dialog>` for certificate and diploma scans.
- `src/scripts/`: plain scripts that run on the static HTML, loaded after the first paint.
  - `main.ts`: mobile menu, tenure and years counters, entry point.
  - `scroll.ts`, `reveal.ts`: scroll reveals (ScrollTrigger and SplitText), progress bar, active
    navigation, light-section transitions, marquee and timeline.
  - `magnetic.ts`: magnetic hover and press effect for every `Button` (`[data-magnetic]`), only on
    fine pointers with motion allowed.
- `src/ui/`: vanilla-extract theme and styles (`theme.css.ts`, `global.css.ts`, `effects.css.ts`,
  …) and shared primitives (`Box`, `Text`, `Button`, `Card`, …). Print rules use the `print`
  media condition, so printing the page gives a plain single-column CV.
- `scripts/generate-icons.mjs`: regenerates the favicon and app icons in `public/`.

The page is fully readable without JavaScript and respects `prefers-reduced-motion`.

## Deploy

`.github/workflows/deploy.yml` builds on Node 26 and publishes to GitHub Pages on every push to
`master`. **Settings → Pages → Source** must be **GitHub Actions**.

The site is served from the root because the repository is named `ichabanivan.github.io`. If it
is renamed or moved to a custom domain, update `site` (and `base` for a sub-path) in
`astro.config.mjs` and the sitemap URL in `public/robots.txt`.
