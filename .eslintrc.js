module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'prettier',
    'airbnb',
    'plugin:react/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier', 'import'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
        arrowParens: 'always',
        jsxBracketSameLine: false
      },
    ],
    jsxSingleQuote: true,
    'no-nested-ternary': 'off',
    'import/no-cycle': 'off',
    'react/display-name': 'off',
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'no-use-before-define': 'off',
    'no-unused-vars': 'off',
    'no-plusplus': 'off',
    'import/no-unresolved': 'off',
    'react/jsx-key': 'off',
    'react/no-array-index-key': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/no-use-before-define': ['error'],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/prefer-default-export': 'off',
    'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
  },
};
