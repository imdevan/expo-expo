module.exports = {
  printWidth: 100,
  tabWidth: 2,
  singleQuote: true,
  jsxSingleQuote: true,
  bracketSameLine: true,
  trailingComma: 'es5',
  semi: true,
  useTabs: false,
  bracketSpacing: true,
  arrowParens: 'always',
  endOfLine: 'lf',
  embeddedLanguageFormatting: 'auto',
  singleAttributePerLine: false,
  plugins: ['prettier-plugin-tailwindcss'],
  // tailwindAttributes: ["className"],
  overrides: [
    {
      files: '*.{js,jsx,ts,tsx}',
      options: {
        parser: 'typescript',
        singleQuote: true,
        jsxSingleQuote: true,
      },
    },
  ],
};
