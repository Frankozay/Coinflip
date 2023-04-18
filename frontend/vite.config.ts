import { defineConfig } from "vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    open: true,
    proxy: {
      // 如果您的项目需要代理，请在这里添加代理配置
    },
  },
  build: {
    outDir: "dist",
  },
});
