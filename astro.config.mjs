// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import wix from "@wix/astro";
import react from "@astrojs/react";
import sourceAttrsPlugin from "@wix/babel-plugin-jsx-source-attrs";
import dynamicDataPlugin from "@wix/babel-plugin-jsx-dynamic-data";
import customErrorOverlayPlugin from "./vite-error-overlay-plugin.js";

const isBuild = process.env.NODE_ENV == "production";
const hasWixEnv = !!process.env.WIX_CLIENT_ID;

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [
    {
      name: "framewire",
      hooks: {
        "astro:config:setup": ({ injectScript, command }) => {
          if (command === "dev") {
            injectScript(
              "page",
              `import { init } from "@wix/framewire";
              console.log("Framewire initialized");
              init();`,
            );
          }
        },
      },
    },
    tailwind(),
    hasWixEnv &&
      wix({
        enableHtmlEmbeds: isBuild,
        enableAuthRoutes: true,
      }),
    react({ babel: { plugins: [sourceAttrsPlugin, dynamicDataPlugin] } }),
  ].filter(Boolean),
  vite: {
    plugins: [customErrorOverlayPlugin()],
  },
  adapter: isBuild ? vercel() : undefined,
  devToolbar: {
    enabled: false,
  },
  image: {
  domains: ["static.wixstatic.com"],
  },
  server: {
    allowedHosts: true,
    host: true,
  },
});
