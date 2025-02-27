import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react';

export default defineConfig({
  output: 'static', // Keep this for GitHub Pages
  site: 'https://kitparl.github.io',
  base: 'ScriptedMind',
  integrations: [
    react(),
    mdx({
      syntaxHighlight: 'shiki',
      shikiConfig: {
        themes: {
          light: 'one-light',
          dark: 'andromeeda',
        },
        wrap: true
      },
      drafts: true
    }),
    sitemap(),
    tailwind()
  ],
  markdown: {
    shikiConfig: {
      themes: {
        light: 'one-light',
        dark: 'andromeeda',
      },
      wrap: true,
    },
  },
  vite: {
    optimizeDeps: {
      noDiscovery: true,
      include: [],
    },
  },
})
