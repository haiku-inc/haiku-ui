/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  singleQuote: true,
  arrowParens: 'always',
  trailingComma: 'all',
  endOfLine: 'lf',
  printWidth: 120,
  bracketSpacing: true,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleAttributePerLine: false,
  plugins: ['prettier-plugin-organize-imports'],
  overrides: [{ files: '*.svg', options: { parser: 'html' } }],
};

export default config;
