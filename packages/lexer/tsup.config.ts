import { defineConfig } from "tsup";

export default defineConfig({
  format: ["esm", "cjs"],
  clean: true,
  sourcemap: true,
  splitting: true,
  esbuildOptions(options) {
    options.chunkNames = "chunks/[name]-[hash]";
  },
  entry: {
    index: "./src/index.ts",
    // "rollup-plugin-mdx": "./src/rollup-plugin-mdx.ts",
    // react: "./src/react.tsx",
  },
});
