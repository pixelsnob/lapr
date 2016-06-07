
'use strict';

var jsdom    = require('jsdom'),
    db       = require('../models'),
    async    = require('async'),
    markdown = require('./marked');

var win;

jsdom.env(
  '', 
  [ __dirname + '/../node_modules/jquery/dist/jquery.min.js' ],
  function(err, window) {
    if (err) {
      return fn(err, str);
    }
    if (!window) {
      return fn(new Error('window object is missing'), str);
    }
    win = window;
  }
);

module.exports = function(req, res, next) {
  var render = res.render;
  res.render = function(view, options, fn) {
    var self = this,
      options = options || {},
      req = this.req,
      app = req.app,
      defaultFn;

    if ('function' == typeof options) {
      fn = options, options = {};
    }

    defaultFn = function(err, str){
      if (err) return req.next(err);
      self.send(str);
    };

    if ('function' != typeof fn) {
      fn = defaultFn;
    }
    
    render.call(self, view, options, function(err, str) {
      var window    = win,
          $         = win.$,
          document  = window.document;
      var doc = document.implementation.createHTMLDocument();
      doc.documentElement.innerHTML = str;
      var content_blocks = $(doc.documentElement).find('.content-block');
      async.eachSeries(content_blocks, function(content_block, cb) {
        var name = $(content_block).attr('data-name');
        db.model('ContentBlock').findOne({ name: name },
        function(err, content_block_data) {
          if (err) {
            return fn(err, str);
          }
          if (content_block_data) {
            var content = content_block_data.content;
            if (content_block_data.type == 'markdown') {
              content = res.locals.markdown(content);
            }
            $(content_block).html(content);
          }
          cb();
        });
      }, function(err) {
        let html = $(doc.documentElement).html();
        $(doc.documentElement).remove();
        fn(err, '<!DOCTYPE html><html>' + html + '</html>');
        if (typeof gc == 'function') {
          gc();
        }
      });
    });
  };
  next();
};

