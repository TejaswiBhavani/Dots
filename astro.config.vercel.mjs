// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import react from "@astrojs/react";

const isBuild = process.env.NODE_ENV === "production";
const isVercel = process.env.VERCEL === "1" || process.env.npm_lifecycle_event === "build:vercel";

// Vercel-optimized configuration
export default defineConfig({
  output: isVercel ? "server" : "static",
  integrations: [
    tailwind(),
    react(),
  ],
  adapter: isVercel ? vercel() : undefined,
  vite: {
    define: {
      // Define environment variables for client-side
      'import.meta.env.VITE_API_BASE_URL': JSON.stringify(process.env.VITE_API_BASE_URL || 'https://api.dots.com'),
      'import.meta.env.VITE_AI_PROVIDER': JSON.stringify(process.env.VITE_AI_PROVIDER || 'local'),
      'import.meta.env.VITE_PAYMENT_GATEWAY': JSON.stringify(process.env.VITE_PAYMENT_GATEWAY || 'mock'),
      'import.meta.env.VITE_FEATURE_AI_ASSISTANT': JSON.stringify(process.env.VITE_FEATURE_AI_ASSISTANT || 'true'),
    },
  },
  devToolbar: {
    enabled: false,
  },
  image: {
    domains: ["static.wixstatic.com"],
  },
  server: {
    host: true,
  },
});