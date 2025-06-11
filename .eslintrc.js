module.exports = {
  root: true,
  extends: [
    "@react-native",
    "eslint:recommended",
    "@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-native/all",
    "plugin:react-hooks/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: [
    "react",
    "react-native",
    "react-hooks",
    "@typescript-eslint",
    "local-rules",
  ],
  env: {
    "react-native/react-native": true,
  },
  rules: {
    // React Native specific rules to catch text issues
    "react-native/no-raw-text": [
      "warn",
      {
        skip: ["Text"], // Only allow Text components to have raw text - warn for others
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
  settings: {
    react: {
      version: "detect",
    },
  },
  ignorePatterns: [
    "node_modules/",
    "dist/",
    "build/",
    "expo-env.d.ts",
    "metro.config.js",
    "babel.config.js",
  ],
};
