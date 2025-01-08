import config from '@remix-practice/eslint-config';

// console.log(config);

/** @type {import('eslint').Linter.Config} */
export default [
  ...config,

  {
    ignores: ['node_modules', 'build', 'public/build'],
  },
];
