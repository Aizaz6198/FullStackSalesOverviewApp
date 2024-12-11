import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: process.env.PORT || 3000, // Use the PORT environment variable or fallback to 3000
    host: true, // Bind to all available network interfaces
  },
  plugins: [react()],
})
