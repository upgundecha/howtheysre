module.exports = {
  'env': {
    'es2021': true,
    'node': true,
    'mocha': true
  },
  'extends': [
    'google',
  ],
  'parserOptions': {
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'rules': {
    'new-cap': 0,
    'require-jsdoc': 0
  }
};
