/**
 * Separates thumbnail images from larger images
 * 
 */

'use strict';

var async            = require('async'),
    db               = require('../../models'),
    fs               = require('fs-extra'),
    path             = require('path'),
    _                = require('underscore');

var from_dir   = __dirname + '/../../public/images-thumbs/',
    to_dir     = __dirname + '/../../public/images-thumbs-tmp/';

async.waterfall([
  function(next) {
    db.connection.model('Product').find({}, function(err, products) {
      if (err) {
        return next(err);
      }
      async.eachSeries(products, function(product, cb) {
        if (product.image) {
          var thumbnail = product.image.replace(/(\..*)$/, "-sm$1");
          console.log(thumbnail);
          /*fs.copy(from_dir + product.image, to_dir + thumbnail, function(err) {
            if (err) {
              console.error(err);
              return cb();
            }
            product.thumbnail = thumbnail;
            product.save(cb);
          });*/
          product.thumbnail = thumbnail;
          product.save(cb);
          return;
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


