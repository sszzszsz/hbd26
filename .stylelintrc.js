module.exports = {
  plugins: [
    'stylelint-scss',
  ],
  extends: [
    'stylelint-config-recommended-scss',
    'stylelint-prettier/recommended'
  ],
  ignoreFiles: [
    '**/node_modules/**',
  ],
  syntax: "scss",
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": [
      true,
      {
        "ignoreAtRules": [
          "function",
          "if",
          "for",
          "each",
          "include",
          "mixin",
          "content"
        ]
      }
    ]
  },
}
