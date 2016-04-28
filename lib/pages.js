

'use strict';

var db       = require('../models'),
    async    = require('async'),
    markdown = require('./marked');

module.exports = (req, res, next) => {
  var path = req.originalUrl.replace(/\?.*$/, '');
  db.model('Page').findOne({ path: path }, (err, page) => {
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
