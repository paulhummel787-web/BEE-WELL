import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // The dot is CRITICAL. It tells the app "look right here for files."
})
