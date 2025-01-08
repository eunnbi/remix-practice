import defaultConfig from '@remix-practice/eslint-config';

/** @type {import('eslint').Linter.Config} */
export default [
  ...defaultConfig,

  {
    ignores: ['node_modules', 'dist'],
  },
];
