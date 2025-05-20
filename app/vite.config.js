import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/mahjong-react/',
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: ['5173-matenoskill-mahjongreac-t6kbmcqkamq.ws-us118.gitpod.io']
  }
})
