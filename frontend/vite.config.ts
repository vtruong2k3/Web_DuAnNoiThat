import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/provinces': {
        target: 'https://provinces.open-api.vn/api/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/provinces/, ''),
      },
    },
  },
});
