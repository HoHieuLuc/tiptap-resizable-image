module.exports = {
  root: true,
  extends: ['next', 'custom'],
  parserOptions: {
    babelOptions: {
      presets: [require.resolve('next/babel')],
    }
  }
};
