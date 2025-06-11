const js = require("@eslint/js");
const tsPlugin = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");
const reactPlugin = require("eslint-plugin-react");
const reactNativePlugin = require("eslint-plugin-react-native");
const reactHooksPlugin = require("eslint-plugin-react-hooks");
const localRulesPlugin = require("eslint-plugin-local-rules");

module.exports = [
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 2020,
        sourceType: "module",
        project: "./tsconfig.json",
      },
      globals: {
        // React Native globals
        __DEV__: "readonly",
        global: "readonly",
      },
    },
    plugins: {
      react: reactPlugin,
      "react-native": reactNativePlugin,
      "react-hooks": reactHooksPlugin,
      "@typescript-eslint": tsPlugin,
      "local-rules": localRulesPlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // React Native specific rules to catch text issues
      "react-native/no-raw-text": [
        "error",
        {
          skip: ["Text"], // Allow only Text component
        },
      ],

      // Custom rule to catch {" "} patterns
      "local-rules/no-jsx-whitespace": "error",

      // React rules to catch nested Text issues
      "react/no-unescaped-entities": "error",
      "react/jsx-no-literals": [
        "warn",
        {
          noStrings: true,
          allowedStrings: ["", " "],
          ignoreProps: true,
        },
      ],

      // Custom rule to catch {" "} patterns
      "no-irregular-whitespace": [
        "error",
        {
          skipStrings: false,
          skipComments: false,
          skipRegExps: false,
          skipTemplates: false,
        },
      ],

      // TypeScript rules
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",

      // React Hooks rules
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Other helpful rules
      "react/react-in-jsx-scope": "off", // Not needed in React 17+
      "react/prop-types": "off", // Using TypeScript for prop validation
    },
  },
  {
    ignores: [
      "node_modules/",
      "dist/",
      "build/",
      "expo-env.d.ts",
      "metro.config.js",
      "babel.config.js",
      ".expo/",
      "web-build/",
    ],
  },
];
