import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import { renameSync } from "node:fs";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteSingleFile(),
    {
      name: "name-offline-artifact",
      closeBundle() { renameSync("dist/index.html", "dist/the-hunt.html"); },
    },
  ],
  resolve: { alias: { "@": new URL("./src", import.meta.url).pathname } },
  build: {
    assetsInlineLimit: 100_000_000,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        entryFileNames: "the-hunt.js"
      }
    }
  }
});
