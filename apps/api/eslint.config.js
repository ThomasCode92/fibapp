import { config as baseConfig } from "@repo/eslint-config/node-app";

export default [
  ...baseConfig,
  {
    settings: { n: { tryExtensions: [".ts"] } },
    rules: {
      // HACK: Ignore missing import errors for express
      "n/no-missing-import": ["error", { allowModules: ["express"] }],
    },
  },
];
