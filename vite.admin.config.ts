import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// Plugin để chuyển hướng trang chủ (/) sang admin/index.html
const adminFallbackPlugin = () => ({
  name: 'admin-fallback',
  configureServer(server: any) {
    server.middlewares.use((req: any, res: any, next: any) => {
      if (req.url === '/') {
        req.url = '/admin/index.html';
      }
      next();
    });
  }
});

export default defineConfig({
  plugins: [react(), adminFallbackPlugin()],
  server: {
    port: 5174, // Admin chạy port riêng
    strictPort: true,
  },
  build: {
    rollupOptions: {
      input: {
        admin: resolve(__dirname, 'admin/index.html')
      }
    }
  }
});
