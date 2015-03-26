
'use strict';

var async            = require('async'),
    db               = require('../../models'),
    _                = require('underscore'),
    slug             = require('../../lib/slug'),
    path             = require('path'),
    categories       = [];

var a = 0;

async.waterfall([
  function(next) {
    db.connection.collections.product_types.drop(function(err) {
      if (err) {
        return next(err);
      }
      next();
    });
  },
  function(next) {
    db.connection.model('ProductType').resetCount(function(err) {
      if (err) {
        return next(err);
      }
      next();
    });
  },
  function(next) {
    db.connection.model('TempProductType').find({}, function(err, products) {
      if (err) {
        return next(err);
      }
      async.eachSeries(products, function(product, cb) {
        db.connection.model('ProductType').create(_.omit(product.toJSON(), '_id'), cb);
      }, next);
    });
  }/*,
  function(next) {
    db.connection.model('ProductType').find({}, function(err, product_types) {
      if (err) {
        return next(err);
      }
      async.eachSeries(product_types, function(product_type, cb) {
        //db.connection.model('ProductType').create(_.omit(product.toJSON(), '_id'), cb);
        db.connection.model('Product').findOne({
          name: { $regex: product_type.name.toLowerCase(), $options: 'ig' }
          //$text: { $search: product_type.name }
        }, function(err, product) {
          if (err) {
            return cb(err);
          }
          if (product) {
            console.log(product.name, ' - ', product_type.name);
            a++;
          }
          cb();
        });
      }, next);
    });
  }*/
], function(err) {
  if (err) {
    return console.error(err);
  }
  console.log(a);
  console.log('Done');
  db.connection.close();
});


