import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/events': {
        target: `http://localhost:3050`,
        changeOrigin: true,
        timeout: 0,
        secure: false,
      },
    },
  }
});