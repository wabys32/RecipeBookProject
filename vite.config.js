import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom', // or 'happy-dom'
    // Add this block down here:
    server: {
      deps: {
        inline: [
          '@asamuzakjp/css-color',
          '@csstools/css-calc'
        ]
      }
    }
  }
})