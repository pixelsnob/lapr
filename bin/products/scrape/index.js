
'use strict';

var jsdom            = require('jsdom'),
    urls             = require('./urls'),
    mongoose         = require('mongoose'),
    db               = mongoose.connect('mongodb://localhost/lapr'),
    async            = require('async'),
    ProductModel     = require('../../../models/temp_product'),
    _                = require('underscore'),
    path             = require('path');

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
          //str = str.replace(/,\s*$/, '');
          str = str.replace(/more details\.{1,3}/gi, '')
                   .replace(/n\/a/gi, '');
          return $.trim(str.replace(/\n|\s{2,}/g, ' '));
        }
      };
      async.eachSeries($tables, function($table, cb1) {
        var $rows = $($table).find('tr');
        async.eachSeries($rows, function($row, cb2) {
          var $col        = $($row).find('td'),
              fields,
              category,
              page        = urls[url],
              table_index = $tables.index($table);
          // If page is an array, that means there are multiple categories on the
          // same page
          if ($rows.index($row) == 0) {
            return cb2();
          }
          if (_.isArray(page)) {
            fields   = page[table_index].fields;
            category = page[table_index].name;
          } else {
            fields   = page.fields;
            category = page.name;
          }
          // Data cleanup
          var description   = $col.eq(fields.description).text(),
              range         = $col.eq(fields.range).text(),
                              // Matches note values and ranges: C2-F8, Bb4-F6, D5, etc.
              range_regex   = /[A-G][#b]?[1-9]-[A-G][b#]?[1-9]/i,
              desc_range    = description.match(range_regex),
              img           = $col.eq(0).find('img'),
              image_path    = (img.length ? path.basename(img.attr('src')) : null),
                              // Matches 15x12", 15.5x12.5", 15 x12", 15 x 12.5", etc.
              sizes_regex   = /\d+(?:\.\d+)?"?\s?x\s?\d+(?:\.\d+)?"?|\d+(?:\.\d+)?"/gi,
              sizes         = description.match(sizes_regex),
              octaves_regex = /(\d+(?:\.\d+)?)\s+octaves?/gi,
              octaves       = octaves_regex.exec(description),
              name          = description.replace(sizes_regex, '')
                                         .replace(octaves_regex, '')
                                         .replace(range_regex, '');

          //console.log(img.attr('onclick'));
          var full_image_path;
          if (img && img.attr('onclick')) {
            full_image_path = img.attr('onclick').match(/MM_openBrWindow\(\'([^\']+)/)[1];
          }
          if (desc_range && !range) {
            range = desc_range[0];
          }
          var product = new ProductModel({
            name:        name.split("\n")[0],
            description: format(description),
            category:    category,
            maker:       format($col.eq(fields.maker).text()),
            price:       format($col.eq(fields.price).text()),
            model_no:    format($col.eq(fields.model_no).text()),
            range:       format(range),
            image:       image_path,
            full_image:  full_image_path,
            sizes:       (sizes ? sizes.join(', ') : null),
            octaves:     (octaves ? octaves[1] : null)
          });
          if (!product.description) {
            return cb2();
          }
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
  if (err) { 
    console.error(err);
  } else {
    console.log('Done, %s products added', c);
  }
  db.connection.close();
});


