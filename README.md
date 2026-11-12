# Ivan Chaban: portfolio and CV

Single-page portfolio built with [Astro](https://astro.build) (static HTML at build time),
[React](https://react.dev) components and [GSAP](https://gsap.com) for animation. Deployed to
GitHub Pages.

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
- **Header CV link**: `profile.cvDoc` in `src/data/cv.ts`.
- **Certificates and diplomas**: entries in `src/data/cv.ts` (`certifications`, and `diploma` on
  each `education` item); the scans are mapped in `src/lib/documents.ts` and resized at build.
- **Company logos**: SVGs in `src/assets/logos/`, mapped in `src/lib/documents.ts`. They are
  recoloured for the dark page (light lettering) and shown without a background. A role without
  a `logo` shows only the company name.
- **Photo**: `src/assets/portrait.jpg`. Framing is controlled by the `objectPosition` prop on the strip
  `<img>` in `src/components/Hero.tsx`.

## Structure

- `src/pages/index.astro`: page composition, title and description
- `src/layouts/Base.astro`: `<head>`, SEO meta, Open Graph, JSON-LD
- `src/components/`: React components, one per section. They are rendered to static HTML at
  build time. Two are hydrated in the browser after the first paint (`client:afterpaint`, a
  custom directive in `src/lib/after-paint-directive.ts`): `Hero.tsx`, which adds the pointer and
  scroll movement of the skewed photo strips with `useGSAP` from `@gsap/react` (the hero intro
  itself is CSS keyframes in `src/ui/intro.css.ts`, so it plays without JavaScript), and
  `Lightbox.tsx`, the modal for certificate and diploma scans.
- `src/scripts/main.ts`, `src/scripts/scroll.ts`: mobile menu, scroll reveals, progress bar,
  counters, active navigation (plain scripts that work on the static HTML)
- `src/ui/`: vanilla-extract styling and shared primitives (`theme.css.ts`, `global.css.ts`,
  `Box`, `Text`, `Button`, ...). Print rules live in `global.css.ts` and the `print` media
  condition, so printing the page gives a plain single-column CV

The page is fully readable without JavaScript and respects `prefers-reduced-motion`.

## Deploy

`.github/workflows/deploy.yml` builds and publishes on every push to `master`.
In the repository settings, set **Pages → Source** to **GitHub Actions**.

If the repository is renamed or a custom domain is used, update `site` and `base` in
`astro.config.mjs` and the sitemap URL in `public/robots.txt`.
