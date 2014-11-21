'use strict';

var mongoose         = require('mongoose'),
    db               = mongoose.connect('mongodb://localhost/lapr'),
    async            = require('async'),
    ProductModel     = require('../../models/product'),
    _                = require('underscore'),
    path             = require('path'),
    fs               = require('fs');

db.connection.on('error', function(e) {
  console.error('Mongo error: ' + e);
  process.exit(1);
});

async.waterfall([
  function(next) {
    ProductModel.find().distinct('maker', function(err, makers) {
      if (err) {
        return next(err);
      }
      var out = makers.sort();
      out = _.uniq(out.map(function(maker) {
        if (maker.match(/n\/a/i)) {
          return;
        }
        maker = maker.replace(/\s+/g, ' ')
                     .replace(/^\s+/g, '')
                     .replace(/\s+$/g, '');
        if (!maker.length) {
          return;
        }
        var maker_split = maker.split('/');
        if (maker_split.length == 2) {
          maker = maker_split[0];
          makers.push(maker_split[1]);
        }
        return maker;
      }));
      fs.writeFile('./docs/makers.csv', out.join("\n"), function(err) {
        if (err) {
          return next(err);
        }
        next();
      });
    });
  }
], function(err) {
  db.connection.close();
  if (err) {
    console.error(err);
  } else {
    console.log('Done');
  }
});


