
'use strict';

var mongoose = require('mongoose');

var db_opts = {
  server: {
    auto_reconnect: true
  }
};

module.exports = (db_name) => {

  var url = 'mongodb://localhost/' + db_name;
  var db = module.exports = mongoose.connect(url, { useNewUrlParser: true });
  
  mongoose.set('useCreateIndex', true)
  mongoose.set('useFindAndModify', false);

  mongoose.connection.on('open', () => {
    console.log('mongo connected');
  });
  mongoose.connection.on('error', err => {
    console.error('mongo error', err);
  });
  mongoose.connection.on('disconnected', err => {
    console.log('mongo disconnected');
  });
  mongoose.connection.on('reconnected', () => {
    console.log('mongo reconnected');
  });
  return mongoose;
};

