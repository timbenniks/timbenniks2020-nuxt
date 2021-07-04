module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    '@nuxtjs',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
    '@nuxtjs/eslint-config-typescript',
  ],
  plugins: [],
  // add your custom rules here
  rules: {},
};
