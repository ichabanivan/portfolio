import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

// Static build for GitHub Pages: https://ichabanivan.github.io/portfolio/
export default defineConfig({
  site: 'https://ichabanivan.github.io',
  base: '/portfolio',
  trailingSlash: 'always',
  // Keep whitespace between inline elements so plain-text extraction (ATS, crawlers) reads
  // "Ivan Chaban" and not "IvanChaban".
  compressHTML: false,
  integrations: [sitemap(), react()],
  // All styles are vanilla-extract (*.css.ts), compiled to static CSS at build time.
  vite: { plugins: [vanillaExtractPlugin()] },
});