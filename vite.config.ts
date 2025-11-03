import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    host: true,        // = 0.0.0.0
    port: 5173,
    strictPort: true,
    // Nếu HMR qua tunnel lỗi thì tạm tắt:
    hmr: false,
    // hoặc cấu hình HMR qua wss:
    // hmr: { protocol: 'wss', clientPort: 443 },
  },
});
