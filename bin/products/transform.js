
'use strict';

var async            = require('async'),
    db               = require('../../models'),
    _                = require('underscore'),
    slug             = require('../../lib/slug'),
    path             = require('path'),
    categories       = [];

async.waterfall([
  /*function(next) {
    var collections = [ 'products', 'product_categories', 'makers' ];
    async.eachSeries(collections, function(collection, cb) {
      db.connection.collections[collection].drop(cb);
    }, next);
  },*/
  function(next) {
    db.connection.model('TempProduct').find({}, function(err, products) {
      if (err) {
        return next(err);
      }
      async.eachSeries(products, function(product, cb) {
        if (product.sizes) {
          product.sizes = product.sizes.replace(/(\d+(?:\.\d+)?)"?\s?x\s?(\d+(?:\.\d+)?)"?/gi, '$1x$2"');
        }
        product.slug = slug(product.name);
        if (product.image) {
          product.images = [ product.image ];
        }
        var product_categories = product.category.split(',').map(function(category) {
          return category.replace(/^\s+|\s+$/g, '');
        });
        async.eachSeries(product_categories, function(category, cb1) {
          db.connection.model('ProductCategory').findOne({ name: category }, function(err, _category) {
            if (err) {
              return cb1(err);
            }
            if (!_category) {
              db.connection.model('ProductCategory').create({ name: category, slug: slug(category) }, function(err, doc) {
                if (err) {
                  return cb1(err);
                }
                product.categories.push(doc._id);
                cb1();
              });
            } else {
              product.categories.push(_category._id);
              cb1();
            }
          });
        }, function(err) {
          if (err) {
            return cb(err);  
          }
          if (!product.maker) {
            product.makers = [];
            return product.save(cb);
          }
          var makers = product.maker.split(',').map(function(maker) { return maker.replace(/^\s+|\s+$/g, ''); });
          async.eachSeries(makers, function(maker, cb2) {
            db.connection.model('Maker').findOne({ name: maker }, function(err, _maker) {
              if (err) {
                return cb2(err);
              }
              if (!_maker) {
                db.connection.model('Maker').create({ name: maker }, function(err, doc) {
                  if (err) {
                    return cb2(err);
                  }
                  product.makers.push(doc._id);
                  cb2();
                });
              } else {
                product.makers.push(_maker._id);
                cb2();
              }
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
      }, next);
    });
  },
  function(next) {
    db.connection.model('Product').resetCount(function(err) {
      if (err) {
        return next(err);
      }
      next();
    });
  },
  function(next) {
    db.connection.model('TempProduct').find({}, function(err, products) {
      if (err) {
        return next(err);
      }
      async.eachSeries(products, function(product, cb) {
        db.connection.model('Product').create(_.omit(product.toJSON(), '_id'), cb);
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


