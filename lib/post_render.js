/**
 * Override res.render: look for .content-block elements and
 * replace them with content from the db, if any
 * 
 */

'use strict';

var jsdom    = require('jsdom'),
    db       = require('../models'),
    async    = require('async'),
    markdown = require('./marked');

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
      jsdom.env(
        str, 
        [ '//cdnjs.cloudflare.com/ajax/libs/zepto/1.0/zepto.min.js' ],
        function(err, window) {
          if (err) {
            return cb(err);
          }
          if (!window) {
            return cb('window object is missing');
          }
          var $ = window.$, $html = $('*');
          // Front-end has its own stuff so remove this script
          $html.find('script.jsdom').remove();
          var content_blocks = $('.content-block');
          async.eachSeries(content_blocks, function($content_block, cb) {
            var name = $($content_block).attr('data-content-block-name');
            db.model('ContentBlock').findOne({ name: name },
            function(err, content_block) {
              if (content_block) {
                var content = content_block.content;
                if (content_block.type == 'markdown') {
                  content = res.locals.markdown(content);
                }
                $($content_block).html(content);
              }
              cb();
            });
          }, function(err) {
            fn(err, '<!DOCTYPE html><html>' + $html.html() + '</html>');
          });
        }
      );
    });
  };
  next();
};
