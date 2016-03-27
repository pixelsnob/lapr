
'use strict';

var async            = require('async'),
    db               = require('./models'),
    fs               = require('fs'),
    formidable       = require('formidable'),
    _                = require('underscore'),
    passport         = require('passport'),
    mail             = require('./lib/mail'),
    cache            = require('memory-cache');

module.exports = function(app) {

  var isValidId = function(id) {
    return !isNaN(Number(id));
  };
  
  var getSecs = function() {
    return Math.round((new Date).getTime() / 1000);
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
          return res.render('not_found');
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
          return res.render('not_found');
        }
        db.model(model_name).findOne({ _id: req.params.id },
          function(err, doc) {
            if (err) {
              return next(err);
            }
            if (!doc) {
              return res.render('not_found');
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
        return res.render('not_found');
      }
      db.model('Product').findById(req.params.id, function(err, product) {
        if (err) {
          return next(err);
        }
        if (!product) {
          return res.render('not_found');
        }
        res.format({
          json: function() {
            res.send(product);
          },
          html: function() {
            product.populate('categories makers youtube_videos',
            function(err, product) {
              if (err) {
                return next(err);
              }
              // Convert makers array -- if any -- to list
              product = product.toJSON();
              product.makers = (_.isArray(product.makers) ?
                  _.pluck(product.makers, 'name').join(', ') : '');
              res.render('product', { product: product });
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
              class_name:  'products-categories-search',
              heading:     'All Instruments',
              products:    products,
              categories:  json_data.categories,
              page_count:  page_count,
              item_count:  item_count
            });
          }, { sortBy: { name: 1 }, populate: 'makers' });
        },
        json: function() {
          var products = json_data.products.map(function(p) {
            return _.omit(p.toJSON(), [ 'old_description' ]);
          });
          res.send({
            products: products,
            product_categories: json_data.product_categories,
            makers: json_data.makers,
            tags: json_data.tags,
            tag_categories: json_data.tag_categories,
            youtube_videos: json_data.youtube_videos
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
          return res.render('not_found');
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
                class_name:         'products-categories-search',
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

    showProductsTextSearchResults: function(req, res, next) {
      var search = req.params.search;
      db.model('Product').search({}, {}, search, function(err, products) {
        if (err) {
          return next(err);
        }
        res.format({
          html: function() {
            res.render('products_search', {
              class_name:         'products-text-search',
              heading:            'Search Results',
              products:           products,
              page_count:         0,
              item_count:         0
            });
          },
          json: function() {
            res.send(products);
          }
        });
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
              class_name:         'products-tags-search',
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
      var cached_data = cache.get('json_data');
      if (req.isAuthenticated() || !cached_data) {
        console.log('miss');
        var data = [];
        var model_names = {
          'products':            'Product',
          'product_categories':  'ProductCategory',
          'makers':              'Maker',
          'tags':                'Tag',
          'tag_categories':      'TagCategory',
          'youtube_videos':      'YoutubeVideo'
        }; 
        async.each(Object.keys(model_names), function(model_name, cb) {
          db.model(model_names[model_name]).find({}, { __v: 0 }, { sort: { name: 1 }},
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
          cache.put('json_data', data, (1000 * 60 * 60));
          next();
        });
      } else {
        res.locals.json_data = cached_data;
        console.log('hit');
        next(); 
      }
    },

    getContentBlocks: function(req, res, next) {
      db.model('ContentBlock').find({}, function(err, content_blocks) {
        if (err) {
          return next(err);
        }
        res.locals.content_blocks = content_blocks;
        next();
      });
    },
    
    getContentBlockByName: function(req, res, next) {
      db.model('ContentBlock').findOne({ name: req.params.name },
      function(err, content_block) {
        if (err) {
          return next(err);
        }
        res.send(content_block);
      });
    },

    getContentBlockById: function(req, res, next) {
      db.model('ContentBlock').findOne({ _id: req.params.id },
      function(err, content_block) {
        if (err) {
          return next(err);
        }
        res.send(content_block);
      });
    },

    showIndex: function(req, res, next) {
      db.model('Product').find({ include_in_slideshow: true },
      function(err, products) {
        if (err) {
          return next(err);
        }
        res.render('index', { products: products });
      });
    },
    
    showSitemap: function(req, res, next) {
      res.set('Content-Type', 'text/xml');
      res.render('sitemap'); 
    },

    getSlideshowImages: function(req, res, next) {
      db.model('Product').find({ include_in_slideshow: true },
      function(err, products) {
        if (err) {
          return next(err);
        }
        res.send(products);
      });
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
    
    // Moves tmp file to permanent destination
    moveProductImages: function(req, res, next) {
      var image_dir = __dirname + '/public/images/products/';
      async.waterfall([
        function(cb) {
          if (req.body.tmp_thumbnail) {
            return fs.rename(req.body.tmp_thumbnail, image_dir +
              req.body.thumbnail, cb);
          }
          cb();
        },
        function(cb) {
          if (req.body.tmp_image) {
            return fs.rename(req.body.tmp_image, image_dir +
              req.body.image, cb);
          }
          cb();
        }
      ], next);
    },
    
    moveImage: function(req, res, next) {
      var image_dir = __dirname + '/public/images/global/';
      if (req.body.tmp_name) {
        return fs.rename(req.body.tmp_name, image_dir + req.body.name, next);
      }
      next();
    },

    showContactForm: function(req, res, next) {
      res.render('contact');
    },

    addContact: function(req, res, next) {
      var data  = _.omit(req.body, [ 'id', '_id' ]);
      db.model('Contact').create(data, function(err, contact) {
        if (err) {
          return next(err);
        }
        var msg = 'From: ' + contact.name + "\n" +
                  'Email: ' + contact.email + "\n" +
                  "Comments: \n\n" + contact.comments;
        mail.transporter.sendMail({
          from:     app.locals.config.contact_email.from,
          to:       app.locals.config.contact_email.to,
          replyTo:  contact.email,
          subject:  'From LAPR',
          text:     msg
        }, function(err) {
          if (err) {
            return next(err);
          }
          res.send(contact);
        });
      });
    },
    
    /**
     * Auth stuff
     * 
     */
    loginForm: function(req, res, next) {
      if (req.isAuthenticated()) {
        return res.redirect('/');
      }
      res.render('login_form');
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
