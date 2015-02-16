
'use strict';

var async            = require('async'),
    db               = require('../../models'),
    fs               = require('fs-extra'),
    readdir          = require('recursive-readdir'),
    path             = require('path'),
    _                = require('underscore');

var image_dir   = __dirname + '/../../public/images/';

async.waterfall([
  function(next) {
    db.connection.model('Product').find({}, function(err, products) {
      if (err) {
        return next(err);
      }
      async.eachSeries(products, function(product, cb) {
        if (product.image) {
          product.image = product.image.toLowerCase();
        }
        if (product.thumbnail) {
          product.thumbnail = product.thumbnail.toLowerCase();
        }
        product.save(cb);
      }, next);
    });
  },
  function(next) {
    readdir(image_dir, function(err, files) {
      if (err) {
        return next(err);
      }
      async.eachSeries(files, function(file, cb) {
        var filename = path.basename(file);
        fs.rename(image_dir + filename, image_dir + filename.toLowerCase(), cb);
        console.log(filename);
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


