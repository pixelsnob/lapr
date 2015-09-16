
'use strict';

var db    = require('../models'),
    async = require('async');

db.connection.on('error', function(err) {
  console.error('mongo error: ' + err);
  db.connection.close();
});

db.connection.on('open', function() {

  async.waterfall([
    function(next) {
      db.model('User').findOne({ username: { $eq: 'luis' }}, function(err, user) {
        if (err) {
          return next(err);
        }
        user.password = '12345';
        user.save(next);
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

