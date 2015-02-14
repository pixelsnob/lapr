/**
 * Separates thumbnail images from larger images
 * 
 */

'use strict';

var async              = require('async'),
    db                 = require('../../models'),
    fs                 = require('fs'),
    readdir            = require('recursive-readdir'),
    path               = require('path'),
    _                  = require('underscore');

var image_dir = __dirname + '/../../public/images/products/large',
    thumb_dir = __dirname + '/../../public/images/products/thumbnails';

async.waterfall([
  function(next) {
    readdir(image_dir, function(err, files) {
      if (err) {
        return next(err);
      }
      async.eachSeries(files, function(file, cb) {
        var filename = path.basename(file);
        db.connection.model('Product').findOne({ image: filename }, function(err, product) {
          if (err) {
            return cb(err);
          }
          if (!product) {
            // delete
            console.log('delete ' + filename);
            return fs.unlink(file, cb);
            return cb();
          }
          product.thumbnail = product.image;
          product.save(cb);
        });
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


