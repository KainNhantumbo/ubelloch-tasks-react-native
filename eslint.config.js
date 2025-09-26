/// @ts-check
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const reactHooks = require("eslint-plugin-react-hooks");
const tseslint = require("typescript-eslint");

module.exports = defineConfig([
  {
    ignores: [
      "dist/**/*",
      "android/**/*",
      ".expo/**/*",
      "ios/**/*",
      "app-example/**/*",
      ".next/**/*",
      ".astro/**/*",
      "public/**/*",
      ".vite/**/*",
      "node_modules/**/*",
      ".env",
      ".env.*",
      ".DS_Store",
      "Thumbs.db",
      ".idea/**/*",
      ".vscode/**/*",
      "!dist/important.js"
    ]
  },
  ...expoConfig,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      parser: tseslint.parser,
      globals: {
        window: "readonly",
        document: "readonly"
      }
    },
    plugins: {
      "react-hooks": reactHooks,
      "@typescript-eslint": tseslint.plugin
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      // @ts-ignore
      ...(tseslint.configs.recommended.rules || {}),
      "react/no-unescaped-entities": "off",
      "@next/next/no-page-custom-font": "off",
      "react-hooks/exhaustive-deps": "off"
    }
  }
]);
