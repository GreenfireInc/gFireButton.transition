const webpack = require('webpack')

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Remove any existing source-map-loader rules
      webpackConfig.module.rules = webpackConfig.module.rules.filter(
        rule => !rule.use?.some(use => use.loader === 'source-map-loader')
      );

      // Add our custom source-map-loader rule that excludes node_modules
      webpackConfig.module.rules.push({
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: /node_modules/,
      });

      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        stream: require.resolve('stream-browserify'),
        crypto: require.resolve('crypto-browserify'),
        buffer: require.resolve('buffer/'),
        process: require.resolve('process/browser.js'),
        fs: false,
      }

      webpackConfig.plugins = [
        ...webpackConfig.plugins,
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
          process: 'process/browser.js',
        }),
      ]

      return webpackConfig
    },
  },
} 