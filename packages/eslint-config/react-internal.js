import globals from "globals";
import tseslint from "typescript-eslint";

import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

import { config as baseConfig } from "./base.js";

/**
 * A custom ESLint configuration for libraries that use React.
 *
 * @type {import("eslint").Linter.Config[]} */
export const config = tseslint.config({
  extends: [...baseConfig, pluginReact.configs.flat.recommended],
  languageOptions: {
    ecmaVersion: 2022,
    ...pluginReact.configs.flat.recommended.languageOptions,
    globals: globals.browser,
  },
  plugins: { "react-hooks": pluginReactHooks, "react-refresh": reactRefresh },
  settings: { react: { version: "detect" } },
  rules: {
    ...pluginReactHooks.configs.recommended.rules,
    // React scope no longer necessary with new JSX transform.
    "react/react-in-jsx-scope": "off",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
});
