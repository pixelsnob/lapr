
'use strict';

var async            = require('async'),
    db               = require('./models'),
    _                = require('underscore');

module.exports = function(app) {

  var isValidId = function(id) {
    return !isNaN(Number(id));
  };
  
  return {
    
    get: function(model_name) {
      return function(req, res, next) {
        db.model(model_name).find()
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
        db.model(model_name).findOne({ _id: req.params.id },
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
        db.model(model_name).create(data, function(err, doc) {
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
        db.model(model_name).findOne({ _id: req.params.id },
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
            tags_tree:     [],//tags_tree,
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
      db.model('Product').findById(req.params.id, function(err, product) {
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
    
    getProductsByTags: function(req, res, next) {
      var tags     = (typeof req.params.tags != 'undefined' ?
                      req.params.tags.split(',') : []),
          query    = {},
          products = res.locals.json_data.products.filter(function(product) {
            return _.isArray(product.tags) && product.tags.length;
          });
      if (tags.length) {
        var tag_ids = res.locals.json_data.tags.filter(function(tag) {
          return _.contains(tags, tag.slug);
        }).map(function(tag) {
          return tag._id;
        });
        products = products.filter(function(product) {
          var temp_tag_ids = tag_ids.filter(function(tag_id) {
            if (!_.isArray(product.tags)) {
              return false;
            }
            return _.some(product.tags, function(tag) {
              return _.isEqual(tag, tag_id);
            });
          });
          return temp_tag_ids.length == tag_ids.length;
        });
      }
      res.format({
        html: function() {
          res.render('products', {
            products:       products,
            categories:     res.locals.json_data.categories, 
            tags:           res.locals.json_data.tags,
            tag_categories: res.locals.json_data.tag_categories,
            page_count:    0,
            item_count:    0
          });
        },
        json: function() {
          res.send(products);
        }
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
        db.model(model_names[model_name]).find({}, null, { sort: { name: 1 }},
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
