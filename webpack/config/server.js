
'use strict';

var webpack           = require('webpack'),
    path              = require('path'),
    nodeExternals     = require('webpack-node-externals');

var app_dir = path.join(__dirname, '../../');

module.exports = {
  context: app_dir,
  externals: [ nodeExternals() ],
  target: 'node',
  entry: './server/app.js',
  devtool: 'source-map',
  output: {
     path: path.join(app_dir, 'dist'),
     filename: 'server.js'
  },
  plugins: [

  ],
  resolve: {
    extensions: [ '', '.js' ],
    root: [
      path.join(app_dir, 'shared'),
      path.join(app_dir, 'public/js'),
      path.join(app_dir, 'node_modules')
    ],
    alias: {
      template:                  'lib/template',
      vex_dialog:                'vex-js/js/vex.dialog',
      markdown:                  'marked'
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

