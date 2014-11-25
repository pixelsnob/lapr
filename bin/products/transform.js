
'use strict';

var mongoose         = require('mongoose'),
    db               = mongoose.connect('mongodb://localhost/lapr'),
    async            = require('async'),
    Product          = require('../../models/product'),
    ProductCategory  = require('../../models/product_category'),
    Maker            = require('../../models/maker'),
    _                = require('underscore'),
    slug             = require('../../lib/slug'),
    path             = require('path');

db.connection.on('error', function(e) {
  console.error('Mongo error: ' + e);
  process.exit(1);
});

var pages = [], c = 0;

async.waterfall([
  function(next) {
    Product.find({}, function(err, products) {
      if (err) {
        return next(err);
      }
      async.each(products, function(product, cb) {
        if (product.sizes) {
          product.sizes = product.sizes.replace(/(\d+(?:\.\d+)?)"?\s?x\s?(\d+(?:\.\d+)?)"?/gi, '$1x$2"');
        }
        product.slug = slug(product.name);
        var categories = product.category.split(',').map(function(category) {
          return category.replace(/^\s+|\s+$/g, '');
        });
        async.each(categories, function(category, cb1) {
          ProductCategory.findOneAndUpdate({ name: category }, {
            $set: { name: category, slug: slug(category) }
          }, { upsert: true }, function(err, _category) {
            if (err) {
              return cb1(err);
            }
            product.categories.push(_category);
            cb1();
          });
        }, function(err) {
          if (!product.maker) {
            return product.save(cb);
          }
          var makers = product.maker.split(',').map(function(maker) { return maker.replace(/^\s+|\s+$/g, ''); });
          async.each(makers, function(maker, cb2) {
            Maker.findOneAndUpdate({ name: maker }, {
              $set: { name: maker }
            }, { upsert: true }, function(err, _maker) {
              if (err) {
                return cb2(err);
              }
              product.makers.push(_maker);
              cb2();
            });
          }, function(err) {
            if (err) {
              return cb(err);
            }
            product.save(function(err) {
              if (err) {
                return next(err);
              }
              cb();
            });
          });
        });
      }, function(err) {
        if (err) {
          return next(err);
        }
        next();
      });
    });
  }
], function(err) {
  if (err) {
    return console.error(err);
  }
  console.log('Done');
  db.connection.close();
});


