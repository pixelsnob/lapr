

'use strict';

var //jsdom    = require('jsdom'),
    db       = require('../models'),
    async    = require('async'),
    markdown = require('./marked');

module.exports = function(req, res, next) {
  //console.log(req.originalUrl);
  db.model('Page').find({ path: req.originalUrl }, function(err, pages) {
    if (err) {
      return next(err);
    }
    //console.log(pages);
    next();
  });
};
