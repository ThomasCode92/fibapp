import { defineConfig } from "vitest/config";

import { baseConfig } from "@repo/vitest-config/base";

export default defineConfig({
  test: baseConfig.test,
});
