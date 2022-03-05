module.exports = {
  root: true,
  env: {
    browser: true,
  },
  plugins: ['vue'], // enable vue plugin
  extends: ["plugin:vue/recommended", "prettier"], // activate vue related rules
  parserOptions: {
    "parser": "@babel/eslint-parser",
    "ecmaVersion": 7,
    "sourceType": "module",
    "ecmaFeatures": {
      "globalReturn": false,
      "impliedStrict": false,
      "jsx": false,
      "experimentalObjectRestSpread": false,
      "allowImportExportEverywhere": false
    }
  },
  rules: {
    // allow paren-less arrow functions
    "arrow-parens": 0,
    // allow async-await
    "generator-star-spacing": 0,
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === 'production' ? 2 : 0,
    "semi": [2, "never"],
    "quotes": [2, "single"],
    "vue/one-component-per-file": 0,
    "vue/no-multiple-template-root": 0,
    "vue/require-default-prop": 0,
    "vue/require-prop-types": 0,
    "vue/no-v-html": 0,
    "vue/html-indent": 0,
    "vue/no-use-v-if-with-v-for": 0,
    "vue/no-mutating-props": 0,
    "vue/component-name-in-template-casing": ['error', 'kebab-case'],
    "vue/v-slot-style": ["error", {
      "atComponent": "v-slot",
      "default": "v-slot",
      "named": "longform",
    }]
  },
  ignorePatterns: ['dist/*']
};
