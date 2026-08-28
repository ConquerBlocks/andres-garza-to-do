import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // GitHub Pages serves the project under /<repo>/; local dev keeps the root path.
  base: process.env.GITHUB_PAGES === 'true' ? '/andres-garza-to-do/' : '/',
  server: {
    // Allow exposing the dev server through Cloudflare quick tunnels (random subdomains).
    allowedHosts: ['.trycloudflare.com'],
  },
})
