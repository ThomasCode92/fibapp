import path from "path";

import { defineProject, mergeConfig } from "vitest/config";
import { baseConfig } from "./base-config.js";

const setupFilePath = path.resolve(
  path.dirname(new URL(import.meta.url).pathname),
  "../setups/testing-library.js",
);

export const uiConfig = mergeConfig(
  baseConfig,
  defineProject({
    test: {
      environment: "jsdom",
      setupFiles: [setupFilePath],
    },
  }),
);
