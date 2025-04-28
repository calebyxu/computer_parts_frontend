import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/computer_parts_web_frontend/dist/',
  plugins: [react()],
})
