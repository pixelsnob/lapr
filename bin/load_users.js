
'use strict';

var
  db              = require('../lib/db')('lapr'),
  async           = require('async'),
  User            = require('cms/models/user')

db.connection.on('error', function(err) {
  console.error('mongo error: ' + err);
  db.connection.close();
});

db.connection.on('open', function() {

  async.waterfall([
    // Add user(s)
    function(callback) {
      User.create({
        username: 'luis',
        password: '1234',
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

