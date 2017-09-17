
'use strict';

var async            = require('async'),
    db               = require('./models'),
    fs               = require('fs'),
    formidable       = require('formidable'),
    _                = require('underscore'),
    passport         = require('passport'),
    mail             = require('./lib/mail'),
    cache            = require('memory-cache');

module.exports = app => {

  var isValidId = id => !isNaN(Number(id));
  
  return {
    
    get: model_name => 
      (req, res, next) =>
        db.model(model_name).find()
          .sort({ name: 1 })
          .exec((err, docs) => {
            if (err) {
              return next(err);
            }
            res.send(docs);
          }),

    update: model_name => 
      (req, res, next) => {
        if (!isValidId(req.params.id)) {
          return res.render('not_found');
        }
        db.model(model_name).findOne({ _id: req.params.id },
          (err, doc) => {
            if (err) {
              return next(err);
            }
            if (!doc) {
              return new Error(model_name + ' not found');
            }
            _.extend(doc, _.omit(req.body, '_id'));
            doc.save(err => {
              if (err) {
                return next(err);
              }
              res.send(doc);
            });
          }
        );
      },

    add: model_name =>
      (req, res, next) => {
        var data  = _.omit(req.body, [ 'id', '_id' ]);
        db.model(model_name).create(data, (err, doc) => {
          if (err) {
            return next(err);
          }
          res.send(doc);
        });
      },
    
    remove: model_name => 
      (req, res, next) => {
        if (!isValidId(req.params.id)) {
          return res.render('not_found');
        }
        db.model(model_name).findOne({ _id: req.params.id }, (err, doc) => {
          if (err) {
            return next(err);
          }
          if (!doc) {
            return res.render('not_found');
          }
          doc.remove(err => {
            if (err) {
              return next(err);
            }
            res.send(doc);
          });
        });
      },

    showProduct: (req, res, next) => {
      if (!isValidId(req.params.id)) {
        return res.render('not_found');
      }
      db.model('Product').findById(req.params.id, (err, product) => {
        if (err) {
          return next(err);
        }
        if (!product) {
          return res.render('not_found');
        }
        res.format({
          html: () => {
            product.populate('categories makers youtube_videos',
            (err, product) => {
              if (err) {
                return next(err);
              }
              // Convert makers array -- if any -- to list
              product = product.toJSON();
              product.makers = (_.isArray(product.makers) ?
                  _.pluck(product.makers, 'name').join(', ') : '');
              res.render('product', { product: product });
            });
          },
          json: () => {
            res.send(product);
          },
        });
      });
    },

    showProducts: (req, res, next) => {
      var json_data = res.locals.json_data;
      res.format({
        html: () => {
          let pagination_opts = { page: req.query.page, limit: 100 };
          db.model('Product').paginate({}, pagination_opts, (err, results) => {
            if (err) {
              return next(err);
            }
            res.render('products_search', {
              class_name:  'products-categories-search',
              heading:     'All Instruments',
              products:    results.docs,
              categories:  json_data.categories,
              page_count:  results.total,
              item_count:  results.limit
            });
          }, { sortBy: { name: 1 }, populate: 'makers' });
        },
        json: () => {
          res.send({
            products: json_data.products,
            product_categories: json_data.product_categories,
            makers: json_data.makers,
            tags: json_data.tags,
            tag_categories: json_data.tag_categories,
            youtube_videos: json_data.youtube_videos
          });
        }
      });
    },

    showProductsByCategory: (req, res, next) => {
      db.model('ProductCategory').findOne({ slug: req.params.category },
      (err, product_category) => {
        if (err) {
          return next(err);
        }
        if (!product_category) {
          return res.render('not_found');
        }
        let query           = { categories: product_category._id },
            pagination_opts = { page: req.query.page, limit: 100 };
        db.model('Product').paginate(query, pagination_opts, (err, results) => {
          if (err) {
            return next(err);
          }
          res.format({
            html: () => {
              res.render('products_search', {
                class_name:         'products-categories-search',
                heading:            product_category.name,
                products:           results.docs,
                product_categories: res.locals.json_data.product_categories,
                page_count:         results.total,
                item_count:         results.limit
              });
            },
            json: () => {
              res.send(products);
            }
          });
        }, { populate: 'makers', sortBy : { name: 1 } });
      });
    },

    showProductsTextSearchResults: (req, res, next) => {
      var search = req.params.search;
      db.model('Product').search({}, {}, search, (err, products) => {
        if (err) {
          return next(err);
        }
        res.format({
          html: () => {
            res.render('products_search', {
              class_name:         'products-text-search',
              heading:            'Search Results',
              products:           products,
              page_count:         0,
              item_count:         0
            });
          },
          json: () => {
            res.send(products);
          }
        });
      });
    },
    
    showProductsByTags: (req, res, next) => {
      var tags  = (typeof req.params.tags != 'undefined' ?
                  req.params.tags.split(',') : []),
                  // Default is to include all tagged products
          query = { 'tags.0': { $exists: true }};
      var tag_ids = res.locals.json_data.tags.filter(tag => 
        _.contains(tags, tag.slug)
      ).map(tag => 
        Number(tag._id)
      );
      if (tag_ids.length) {
        query = { tags: { $all: tag_ids }};
      }
      let pagination_opts = { page: req.query.page, limit: 100 };
      db.model('Product').paginate(query, pagination_opts, (err, results) => {
        if (err) {
          return next(err);
        }
        res.format({
          html: () => {
            res.render('products_search', {
              class_name:         'products-tags-search',
              heading:            'Sound Search',
              products:           results.docs,
              page_count:         results.total,
              item_count:         results.limit
            });
          },
          json: () => {
            res.send(products);
          }
        });
      }, { populate: 'makers', sortBy : { name: 1 } });
    },
    
    // Returns an object with pertinent model data, used to create a JSON
    // file, etc.
    getProducts: (req, res, next) => {
      var cached_data   = cache.get('json_data'),
          nocache       = typeof req.query.nocache != 'undefined';
      if (req.isAuthenticated() || nocache || !cached_data) {
        var data = {};
        var model_names = {
          'products':            'Product',
          'product_categories':  'ProductCategory',
          'makers':              'Maker',
          'tags':                'Tag',
          'tag_categories':      'TagCategory',
          'youtube_videos':      'YoutubeVideo'
        }; 
        async.each(Object.keys(model_names), (model_name, cb) => {
          db.model(model_names[model_name]).find({}, { __v: 0 }, { sort: { name: 1 }},
          (err, docs) => {
            if (err) {
              return cb(err);
            }
            data[model_name] = docs.map(doc => {
              // Send only fields that are in the model (mongoose likes to just
              // send them all...)
              var fields = Object.keys(
                db.model(model_names[model_name]).schema.paths);
              var new_doc = {};
              fields.forEach(field => {
                if (typeof doc[field] != 'undefined') {
                  new_doc[field] = doc[field];
                }
              });
              return new_doc;
            });
            cb();
          });
        }, err => {
          if (err) {
            return next(err);
          }
          res.locals.json_data = data;
          cache.put('json_data', data, (1000 * 60 * 60));
          next();
        });
      } else {
        res.locals.json_data = cached_data;
        next(); 
      }
    },

    getContentBlocks: (req, res, next) => {
      db.model('ContentBlock').find({}, (err, content_blocks) => {
        if (err) {
          return next(err);
        }
        res.locals.content_blocks = content_blocks;
        next();
      });
    },
    
    getContentBlockByName: (req, res, next) => {
      db.model('ContentBlock').findOne({ name: req.params.name },
      (err, content_block) => {
        if (err) {
          return next(err);
        }
        res.send(content_block);
      });
    },

    getContentBlockById: (req, res, next) => {
      db.model('ContentBlock').findOne({ _id: req.params.id },
      (err, content_block) => {
        if (err) {
          return next(err);
        }
        res.send(content_block);
      });
    },

    showIndex: (req, res, next) => {
      db.model('Product').find({ include_in_slideshow: true },
      (err, products) => {
        if (err) {
          return next(err);
        }
        res.render('index', { products: products });
      });
    },
    
    showSitemap: (req, res, next) => {
      res.set('Content-Type', 'text/xml');
      res.render('sitemap'); 
    },

    getSlideshowImages: (req, res, next) => {
      db.model('Product').find({ include_in_slideshow: true },
      (err, products) => {
        if (err) {
          return next(err);
        }
        res.send(products);
      });
    },

    // Saves a file upload in a tmp dir and send back filename and other
    // stats
    saveTempUpload: (req, res, next) => {
      var form = new formidable.IncomingForm();
      form.parse(req, (err, fields, files) => {
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
    moveProductImages: (req, res, next) => {
      var image_dir = __dirname + '/public/images/products/';
      async.waterfall([
        cb => {
          if (req.body.tmp_thumbnail) {
            return fs.rename(req.body.tmp_thumbnail, image_dir +
              req.body.thumbnail, cb);
          }
          cb();
        },
        cb => {
          if (req.body.tmp_image) {
            return fs.rename(req.body.tmp_image, image_dir +
              req.body.image, cb);
          }
          cb();
        }
      ], next);
    },
    
    moveImage: (req, res, next) => {
      var image_dir = __dirname + '/public/images/global/';
      if (req.body.tmp_name) {
        return fs.rename(req.body.tmp_name, image_dir + req.body.name, next);
      }
      next();
    },

    showContactForm: (req, res, next) => {
      res.render('contact');
    },

    addContact: (req, res, next) => {
      var data  = _.omit(req.body, [ 'id', '_id' ]);
      db.model('Contact').create(data, (err, contact) => {
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
        }, err => {
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
    loginForm: (req, res, next) => {
      if (req.isAuthenticated()) {
        return res.redirect('/');
      }
      res.render('login_form');
    },
    
    login: (req, res, next) => {
      passport.authenticate('local', (err, user, info) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          req.session.messages =  [ info.message ];
          return res.redirect('/login');
        }
        req.logIn(user, err => {
          if (err) {
            return next(err);
          }
          res.redirect('/instruments');
        });
      })(req, res, next);
    },
    
    logout: (req, res, next) => {
      req.logout();
      res.redirect('/login');
    },

    getUser: (req, res, next) => {
      if (req.isAuthenticated()) {
        res.format({
          json: () => {
            res.json(req.user);
          }
        });
      }
    },

    auth: (req, res, next) => {
      if (!req.isAuthenticated()) {
        res.format({
          html: () => {
            next(new Error('You must be logged in to do that...'));
          },
          json: () => {
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
