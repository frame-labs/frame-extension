const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = [
  {
    mode: 'development',
    entry: './src/verification/layer/index.js',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['*', '.js', '.jsx']
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'layer.js'
    },
    performance: {
      hints: false
    },
    devServer: {
      hot: true,
      open: true
    },
    plugins: [
      new HtmlWebpackPlugin(),
      new NodePolyfillPlugin()
    ]
  }
]
