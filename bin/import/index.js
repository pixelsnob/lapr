
/* Imports data from old LAPR site */

var scraper        = require('./scraper'),
  mongoose         = require('mongoose'),
  db               = mongoose.connect('mongodb://localhost/lapr'),
  urls             = require('./urls'),
  num_urls         = Object.keys(urls).length,
  async            = require('async'),
  ProductModel     = require('../models/products'),
  TempProductModel = require('../models/temp_products'),
  base_url         = 'http://lapercussionrentals.com/';

if (!num_urls) {
  console.error('No urls to process');
  process.exit(1);
}

db.connection.on('error', function(e) {
  console.error('Mongo error: ' + e);
  process.exit(1);
});

async.waterfall([
  // Drop collection
  function(cb) {
    dropCollection(ProductModel, cb);
  },
  // Scrape old site's product tables and import
  function(cb) {
    var i = 0;
    for (var url in urls) {
      scraper.getRowsFromTable(base_url + url, (function(_url) {
        return function(err, rows) {
          if (err) {
            cb(err);
            return;
          }
          i++;
          for (var j = 0; j < rows.length; j++) {
            var fields = urls[_url].fields, row = rows[j];
            var product = new ProductModel({
              description: row[fields.description],
              category:    urls[_url].name,
              maker:       row[fields.maker],
              price:       row[fields.price]
            });
            product.save((function(_i, _j) {
              return function(err) {
                if (err) {
                  cb(err);
                  return;
                }
                if (_i == num_urls && _j == rows.length - 1) {
                  cb()
                }
              };
            })(i, j));
          }
        };
      })(url));
    }
  }
], function(err) {
  // Done
  if (err) {
    console.error(err);
    process.exit(1);
  }
  db.connection.close();
  console.log('Done');
});

// Drops a mongo collection if it exists
function dropCollection(model, cb) {
  model.collection.drop(function(err) {
    if (err && err.errmsg != 'ns not found') {
      cb(err);
      return;
    }
    cb();
  });
}

