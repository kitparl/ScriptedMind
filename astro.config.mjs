import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://pranshu.tech',
  integrations: [
    react(),
    mdx({
      syntaxHighlight: 'shiki',
      shikiConfig: {
        // defaultColor: false,
        themes: {
          light: 'one-light', // Change this to test different themes
          dark: 'andromeeda',   // Change this to test different themes
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
        light: 'one-light', // Change this to test different themes
        dark: 'andromeeda',   // Change this to test different themes
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
