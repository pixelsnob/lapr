/**
 * Creates new slugs from product name + makers(s), if any
 * 
 */

'use strict';

var async              = require('async'),
    db                 = require('../../models'),
    slug               = require('../../lib/slug'),
    _                  = require('underscore');


async.waterfall([
  function(next) {
    db.model('Product').find().populate('makers').exec(function(err, products) {
      if (err) {
        return next(err);
      }
      async.eachSeries(products, function(product, cb) {
        var new_slug_base = product.name,
            makers        = _.pluck(product.makers, 'name');
        if (makers.length) {
          new_slug_base += ' ' + makers.join(' ');
        }
        product.slug = slug(new_slug_base);
        product.save(cb);
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


