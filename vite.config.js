import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // This ensures the app looks in the right folder on GitHub
  base: './', 
})
