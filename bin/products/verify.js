
'use strict';

var mongoose         = require('mongoose'),
    db               = mongoose.connect('mongodb://localhost/lapr'),
    async            = require('async'),
    ProductModel     = require('../../models/products'),
    TempProductModel = require('../../models/temp_products'),
    _                = require('underscore'),
    path             = require('path');

db.connection.on('error', function(e) {
  console.error('Mongo error: ' + e);
  process.exit(1);
});

var pages = [], c = 0;

async.waterfall([
  function(next) {
    var c = 0;
    TempProductModel.find({}, function(err, products) {
      if (err) {
        return next(err);
      }
      async.each(products, function(product, cb) {
        ProductModel.findOne({ image: product.image }, function(err, tproduct) {
          if (err) {
            return next(err);
          }
          console.log('%s -- %s', product.name, (tproduct === null ? 'xxxxxxxxxx' : '1'));
          cb();
        });
      }, function(err) {
        next(err);
      });
    });
  }
], function(err) {
  console.log('Done');
  db.connection.close();
});


