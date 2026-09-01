import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { compression } from 'vite-plugin-compression2'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Pre-compress assets for faster delivery via CDN
    compression({ algorithm: 'gzip', threshold: 1024 }),
    compression({ algorithm: 'brotliCompress', threshold: 1024 }),
  ],
  build: {
    // Target modern browsers for smaller output
    target: 'es2020',
    // Improve chunk splitting — Vite 8/Rolldown requires function form
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Core React — cached long-term, rarely changes
          if (id.includes('node_modules/react-dom')) return 'vendor-react'
          if (id.includes('node_modules/react/') || id.includes('node_modules/scheduler')) return 'vendor-react'
          // Router
          if (id.includes('node_modules/react-router')) return 'vendor-router'
          // Supabase — large SDK
          if (id.includes('node_modules/@supabase')) return 'vendor-supabase'
          // Framer Motion — heavy animation lib
          if (id.includes('node_modules/framer-motion')) return 'vendor-motion'
          // Markdown renderer
          if (id.includes('node_modules/react-markdown') || id.includes('node_modules/remark-gfm') || id.includes('node_modules/remark-parse') || id.includes('node_modules/unified') || id.includes('node_modules/mdast') || id.includes('node_modules/micromark') || id.includes('node_modules/hast')) return 'vendor-markdown'
          // PDF processing
          if (id.includes('node_modules/pdfjs-dist') || id.includes('node_modules/pdf-parse')) return 'vendor-pdf'
          // Google AI
          if (id.includes('node_modules/@google/generative-ai')) return 'vendor-ai'
          // Icons
          if (id.includes('node_modules/lucide-react')) return 'vendor-icons'
        },
      },
    },
    // Optimize CSS
    cssMinify: true,
    // No source maps in production
    sourcemap: false,
  },
})
