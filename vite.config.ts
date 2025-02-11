import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: true,
    allowedHosts: [
      'localhost',
      'receivers-reliability-talent-dg.trycloudflare.com'
    ]
  }
}) 