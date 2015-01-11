/**
 * Reinserts tags so they have numeric ids
 * 
 */

'use strict';

var async            = require('async'),
    db               = require('../models'),
    _                = require('underscore');

async.waterfall([
  function(next) {
    db.connection.collections.temp_tags.drop(function(err) {
      if (err) {
        return next(err);
      }
      next();
    });
  },
  function(next) {
    db.connection.collections.temp_tag_categories.drop(function(err) {
      if (err) {
        return next(err);
      }
      next();
    });
  },
  function(next) {
    db.connection.model('TempTag').resetCount(function(err) {
      next();
    });
  },
  function(next) {
    db.connection.model('TempTagCategory').resetCount(function(err) {
      next();
    });
  },
  function(next) {
    db.connection.model('Tag').find().populate('category').exec(function(err, tags) {
      if (err) { 
        return next(err);
      }
      async.eachSeries(tags, function(tag, cb) {
        db.connection.model('TempTag').create(_.omit(tag.toJSON(), [ '_id', 'category' ]),
        function(err, doc) {
          if (err) {
            return cb(err);
          }
          db.connection.model('TempTagCategory').findOne({ name: tag.category.name },
          function(err, cat) {
            if (cat) {
              doc.category = cat._id;
              doc.save(cb);
            } else {
              db.connection.model('TempTagCategory').create({ name: tag.category.name },
              function(err, _cat) {
                if (err) {
                  return cb(err);
                }
                doc.category = _cat._id;
                doc.save(cb);
              });
            }
          });
        });
      }, next);
    });
  }
], function(err) {
  if (err) {
    return console.error(err);
  }
  console.log('Done');
  db.connection.close();
});


