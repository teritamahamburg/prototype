module.exports = {
  lintOnSave: false,
  outputDir: 'docs',
  publicPath: process.env.NODE_ENV === 'production' ? '/prototype/' : '/',
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
  },
};
