
'use strict';

var mongoose         = require('mongoose'),
    db               = mongoose.connect('mongodb://localhost/lapr'),
    async            = require('async'),
    Product          = require('../../models/product'),
    _                = require('underscore'),
    slug             = require('slug'),
    path             = require('path');

db.connection.on('error', function(e) {
  console.error('Mongo error: ' + e);
  process.exit(1);
});

var pages = [], c = 0;

async.waterfall([
  function(next) {
    var c = 0;
    Product.find({}, function(err, products) {
      if (err) {
        return next(err);
      }
      async.each(products, function(product, cb) {
        if (product.sizes) {
          product.sizes = product.sizes.replace(/(\d+(?:\.\d+)?)"?\s?x\s?(\d+(?:\.\d+)?)"?/gi, '$1x$2"');
        }
        if (product.maker) {
          var makers = product.maker.split(',');
          if (makers.length) {
            product.makers = makers.map(function(maker) { return maker.replace(/^\s+|\s+$/g, ''); });
          }
        }
        product.categories = product.category.split(',').map(function(category) {
          return category.replace(/^\s+|\s+$/g, '');
        });
        product.slug = slug(product.name);
        product.save(function(err) {
          if (err) {
            return next(err);
          }
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

