
'use strict';

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
        models[model_name].findOne({ _id: req.params.id },
          function(err, doc) {
            if (err) {
              return next(err);
            }
            if (!doc) {
              return new Error(model_name + ' not found');
            }
            _.extend(doc, _.omit(req.body, '_id'));
            doc.save(function(err) {
              if (err) {
                return next(err);
              }
              res.send(doc);
            });
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
        models[model_name].findOne({ _id: req.params.id },
          function(err, doc) {
            if (err) {
              return next(err);
            }
            doc.remove(function(err) {
              if (err) {
                return next(err);
              }
              res.send(doc);
            });
          }
        );
      };
    },

    productsSearch: function(req, res, next) {
      var tags_tree = [];
      res.locals.json_data.tag_categories.forEach(function(tag_cat) {
        var tags = res.locals.json_data.tags.filter(function(tag) {
          return _.isEqual(tag.category, tag_cat._id);
        });
        tags_tree.push({ name: tag_cat.name, tags: tags });
      });
      res.format({
        html: function() {
          res.render('products', {
            products:      res.locals.json_data.products,
            categories:    res.locals.json_data.categories, 
            tags_tree:     tags_tree,
            page_count:    0,
            item_count:    0
          });
        },
        json: function() {
          res.send(products);
        }
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
    },

    // Builds JSON data that gets dumped on the page, for the front-end
    // to use
    getProducts: function(req, res, next) {
      var model_names = {
        'products':            'Product',
        'product_categories':  'ProductCategory',
        'makers':              'Maker',
        'tags':                'Tag',
        'tag_categories':      'TagCategory'
      },
      data = [];
      async.each(Object.keys(model_names), function(model_name, cb) {
        models[model_names[model_name]].find({}, null, { sort: { name: 1 }},
        function(err, docs) {
          if (err) {
            return cb(err);
          }
          data[model_name] = docs;
          cb();
        });
      }, function(err) {
        if (err) {
          return next(err);
        }
        res.locals.json_data = data;       
        next();
      });
    }


  };
};
