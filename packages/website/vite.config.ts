import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import url from "url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export default defineConfig({
  base: "./",
  plugins: [tailwindcss(), react({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ })],
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "./dist",
    minify: false,
    sourcemap: true,
  },
});
