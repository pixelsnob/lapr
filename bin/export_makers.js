'use strict';

var mongoose         = require('mongoose'),
    db               = mongoose.connect('mongodb://localhost/lapr'),
    async            = require('async'),
    ProductModel     = require('../models/products'),
    _                = require('underscore'),
    path             = require('path'),
    fs               = require('fs');

db.connection.on('error', function(e) {
  console.error('Mongo error: ' + e);
  process.exit(1);
});


async.waterfall([
  function(next) {
    ProductModel.find().distinct('maker', function(err, makers) {
      if (err) {
        return next(err);
      }
      var out = makers.sort().join("\n");
      fs.writeFile('./docs/makers.csv', out, function(err) {
        if (err) {
          return next(err);
        }
        next();
      });
    });
  }
], function(err) {
  db.connection.close();
  if (err) {
    console.error(err);
  } else {
    console.log('Done');
  }
});


