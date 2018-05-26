
'use strict';

var mongoose = require('mongoose');

mongoose.Promise = global.Promise

module.exports = (db_name) => {
  var connection = module.exports = mongoose.connect('mongodb://localhost/' + db_name, {
    useMongoClient: true
  });
  connection.on('open', () => {
    console.log('mongo connected');
  });
  connection.on('error', err => {
    console.error('mongo error', err);
  });
  connection.on('disconnected', err => {
    console.log('mongo disconnected');
  });
  connection.on('reconnected', () => {
    console.log('mongo reconnected');
  });
  return connection;
};

