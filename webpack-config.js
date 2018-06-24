
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const app_dir = path.resolve('./');

module.exports = {
  devtool: 'source-map',// ?
  context: app_dir,
  mode: process.env.NODE_ENV == 'production' ? 'production' : 'development',
  entry: { 
    main: [
      'babel-polyfill',
      path.join(app_dir, 'public/js/main.js')
    ]
  },
  output: {
     path: path.join(app_dir, 'public/dist/js'),
     publicPath: '/dist/js/',
     filename: '[name].js'
  },
   externals: [
    require('webpack-require-http')
  ],
  resolve: {
    modules: [ path.join(app_dir, 'public/js'), 'node_modules' ],
    alias: {
      template: 'lib/template',
      views: path.join(app_dir, 'views'),
      typeahead: 'typeahead.js/dist/typeahead.jquery',
      youtube: 'lib/youtube',
      backbone_forms: 'backbone-forms',
      vex: 'vex-js/js/vex',
      vex_dialog: 'vex-js/js/vex.dialog'
    },
    extensions: [ '.js' ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': process.env.NODE_ENV == 'production' ? 'production' : 'development'
      }
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      _: 'underscore',
      Vex: 'vexflow'
      //Promise: 'es6-promise-promise'//
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [ /node_modules/ ],
        loader: 'babel-loader',
        query: {
          presets: [ 'env' ],
          plugins: [ 'babel-plugin-transform-custom-element-classes', 'syntax-dynamic-import', 'transform-object-rest-spread' ]
        }
      },
      {
        test: /\.jade$/,
        use: [
          'pug-loader',
        ]
      }
    ]
  }
}
