
"use strict";

var Product          = require('./models/product'),
    ProductCategory  = require('./models/product_category'),
    Maker            = require('./models/maker'),
    async            = require('async'),
    models           = require('./models'),
    _                = require('underscore');

module.exports = function(app) {

  var update = function(req, res, next) {
    return function(model_name) {
      models[model_name].findOneAndUpdate(
        { _id: req.params.id },
        _.omit(req.body, '_id'),
        function(err, doc) {
          if (err) {
            return next(err);
          }
          res.send(doc);
        }
      );
    };
  },

  add = function(req, res, next) {
    return function(model_name) {
      var data  = _.omit(req.body, [ 'id', '_id' ]);
      models[model_name].create(data, function(err, doc) {
        if (err) {
          return next(err);
        }
        res.send(doc);
      });
    };
  },
  
  remove = function(req, res, next) {
    return function(model_name) {
      models[model_name].findOneAndRemove(
        { _id: req.params.id },
        function(err, doc) {
          if (err) {
            return next(err);
          }
          res.send(doc);
        }
      );
    };
  };

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
      update(req, res, next)('Product');
    },

    addProduct: function(req, res, next) {
      add(req, res, next)('Product');
    },

    removeProduct: function(req, res, next) {
      remove(req, res, next)('Product');
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
      update(req, res, next)('ProductCategory');
    },

    removeCategory: function(req, res, next) {
      remove(req, res, next)('ProductCategory');
    },

    addCategory: function(req, res, next) {
      add(req, res, next)('ProductCategory');
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
    },

    updateMaker: function(req, res, next) {
      update(req, res, next)('Maker');
    },

    removeMaker: function(req, res, next) {
      remove(req, res, next)('Maker');
    },

    addMaker: function(req, res, next) {
      add(req, res, next)('Maker');
    }


  };
};
