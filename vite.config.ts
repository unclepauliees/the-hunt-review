import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import { renameSync, writeFileSync } from "node:fs";

const previewDescription = "A cinematic NowThis x Audible presentation for The Hunt, an immersive Bram Stoker's Dracula guest experience.";
const shareImageVersion = "20260909-ios";
const siteUrl = "https://draculadeck.com";
const shareImageUrl = `${siteUrl}/social-thumbnail.jpg?v=${shareImageVersion}`;
const squareShareImageUrl = `${siteUrl}/social-thumbnail-square.jpg?v=${shareImageVersion}`;

const previewIndexHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <meta name="description" content="${previewDescription}" />
    <meta name="theme-color" content="#171b1b" />
    <meta name="color-scheme" content="dark" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-title" content="The Hunt" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <link rel="canonical" href="${siteUrl}/" />
    <link rel="image_src" href="${shareImageUrl}" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="The Hunt" />
    <meta property="og:url" content="${siteUrl}/" />
    <meta property="og:title" content="The Hunt | NowThis x Audible" />
    <meta property="og:description" content="${previewDescription}" />
    <meta property="og:image" content="${shareImageUrl}" />
    <meta property="og:image:url" content="${shareImageUrl}" />
    <meta property="og:image:secure_url" content="${shareImageUrl}" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Bram Stoker's Dracula key art for The Hunt presentation." />
    <meta property="og:image" content="${squareShareImageUrl}" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="1200" />
    <meta property="og:image:alt" content="A close-cropped Bram Stoker's Dracula key art portrait." />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content="${siteUrl}/" />
    <meta name="twitter:title" content="The Hunt | NowThis x Audible" />
    <meta name="twitter:description" content="${previewDescription}" />
    <meta name="twitter:image" content="${shareImageUrl}" />
    <meta name="twitter:image:src" content="${shareImageUrl}" />
    <meta name="twitter:image:alt" content="Bram Stoker's Dracula key art for The Hunt presentation." />
    <title>The Hunt | NowThis x Audible</title>
    <script>
      window.location.replace("/the-hunt.html" + window.location.search + window.location.hash);
    </script>
    <style>
      html, body { min-height: 100%; margin: 0; background: #171b1b; color: #e4bd96; font: 16px Georgia, serif; }
      body { display: grid; place-items: center; }
      a { color: inherit; letter-spacing: .12em; text-transform: uppercase; }
    </style>
  </head>
  <body>
    <a href="/the-hunt.html">Open The Hunt</a>
  </body>
</html>
`;

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteSingleFile(),
    {
      name: "name-offline-artifact",
      closeBundle() {
        renameSync("dist/index.html", "dist/the-hunt.html");
        writeFileSync("dist/index.html", previewIndexHtml);
      },
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
