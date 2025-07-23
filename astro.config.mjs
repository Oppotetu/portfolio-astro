// @ts-check
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import sanity from '@sanity/astro'

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    sanity({
      projectId: 's0d0t3an',
      dataset: 'production',
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  redirects: {
    '/': '/projects',
  },
})
