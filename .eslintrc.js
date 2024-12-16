"use strict"

module.exports = {
  root: true,
  extends: [
    "eslint:recommended", // as pluginJs.configs.recommended in flat eslint
    "plugin:n/recommended", // pluginNode.configs["flat/mixed-esm-and-cjs"]
    "plugin:eslint-plugin/recommended", //  eslintPlugin.configs["flat/recommended"]
  ],
  plugins: ["n", "eslint-plugin"],
  env: {
    node: true,
  },
  overrides: [
    {
      files: ["tests/**/*.js"],
      env: { mocha: true },
    },
  ],
}