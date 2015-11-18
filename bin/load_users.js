
'use strict';

var
  db              = require('../models'),
  async           = require('async');

db.connection.on('error', function(err) {
  console.error('mongo error: ' + err);
  db.connection.close();
});

db.connection.on('open', function() {

  async.waterfall([
    // Add user(s)
    function(callback) {
      db.connection.model('User').create({
        username: 'luis',
        password: '12345',
        name: 'Luis'
      }, function(err) {
        if (err) {
          return callback(err);
        }
        callback();
      });
    }
  ], function(err) {
    if (err) {
      console.error(err);
    } else {
      console.log('Done');
    }
    db.connection.close();
  });

});

