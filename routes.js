
var Product = require('./models/product'),
    async    = require('async'),
    _        = require('underscore');

module.exports = function(app) {

  return {
    
    getProducts: function(req, res, next) {
      async.waterfall([
        // Get products
        function(cb) {
          var query = {},
              opts  = { sort: { name: 1 } };
          if (req.query.category) {
            query.category = new RegExp(req.query.category);
          }
          Product.search(query, opts, req.body.search, function(err, products) {
            if (err) {
              return cb(err);
            }
            cb(null, products);
          });
        },
        // Get product categories
        function(products, cb) {
          Product.getCategories(function(err, categories) {
            if (err) {
              return cb(err);
            }
            cb(null, products, categories);
          });
        },
        // Get makers
        function(products, categories, cb) {
          var ids = products.map(function(product) {
            return product._id;
          });
          Product.getMakersInIds(ids, function(err, makers) {
            cb(err, products, categories, makers);  
          });
        }

      ], function(err, products, categories, makers) {
        if (err) {
          return next(err);
        }
        res.render('products', {
          products:      products,
          categories:    categories.sort(),
          makers:        makers.sort().join(', '),
          search:        (req.body.search || '')
        });
      });
    }
  };
};
