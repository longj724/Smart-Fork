/** @type {import("eslint").Linter.Config} */
const config = {
  root: true,
  extends: ["@smartfork/eslint-config"], // uses the config in `packages/config/eslint`
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    tsconfigRootDir: __dirname,
    project: [
      "./tsconfig.json",
      "./apps/*/tsconfig.json",
      "./packages/*/tsconfig.json",
    ],
  },
  ignorePatterns: ["index.ts", "index.tsx"], // Eslint was having problems with these files for some reason
  settings: {
    next: {
      rootDir: ["apps/nextjs"],
    },
  },
};

module.exports = config;
