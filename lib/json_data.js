/**
 * Calls various models and collects data so it can be dumped on the page in
 * a script tag, etc.
 * 
 */
var async  = require('async'),
    models = require('../models'),
    data   = module.exports = {};

async.waterfall([
  function(cb) {
    models.Product.find({}, function(err, products) {
      if (err) {
        return cb(err);
      }
      data.products = products;
      cb(null);
    });
  },
  function(cb) {
    models.ProductCategory.find(function(err, categories) {
      if (err) {
        return cb(err);
      }
      data.product_categories = categories;
      cb(null);
    });
  },
  function(cb) {
    models.Maker.find(function(err, makers) {
      if (err) {
        return cb(err);
      }
      data.makers = makers;
      cb(null);
    });
  }
], function(err) {
  if (err) {
    console.error(err);
    return err;
  }
  return data;
});
