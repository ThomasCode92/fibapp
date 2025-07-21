import globals from "globals";
import tseslint from "typescript-eslint";

import nodePlugin from "eslint-plugin-n";

import { config as baseConfig } from "./base.js";

/**
 * A custom ESLint configuration for NodeJS applications.
 *
 * @type {import("eslint").Linter.Config[]} */
export const config = tseslint.config({
  extends: [...baseConfig],
  plugins: { n: nodePlugin },
  languageOptions: { ecmaVersion: 2022, globals: globals.node },
  rules: { ...nodePlugin.configs["flat/recommended-script"].rules },
});
