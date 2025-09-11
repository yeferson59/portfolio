// @ts-check
import js from "@eslint/js";
import markdown from "@eslint/markdown";
import astroParser from "astro-eslint-parser";
import tsParser from "@typescript-eslint/parser";
import eslintPluginAstro from "eslint-plugin-astro";
import globals from "globals";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  // Astro configuration - specifically for .astro files only
  {
    files: ["**/*.astro"],
    plugins: {
      astro: eslintPluginAstro,
    },
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: [".astro"],
        sourceType: "module",
      },
    },
    rules: {
      "astro/missing-client-only-directive-value": "error",
      "astro/no-conflict-set-directives": "error",
      "astro/no-deprecated-astro-canonicalurl": "error",
      "astro/no-deprecated-astro-fetchcontent": "error",
      "astro/no-deprecated-astro-resolve": "error",
      "astro/no-deprecated-getentrybyslug": "error",
      "astro/no-unused-define-vars-in-style": "error",
      "astro/valid-compile": "error",
    },
  },

  // TypeScript and JavaScript configuration
  {
    files: ["**/*.{js,ts}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        NodeListOf: "readonly",
        HTMLElement: "readonly",
        HTMLInputElement: "readonly",
        HTMLButtonElement: "readonly",
        HTMLSelectElement: "readonly",
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      // Enhanced code quality rules
      "no-console": "warn",
      "prefer-const": "error",
      "no-var": "error",
      "object-shorthand": "error",
      "prefer-template": "warn",
    },
  },

  // Markdown configuration
  {
    files: ["**/*.md"],
    plugins: {
      markdown,
    },
    language: "markdown/commonmark",
    rules: {
      "markdown/no-html": "warn",
      // Disable missing label refs rule as it incorrectly flags task list items
      "markdown/no-missing-label-refs": "off",
      "markdown/no-duplicate-headings": "warn",
    },
  },

  // Markdown code blocks configuration
  {
    files: ["**/*.md/*.{js,ts}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      // Relax some rules for code examples in Markdown
      "no-undef": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  globalIgnores(["bun.lock"]),
]);
