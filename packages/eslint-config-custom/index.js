module.exports = {
  extends: [
    'turbo',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    '@typescript-eslint/semi': [
      'error'
    ],
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-unsafe-member-access': 0,
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_'
      }
    ],
    '@typescript-eslint/no-explicit-any': 1,
    'no-case-declarations': 0,
    'react-hooks/exhaustive-deps': 0,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
    'no-duplicate-imports': [
      'error',
      {
        includeExports: true
      }
    ],
    'indent': [
      'error',
      2,
      {
        'SwitchCase': 1
      }
    ],
    'quotes': [
      'error',
      'single',
      {
        'allowTemplateLiterals': true
      }
    ],
    'jsx-quotes': [
      'error',
      'prefer-single'
    ],
    'semi': [
      'error',
      'always'
    ],
    'eqeqeq': [
      'error',
      'always'
    ],
    'no-unused-vars': [
      'warn',
      {
        'argsIgnorePattern': '^_'
      }
    ],
    'object-curly-spacing': [
      'error',
      'always'
    ],
    'arrow-spacing': [
      'error',
      {
        'before': true,
        'after': true
      }
    ],
    'no-console': 'warn',
  },
};
