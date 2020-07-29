module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier',
    'stylelint-config-sass-guidelines',
  ],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    'max-nesting-depth': 3,
    'selector-max-compound-selectors': 4,
    'no-descending-specificity': null,
    'selector-no-qualifying-type': null,
  },
}
