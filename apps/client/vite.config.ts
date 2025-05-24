/// <reference types="vitest/config" />

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import { uiConfig } from "@repo/vitest-config/ui";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: uiConfig.test,
});
