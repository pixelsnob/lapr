
var Products = require('./models/products'),
    lunr     = require('lunr'),
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
          Products.find(query, null, opts, function(err, products) {
            if (err) {
              return cb(err);
            }
            // Full text search
            if (req.body.search) {
              var search_index = lunr(function() {
                this.field('name');
                this.field('alt_names');
                this.field('_description');
                this.field('category');
                this.field('makers');
                this.field('model_no');
              });
              products.forEach(function(product) {
                search_index.add(product);
              });
              var search_res = search_index.search(req.body.search);
              if (search_res) {
                // Discard products that don't exist in the full text search
                // results
                products = products.filter(function(product) {
                  return _.findWhere(search_res, { ref: String(product._id) });
                });
              }
            }
            cb(null, products);
          });
        },
        // Get product categories
        function(products, cb) {
          Products.find().distinct('category', function(err, categories) {
            if (err) {
              return cb(err);
            }
            //////
            categories = categories.filter(function(category) {
              return category.split(',').length == 1;
            });
            //////
            cb(null, products, categories);
          });
        },
        // Get makers
        function(products, categories, cb) {
          var ids = products.map(function(product) {
            return product._id;
          });
          var query = { _id: { $in: ids } };
          Products.find(query).distinct('makers', function(err, makers) {
            if (err) {
              return cb(err);
            }
            cb(null, products, categories, makers);
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
