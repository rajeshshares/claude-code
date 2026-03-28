import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import react from "eslint-plugin-react";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", "src/components/ui", "src/main.tsx"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "react": react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      // === RUNTIME/APP-BREAKING ERRORS ONLY ===
      
      // Undefined Variables/Components (like HelpCircle)
      "no-undef": "off",
      "react/jsx-no-undef": "error",
      
      // React Runtime Crashes
      "react/jsx-key": "error",                // Missing keys crash React lists
      "react/jsx-no-duplicate-props": "error", // Duplicate props break components
      "react/no-unescaped-entities": "off",
      "react/no-unknown-property": "error",    // Invalid DOM props crash rendering
      
      // React Hooks (prevent crashes and infinite loops)
      ...reactHooks.configs.recommended.rules,
      
      // JavaScript Runtime Errors
      "no-unreachable": "error",               // Dead code indicates logic errors
      "no-duplicate-case": "error",            // Duplicate switch cases
      "no-obj-calls": "error",                 // Calling non-functions crashes
      "no-sparse-arrays": "error",             // [1,,3] creates unexpected undefined
      "use-isnan": "error",                    // === NaN never works
      "valid-typeof": "error",                 // typeof typos always fail
      "no-irregular-whitespace": "error",      // Invisible chars break parsing
      
      // TypeScript Runtime Errors
      "@typescript-eslint/no-non-null-assertion": "error", // x! when x is null crashes
      
      // Async Errors (common runtime issues)
      "no-async-promise-executor": "error",    // Breaks promise handling
      
      // === DISABLE ALL NON-BREAKING RULES ===
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-unnecessary-type-assertion": "off",
      "no-useless-catch": "off",
      "no-fallthrough": "off",
      "require-await": "off",
      "react-refresh/only-export-components": "off",
      "react/jsx-uses-react": "off",
      "react/jsx-uses-vars": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  // Node.js globals for vite.config.ts
  {
    files: ["vite.config.ts"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  }
);