module.exports = {
  root: true,
  env: {
    node: true
  },
  globals: {
    '__static': true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    "quotes": [2, "single", { "avoidEscape": true }],
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }]
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
