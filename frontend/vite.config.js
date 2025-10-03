import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,   // 👈 ensures it binds to 0.0.0.0
    port: 5173,
    allowedHosts: [
      "d841b0356d43f8a1123011896da40bb8.serveo.net", // 👈 your public domain
    ],
  },
})




