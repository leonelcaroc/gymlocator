import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import FullReload from "vite-plugin-hard-reload";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), FullReload()],
  server: {
    open: "http://localhost:3000",
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
  build: {
    sourcemap: false,
  },
});
