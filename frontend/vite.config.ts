import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import path from 'path';
declare const __dirname: string;


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    open: true,
    proxy: {
      // 如果您的项目需要代理，请在这里添加代理配置
    },
  },
  build: {
    outDir: 'dist',
  },
});
