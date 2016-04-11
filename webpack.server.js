
'use strict';

var webpack           = require('webpack'),
    path              = require('path'),
    nodeExternals     = require('webpack-node-externals');

module.exports = {
  context: path.resolve(__dirname),
  externals: [ nodeExternals({ whitelist:[ 'backbone', 'backbone-forms' ] }) ],
  target: 'node',
  entry: './server/app.js',
  devtool: 'source-map',
  output: {
     path: 'dist',
     filename: 'server.js'
  },
  plugins: [

  ],
  resolve: {
    extensions: [ '', '.js' ],
    root: [
      path.join(__dirname, 'shared'),
      path.join(__dirname, 'public/js'),
      path.join(__dirname, 'node_modules')
    ],
    alias: {
      template:                  'lib/template',
      'backbone-paginator':      'backbone.paginator',
      vex_dialog:                'vex-js/js/vex.dialog',
      markdown:                  'marked',
      'backbone-forms':          'backbone-forms/distribution/backbone-forms'
    }
  },
  module: {
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
        loader: 'null-loader'
      }
    ]
  }
};

