// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Built independently and copied into the blog’s /portfolio/ directory.
const SITE_URL = 'https://honghuang.foomansoft.com';

export default defineConfig({
  site: SITE_URL,
  base: '/portfolio',
  trailingSlash: 'always',

  integrations: [sitemap()],

  // Prefetches internal links on hover/viewport entry for near-instant navigation.
  prefetch: true,

  vite: {
    plugins: [tailwindcss()],
  },
});
