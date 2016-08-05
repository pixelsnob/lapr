
'use strict';

var webpack           = require('webpack'),
    path              = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

var app_dir = path.resolve(__dirname, '../../');

module.exports = {
  context: app_dir,
  entry: { 
    client: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://0.0.0.0:8080/',
      'webpack/hot/only-dev-server',
      './client/app'
    ]
  },
  output: {
     path: path.join(app_dir, 'public/dist'),
     publicPath: '/dist/',
     filename: '[name].js'
  },
  resolve: {
    extensions: [ '', '.js' ],
    root: [
      path.join(app_dir, 'shared'),
      path.join(app_dir, 'client'),
      path.join(app_dir, 'node_modules')
    ],
    alias: {
      template:                  'lib/template',
      vex_dialog:                'vex-js/js/vex.dialog',
      markdown:                  'marked'
    }
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin('main.css'),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    }),
    new webpack.ProvidePlugin({
      youtube:  'YT',
      vexflow:  'Vex'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  module : {
    loaders: [
      { 
        test: /\.js$/,
        loader: 'babel'
      },
      { 
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract(
          'style-loader', 
          'css-loader?sourceMap!less-loader'
        )
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style-loader', 
          'css-loader?sourceMap'
        )
      },
      {
        test: /bootstrap\/js\//,
        loader: 'null-loader'
      },
      {
        test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream"
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file"
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml"
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=1000000'
      }
    ]
  }
};


