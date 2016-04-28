
'use strict';

var mongoose = require('mongoose');

var db_opts = {
  server: {
    auto_reconnect: true
  }
};

module.exports = (db_name) => {
  var db = module.exports = mongoose.connect(
    'mongodb://localhost/' + db_name, db_opts);

  db.connection.on('open', () => {
    console.log('mongo connected');
  });
  db.connection.on('error', err => {
    console.error('mongo error', err);
  });
  db.connection.on('disconnected', err => {
    console.log('mongo disconnected');
  });
  db.connection.on('reconnected', () => {
    console.log('mongo reconnected');
  });
  return db;
};

