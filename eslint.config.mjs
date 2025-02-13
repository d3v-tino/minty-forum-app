import globals from "globals";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: { globals: globals.browser },
    rules: {
      "object-curly-spacing": ["warn", "always"],
      "semi": ["error", "always"]
    },
    ignores: ["root/*"],
  },

  ...tseslint.configs.recommended,
  {
    plugins: {
      react: reactPlugin.configs.recommended,
    }
  }
];