
'use strict';

var async            = require('async'),
    db               = require('../../models'),
    fs               = require('fs-extra'),
    path             = require('path'),
    _                = require('underscore');

var images_dir   = __dirname + '/../../public/images/';

async.waterfall([
  function(next) {
    db.connection.model('Product').find({}, function(err, products) {
      if (err) {
        return next(err);
      }
      async.eachSeries(products, function(product, cb) {
        if (product.image) {
          db.connection.model('Image').create({ name: product.image },
          function(err, image) {
            if (err) {
              return cb(err);
            }
            product.large_image = image._id;
            product.save(cb);
          });
          return;
        }
        cb();
      }, next);
    });
  },
  function(next) {
    db.connection.model('Product').find({}, function(err, products) {
      if (err) {
        return next(err);
      }
      async.eachSeries(products, function(product, cb) {
        if (product.thumbnail) {
          db.connection.model('Image').create({ name: product.thumbnail },
          function(err, image) {
            if (err) {
              return cb(err);
            }
            product.small_image = image._id;
            product.save(cb);
          });
          return;
        }
        cb();
      }, next);
    });
  },
  /*function(next) {
    db.connection.model('Product').find({}, function(err, products) {
      if (err) {
        return next(err);
      }
      async.eachSeries(products, function(product, cb) {
        if (product.thumbnail) {
          product.thumbnail = product.new_thumbnail
        }
        if (product.image) {
          product.image = product.new_image;
        }
        product.save(cb);
      }, next);
    });
  }*/
], function(err) {
  if (err) {
    return console.error(err);
  }
  console.log('Done');
  db.connection.close();
});


