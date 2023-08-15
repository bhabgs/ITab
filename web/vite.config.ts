import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const srcPath = resolve(__dirname, "./src");

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": srcPath,
    },
  },
  server: {
    host: "0.0.0.0",
    proxy: {
      "/api/": {
        target: "http://192.168.5.66:3000",
        rewrite(path) {
          return path.replace(/^\/api\//, "");
        },
      },
    },
  },
});
