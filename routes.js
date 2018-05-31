
'use strict';

var async            = require('async'),
    db               = require('./models'),
    fs               = require('fs'),
    formidable       = require('formidable'),
    _                = require('underscore'),
    passport         = require('passport'),
    mail             = require('./lib/mail');


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
          return next(new Error(model_name + ' not found'));
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
      try {
        const { _id, id, ...body } = req.body;
        const doc = await db.model(model_name).create(body);
        res.send(doc);
      } catch (err) {
        next(err);
      }
    },
    
    remove: model_name => async (req, res, next) => {
      if (!isValidId(req.params.id)) {
        return next(new Error(model_name + ' not found'));
      }
      try {
        const doc = await db.model(model_name).findOne({ _id: req.params.id });
        if (!doc) {
          return next(new Error(model_name + ' not found'));
        }
        await doc.remove();
        res.send(doc);
      } catch (err) {
        next(err);
      }
    },

    showProducts: (req, res, next) => {
      res.format({
        html: () => {
          next();
        },
        json: () => {
          res.send(res.locals.json_data);
        }
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
