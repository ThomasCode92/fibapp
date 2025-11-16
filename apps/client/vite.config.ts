/// <reference types="vitest/config" />

import { resolve } from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import { uiConfig } from "@repo/vitest-config/ui";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "~": resolve(__dirname, "./src") } },
  server: {
    proxy: {
      // proxy API requests to the backend server running on port 8000
      "/api": { target: "http://localhost:8000", changeOrigin: true },
    },
  },
  test: uiConfig.test,
});
