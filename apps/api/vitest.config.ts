import path from "path";
import { defineConfig } from "vitest/config";

import { baseConfig } from "@repo/vitest-config/base";

export default defineConfig({
  resolve: { alias: { "~": path.resolve(__dirname, "src") } },
  test: baseConfig.test,
});
