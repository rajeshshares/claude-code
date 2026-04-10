import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "@codepup/tagger";
import { codepupPreview } from "@codepup/iframe-router/vite";
import { codepupElementSelector } from "@adimadur2/preview";
import { codepupSourceInjector } from "@adimadur2/preview";

export default defineConfig(({ mode }) => ({
  plugins: [
    codepupSourceInjector(),
    react(),
    // inject CodePup badge (dev only); switch to componentTagger({ apply: "both" }) for prod too
    componentTagger({ apply: "both" }),
    codepupPreview(),
    codepupElementSelector(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5175,
    hmr: {
      host: process.env.PUBLIC_HOST || "localhost",
    },
    allowedHosts: [
      "localhost",
      process.env.PUBLIC_HOST,
      ".azurecontainerapps.io",
      ".codepup.ai",
      ".codepup.app"
    ].filter(Boolean),
  },
}));