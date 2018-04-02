const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  resolve: {
    alias: {
      'scss': path.resolve(__dirname, 'src/scss'),
      'templates': path.resolve(__dirname, 'src/templates'),
      'img': path.resolve(__dirname, 'src/img'),
      'webfonts': path.resolve(__dirname, 'src/webfonts')
    }
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          interpolate: true
        }
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              presets: [['es2015', {'modules': false}], 'es2016', 'stage-2']
            }
          }
        ]
      },
      {
        test:  /\.(jpe?g|png|gif|svg|obj|mtl|woff2?|ttf|eot)$/i,
        use: [{
          loader: 'file-loader'
        }]
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract([
          'css-loader?sourceMap',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [require('autoprefixer')],
              sourceMap: 'inline',
            }
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [path.resolve(__dirname, 'node_modules')],
              sourceMap: true
            }
          }
        ]),
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/templates/index.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'codigo-de-conduta/index.html',
      template: './src/templates/codigo-de-conduta.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'quero-patrocinar/index.html',
      template: './src/templates/quero-patrocinar.html'
    })
  ]
}
