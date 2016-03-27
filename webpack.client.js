
'use strict';

var webpack           = require('webpack'),
    path              = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname),
  entry: {
    app: './client',
    vendor: [
      'react',
      'react-dom',
      'bootstrap'
    ]
  },
  output: {
     path: 'public/dist',
     publicPath: '/',
     filename: 'client.js'
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: [ 'vendor'],
      filename: '[name].js'
    }),
    new ExtractTextPlugin('main.css'),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })/*,
    new webpack.ProvidePlugin({
      Vex: 'vexflow'
    })*/
  ],/*,
  resolve: {
    alias: {
      vexflow: 'vexflow/releases/vexflow-min.js'
    }
  },
  */
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

