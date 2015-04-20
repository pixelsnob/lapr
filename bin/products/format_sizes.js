/**
 * Fixes dimensions from 10"x3" to 10x3"
 * 
 */

'use strict';

var async              = require('async'),
    db                 = require('../../models'),
    _                  = require('underscore');


async.waterfall([
  function(next) {
    db.model('Product').find({ sizes: /(\d|\.)+"x(\d|\.)+"/gi }, function(err, products) {
      if (err) {
        return next(err);
      }
      async.eachSeries(products, function(product, cb) {
        if (product.sizes) {
          product.sizes = product.sizes.replace(/((?:\d|\.)+)"x((?:\d|\.)+)"/gi, '$1x$2"');
          return product.save(cb);
        }
        cb();
      }, next);
    });
  }
], function(err) {
  if (err) {
    return console.error(err);
  }
  console.log('Done');
  db.connection.close();
});


