
"use strict";

var async            = require('async'),
    models           = require('./models'),
    _                = require('underscore');

module.exports = function(app) {

  var isValidId = function(id) {
    return require('mongoose').Types.ObjectId.isValid(id);
  };

  return {
    
    get: function(model_name) {
      return function(req, res, next) {
        models[model_name].find()
          .sort({ name: 1 })
          .exec(function(err, docs) {
            if (err) {
              return next(err);
            }
            res.send(docs);
          });
      }
    },

    update: function(model_name) {
      return function(req, res, next) {
        if (!isValidId(req.params.id)) {
          return res.sendStatus(404);
        }
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

    add: function(model_name) {
      return function(req, res, next) {
        var data  = _.omit(req.body, [ 'id', '_id' ]);
        models[model_name].create(data, function(err, doc) {
          if (err) {
            return next(err);
          }
          res.send(doc);
        });
      };
    },
    
    remove: function(model_name) {
      return function(req, res, next) {
        if (!isValidId(req.params.id)) {
          return res.sendStatus(404);
        }
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
    },
    
    // temp
    getProductsApi: function(req, res, next) {
      models.Product.find(function(err, products) {
        if (err) {
          return next(err);
        }
        res.send(products);
      });
    },

    getProducts: function(req, res, next) {
      async.waterfall([
        // Get selected category, if any
        function(cb) {
          models.ProductCategory.findOne({ slug: req.params.category },
          function(err, category) {
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
          models.Product.search(query, opts, req.body.search,
          function(err, products) {
            if (err) {
              return cb(err);
            }
            cb(null, category, products);
          });
        },
        // Get product categories
        function(category, products, cb) {
          models.ProductCategory.find({}, null, { sort: { name: 1 }},
          function(err, categories) {
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
        res.format({
          html: function() {
            res.render('products', {
              products:      products,
              categories:    categories,
              search:        (req.body.search || '')
            });
          },
          json: function() {
            res.send(products);
          }

        });
      });
    },

    getProduct: function(req, res, next) {
      if (!isValidId(req.params.id)) {
        return res.sendStatus(404);
      }
      models.Product.findById(req.params.id, function(err, product) {
        if (err) {
          return next(err);
        }
        if (!product) {
          return res.sendStatus(404);
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
    }


  };
};
