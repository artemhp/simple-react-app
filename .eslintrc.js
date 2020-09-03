module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  extends: ['airbnb'],
  plugins: ['babel', 'import', 'jsx-a11y', 'react', 'prettier'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'linebreak-style': 'off', // This is still unstable.
    'arrow-parens': 'off', // Incompatible with prettier
    'object-curly-newline': 'off', // Incompatible with prettier
    'no-mixed-operators': 'off', // Incompatible with prettier
    'arrow-body-style': 'off', // Skips functions on one line
    'function-paren-newline': 'off', // Incompatible with prettier
    'no-plusplus': 'off',
    'space-before-function-paren': 0, // Incompatible with prettier

    'max-len': ['error', 120, 2, { ignoreUrls: true, ignoreStrings: true }], // line length config
    'no-alert': 'error', // airbnb uses warning
    'no-param-reassign': 'off',
    'react/require-default-props': 'off', // airbnb uses error notification
    'react/forbid-prop-types': 'off', // airbnb uses error notification
    'react/jsx-filename-extension': ['error', { extensions: ['.js'] }], // airbnb uses .jsx
    'prefer-destructuring': 'off',
    'react/no-find-dom-node': 'off',
    'react/no-did-mount-set-state': 'off',
    'react/no-unused-prop-types': 'off', // This is still unstable.
    'react/jsx-one-expression-per-line': 'off',
    'jsx-a11y/anchor-is-valid': ['error', { components: ['Link'], specialLink: ['to'] }],
    'jsx-a11y/label-has-for': [
      2,
      {
        required: {
          every: ['id'],
        },
      },
    ], // error for nested properties `htmlFor` elements `label`

    'prettier/prettier': ['error'], // prettier errors
  },
};
