import vitest from "@vitest/eslint-plugin";
import testingLibrary from "eslint-plugin-testing-library";

/**
 * This ESLint configuration is designed for projects
 * using Vitest and React Testing Library.
 *
 * @type {import("eslint").Linter.Config}
 */
export const config = {
  files: ["**/*.test.{ts,tsx}"],
  plugins: { vitest, "testing-library": testingLibrary },
  rules: {
    ...vitest.configs.recommended.rules,
    ...testingLibrary.configs["flat/react"].rules,
    "vitest/consistent-test-it": "warn",
  },
};
