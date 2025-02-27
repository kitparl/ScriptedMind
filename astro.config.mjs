import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react';
// Remove the node import

export default defineConfig({
  output: 'static', // Keep this for GitHub Pages
  // Remove the adapter configuration
  site: 'https://kitparl.site',
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
