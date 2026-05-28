import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// Plugin để chuyển hướng mọi request HTML về admin/index.html
const adminFallbackPlugin = () => ({
  name: 'admin-fallback',
  configureServer(server: any) {
    server.middlewares.use((req: any, res: any, next: any) => {
      // Bắt tất cả các request dạng text/html hoặc trỏ thẳng vào root
      if (req.method === 'GET' && (req.url === '/' || req.headers.accept?.includes('text/html'))) {
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
