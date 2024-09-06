import { defineConfig, squooshImageService } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import { remarkReadingTime } from './src/utils/readTime.ts'
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://pranshu.tech',
  integrations: [
    react(),
    mdx({
      syntaxHighlight: 'shiki',
      shikiConfig: {
        experimentalThemes: {
          light: 'vitesse-light',
          dark: 'material-theme-palenight',
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
      // Choose from Shiki's built-in themes (or add your own)
      // https://shiki.style/themes
      // theme: "dracula",
      // Alternatively, provide multiple themes
      // https://shiki.style/guide/dual-themes
      themes: {
        light: "dracula",
        dark: "dracula",
      },
      // Add custom languages
      // Note: Shiki has countless langs built-in, including .astro!
      // https://shiki.style/languages
      langs: [],
      // Enable word wrap to prevent horizontal scrolling
      wrap: true,
      // Add custom transformers: https://shiki.style/guide/transformers
      // Find common transformers: https://shiki.style/packages/transformers
      transformers: [],
    },
  },
  vite: {
    optimizeDeps: {
      noDiscovery: true,
      include: [],
    },
  },
})
