
'use strict';

var async            = require('async'),
    db               = require('./models'),
    fs               = require('fs'),
    formidable       = require('formidable'),
    _                = require('underscore'),
    passport         = require('passport');

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
            if (!doc) {
              return res.sendStatus(404);
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

    showProduct: function(req, res, next) {
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
              // Convert makers array -- if any -- to list
              var makers = (_.isArray(product.makers) ?
                  _.pluck(product.makers, 'name').join(', ') : '');
              res.render('product', { product: product, makers: makers });
            });
          }
        });
      });
    },

    showProducts: function(req, res, next) {
      var json_data = res.locals.json_data;
      res.format({
        html: function() {
          db.model('Product').paginate({}, req.query.page, req.query.limit,
          function(err, page_count, products, item_count) {
            if (err) {
              return next(err);
            }
            res.render('products_search', {
              heading:     'All Instruments',
              products:    products,
              categories:  json_data.categories,
              page_count:  page_count,
              item_count:  item_count
            });
          }, { sortBy: { name: 1 }, populate: 'makers' });
        },
        json: function() {
          res.send({
            products: json_data.products,
            product_categories: json_data.product_categories,
            makers: json_data.makers,
            tags: json_data.tags,
            tag_categories: json_data.tag_categories
          });
        }
      });
    },

    showProductsByCategory: function(req, res, next) {
      db.model('ProductCategory').findOne({ slug: req.params.category },
      function(err, product_category) {
        if (err) {
          return next(err);
        }
        if (!product_category) {
          return res.sendStatus(404);
        }
        var query = { categories: product_category._id };
        db.model('Product').paginate(query, req.query.page, req.query.limit,
        function(err, page_count, products, item_count) {
          if (err) {
            return next(err);
          }
          res.format({
            html: function() {
              res.render('products_search', {
                heading:            product_category.name,
                products:           products,
                product_categories: res.locals.json_data.product_categories,
                page_count:         page_count,
                item_count:         item_count
              });
            },
            json: function() {
              res.send(products);
            }
          });
        }, { populate: 'makers', sortBy : { name: 1 } });
      });
    },
    
    showProductsByTags: function(req, res, next) {
      var tags  = (typeof req.params.tags != 'undefined' ?
                  req.params.tags.split(',') : []),
                  // Default is to include all tagged products
          query = { 'tags.0': { $exists: true }};
      var tag_ids = res.locals.json_data.tags.filter(function(tag) {
        return _.contains(tags, tag.slug);
      }).map(function(tag) {
        return Number(tag._id);
      });
      if (tag_ids.length) {
        query = { tags: { $all: tag_ids }};
      }
      db.model('Product').paginate(query, req.query.page, req.query.limit,
      function(err, page_count, products, item_count) {
        if (err) {
          return next(err);
        }
        res.format({
          html: function() {
            res.render('products_search', {
              heading:            'Sound Search',
              products:           products,
              page_count:         page_count,
              item_count:         item_count
            });
          },
          json: function() {
            res.send(products);
          }
        });
      }, { populate: 'makers', sortBy : { name: 1 } });
    },
    
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
    },

    showIndex: function(req, res, next) {
      res.render('index');
    },
    
    // Saves a file upload in a tmp dir and send back filename and other
    // stats
    saveTempUpload: function(req, res, next) {
      var form       = new formidable.IncomingForm();
      form.parse(req, function(err, fields, files) {
        if (err) {
          return next(err);
        }
        if (typeof files.file == 'undefined') {
          return next(new Error('files.file is not defined'));
        }
        // Send back file stats, tmp path, etc.
        res.send(files.file);
      });
    },

    saveProductFiles: function(req, res, next) {
      var files = {
        image:       '/public/images/',
        thumbnail:   '/public/images/',
        sound_file:  '/public/sound-files/products/'
      };
      async.eachSeries(Object.keys(files), function(file, cb) {
        if (req.body[file] && req.body['tmp_' + file]) {
          var path = __dirname + files[file] + req.body[file];
          fs.rename(req.body['tmp_' + file], path, cb);
        } else {
          cb();
        }
      }, next);
    },

    loginForm: function(req, res, next) {
      if (req.isAuthenticated()) {
        return res.redirect('/');
      }
      res.render('cms/login_form');
    },
    
    login: function(req, res, next) {
      passport.authenticate('local', function(err, user, info) {
        if (err) {
          return next(err);
        }
        if (!user) {
          req.session.messages =  [ info.message ];
          return res.redirect('/login');
        }
        req.logIn(user, function(err) {
          if (err) {
            return next(err);
          }
          res.redirect('/');
        });
      })(req, res, next);
    },
    
    logout: function(req, res, next) {
      req.logout();
      res.redirect('/login');
    },

    getUser: function(req, res, next) {
      if (req.isAuthenticated()) {
        res.format({
          json: function() {
            res.json(req.user);
          }
        });
      }
    },

    auth: function(req, res, next) {
      if (!req.isAuthenticated()) {
        res.format({
          html: function() {
            next(new Error('You must be logged in to do that...'));
          },
          json: function() {
            res.status(403);
            res.send({ ok: 0 });
          }
        });
      } else {
        next();
      }
    }


  };
};
