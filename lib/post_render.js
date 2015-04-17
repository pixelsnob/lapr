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
        [ __dirname + '/../public/bower_components/zepto/zepto.min.js' ],
        function(err, window) {
          if (err) {
            return fn(err, str);
          }
          if (!window) {
            return fn(new Error('window object is missing'), str);
          }
          var $ = window.$, $html = $('*');
          // Front-end has its own stuff so remove this script
          $html.find('script.jsdom').remove();
          var content_blocks = $('.content-block');
          async.eachSeries(content_blocks, function($content_block, cb) {
            var name = $($content_block).attr('data-name');
            db.model('ContentBlock').findOne({ name: name },
            function(err, content_block) {
              if (err) {
                return fn(err, str);
              }
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
