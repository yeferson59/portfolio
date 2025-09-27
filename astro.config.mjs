import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  env: {
    schema: {
      BASE_URL: envField.string({ context: "client", access: "public" }),
    },
  },
});
