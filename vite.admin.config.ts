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
  appType: 'mpa', // Tắt SPA fallback mặc định của Vite
  plugins: [react(), adminFallbackPlugin()],
  server: {
    port: 5174,
    strictPort: true,
  },
  build: {
    outDir: resolve(__dirname, 'dist/admin'),
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, 'admin/index.html')
    }
  }
});
