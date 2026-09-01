import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/metronms/',
  plugins: [react(), tsconfigPaths()],
  server: {
    proxy: {
      '/metronms/api/v2': {
        //target: "https://825f-183-83-39-102.ngrok-free.app/",
         target: "http://localhost:8980/",
        //  target: "https://fcf3c2afb30c.ngrok-free.app",
        changeOrigin: true,
      },
      '/metronms/rest': {
        //target: "https://825f-183-83-39-102.ngrok-free.app/",
         target: "http://localhost:8980/",
        //  target: "https://fcf3c2afb30c.ngrok-free.app",
        changeOrigin: true,
      },
    },
  },
});
