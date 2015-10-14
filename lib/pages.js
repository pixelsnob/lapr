

'use strict';

var db       = require('../models'),
    async    = require('async'),
    markdown = require('./marked');

module.exports = function(req, res, next) {
  db.model('Page').findOne({ path: req.originalUrl }, function(err, page) {
    if (err) {
      return next(err);
    }
    if (page) {
      res.locals.title = page.title;
      res.locals.description = page.description;
    }
    next();
  });
};
