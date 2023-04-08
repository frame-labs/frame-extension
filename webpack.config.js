const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = [
  {
    mode: 'production',
    entry: './src/frame.js',
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: { keep_classnames: true, keep_fnames: true }
        })
      ]
    },
    output: {
      publicPath: '',
      path: path.resolve(__dirname, 'dist'),
      filename: 'frame.js'
    },
    performance: {
      hints: false
    }
  },
  {
    mode: 'production',
    entry: './src/augment/index.jsx',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        }
      ]
    },
    resolve: {
      extensions: ['*', '.js', '.jsx']
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: { keep_classnames: true, keep_fnames: true }
        })
      ]
    },
    output: {
      publicPath: '',
      path: path.resolve(__dirname, 'dist'),
      filename: 'augment.js'
    },
    performance: {
      hints: false
    },
    plugins: [new NodePolyfillPlugin()]
  },
  {
    mode: 'production',
    entry: './src/settings/index.jsx',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        }
      ]
    },
    resolve: {
      extensions: ['*', '.js', '.jsx']
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: { keep_classnames: true, keep_fnames: true }
        })
      ]
    },
    output: {
      publicPath: '',
      path: path.resolve(__dirname, 'dist'),
      filename: 'settings.js'
    },
    performance: {
      hints: false
    },
    plugins: [new NodePolyfillPlugin()]
  },
  {
    mode: 'production',
    entry: './src/index.js',
    output: {
      publicPath: '',
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.js'
    },
    performance: {
      hints: false
    }
  }
]
