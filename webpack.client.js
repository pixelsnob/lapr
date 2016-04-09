
'use strict';

var webpack           = require('webpack'),
    path              = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname),
  entry: {
    client: './client',
    admin: 'views/admin/app'
  },
  output: {
     path: 'public/dist',
     publicPath: '/',
     filename: '[name].js'
  },
  resolve: {
    extensions: [ '', '.js' ],
    root: [
      path.join(__dirname, 'public/js'),
      path.join(__dirname, 'node_modules')
    ],
    alias: {
      template:                  'lib/template',
      'backbone-paginator':      'backbone.paginator/lib/backbone.paginator',
      vex_dialog:                'vex-js/js/vex.dialog',
      markdown:                  'marked/lib/marked'
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
      $ : 'jquery'
    })
  ],
  module : {
    loaders: [
      { 
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: [ 'react', 'es2015', 'stage-0' ]
        }
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
        test: /-worker\.js$/,
        loader: 'worker'
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


