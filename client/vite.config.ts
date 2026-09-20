import path from "path";
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
  tailwindcss(),],
  resolve: {alias: {"@": path.resolve(__dirname, "./src")}},
  server: {
    proxy: {
      "/auth": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false
      },
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false
      },
      "/socket.io": {
        target: "http://localhost:3000",
        ws: true,
        changeOrigin: true
      }
    }
  }
})
