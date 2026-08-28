import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Allow exposing the dev server through Cloudflare quick tunnels (random subdomains).
    allowedHosts: ['.trycloudflare.com'],
  },
})
