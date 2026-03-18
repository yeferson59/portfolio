import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  env: {
    schema: {
      BASE_URL: envField.string({
        context: "client",
        access: "public",
        default: "http://localhost:4321",
      }),
      FINANCE_MCP: envField.string({
        context: "client",
        access: "public",
        default: "",
      }),
      BD_URL: envField.string({
        context: "server",
        access: "public",
        default: "",
      }),
      BETTER_AUTH_SECRET: envField.string({
        context: "server",
        access: "public",
        default: "better-auth-secret",
      }),
    },
  },
  output: "server",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    maxDuration: 8,
  }),
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
    fallback: {
      es: "en",
    },
    routing: {
      prefixDefaultLocale: false,
      fallbackType: "rewrite",
    },
  },
});
