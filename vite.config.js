import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://82.156.11.154',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api\/v1/, ''),
      },
    },
  },
});
