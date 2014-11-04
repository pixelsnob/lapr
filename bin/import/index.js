
'use strict';

var jsdom            = require('jsdom'),
    urls             = require('./urls'),
    mongoose         = require('mongoose'),
    db               = mongoose.connect('mongodb://localhost/lapr'),
    async            = require('async'),
    ProductModel     = require('../../models/products'),
    _                = require('underscore');

db.connection.on('error', function(e) {
  console.error('Mongo error: ' + e);
  process.exit(1);
});

var pages = [], c = 0;

async.waterfall([
  // Fetch each page in urls
  function(next) {
    async.eachSeries(Object.keys(urls), function(url, cb) {
      jsdom.env({
        url:     'http://lapercussionrentals.com/' + url,
        scripts: [ '//cdnjs.cloudflare.com/ajax/libs/zepto/1.0/zepto.min.js' ],
        done: function(err, window) {
          if (err) {
            return cb(err);
          }
          if (!window) {
            return cb('window object is missing');
          }
          pages[url] = window.$;
          cb();
        }
      });
    }, next);
  },
  function(next) {
    // Empty collection
    ProductModel.collection.remove({}, function(err) {
      if (err) {
        return next(err);
      }
      next();
    });
  },
  function(next) {
    // Process each page, extracting columns from tables and storing them in
    // the db
    async.eachSeries(Object.keys(pages), function(url, cb) {
      var $           = pages[url],
          $tables     = $('table table');
      // Remove excess whitespace, newlines, etc.
      var format = function(str) {
        if (str) {
          return $.trim(str.replace(/\n|\s{2,}/g, ' '));
        }
      };
      async.eachSeries($tables, function($table, cb1) {
        async.eachSeries($($table).find('tr'), function($row, cb2) {
          var $col       = $($row).find('td'),
              fields,
              category,
              page       = urls[url];
          // If page is an array, that means there are multiple categories on the
          // same page
          if (_.isArray(page)) {
            fields   = page[$tables.index($table)].fields;
            category = page[$tables.index($table)].name;
          } else {
            fields   = page.fields;
            category = page.name;
          }
          var product = new ProductModel({
            description: format($col.eq(fields.description).text()),
            category:    category,
            maker:       format($col.eq(fields.maker).text()),
            price:       $col.eq(fields.price).text(),
            model_no:    $col.eq(fields.model_no).text()
          });
          product.save(function(err) {
            if (err) {
              return cb2(err);
            }
            c++;
            cb2();
          });
        }, cb1);
      }, cb);
    }, next);
  }
], function(err) {
  console.log('Done', c);
  db.connection.close();
});


