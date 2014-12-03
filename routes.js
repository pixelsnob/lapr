
"use strict";

var Product          = require('./models/product'),
    ProductCategory  = require('./models/product_category'),
    Maker            = require('./models/maker'),
    async            = require('async'),
    models           = require('./models'),
    _                = require('underscore');

module.exports = function(app) {

  return {
    
    getProducts: function(req, res, next) {
      async.waterfall([
        // Get selected category, if any
        function(cb) {
          models.ProductCategory.findOne({ slug: req.params.category }, function(err, category) {
            if (err) {
              return cb(err);
            }
            cb(null, category);
          });
        },
        // Get products
        function(category, cb) {
          var query = {},
              opts  = { sort: { name: 1 } };
          if (category) {
            query.categories = category._id;
          }
          models.Product.search(query, opts, req.body.search, function(err, products) {
            if (err) {
              return cb(err);
            }
            cb(null, category, products);
          });
        },
        // Get product categories
        function(category, products, cb) {
          models.ProductCategory.find(function(err, categories) {
            if (err) {
              return cb(err);
            }
            cb(null, category, products, categories);
          });
        }

      ], function(err, category, products, categories, makers) {
        if (err) {
          return next(err);
        }
        res.render('products', {
          products:      products,
          categories:    categories,
          search:        (req.body.search || '')
        });
      });
    },

    getProduct: function(req, res, next) {
      models.Product.findById(req.params.id, function(err, product) {
        if (err) {
          return next(err);
        }
        res.format({
          json: function() {
            res.send(product);
          },
          html: function() {
            product.populate('categories makers', function(err, product) {
              res.render('product', { product: product });
            });
          }
        });
      });
    },

    updateProduct: function(req, res, next) {
      models.Product.findOneAndUpdate(
        { _id: req.body.id },
        _.omit(req.body, '_id'),
        function(err, product) {
          if (err) {
            return next(err);
          }
          res.send(product);
        }
      );
    },

    addProduct: function(req, res, next) {
      var product = models.Product(_.omit(req.body, [ 'id', '_id' ]));
      product.save(function(err, product) {
        if (err) {
          return next(err);
        }
        res.send(product);
      });
    },

    removeProduct: function(req, res, next) {
      models.Product.findOneAndRemove({ _id: req.params.id },
      function(err, product) {
        if (err) {
          return next(err);
        }
        res.send(product);
      });
    },

    getCategories: function(req, res, next) {
      models.ProductCategory.find()
        .sort({ name: 1 })
        .exec(function(err, categories) {
          if (err) {
            return next(err);
          }
          res.format({
            json: function() {
              res.send(categories);
            }
          });
        });
    },

    updateCategory: function(req, res, next) {
      models.ProductCategory.findOneAndUpdate(
        { _id: req.params.id },
        _.omit(req.body, '_id'),
        function(err, category) {
          if (err) {
            return next(err);
          }
          console.log(category);
          res.send(category);
        }
      );
    },

    removeCategory: function(req, res, next) {
      models.ProductCategory.findOneAndRemove({ _id: req.params.id },
      function(err, category) {
        if (err) {
          return next(err);
        }
        res.send(category);
      });
    },

    getMakers: function(req, res, next) {
      models.Maker.find()
        .sort({ name: 1 })
        .exec(function(err, makers) {
          if (err) {
            return next(err);
          }
          res.format({
            json: function() {
              res.send(makers);
            }
          });
        });
    }
  };
};
