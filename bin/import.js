
'use strict';

var jsdom            = require('jsdom'),
    urls             = require('./import/urls'),
    mongoose         = require('mongoose'),
    db               = mongoose.connect('mongodb://localhost/lapr'),
    async            = require('async'),
    ProductModel     = require('../models/products'),
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
      async.eachSeries($tables, function($table, cb1) {
        async.eachSeries($($table).find('tr'), function($row, cb2) {
          var $col = $($row).find('td');
          var product = new ProductModel({
            description: $col.eq(urls[url].fields.description).text(),
            category:    urls[url].name,
            maker:       $col.eq(urls[url].fields.maker).text(),
            price:       $col.eq(urls[url].fields.price).text()
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


