import { config as baseConfig } from "@repo/eslint-config/node-app";

export default [...baseConfig, { settings: { n: { tryExtensions: [".ts"] } } }];
