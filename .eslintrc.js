module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["airbnb-base", "prettier"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "no-alert": 0,
    "wrap-iife": 0,
    "import/extensions": 0,
    "func-names": 0,
    "no-console": "off",
    quotes: ["error", "double"],
    // "no-param-reassign": ["error", { props: true, ignorePropertyModificationsFor: ["popup", "value", "color"] }],
    // "import/no-cycle": 0,
  },
  globals: {
    L: true,
  },
};
