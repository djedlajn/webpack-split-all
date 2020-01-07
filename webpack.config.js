const webpack = require('webpack')
const WebpackMd5Hash = require('webpack-md5-hash')
const AssetsPlugin = require('assets-webpack-plugin')

module.exports = config => {
  return {
    entry: { main: './src/index.js' },
    output: {
      filename: '[name]-[chunkhash].js',
      chunkFilename: '[name]-[chunkhash].js',
    },
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              console.log('MODULE', module.context)
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
              )[1]
              return `npm.${packageName.replace('@', '')}`
            },
          },
        },
      },
    },
    plugins: [new AssetsPlugin(), new webpack.HashedModuleIdsPlugin()],
  }
}
