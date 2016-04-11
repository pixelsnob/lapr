
'use strict';

var webpack           = require('webpack'),
    path              = require('path'),
    nodeExternals     = require('webpack-node-externals');

module.exports = {
  context: path.resolve(__dirname),
  externals: [ nodeExternals(), 'admin' ],
  target: 'node',
  entry: './server.js',
  devtool: 'source-map',
  output: {
     path: 'dist',
     filename: 'server.js'
  },
  plugins: [

  ],
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
