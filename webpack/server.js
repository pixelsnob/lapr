
var webpack          = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    config           = require('./config/client'),
    path             = require('path');

new WebpackDevServer(webpack(config), {
  contentBase: path.resolve('./public/dist/'),
  publicPath: 'http://0.0.0.0:8080/',
  hot: true,
  historyApiFallback: true,
  proxy: { '*': 'http://0.0.0.0:3003' },
  stats: {
    colors: true
  }
}).listen(8080, '0.0.0.0', function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Listening on port 8080');
});

