module.exports = {
  root: true,
  extends: ['custom', 'next'],
  parserOptions: {
    babelOptions: {
      presets: [require.resolve('next/babel')],
    }
  }
};
