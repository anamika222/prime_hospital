import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:8000',
      '/media': 'http://localhost:8000',
      '/django_static': 'http://localhost:8000',
      '/medison_dashboard_management': 'http://localhost:8000',
    },
  },
})