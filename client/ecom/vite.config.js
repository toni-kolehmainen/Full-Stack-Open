import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './testSetup.js', 
  },
  
  resolve: {
    alias:{
      "@": path.resolve(__dirname, "./src/"),
      components: `${path.resolve(__dirname, "./src/components/")}`,
      pages: path.resolve(__dirname, "./src/pages"),
      hooks: `${path.resolve(__dirname, "./src/hooks")}`,
      assets: path.resolve(__dirname, "./src/assets"),
    }
  }
})
