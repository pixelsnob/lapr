
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
    
    get: model_name => async (req, res, next) => {
      try {
        const docs = await db.model(model_name).find().sort({ name: 1 }).exec();
        res.send(docs);
      } catch (err) {
        next(err);
      }
    },

    update: model_name => async (req, res, next) => {
      try {
        const doc = await db.model(model_name).findOne({ _id: req.params.id });
        if (!doc) {
          next(new Error(model_name + ' not found'));
        }
        // Omit id and mongo __v
        const { _id, __v, ...body } = req.body;
        Object.assign(doc, body);
        await doc.save();
        res.send(req.body);
      } catch(err) {
        next(err);
      }
    },

    add: model_name => async (req, res, next) => {
      const { _id, id, ...body } = req.body;
      const doc = await db.model(model_name).create(body);
      res.send(doc);
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

    showProduct: async (req, res, next) => {
      if (!isValidId(req.params.id)) {
        return res.render('not_found');
      }
      try {
        var product = await db.model('Product').findById(req.params.id);
        res.format({
          html: async () => {
            if (!product) {
              return res.render('not_found');
            }
            await db.model('Product').populate(product, { path: 'images' });
            await db.model('Product').populate(product, { path: 'makers' });
            product = product.toJSON();
            if (Array.isArray(product.makers)) {
              product.makers = product.makers.map(maker => maker.name).join(', ');
            }
            res.render('product', { product: product });
          },
          json: () => {
            res.send(product || {});
          },
        });
      } catch (err) {
        next(err);
      }
    },

    showProducts: async (req, res, next) => {
      const products = await db.model('Product').find();
      const product_categories = await db.model('ProductCategory').find();
      res.format({
        html: async () => {
          await db.model('Product').populate(products, { path: 'makers' });
          await db.model('Product').populate(products, { path: 'images' });
          res.render('products_search', {
            class_name: 'products-categories-search',
            heading: 'All Instruments',
            products,
            categories: product_categories, ///////////
            page_count:  0, // <
            item_count:  0 // <
          });
        },
        json: async () => {
          const makers = await db.model('Maker').find();
          const tags = await db.model('Tag').find();
          const tag_categories = await db.model('TagCategory').find();
          const images = await db.model('Image').find();
          const youtube_videos = await db.model('YoutubeVideo').find();
          res.send({
            products,
            product_categories,
            makers,
            tags,
            tag_categories,
            youtube_videos,
            images
          });
        }
      });
    },

    showProductsByCategory: async (req, res, next) => {
      try {
        const product_category = await db.model('ProductCategory').findOne({
          slug: req.params.category
        });
        if (!product_category) {
          return res.render('not_found');
        }
        const products = await db.model('Product').find({
          categories: product_category._id
        }).populate([ 'images', 'makers', 'product_categories' ]).exec();
        res.format({
          html: () => {
            res.render('products_search', {
              class_name:         'products-categories-search',
              heading:            product_category.name,
              products,
              product_categories: res.locals.json_data.product_categories, //<
              page_count:         0, // <
              item_count:         0 // <
            });
          },
          json: () => {
            res.send(products);
          }
        });
      } catch (err) {
        next(err);
      }
    },
    
    showProductsByTags: async (req, res, next) => {
      var selected_tags  = (typeof req.params.tags != 'undefined' ? req.params.tags.split(',') : []);
      var products = [];
      if (selected_tags.length) {
        products = await db.model('Product').aggregate([
          {
            $lookup: {
              from: 'tags',
              localField: 'tags',
              foreignField: '_id',
              as: 'tags'
            }
          },
          {
            $match: {
              'tags.slug': { $all: selected_tags }
            }
          }
        ]);
      } else {
        products = await db.model('Product').find({
          'tags.0': { $exists: true }
        });
      }
      res.format({
        html: async () => {
          await db.model('Product').populate(products, { path: 'makers' });
          await db.model('Product').populate(products, { path: 'images' });
          res.render('products_search', {
            class_name: 'products-tags-search',
            heading: 'Sound Search',
            products,
            page_count: 0, //results.total,
            item_count: 0 //results.limit
          });
        },
        json: () => {
          res.send(products);
        }
      });
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
          'youtube_videos':      'YoutubeVideo',
          'images':              'Image'
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

    // Moves image tmp file to permanent destination
    moveImage: (req, res, next) => {
      var image_dir = __dirname + '/public/images/products/';
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
          res.cookie('nocache', '1', {
            secure: true,
            httpOnly: true,
            sameSite: true,
            expires: 0,
            maxAge: (1000 * 60 * 60 * 4)
          });
          setTimeout(() => {
            res.redirect('/');
          }, 2000);
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
