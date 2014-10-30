
'use strict';

var
  db              = require('../lib/db'),
  async           = require('async'),
  User            = require('../models/user')

db.connection.on('error', function(err) {
  console.error('mongo error: ' + err);
  db.connection.close();
});

db.connection.on('open', function() {

  async.waterfall([
    // Add user(s)
    function(callback) {
      User.create({
        username: 'abby',
        password: 'xxxxxxxxxxxxxxxxx',
        name: 'Abby'
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

