module.exports = {
  extends: [
    'plugin:sonarjs/recommended',
    'plugin:unicorn/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },

  plugins: [
    '@typescript-eslint/eslint-plugin',
    'unused-imports',
    'sonarjs',
    'simple-import-sort',
  ],
  env: {
    node: true,
    jest: true,
  },
  rules: {
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true,
        endOfLine: 'auto',
        semi: false,
        printWidth: 90,
        spaceBrackets: true,
      },
      {
        usePrettierrc: false,
      },
    ],

    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',

    // ESlint, TS rules
    'no-param-reassign': 'off',
    eqeqeq: 'off',
    'react/react-in-jsx-scope': 'off',
    'consistent-return': 'off',
    'class-methods-use-this': 'off',
    'no-console': 'off',
    'no-empty-pattern': 'off',
    'no-empty': 'off',
    'import/no-named-as-default': 'off',
    'no-unused-vars': 'off',
    'no-bitwise': 'off',
    'import/prefer-default-export': 'off',
    'no-return-assign': 'off',
    'no-plusplus': 'off',
    'no-multi-assign': 'off',
    'no-useless-escape': 'off',
    'no-restricted-syntax': 'off',
    'no-underscore-dangle': 'off',
    indent: ['off', 2],
    'no-multiple-empty-lines': 'warn',
    'eol-last': ['warn', 'always'],
    'object-curly-spacing': ['warn', 'always'],
    'array-bracket-spacing': ['warn', 'never'],
    'default-case': 'warn',
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
      },
    ],
    // Unicorn rules
    'unicorn/no-array-for-each': 'off',
    'unicorn/filename-case': 'warn',
    'unicorn/no-abusive-eslint-disable': 'off',
    'unicorn/no-null': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/prefer-spread': 'off',
    'unicorn/no-array-callback-reference': 'off',
    'unicorn/consistent-function-scoping': 'warn',
    'unicorn/prefer-top-level-await': 'warn',
    'unicorn/prevent-abbreviations': 'off',

    'unicorn/no-useless-undefined': 'off',
    // SonarJS rules
    'sonarjs/no-duplicate-string': 'warn',
    'sonarjs/prefer-single-boolean-return': 'warn',
    // Imports rules
    // TODO setup this rule
    'simple-import-sort/imports': 'warn',
    'simple-import-sort/exports': 'warn',
    'unused-imports/no-unused-imports': 'error',
  },
}
