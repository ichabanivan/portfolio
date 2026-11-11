import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

export default defineConfig({
  site: 'https://ichabanivan.github.io',
  base: '/portfolio',
  trailingSlash: 'always',
  compressHTML: false,
  integrations: [sitemap(), react()],
  vite: { plugins: [vanillaExtractPlugin()] },
});
