const webpack = require('webpack');
// Module to provide plugins by default, in this case BrowserSyncPlugin
// or CleanWebpackPlugin (valid for jQuery too, see previous version)
const path = require('path');
// Module path require to define entry and out point, and the public folder
const HtmlWebpackPlugin = require('html-webpack-plugin')
// Plugin to inject an HTML template in develop and production mode
const CleanWebpackPlugin = require('clean-webpack-plugin')
// Cleans up the files inside dist folder are not gonna be used
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// Plugin to create a bundle css apart of javascript

const port = process.env.PORT || 3000;

module.exports = {
  // Development Mode [is] optimized for speed and developer experience
  mode: 'development',

  // Entry point to compile and create bundle
  entry: `${path.resolve(__dirname, 'src')}/js/index.js`,

  // Outpoint to compile in bundle.js all the files
  output: {
    path: path.join(__dirname, 'dist'),
    // Path to output
    filename: 'bundle.[hash].js',
    // This is the result, bundle.[hash].js
    // [hash] is a portion of the filename that will be replaced every time
    // you bundle => helps with caching
    publicPath: '/',
    // Where the files are available in the server
  },

  devtool: 'inline-source-map',
  // Tool to map Sass and javascript

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    host: 'localhost',
    port: port,
    compress: true,
    historyApiFallback: true,
    open: true,
    stats: 'errors-only',
    hot: true
  },
  // Webpack Server

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader'],
        }),
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { sourceMap: true } },
            { loader: 'postcss-loader', options: { sourceMap: true } },
            { loader: 'sass-loader', options: { sourceMap: true } },
          ],
        }),
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?[\s\S]+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico'
    }),
    new CleanWebpackPlugin(['dist/static/', 'dist/styles/', 'dist/*.html', 'dist/favicon.ico', 'dist/images/']),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      filename: 'styles/styles.[hash].css',
      allChunks: true,
      disable: process.env.NODE_ENV !== 'production'
    })
  ]
}
