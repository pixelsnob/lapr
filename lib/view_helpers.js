
'use strict';

var _    = require('underscore'),
    jade = require('jade');

module.exports = function(app) {
  // Outputs a cms content block
  app.locals.outputContentBlock = function(name, page) {
    var content_block = _.findWhere(page.content_blocks, { name: name });
    if (content_block) {
      var locals = _.extend(app.locals, {
        name: name,
        content: content_block.content,
        class_names: content_block.class_names
      });
      return jade.renderFile('./views/cms/content_block.jade', locals);
    }
  };
  // Human readable file sizes
  app.locals.bytesToSize = function(bytes) {
    if (bytes == 0) {
      return '0 Bytes';
    }
    var k = 1000;
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
  };
};
